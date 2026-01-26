// YAML frontmatter and component properties shared types
export type YAMLValue =
  | string
  | number
  | boolean
  | null
  | YAMLArray
  | YAMLDictionary;
export interface YAMLArray extends Array<YAMLValue> {}

export interface YAMLDictionary {
  [key: string]: YAMLValue;
}

export interface Frontmatter extends YAMLDictionary {}

// HTML attributes are always string key-value pairs
export type HTMLAttributes = Record<string, string>;

// Anything that can be serialized to JSON losslessly
export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray;

export interface JSONObject {
  [key: string]: JSONValue;
}
export interface JSONArray extends Array<JSONValue> {}

// A JSON file can be either an object or an array at the root
export type JSONFile = JSONObject | JSONArray;
