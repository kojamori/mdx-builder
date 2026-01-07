import MDXBuilder from "../src/index.js";

const { utils, mdxBuilder } = MDXBuilder;

const builder = new mdxBuilder();

builder.addHeading(
  "My Document",
  1,
  utils.makeCodeBlock("console.log('Hello, world!');", "javascript", "hello.js")
);

const mdxContent = builder.build();

console.log(mdxContent);
