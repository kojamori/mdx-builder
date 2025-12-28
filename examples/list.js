import MDXBuilder from "../src/index.js";

const { utils, mdxBuilder } = MDXBuilder;

const builder = new mdxBuilder();

builder
  .addHeading("Shopping List", 1)
  .addText(
    utils.list(
      [
        "Fruits",
        ["Apple", "Banana", "Orange"],
        "Vegetables",
        ["Carrot", "Lettuce"],
      ],
      false
    )
  );
const mdxContent = builder.build();
console.log(mdxContent);
/* Expected Output:
# Shopping List
- Fruits
  - Apple
  - Banana
  - Orange
- Vegetables
  - Carrot
  - Lettuce
*/
