import MDXBuilder from "../src/index.js";

const { utils, mdxBuilder } = MDXBuilder;

const main = () => {
  const mdx = new mdxBuilder();
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
    .addText(utils.admonition("note", "This is an important note.", "Note"));

  console.log(mdx.build());
};

main();
