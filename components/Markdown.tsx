"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

/**
 * Shared Markdown renderer for AI output (solve steps, tutor replies, judge
 * feedback, mastery reports). Preprocesses LaTeX \\(…\\) / \\[…\\] delimiters
 * — reasoning models commonly emit them while remark-math expects $…$.
 */
export function preprocessMarkdown(text: string): string {
  return text
    // inline math: \( … \)  (arrives as \\( after JSON round-trip on some paths)
    .replace(/\\\\\((.+?)\\\\\)/g, (_, eq) => `$${eq}$`)
    .replace(/\\\((.+?)\\\)/g, (_, eq) => `$${eq}$`)
    // display math: \[ … \] — match without the s flag (dot excludes \n);
    // display blocks without newlines still convert, multi-line ones stay raw
    .replace(/\\\\\[([^\n]+?)\\\\\]/g, (_, eq) => `$$${eq}$$`)
    .replace(/\\\[([^\n]+?)\\\]/g, (_, eq) => `$$${eq}$$`);
}

export function Md({ children, className }: { children: string; className?: string }) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: (p) => <p className="mt-2 text-sm font-extrabold text-primary" {...p} />,
          h2: (p) => <p className="mt-2 text-sm font-extrabold text-primary" {...p} />,
          h3: (p) => <p className="mt-1.5 text-[13px] font-bold text-primary" {...p} />,
          h4: (p) => <p className="mt-1 text-xs font-bold text-primary" {...p} />,
          p: (p) => <p className="my-1" {...p} />,
          ul: (p) => <ul className="my-1 list-disc pl-4" {...p} />,
          ol: (p) => <ol className="my-1 list-decimal pl-4" {...p} />,
          li: (p) => <li className="my-0.5" {...p} />,
          strong: (p) => <strong className="font-extrabold text-primary" {...p} />,
          code: ({ children: c, className: cls }) =>
            cls ? (
              <code className={`${cls} rounded-lg bg-canvas px-2 py-1 text-xs`} >{c}</code>
            ) : (
              <code className="rounded bg-canvas px-1 py-0.5 text-[0.85em]">{c}</code>
            ),
          pre: (p) => <pre className="my-2 overflow-x-auto rounded-xl bg-canvas p-3 text-xs" {...p} />,
          a: (p) => <a className="font-bold text-brand-text underline" target="_blank" rel="noreferrer" {...p} />,
          blockquote: (p) => <blockquote className="my-1 border-l-2 border-brand pl-2 text-tertiary" {...p} />,
          table: (p) => <table className="my-2 w-full text-xs" {...p} />,
          th: (p) => <th className="border border-subtle bg-canvas px-2 py-1 font-bold" {...p} />,
          td: (p) => <td className="border border-subtle px-2 py-1" {...p} />,
        }}
      >
        {preprocessMarkdown(children)}
      </ReactMarkdown>
    </div>
  );
}
