type AdmonitionType = "note" | "tip" | "warning" | "danger" | "info";

interface IMarkdownBuilder {
  frontmatter: Record<string, any>;
  setFrontMatter(key: string, value: any): IMarkdownBuilder;
  import(componentName: string, from: string): IMarkdownBuilder;
  addHeading(text: string, level: number): IMarkdownBuilder;
  addText(text: string): IMarkdownBuilder;
  addComponent(
    name: string,
    props?: Record<string, any>,
    inline?: boolean,
    selfClosing?: boolean,
    contents?: string
  ): IMarkdownBuilder;
  build(): string;
}

export type { IMarkdownBuilder, AdmonitionType };
