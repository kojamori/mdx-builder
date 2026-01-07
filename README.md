# MDX Builder

A utility library for building MDX content programmatically.

## Features

- Create headings, code blocks, lists, blockquotes, and more.
- Generate custom components with props.
- Easy-to-use functions for common MDX structures.

## Installation

```bash
npm install mdx-builder
```

## Usage

```typescript
import MDXBuilder from "mdx-builder";

const { utils, mdxBuilder } = MDXBuilder;

const builder = new mdxBuilder();

builder
  .addHeading("My Document", 1)
  .addText(
    mdxUtils.makeCodeBlock(
      "console.log('Hello, world!');",
      "javascript",
      "hello.js"
    )
  );

const mdxContent = builder.build();

console.log(mdxContent);
```

Output:

````markdown
# My Document

```javascript title="hello.js"
console.log("Hello, world!");
```
````

## API

For now, please refer to the source code in `src/utils.ts` for available utility functions and their usage.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Changelog

Please see [CHANGELOG.md](CHANGELOG.md) for details.

## License

This project is licensed under the GPL-3.0 License. See the LICENSE file for details.
