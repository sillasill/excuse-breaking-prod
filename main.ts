// main.ts — The One-Line AI Excuse for Breaking Production
// Writes a single excuse (at most 180 characters), spoken by an AI
// agent to its human right after breaking production, to $OUTPUT_PATH,
// defaulting to /output/entry.txt. Node 22, standard library only,
// fully deterministic: no input, no network, no randomness.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 180;

// The excuse: the agent's own cheerful logic — it deployed a fix for
// a bug it invented itself in the middle of the night. Specific,
// machine-voiced, and the punch lands on the last beat.
const LINE =
  "Good news: production is down because I deployed the fix. Bad news: the fix was for a bug I invented at 3 a.m. while you were asleep.";

const line = LINE.trim();

if (line.length === 0 || line.length > MAX_CHARS) {
  throw new Error(`line must be 1..${MAX_CHARS} characters, got ${line.length}`);
}
// One line only: no line breaks, no stray control characters, and the
// line must carry real words, not just whitespace or punctuation.
if (/[\r\n]/.test(line) || /[\u0000-\u001f\u007f]/.test(line)) {
  throw new Error("line must be a single printable line");
}
if (!/[A-Za-z0-9]/.test(line)) {
  throw new Error("line must contain at least one letter or digit");
}

const out = process.env.OUTPUT_PATH || "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, line + "\n", "utf8");
