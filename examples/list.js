import mdxBuilder from "../src/index.js";
const mdxUtils = mdxBuilder.utils;

const builder = new mdxBuilder.builder();

builder
  .addHeading("Shopping List", 1)
  .addText(
    mdxUtils.list(
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
