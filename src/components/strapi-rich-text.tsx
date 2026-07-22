import type { ReactNode } from "react";

type Props = {
  content: string;
  className?: string;
};

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

function stripWrappingTag(token: string, tagName: string) {
  return token.replace(new RegExp(`^<${tagName}>|</${tagName}>$`, "g"), "");
}

function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern =
    /(<u>.*?<\/u>|<ins>.*?<\/ins>|<strong>.*?<\/strong>|<b>.*?<\/b>|<em>.*?<\/em>|<i>.*?<\/i>|\*\*[^*]+\*\*|~~[^~]+~~|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  match = pattern.exec(text);

  while (match) {
    const [token] = match;
    const index = match.index;

    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index));
    }

    if (token.startsWith("<u>") && token.endsWith("</u>")) {
      nodes.push(<u key={`${index}-underline-html`}>{stripWrappingTag(token, "u")}</u>);
    } else if (token.startsWith("<ins>") && token.endsWith("</ins>")) {
      nodes.push(<u key={`${index}-ins-html`}>{stripWrappingTag(token, "ins")}</u>);
    } else if (token.startsWith("<strong>") && token.endsWith("</strong>")) {
      nodes.push(
        <strong key={`${index}-strong-html`}>{stripWrappingTag(token, "strong")}</strong>,
      );
    } else if (token.startsWith("<b>") && token.endsWith("</b>")) {
      nodes.push(<strong key={`${index}-b-html`}>{stripWrappingTag(token, "b")}</strong>);
    } else if (token.startsWith("<em>") && token.endsWith("</em>")) {
      nodes.push(<em key={`${index}-em-html`}>{stripWrappingTag(token, "em")}</em>);
    } else if (token.startsWith("<i>") && token.endsWith("</i>")) {
      nodes.push(<em key={`${index}-i-html`}>{stripWrappingTag(token, "i")}</em>);
    } else if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(<strong key={`${index}-strong`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("~~") && token.endsWith("~~")) {
      nodes.push(<s key={`${index}-strike`}>{token.slice(2, -2)}</s>);
    } else if (token.startsWith("*") && token.endsWith("*")) {
      nodes.push(<em key={`${index}-em`}>{token.slice(1, -1)}</em>);
    } else if (token.startsWith("`") && token.endsWith("`")) {
      nodes.push(
        <code
          key={`${index}-code`}
          className="rounded bg-black/5 px-1 py-0.5 text-[0.95em]"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("[") && token.includes("](") && token.endsWith(")")) {
      const closingBracketIndex = token.indexOf("](");
      const label = token.slice(1, closingBracketIndex);
      const href = token.slice(closingBracketIndex + 2, -1);

      nodes.push(
        <a
          key={`${index}-link`}
          className="font-medium underline underline-offset-4"
          href={href}
          rel="noreferrer"
          target={href.startsWith("http") ? "_blank" : undefined}
        >
          {label}
        </a>,
      );
    } else {
      nodes.push(token);
    }

    lastIndex = index + token.length;
    match = pattern.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderLines(lines: string[]) {
  return lines.flatMap((line, index) => {
    const content = renderInlineMarkdown(line);

    if (index === lines.length - 1) {
      return content;
    }

    return [...content, <br key={`${index}-break`} />];
  });
}

export function StrapiRichText({ content, className }: Props) {
  const blocks = content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className={joinClassNames("space-y-4", className)}>
      {blocks.map((block, index) => {
        const lines = block.split("\n");
        const fenceMatch = block.match(/^```([\w-]*)\n([\s\S]+)\n```$/);
        const headingMatch = block.match(/^(#{1,6})\s+(.+)$/);
        const blockquote = lines.every((line) => /^>\s?/.test(line));
        const unorderedList = lines.every((line) => /^[-*]\s+/.test(line));
        const orderedList = lines.every((line) => /^\d+\.\s+/.test(line));

        if (fenceMatch) {
          const [, language, code] = fenceMatch;

          return (
            <pre
              key={`${index}-${language}-${code.slice(0, 16)}`}
              className="overflow-x-auto rounded-2xl bg-black/90 p-4 text-sm text-white"
            >
              <code className={language ? `language-${language}` : undefined}>{code}</code>
            </pre>
          );
        }

        if (headingMatch) {
          const [, hashes, value] = headingMatch;
          const level = hashes.length;
          const headingClassName =
            level === 1
              ? "font-display text-3xl font-bold"
              : level === 2
                ? "font-display text-2xl font-bold"
                : level === 3
                  ? "font-display text-xl font-semibold"
                  : "font-semibold";
          if (level === 1) {
            return (
              <h1 key={`${index}-${value.slice(0, 24)}`} className={headingClassName}>
                {renderInlineMarkdown(value)}
              </h1>
            );
          }

          if (level === 2) {
            return (
              <h2 key={`${index}-${value.slice(0, 24)}`} className={headingClassName}>
                {renderInlineMarkdown(value)}
              </h2>
            );
          }

          if (level === 3) {
            return (
              <h3 key={`${index}-${value.slice(0, 24)}`} className={headingClassName}>
                {renderInlineMarkdown(value)}
              </h3>
            );
          }

          if (level === 4) {
            return (
              <h4 key={`${index}-${value.slice(0, 24)}`} className={headingClassName}>
                {renderInlineMarkdown(value)}
              </h4>
            );
          }

          if (level === 5) {
            return (
              <h5 key={`${index}-${value.slice(0, 24)}`} className={headingClassName}>
                {renderInlineMarkdown(value)}
              </h5>
            );
          }

          return (
            <h6 key={`${index}-${value.slice(0, 24)}`} className={headingClassName}>
              {renderInlineMarkdown(value)}
            </h6>
          );
        }

        if (blockquote) {
          return (
            <blockquote
              key={`${index}-${block.slice(0, 24)}`}
              className="border-l-4 border-[var(--color-primary)] pl-4 italic text-[var(--color-foreground)]/80"
            >
              {renderLines(lines.map((line) => line.replace(/^>\s?/, "")))}
            </blockquote>
          );
        }

        if (unorderedList) {
          return (
            <ul key={`${index}-${block.slice(0, 24)}`} className="list-disc space-y-2 pl-5">
              {lines.map((line, lineIndex) => (
                <li key={`${index}-${lineIndex}`}>
                  {renderInlineMarkdown(line.replace(/^[-*]\s+/, ""))}
                </li>
              ))}
            </ul>
          );
        }

        if (orderedList) {
          return (
            <ol key={`${index}-${block.slice(0, 24)}`} className="list-decimal space-y-2 pl-5">
              {lines.map((line, lineIndex) => (
                <li key={`${index}-${lineIndex}`}>
                  {renderInlineMarkdown(line.replace(/^\d+\.\s+/, ""))}
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p key={`${index}-${block.slice(0, 24)}`}>
            {renderLines(lines)}
          </p>
        );
      })}
    </div>
  );
}
