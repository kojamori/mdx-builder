type AdmonitionType = "note" | "tip" | "warning" | "danger" | "info";

interface IMarkdownBuilder {
  frontmatter: Record<string, any>;
  setFrontMatter(key: string, value: any): IMarkdownBuilder;
  import(objectName: string, from: string): IMarkdownBuilder;
  addHeading(text: string, level: number, contents: string): IMarkdownBuilder;
  addText(text: string): IMarkdownBuilder;
  build(): string;
}

export type { IMarkdownBuilder, AdmonitionType };
