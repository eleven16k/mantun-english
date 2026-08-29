/**
 * SQLite database layer — all tables for Lexi.
 * Single file DB at ./data/lexi.db, created on first access.
 */
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DATA_DIR = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, "lexi.db"));
db.pragma("journal_mode = WAL");

// ─── Schema ───
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone TEXT UNIQUE,
    password_hash TEXT,
    nickname TEXT DEFAULT 'Student',
    avatar TEXT DEFAULT 'star',
    track TEXT DEFAULT 'zhongkao',
    target_score INTEGER DEFAULT 100,
    exam_date TEXT,
    estimated_score INTEGER DEFAULT 0,
    role TEXT DEFAULT 'student',        -- student | teacher | parent
    created_at INTEGER DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    expires_at INTEGER NOT NULL
  );

  -- Economy: hearts/coins/SP/streak per user
  CREATE TABLE IF NOT EXISTS economy (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    hearts INTEGER DEFAULT 5,
    coins INTEGER DEFAULT 120,
    score_points INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 0,
    last_study_date TEXT,
    hearts_depleted_at INTEGER,
    hints_owned INTEGER DEFAULT 1,
    super_hearts_owned INTEGER DEFAULT 0,
    score_boosts_owned INTEGER DEFAULT 0,
    streak_freezes_owned INTEGER DEFAULT 0,
    daily_questions_answered INTEGER DEFAULT 0,
    daily_date TEXT,
    week_sp INTEGER DEFAULT 0,
    week_start TEXT,
    league TEXT DEFAULT 'Starter'
  );

  -- Card states (spaced repetition per word)
  CREATE TABLE IF NOT EXISTS card_states (
    user_id INTEGER NOT NULL REFERENCES users(id),
    word_id TEXT NOT NULL,
    interval_index INTEGER DEFAULT 0,
    consecutive_correct INTEGER DEFAULT 0,
    consecutive_wrong INTEGER DEFAULT 0,
    mastered INTEGER DEFAULT 0,
    next_review_at INTEGER,
    last_reviewed_at INTEGER,
    PRIMARY KEY (user_id, word_id)
  );

  -- Weakness book
  CREATE TABLE IF NOT EXISTS weaknesses (
    user_id INTEGER NOT NULL REFERENCES users(id),
    word_id TEXT NOT NULL,
    wrong_count INTEGER DEFAULT 0,
    correct_streak INTEGER DEFAULT 0,
    last_prompt TEXT,
    added_at INTEGER,
    PRIMARY KEY (user_id, word_id)
  );

  -- Import history (AI-generated quizzes)
  CREATE TABLE IF NOT EXISTS imports (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    file_name TEXT,
    topic TEXT,
    question_type TEXT,
    question_count INTEGER,
    questions_json TEXT,           -- full Question[] snapshot
    kb_name TEXT,                  -- DeepTutor knowledge base this came from (for reuse)
    created_at INTEGER
  );

  -- Study sessions (quiz results)
  CREATE TABLE IF NOT EXISTS sessions_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id),
    correct INTEGER,
    total INTEGER,
    coins_earned INTEGER,
    sp_earned INTEGER,
    new_words INTEGER,
    accuracy INTEGER,
    duration_sec INTEGER,
    created_at INTEGER DEFAULT (unixepoch())
  );

  -- Score history (for trend chart)
  CREATE TABLE IF NOT EXISTS score_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id),
    score_points INTEGER,
    estimated_score INTEGER,
    recorded_at INTEGER DEFAULT (unixepoch())
  );

  -- Classes
  CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    teacher_id INTEGER NOT NULL REFERENCES users(id),
    created_at INTEGER DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS class_members (
    class_id INTEGER NOT NULL REFERENCES classes(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    joined_at INTEGER DEFAULT (unixepoch()),
    PRIMARY KEY (class_id, user_id)
  );

  -- Parent-child link
  CREATE TABLE IF NOT EXISTS parent_links (
    parent_id INTEGER NOT NULL REFERENCES users(id),
    child_id INTEGER NOT NULL REFERENCES users(id),
    PRIMARY KEY (parent_id, child_id)
  );

  -- Study groups (student-initiated squads)
  CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    creator_id INTEGER NOT NULL REFERENCES users(id),
    created_at INTEGER DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS group_members (
    group_id INTEGER NOT NULL REFERENCES groups(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    joined_at INTEGER DEFAULT (unixepoch()),
    PRIMARY KEY (group_id, user_id)
  );

  -- SMS OTP codes (server-generated, 5-min expiry; delivery channel plugs in here)
  CREATE TABLE IF NOT EXISTS otp_codes (
    phone TEXT PRIMARY KEY,
    code TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    attempts INTEGER DEFAULT 0
  );

  -- Friends (mutual)
  CREATE TABLE IF NOT EXISTS friends (
    user_id INTEGER NOT NULL REFERENCES users(id),
    friend_id INTEGER NOT NULL REFERENCES users(id),
    created_at INTEGER DEFAULT (unixepoch()),
    PRIMARY KEY (user_id, friend_id)
  );

  -- Membership subscription (payment channel plugs in here)
  CREATE TABLE IF NOT EXISTS subscriptions (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    tier TEXT NOT NULL,
    starts_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL
  );
`);

// ─── Migrations for tables created before a column existed ───
try {
  db.exec("ALTER TABLE imports ADD COLUMN kb_name TEXT");
} catch {
  // column already exists
}

// ─── Seed: ensure "demo" user exists for quick testing ───
const demoUser = db.prepare("SELECT id FROM users WHERE phone = ?").get("13800000001");
if (!demoUser) {
  const bcrypt = require("bcryptjs");
  const hash = bcrypt.hashSync("123456", 10);
  db.prepare("INSERT INTO users (phone, password_hash, nickname) VALUES (?, ?, ?)")
    .run("13800000001", hash, "Demo Student");
  const uidRow = db.prepare("SELECT id FROM users WHERE phone = ?").get("13800000001") as { id: number } | undefined;
  if (uidRow) {
    db.prepare("INSERT OR IGNORE INTO economy (user_id) VALUES (?)").run(uidRow.id);
  }
}

export default db;
