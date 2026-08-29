"use client";

/**
 * usePKBattle — Socket.IO client hook for class PK battles.
 * Manages connection, room lifecycle, and real-time state.
 */
import { useEffect, useRef, useState, useCallback } from "react";
import { io, type Socket } from "socket.io-client";
import { socketBase } from "./config";

export interface PKPlayer {
  name: string;
  role: "teacher" | "student";
  score: number;
  answered?: number;
}

export interface PKQuestion {
  id: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
}

export type PKPhase = "idle" | "lobby" | "countdown" | "playing" | "ended";

export function usePKBattle() {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [phase, setPhase] = useState<PKPhase>("idle");
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [className, setClassName] = useState("");
  const [players, setPlayers] = useState<PKPlayer[]>([]);
  const [questions, setQuestions] = useState<PKQuestion[]>([]);
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [leaderboard, setLeaderboard] = useState<PKPlayer[]>([]);
  const [results, setResults] = useState<PKPlayer[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Connect on mount
  useEffect(() => {
    const socket = io(socketBase(), {
      path: "/socket.io",
      transports: ["websocket", "polling"],
    });
    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("pk:created", ({ roomCode, className: cn }) => {
      setRoomCode(roomCode);
      setClassName(cn);
      setPhase("lobby");
      setError(null);
    });

    socket.on("pk:players", ({ players: ps, className: cn }) => {
      setPlayers(ps);
      if (cn) setClassName(cn);
    });

    socket.on("pk:started", ({ questions: qs, endsAt: ea }) => {
      setQuestions(qs);
      setEndsAt(ea);
      setPhase("countdown");
      setTimeout(() => setPhase("playing"), 3000);
    });

    socket.on("pk:leaderboard", ({ leaderboard: lb }) => {
      setLeaderboard(lb);
    });

    socket.on("pk:ended", ({ results: r }) => {
      setResults(r);
      setPhase("ended");
    });

    socket.on("pk:error", ({ message }) => {
      setError(message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Teacher: create a room
  const createRoom = useCallback((cn: string, teacherId: number, teacherName: string, qs: PKQuestion[]) => {
    socketRef.current?.emit("pk:create", { className: cn, teacherId, teacherName, questions: qs });
  }, []);

  // Student: join a room
  const joinRoom = useCallback((code: string, userId: number, name: string) => {
    socketRef.current?.emit("pk:join", { roomCode: code, userId, name });
  }, []);

  // Teacher: start the battle
  const startBattle = useCallback((code: string) => {
    socketRef.current?.emit("pk:start", { roomCode: code });
  }, []);

  // Player: submit an answer
  const submitAnswer = useCallback((code: string, qIndex: number, isCorrect: boolean, timeMs: number) => {
    socketRef.current?.emit("pk:answer", { roomCode: code, questionIndex: qIndex, isCorrect, timeMs });
  }, []);

  // Teacher: end early
  const endBattle = useCallback((code: string) => {
    socketRef.current?.emit("pk:end", { roomCode: code });
  }, []);

  // Reset to idle
  const reset = useCallback(() => {
    setPhase("idle");
    setRoomCode(null);
    setPlayers([]);
    setQuestions([]);
    setLeaderboard([]);
    setResults([]);
    setError(null);
  }, []);

  return {
    connected, phase, roomCode, className, players, questions, endsAt,
    leaderboard, results, error,
    createRoom, joinRoom, startBattle, submitAnswer, endBattle, reset,
  };
}
