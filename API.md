# API Reference

## Builder Class

The `Builder` class provides a fluent interface for programmatically constructing MDX documents.

### Usage Example

```typescript
import { mdxBuilder } from "@kojamori/mdx-builder";
const builder = new mdxBuilder();
builder.addHeading("Title", 1).addText("Some text");
const mdx = builder.build();
```

### Main Methods

- `addHeading(text: string, level: number, content?: string)`: Add a heading to the document.
- `addText(text: string)`: Add a text block.
- `setFrontMatter(key: string, value: string)`: Set a frontmatter field.
- `import(objectName: string, from: string)`: Add an import statement.
- `build()`: Generate the final MDX string.

### Constructor

- `constructor(frontmatter?: Record<string, any>)`: Create a new Builder instance. Optionally accepts an initial frontmatter object.

---

## Utils

The `utils` export provides helper functions for generating common MDX/Markdown/HTML elements.

### Main Utilities

- `makeFrontMatter(values: Record<string, any>)`: Generate YAML frontmatter.
- `makeTable(headers: string[], rows: string[][], html?: boolean)`: Create a Markdown or HTML table.
- `makeInlineCode(text: string, html?: boolean)`: Inline code formatting.
- `makeCodeBlock(code: string, language?: string, title?: string, html?: boolean)`: Code block formatting.
- `makeHeading(text: string, level: number, content?: string, html?: boolean)`: Heading formatting.
- `bold`, `italics`, `underline`, `strikethrough`: Text formatting helpers.
- `makeLink`, `makeImage`: Link and image helpers.
- `admonition(type, title, content)`: Admonition block.
- `makeComponent`, `makeList`, `makeHorizontalRule`, `newline`: Other MDX/Markdown helpers.

See the source code in `src/utils.ts` for full details and options.
