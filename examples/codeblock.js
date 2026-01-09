import { utils, mdxBuilder } from "../dist/index.js";

const builder = new mdxBuilder();

builder.addHeading(
  "My Document",
  1,
  utils.makeCodeBlock("console.log('Hello, world!');", "javascript", "hello.js")
);

const mdxContent = builder.build();

console.log(mdxContent);
