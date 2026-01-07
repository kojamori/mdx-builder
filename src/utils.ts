import * as types from "./types.js";

const makeFrontMatter = (values: Record<string, string>) => {
  let frontMatter = "---\n";
  for (const [key, value] of Object.entries(values)) {
    frontMatter += `${key}: ${value}\n`;
  }
  frontMatter += "---\n";
  return frontMatter;
};

const makeTable = (headers: string[], rows: string[][]) => {
  if (headers.length === 0 || rows.length === 0) {
    return "";
  }

  // Helper to escape the pipe character so it doesn't break Markdown syntax
  const escapePipe = (str: string) => str.replaceAll("|", "&#124;");

  if (rows.some((row) => row.length !== headers.length)) {
    throw new Error(
      "All table rows must have the same number of columns as headers."
    );
  }

  // Process headers
  const safeHeaders = headers.map(escapePipe);
  let table = "| " + safeHeaders.join(" | ") + " |\n";

  // Create alignment row
  table += "| " + safeHeaders.map(() => "---").join(" | ") + " |\n";

  // Process rows
  for (const row of rows) {
    const safeRow = row.map(escapePipe);
    table += "| " + safeRow.join(" | ") + " |\n";
  }

  return table;
};

const makeInlineCode = (text: string) => {
  return `\`${text}\``;
};

const makeCodeBlock = (code: string, language: string = "", title?: string) => {
  return title
    ? `\`\`\`${language} title="${title}"\n${code}\n\`\`\`\n`
    : `\`\`\`${language}\n${code}\n\`\`\`\n`;
};

const makeHeading = (text: string, level: number, content: string = "") => {
  return `${"#".repeat(level)} ${text}` + (content ? `\n\n${content}\n` : "");
};

const newline = () => {
  return "\n";
};

const bold = (text: string) => {
  return `**${text}**`;
};

const boldColon = (text: string, content: string = "") => {
  return `**${text}:**` + (content ? ` ${content}` : "");
};

const italics = (text: string) => {
  return `*${text}*`;
};

const underline = (text: string) => {
  return `<u>${text}</u>`;
};

const strikethrough = (text: string) => {
  return `~~${text}~~`;
};

const link = (text: string, url: string) => {
  return `[${text}](${url})`;
};

const image = (altText: string, url: string) => {
  return `![${altText}](${url})`;
};

const admonition = (
  type: string & types.AdmonitionType,
  title: string = "",
  content: string
) => {
  if (title) {
    return `::: ${type}[${title}]\n${content}\n:::\n`;
  } else {
    return `::: ${type}\n${content}\n:::`;
  }
};

const horizontalRule = () => {
  return `---`;
};

const component = (
  name: string,
  props: Record<string, any> = {},
  inline: boolean = false,
  selfClosing: boolean = true,
  contents: string = ""
) => {
  const propsString = Object.entries(props)
    .map(([key, value]) => {
      if (typeof value === "string") {
        return `${key}="${value}"`;
      } else if (typeof value === "boolean") {
        return value ? key : "";
      } else if (typeof value === "object") {
        return `${key}={${JSON.stringify(value)}}`;
      } else {
        return `${key}={${value}}`;
      }
    })

    .filter((prop) => prop !== "")
    .join(" ");
  if (selfClosing) {
    return `<${name} ${propsString} />`;
  } else {
    return inline
      ? `<${name} ${propsString}>${contents}</${name}>`
      : `<${name} ${propsString}>\n${contents}\n</${name}>`;
  }
};

const list = (items: any[], ordered: boolean = false) => {
  let listString = "";

  // can be nested lists, so we need a recursive function
  const buildList = (items: any[], depth: number) => {
    items.forEach((item, index) => {
      const indent = "  ".repeat(depth);
      if (Array.isArray(item)) {
        buildList(item, depth + 1);
      } else {
        const prefix = ordered ? `${index + 1}. ` : "- ";
        listString += `${indent}${prefix}${item}\n`;
      }
    });
  };
  buildList(items, 0);
  return listString;
};

export default {
  makeFrontMatter,
  makeTable,
  makeInlineCode,
  makeCodeBlock,
  makeHeading,
  newline,
  bold,
  boldColon,
  italics,
  underline,
  strikethrough,
  link,
  image,
  admonition,
  horizontalRule,
  component,
  list,
};
