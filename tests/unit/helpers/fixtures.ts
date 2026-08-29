/** Shared fixtures for unit tests. */

export const QUIZ_MARKDOWN = `Some intro line that should be ignored.
### Question 1
What is the past tense of "go"?
- A. goed
- B. went
- C. gone
- D. going
**Answer:** B
**Explanation:** "Go" is irregular; the simple past is "went".
### Question 2
Choose the correct word: I ___ to school every day.
- A. go
- B. goes
- C. going
- D. gone
**Answer:** A
**Explanation:** Habitual action uses the base form.`;

export const TYPED_MARKDOWN = `### Question 1
Translate: 苹果
**Answer:** apple
**Explanation:** 苹果 means apple.`;

export const EMPTY_MARKDOWN = "No questions here, just prose.";

export const THINK_CHUNKS = [
  "Let me think about this. <th",
  "ink>The user wants the capital",
  "</think>The capital of France is Paris.",
];
