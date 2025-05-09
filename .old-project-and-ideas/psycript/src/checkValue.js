const Methods = {
  /**
   *
   * @param {any} value Value to be checked if it matches a certain <Type>
   */
  $keys: [
    "function",
    "dict",
    "str",
    "number",
    "list",
    "null",
    "undefined",
    "none",
    "bool",
    "date",
    "regex",
  ],
  function(value) {
    return typeof value === "function";
  },
  dict(value) {
    return value && typeof value === "object" && value.constructor === Object;
  },
  str(value) {
    return typeof value === "string" || value instanceof String;
  },
  number(value) {
    return typeof value === "number" && Number.isFinite(value);
  },
  list(value) {
    return value && typeof value === "object" && value.constructor === Array;
  },
  null(value) {
    return value === null;
  },
  undefined(value) {
    return value === undefined;
  },
  none(value) {
    return value === undefined || value === null;
  },
  bool(value) {
    return typeof value === "boolean";
  },
  date(value) {
    return value instanceof Date;
  },
  regex(value) {
    return value && typeof value === "object" && value.constructor === RegExp;
  },
};

export default Methods;
