# Scope of kojamori/mdx-builder

The `kojamori/mdx-builder` library is designed to facilitate the programmatic generation of MDX (Markdown + JSX) documents. Its scope includes the following key features:

- **MDX Document Construction**: Provides a fluent API to build MDX documents by adding headings, text, code blocks, tables, lists (ordered and unordered, with mixing), and links.
- **Utility Methods**: Offers a variety of utility methods for common Markdown/MDX constructs, such as text formatting (bold, italics, strikethrough), code blocks, tables, lists, and links.
- **Component Integration**: Supports the inclusion of custom MDX components within the generated documents.
- **YAML Frontmatter Support**: Allows the addition of YAML frontmatter to MDX documents for metadata specification.
- **TypeScript Support**: Written in TypeScript, providing strong typing for better developer experience and code reliability.
- **JSX Compatibility**: Enables the use of JSX syntax within MDX documents, allowing for rich content creation, such as:
  - Embedding React components
  - MDX Expressions
  - Imports, exports

# Out of Scope

The library does not cover the following areas:

- **MDX Parsing**: It does not parse existing MDX documents or convert MDX to other formats.
- **Rendering**: It does not handle the rendering of MDX documents to HTML or other formats.
- **Styling**: It does not provide styling or theming capabilities for the generated MDX content.
- **Advanced MDX Features**: It does not support advanced MDX features such as dynamic imports, context providers, or complex component interactions beyond basic inclusion.
- **File I/O**: It does not handle file input/output operations; users are responsible for saving the generated MDX content to files if needed.

# Example Usage

This is how the library should be used:

```typescript
import {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  text,
  component,
  MDXBuilder,
  varRef,
  composed as $,
} from "kojamori/mdx-builder";

const builder = new MDXBuilder();

builder.imports = [
  namedImport("SomeConfig", "./config"),
  namedImport(varRef("dynamicImportName"), varRef("dynamicComponentPath")),
];
builder.exports = [constExport("someValue", 42)];
builder.frontmatter = {
  title: "Sample MDX Document",
  date: "2024-06-01",
  tags: ["mdx", "builder", "example"],
};

builder.root = [
  h1("Main Title"),
  h2("Subtitle"),
  h3("Section Title"),
  h4("Subsection Title"),
  h5("Fifth Level Title"),
  h6("Sixth Level Title"),
  "This is a sample text.",
  component("MyComponent", { prop1: "value1", prop2: 42 }),
  $`
  This is a composed text with a ${component("InlineComponent", { inlineProp: true })} component.
  It also has an expression: ${expression("2 + 2 = 4")}.
  `,
  expression(`(() => {
    const socialLinks = SomeConfig.socials.map((social) => (
      <a href={social.url} key={social.name}>
        {social.name}
      </a>
    ));

    return <div>{socialLinks}</div>;
  })()`),

  $`Now, we can also inject variables like ${varRef("dynamicValue")} into composed text.`,
  "The difference here is that variables are values that represent any node. So, dynamicValue could be a text node, a component, or even a whole section of content.",
  "Variables are relevant to the renderer, which replaces them with their corresponding values during the rendering process.",

  varRef("dynamicValue"),
];

builder.injectedVariables = {
  dynamicValue: component("DynamicComponent", { data: "Some dynamic data" }),
  dynamicImportName: "DynamicComponent",
  dynamicComponentPath: "./DynamicComponent",
};

const mdxContent = builder.build();
```

```ts
type InjectedVariables = Record<string, JSONValue>;

type VariableReference = {
  type: "variable";
  path: string;
};
```

For tables, lists and unordered lists, if they have components within them they are converted into HTML by the renderer.
For lists and unordered lists, if they have a table within them it is converted into HTML by the renderer.

HTML elements and components are distinguished by the renderer.

Note that if an injected variable is a valid AST node, it is treated as such by the renderer.
Otherwise, it is treated as a JSON value. JSON values as children are stringified by the renderer, as appropriate.
