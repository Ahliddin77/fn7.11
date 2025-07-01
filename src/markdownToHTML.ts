const markdownToHTML = (markdown: string): string => {
  const lines = markdown.split("\n");

  const htmlLines = lines.map((line) => {
    const trimmed = line.trim();

    if (/^###\s+/.test(trimmed)) {
      return `<h3>${trimmed.replace(/^###\s+/, "")}</h3>`;
    } else if (/^##\s+/.test(trimmed)) {
      return `<h2>${trimmed.replace(/^##\s+/, "")}</h2>`;
    } else if (/^#\s+/.test(trimmed)) {
      return `<h1>${trimmed.replace(/^#\s+/, "")}</h1>`;
    } else if (/^> /.test(trimmed)) {
      return `<blockquote>${trimmed.replace(/^> /, "")}</blockquote>`;
    } else if (/^\d+\.\s+/.test(trimmed)) {
      return `<ol><li>${trimmed.replace(/^\d+\.\s+/, "")}</li></ol>`;
    } else if (/^- /.test(trimmed)) {
      return `<ul><li>${trimmed.replace(/^- /, "")}</li></ul>`;
    } else if (/^---+$/.test(trimmed)) {
      return `<hr>`;
    } else if (trimmed === "") {
      return "";
    } else {
      let inline = trimmed
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") // bold
        .replace(/\*(.+?)\*/g, "<em>$1</em>") // italic
        .replace(/`(.+?)`/g, "<code>$1</code>") // inline code
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>'); // link

      return `<p>${inline}</p>`;
    }
  });

  return mergeLists(htmlLines).join("\n");
};

function mergeLists(lines: string[]): string[] {
  const result: string[] = [];
  let inOl = false;
  let inUl = false;

  for (let line of lines) {
    if (line.startsWith("<ol><li>")) {
      if (!inOl) {
        result.push("<ol>");
        inOl = true;
      }
      result.push(line.replace("<ol>", ""));
    } else if (line.startsWith("<ul><li>")) {
      if (!inUl) {
        result.push("<ul>");
        inUl = true;
      }
      result.push(line.replace("<ul>", ""));
    } else {
      if (inOl) {
        result.push("</ol>");
        inOl = false;
      }
      if (inUl) {
        result.push("</ul>");
        inUl = false;
      }
      result.push(line);
    }
  }

  if (inOl) result.push("</ol>");
  if (inUl) result.push("</ul>");

  return result;
}

// Example usage:
console.log(
  markdownToHTML(`
# Heading 1
## Heading 2
### Heading 3

**Bold** and *italic* and \`code\`

> This is a quote

1. First item
2. Second item

- Item A
- Item B

---

[Link text](https://example.com)
`)
);
