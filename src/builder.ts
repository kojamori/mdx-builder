import * as types from "./types.js";
import utils from "./utils.js";

const { makeHeading, makeFrontMatter, component } = utils;

class Builder implements types.IMarkdownBuilder {
  private elements: string[] = [];
  public imports: Set<string> = new Set();

  public frontmatter: Record<string, string> = {};

  // Import external components
  import(componentName: string, from: string) {
    this.imports.add(`import ${componentName} from '${from}';`);
    return this;
  }

  addHeading(text: string, level: number) {
    if (text == "") return this; // skip empty headings

    this.elements.push(makeHeading(text, level));
    return this;
  }

  addText(text: string) {
    if (text == "") return this; // skip empty text

    this.elements.push(text + "\n");
    return this;
  }

  setFrontMatter(key: string, value: string) {
    this.frontmatter[key] = value;
    return this;
  }

  // New: Add an MDX Component
  addComponent(
    name: string,
    props: Record<string, any> = {},
    inline: boolean = false,
    selfClosing: boolean = true,
    contents: string = ""
  ) {
    this.elements.push(
      component(name, props, inline, selfClosing, contents) + "\n"
    );
    return this;
  }

  build() {
    let doc = "";

    // 1. Add Frontmatter if it has keys
    if (Object.keys(this.frontmatter).length > 0) {
      doc += makeFrontMatter(this.frontmatter);
    }

    // 2. Add Imports
    if (this.imports.size > 0) {
      doc += Array.from(this.imports).join("\n") + "\n\n";
    }

    // 3. Add Content
    doc += this.elements.join("\n");

    return doc.trim() + "\n";
  }
}

export default Builder;
