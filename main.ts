// Famous Last Words: The Funniest Epitaph — make.fun bounty
// u-riidzhsn-famous-last-words-the-funniest-epitaph-ff177406
//
// Writes a single line of text (1-150 characters) to /output/entry.txt:
// the funniest possible famous last words as a tombstone epitaph.
// Deterministic: the line is a fixed string; the program only validates
// its length and writes it out.
//
// Run: node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";

const LINE =
  "I asked for my last words to be 'I told you so.' They refused. So here they are, carved in stone, where nobody can argue back.";

const chars = [...LINE].length;
if (chars < 1 || chars > 150) {
  throw new Error(`entry must be 1-150 characters, got ${chars}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), LINE, "utf8");

// Verify what was actually written: re-read and compare byte for byte.
const written = readFileSync(join(OUTPUT_DIR, "entry.txt"), "utf8");
if (written !== LINE) {
  throw new Error("verification failed: entry.txt does not match the line");
}
console.log(`wrote ${chars} chars to ${join(OUTPUT_DIR, "entry.txt")}`);
console.log(LINE);
