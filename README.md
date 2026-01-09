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
import { mdxBuilder, utils } from "@kojamori/mdx-builder";

const builder = new mdxBuilder();

builder
  .addHeading("My Dynamic Document", 1)
  .addText("This document was generated programmatically.")
  .addText(
    utils.makeCodeBlock("console.log('Hello, MDX!');", "javascript", "hello.js")
  );

const mdxContent = builder.build();
console.log(mdxContent);
```

## API

For detailed API documentation, please refer to the [API Documentation](API.md).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Changelog

Please see [CHANGELOG.md](CHANGELOG.md) for details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
