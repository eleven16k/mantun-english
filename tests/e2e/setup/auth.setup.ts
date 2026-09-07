import { test as setup } from "@playwright/test";
import { apiLogin, uniquePhone } from "../helpers/api";

const AUTH_FILE = "playwright/.auth/student.json";

// Unique phone per run: the API enforces an otp cooldown per phone, so a
// fixed number would 429 when the suite runs twice within a minute.
setup("seed primary student", async ({ request }) => {
  const { token, uid, nickname } = await apiLogin(request, uniquePhone());
  const fs = await import("fs");
  fs.mkdirSync("playwright/.auth", { recursive: true });
  const state = {
    cookies: [] as unknown[],
    origins: [
      {
        origin: "http://localhost:3199",
        localStorage: [
          { name: "lexi-token", value: token },
          {
            name: "lexi-game-state",
            value: JSON.stringify({
              state: {
                coins: 200,
                hearts: 5,
                hintsOwned: 3,
                scorePoints: 300,
                streak: 2,
                dailyDate: new Date().toISOString().slice(0, 10),
                dailyQuestionsAnswered: 0,
              },
              version: 0,
            }),
          },
        ],
      },
    ],
  };
  fs.writeFileSync(AUTH_FILE, JSON.stringify(state));
  console.log(`seeded primary student: ${nickname} (uid ${uid})`);
});
