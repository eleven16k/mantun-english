/**
 * Custom Next.js server with Socket.IO for real-time class PK battles.
 * Usage: node server.js (replaces `next dev` / `next start`)
 */
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || "3123", 10);

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(httpServer, {
    path: "/socket.io",
    cors: { origin: "*" },
  });

  // ─── Class PK Game State ───
  const rooms = new Map(); // roomCode → { teacherId, className, questions, started, endsAt, players: Map<socketId, {userId, name, score, answered}> }

  io.on("connection", (socket) => {
    console.log(`[WS] Connected: ${socket.id}`);

    // Teacher creates a PK room
    socket.on("pk:create", ({ className, teacherId, teacherName, questions }) => {
      const roomCode = String(Math.floor(100000 + Math.random() * 900000));
      rooms.set(roomCode, {
        teacherId,
        className,
        questions: questions || [],
        started: false,
        endsAt: null,
        players: new Map([[socket.id, { userId: teacherId, name: teacherName, role: "teacher", score: 0, answered: 0 }]]),
      });
      socket.join(roomCode);
      socket.emit("pk:created", { roomCode, className });
      console.log(`[PK] Room created: ${roomCode} by ${teacherName}`);
    });

    // Student joins a PK room
    socket.on("pk:join", ({ roomCode, userId, name }) => {
      const room = rooms.get(roomCode);
      if (!room) {
        socket.emit("pk:error", { message: "Room not found" });
        return;
      }
      if (room.started) {
        socket.emit("pk:error", { message: "Battle already started" });
        return;
      }
      socket.join(roomCode);
      room.players.set(socket.id, { userId, name, role: "student", score: 0, answered: 0 });

      const playerList = [...room.players.values()].map(p => ({ name: p.name, role: p.role, score: p.score }));
      io.to(roomCode).emit("pk:players", { players: playerList, className: room.className });
      console.log(`[PK] ${name} joined room ${roomCode} (${room.players.size} players)`);
    });

    // Teacher starts the battle
    socket.on("pk:start", ({ roomCode }) => {
      const room = rooms.get(roomCode);
      if (!room) return;
      room.started = true;
      room.endsAt = Date.now() + 60 * 1000; // 60-second battle
      io.to(roomCode).emit("pk:started", {
        questions: room.questions,
        endsAt: room.endsAt,
      });
      console.log(`[PK] Battle started in room ${roomCode}`);

      // Auto-end timer
      setTimeout(() => {
        if (rooms.has(roomCode)) {
          const finalScores = [...room.players.values()]
            .sort((a, b) => b.score - a.score)
            .map(p => ({ name: p.name, role: p.role, score: p.score }));
          io.to(roomCode).emit("pk:ended", { results: finalScores });
          setTimeout(() => rooms.delete(roomCode), 5000);
          console.log(`[PK] Battle ended in room ${roomCode}`);
        }
      }, 60 * 1000);
    });

    // Player answers a question
    socket.on("pk:answer", ({ roomCode, questionIndex, isCorrect, timeMs }) => {
      const room = rooms.get(roomCode);
      if (!room || !room.started) return;
      const player = room.players.get(socket.id);
      if (!player) return;

      // Speed-based scoring: 100 max, minus 1 per 100ms
      const points = isCorrect ? Math.max(10, 100 - Math.floor(timeMs / 100)) : 0;
      player.score += points;
      player.answered++;

      // Broadcast updated leaderboard
      const leaderboard = [...room.players.values()]
        .sort((a, b) => b.score - a.score)
        .map(p => ({ name: p.name, role: p.role, score: p.score, answered: p.answered }));
      io.to(roomCode).emit("pk:leaderboard", { leaderboard });
    });

    // Teacher can end early
    socket.on("pk:end", ({ roomCode }) => {
      const room = rooms.get(roomCode);
      if (!room) return;
      const finalScores = [...room.players.values()]
        .sort((a, b) => b.score - a.score)
        .map(p => ({ name: p.name, role: p.role, score: p.score }));
      io.to(roomCode).emit("pk:ended", { results: finalScores });
      setTimeout(() => rooms.delete(roomCode), 5000);
    });

    socket.on("disconnect", () => {
      // Remove from any rooms
      for (const [code, room] of rooms) {
        if (room.players.has(socket.id)) {
          room.players.delete(socket.id);
          if (room.players.size === 0) {
            rooms.delete(code);
          } else {
            const playerList = [...room.players.values()].map(p => ({ name: p.name, role: p.role, score: p.score }));
            io.to(code).emit("pk:players", { players: playerList, className: room.className });
          }
        }
      }
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
    console.log(`> Socket.IO ready at ws://localhost:${port}/socket.io`);
  });
});
