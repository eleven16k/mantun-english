/**
 * DB isolation helper — point DATA_DIR at a fresh temp dir BEFORE the
 * singleton server/db module is imported. Call this at the very top of
 * any test file that touches the database, then use `await getDb()`.
 */
import { mkdtempSync } from "fs";
import { tmpdir } from "os";
import path from "path";

let dataDir: string | null = null;
const DB_PATH = path.resolve(process.cwd(), "server/db");

export function isolateDataDir(): string {
  if (!dataDir) {
    dataDir = mkdtempSync(path.join(tmpdir(), "lexi-test-"));
    process.env.DATA_DIR = dataDir;
  }
  return dataDir;
}

type DbModule = { default: import("better-sqlite3").Database };

export async function getDb(): Promise<import("better-sqlite3").Database> {
  isolateDataDir();
  const mod = (await import(DB_PATH)) as DbModule;
  return mod.default;
}
