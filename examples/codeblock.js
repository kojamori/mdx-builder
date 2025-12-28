import MDXBuilder from "../src/index.js";

const { utils, mdxBuilder } = MDXBuilder;

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

/* Expected Output:
# My Document
```javascript title="hello.js"
console.log('Hello, world!');
```
*/
