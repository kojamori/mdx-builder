import mdxBuilder from "../src/index.js";

const mdxUtils = mdxBuilder.utils;

const main = () => {
  const mdx = new mdxBuilder.builder();
  mdx
    .setFrontMatter("title", "My MDX Document")
    .addHeading("Introduction", 1)
    .addText("This is an example of generating MDX content programmatically.");
  mdx
    .addComponent(
      "MyComponent",
      {
        prop1: "value1",
        prop2: true,
        data: { key: "value" },
      },
      false,
      false,
      "This is child content."
    )
    .addText(mdxUtils.admonition("note", "This is an important note.", "Note"));

  console.log(mdx.build());
};

main();
