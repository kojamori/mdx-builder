# Changelog

## [4.0.6] - 2026-01-09

### Fixed

- Fixed type definition for `makeFrontMatter` utility function to accept `Record<string, any>` instead of `Record<string, string>` to accommodate various data types in frontmatter values.
- Fixed API.md documentation to include package scope in import statements for examples.

## [4.0.5] - 2026-01-09

### Documentation

- Added `API.md` with basic documentation for the `Builder` class and `utils` functions, including usage examples and method summaries.

### Internal Changes

Use yaml package to generate frontmatter in `makeFrontMatter` utility function.

## [4.0.3] - 2026-01-09

### Fixed

- Fixed import statement in README.md example code to correctly import from the `mdx-builder` package using the new barrel export pattern.

### Licenses

- Changed license to MIT License for better compatibility and permissiveness.

## [4.0.2] - 2026-01-09

### Documentation

- New example in README.md demonstrating more features.

## [4.0.1] - 2026-01-09

### Fixed

- Fixed README.md example code to correctly import from the `mdx-builder` package using the new barrel export pattern.

## [4.0.0] - 2026-01-09

### Added

- The majority of utility functions in `utils.ts` now support an optional `html` boolean parameter. When set to `true`, the functions will generate HTML output instead of Markdown.
- Builder class in `builder.ts` now includes a constructor that accepts an optional `frontmatter` object to initialize frontmatter data.
  - Default value is an empty object if not provided.

### Changed

- The following utility functions in `utils.ts` have been updated to include the new `html` parameter:
  - `makeTable`
  - `makeCodeBlock`
  - `makeHeading`
  - `makeList`
  - `makeLink`
  - `makeImage`
  - `makeHorizontalRule`

### Breaking Changes

- Removed the `addComponent` method from the Builder class in `builder.ts`. Users should now use the `makeComponent` utility function from `utils.ts` to add custom components, and then add the resulting string using the `addText` method.
- Updated the `addHeading` method in the Builder class to accept a third parameter for content, allowing users to add additional text or elements below the heading.
- The following utility functions have been renamed to better reflect their purpose:
  - `link` is now `makeLink`
  - `image` is now `makeImage`
  - `horizontalRule` is now `makeHorizontalRule`
  - `list` is now `makeList`
  - `component` is now `makeComponent`
- Now, the module uses a barrel export pattern in `index.ts` for cleaner imports.
  e.g.

```typescript
import { mdxBuilder, utils, types } from "mdx-builder";
```

instead of

```typescript
import MDXBuilder from "mdx-builder";
const { utils, mdxBuilder, types } = MDXBuilder;
```

### Documentation

- Updated the `import` method in the Builder class to clarify its purpose for importing external files or components.
  - Simply argument renamed from `componentName` to `objectName` for better clarity.

## [3.1.1] - 2026-01-08

### Documentation

- Fixed README.md example to correctly demonstrate the new `addHeading` method with content parameter.

TBD

## [3.1.0] - 2026-01-8

### Added

- Added `boldColon` utility function to format text in bold followed by a colon.
- Enhanced `addHeading` method in `builder.ts` to accept an optional content parameter for additional heading text.
- Updated `admonition` function to accept a more flexible type parameter for better type safety.

### Breaking Changes

- None
