export type JsonPrimitiveType = string | number | boolean | null;
export type JsonValueType =
  | JsonPrimitiveType
  | JsonObjectInterface
  | JsonArrayType;

export interface JsonObjectInterface {
  [key: string]: JsonValueType;
}

export type JsonArrayType = Array<JsonValueType>;
