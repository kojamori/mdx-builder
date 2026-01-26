import type { Frontmatter, JSONFile, JSONValue } from "../shared_types.js";

interface InjectedVariable {
  name: string;
  value: JSONValue;
}

interface VariableReference {
  type: "variable";
  path: string;
}

/*
Variables are injected values that can be referenced within the AST.
They can be useful for templating and dynamic content generation.

Variable features:
- Any JSON-serializable value can be injected
- They can be referenced anywhere within the AST using a variable reference
- Variable references use dot notation for nested properties (e.g., "user.name.first")
- Bracket notation is also supported for array indices (e.g., "items[0].name")
- Bracket notation can be used for keys with special characters (e.g., "data['some-key']")

A utility function is provided:
- varRef(path: string): VariableReference
*/

interface ExpressionNode {
  type: "expression";
  value: string | VariableReference; // e.g., "status === 'active' ? 'blue' : 'red'"
}

interface HTMLElement {
  type: "element";
  tagName: string;
  attributes?: Record<string, string | ExpressionNode | VariableReference>;
  children?: Child[];
}

export interface JSXLiteralAttribute {
  type: "literal";
  value: JSONValue | VariableReference;
}

export interface JSXExpressionAttribute {
  type: "expression";
  value: string | VariableReference;
}

export type JSXAttribute = JSXLiteralAttribute | JSXExpressionAttribute;

export type JSXAttributes = Record<string, JSXAttribute>;

interface JSXComponent {
  type: "component";
  tagName: string;
  attributes?: JSXAttributes;
  children?: Child[];
}

type Child =
  | HTMLElement
  | JSXComponent
  | ExpressionNode
  | VariableReference
  | string;

interface ImportBase {
  type: string;
  source: string;
  typeOnly?: boolean;
}

// e.g. import Foo from 'foo';
interface DefaultImport extends ImportBase {
  type: "default";
  specifier: string;
}

// e.g. import { Bar, Baz as BazAlias } from 'barbaz';
interface NamedImport extends ImportBase {
  type: "named";
  defaultSpecifier?: string; // for mixed imports
  specifiers: Array<string | { name: string; alias: string }>;
}

// e.g. import * as Utils from 'utils';
interface NamespaceImport extends ImportBase {
  type: "namespace";
  specifier: string;
}

// e.g. import 'some-module';
interface SideEffectImport extends ImportBase {
  type: "side-effect";
}

export type Import =
  | DefaultImport
  | NamedImport
  | NamespaceImport
  | SideEffectImport;

interface ExportBase {
  type: "named" | "default" | "re-export";
  name: string;
  value: string;
}

interface ValueExport extends ExportBase {
  type: "named" | "default";
  // The 'value' is the code snippet (e.g., "'Gemini'", "() => 123", or "{ a: 1 }")
  value: string;
  declarationType?: "const" | "let" | "var" | "function" | "class";
}
interface ReExport extends ExportBase {
  type: "re-export";
  source: string;
  alias?: string; // optional alias for re-exported name
}

export type Export = ValueExport | ReExport;

interface DocumentAST {
  metadata: JSONFile;
  frontmatter: Frontmatter;
  exports: Export[];
  imports: Import[];
  root: Child[];
}

type PrenormalizedChild = Child | Child[];

// This is to be used before normalization when the root can have nested arrays
// The main consumer of this type is the composed string utility
// additionally it can be useful for sectioning content into groups as arrays,
// instead of a flat list of nodes.
interface PrenormalizedDocumentAST extends Omit<DocumentAST, "root"> {
  root: PrenormalizedChild[];
}

type ComposedString = (
  template: TemplateStringsArray,
  ...values: Child[]
) => PrenormalizedChild[];

/*

composed`Hello, ${varRef("user.name.first")}! Today is ${varRef("date")}.`
->
[
  "Hello, ",
  { type: "variable", path: "user.name.first" },
  "! Today is ",
  { type: "variable", path: "date" },
  "."
]

injected variables:
multipleComponents = [
  { type: "component", tagName: "Foo", attributes: { id: { type: "literal", value: 1 } }, children: [] },
  { type: "component", tagName: "Bar", attributes: { id: { type: "literal", value: 2 } }, children: [] },
]

root = [
  varRef("multipleComponents"),
]
-> (when normalized)
[
  { type: "variable", path: "multipleComponents" }
]
-> (right before rendering, variable references are resolved)
[
  { type: "component", tagName: "Foo", attributes: { id: { type: "literal", value: 1 } }, children: [] },
  { type: "component", tagName: "Bar", attributes: { id: { type: "literal", value: 2 } }, children: [] },
]
-> (after rendering)
<Foo id={1} /><Bar id={2} />

*/
