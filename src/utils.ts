import * as types from "./types.js";
import yaml from "yaml";

const makeFrontMatter = (values: Record<string, any>) => {
  return `---\n${yaml.stringify(values)}---\n\n`;
};

const makeTableHTML = (headers: string[], rows: string[][]) => {
  if (headers.length === 0 || rows.length === 0) {
    return "";
  }

  let table = "<table>\n<thead>\n<tr>\n";
  headers.forEach((header) => {
    table += `  <th>${header}</th>\n`;
  });
  table += "</tr>\n</thead>\n<tbody>\n";
  rows.forEach((row) => {
    table += "<tr>\n";
    row.forEach((cell) => {
      table += `  <td>${cell}</td>\n`;
    });
    table += "</tr>\n";
  });
  table += "</tbody>\n</table>\n";
  return table;
};

const makeTable = (
  headers: string[],
  rows: string[][],
  html: boolean = false
) => {
  if (headers.length === 0 || rows.length === 0) {
    return "";
  }

  if (html) {
    return makeTableHTML(headers, rows);
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

const makeInlineCode = (text: string, html: boolean = false) => {
  return html ? `<code>${text}</code>` : `\`${text}\``;
};

const makeCodeBlock = (
  code: string,
  language: string = "",
  title?: string,
  html: boolean = false
) => {
  return html
    ? `<pre><code class="language-${language}" title="${title}">${code}</code></pre>`
    : `\`\`\`${language} title="${title}"\n${code}\n\`\`\`\n`;
};

const makeHeading = (
  text: string,
  level: number,
  content: string = "",
  html: boolean = false
) => {
  return html
    ? `<h${level}>${text}</h${level}>` + (content ? `\n\n${content}\n` : "")
    : `${"#".repeat(level)} ${text}` + (content ? `\n\n${content}\n` : "");
};

const makeComponent = (
  name: string,
  props: Record<string, any> = {},
  inline: boolean = false, // if true, no newlines around contents
  selfClosing: boolean = true, // if true, no contents, and uses self-closing tag
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

const makeListHTML = (items: any[], ordered: boolean = false) => {
  let listString = ordered ? "<ol>\n" : "<ul>\n";
  items.forEach((item) => {
    listString += `  <li>${item}</li>\n`;
  });
  listString += ordered ? "</ol>\n" : "</ul>\n";
  return listString;
};

const makeList = (
  items: any[],
  ordered: boolean = false,
  html: boolean = false
) => {
  if (html) {
    return makeListHTML(items, ordered);
  }

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

const makeLink = (text: string, url: string, html: boolean = false) => {
  return html ? `<a href="${url}">${text}</a>` : `[${text}](${url})`;
};

const makeImage = (altText: string, url: string, html: boolean = false) => {
  return html
    ? `<img src="${url}" alt="${altText}" />`
    : `![${altText}](${url})`;
};

const makeHorizontalRule = (html: boolean = false) => {
  return html ? `<hr/>` : `---`;
};

const newline = (html: boolean = false) => {
  return html ? `<br/>` : `\n`;
};

const bold = (text: string, html: boolean = false) => {
  return html ? `<strong>${text}</strong>` : `**${text}**`;
};

const boldColon = (
  text: string,
  content: string = "",
  html: boolean = false
) => {
  return html
    ? `<strong>${text}:</strong>` + (content ? ` ${content}` : "")
    : `**${text}:**` + (content ? ` ${content}` : "");
};

const italics = (text: string, html: boolean = false) => {
  return html ? `<i>${text}</i>` : `*${text}*`;
};

const underline = (text: string, html: boolean = false) => {
  return html ? `<u>${text}</u>` : `_${text}_`;
};

const strikethrough = (text: string, html: boolean = false) => {
  return html ? `<del>${text}</del>` : `~~${text}~~`;
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
  makeLink,
  makeImage,
  admonition,
  makeHorizontalRule,
  makeComponent,
  makeList,
};
