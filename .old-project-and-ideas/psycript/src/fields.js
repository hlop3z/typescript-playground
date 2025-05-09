const EasyRegex = (search) => new RegExp(`((?!([${search}])).)`, "g");

const Fields = {
  /**
   *
   * @param {string} text Transform a string to certain type of Field. Clean the text from unwanted content.
   */
  $keys: [
    "letters",
    "alphanum",
    "zipcode",
    "username",
    "phone",
    "slug",
    "tags",
    "hashtags",
    "attags",
    "int",
    "decimal",
    "email",
  ],
  letters: (text) => text.replace(EasyRegex("a-zA-Z"), ""),

  alphanum: (text) => text.replace(EasyRegex("a-zA-Z0-9"), ""),

  zipcode: (text) => text.toUpperCase().replace(EasyRegex("A-Z0-9-"), ""),

  username: (text) =>
    text
      .toLowerCase()
      .replace(/((?!([a-z0-9_])).)/g, "")
      .replace(/_{1,}/g, "_")
      .replace(/^\d+$/, ""),

  phone: (text) => text.replace(/((?!(^[+?]|[0-9])).)/g, ""),

  slug: (text) =>
    text
      .toLowerCase()
      .replace(/((?!([a-z0-9-])).)/g, "")
      .replace(/-{1,}/g, "-")
      .replace(/^-/, "")
      .replace(/^\d+$/, ""),

  tags: (text) => [
    ...new Set(
      text
        .toLowerCase()
        .replace(/((?!([a-z,])).)/g, "")
        .replace(/,{1,}/g, ",")
        .replace(/^\d+$/, "")
        .replace(/,$/, "")
        .split(",")
    ),
  ],

  hashtags: (text) =>
    [
      ...new Set(
        text
          .toLowerCase()
          .replace(/((?!([a-z#\s])).)/g, "")
          .replace(/#{1,}/g, "#")
          .replace(/^\d+$/, "")
          .split(" ")
      ),
    ]
      .filter((e) => e.startsWith("#"))
      .map((e) => e.replace("#", "")),

  attags: (text) =>
    [
      ...new Set(
        text
          .toLowerCase()
          .replace(/((?!([a-z0-9_@\s])).)/g, "")
          .replace(/_{1,}/g, "_")
          .replace(/@{1,}/g, "@")
          .replace(/^\d+$/, "")
          .split(" ")
      ),
    ]
      .filter((e) => e.startsWith("@"))
      .map((e) => e.replace("@", "")),

  int: (text) =>
    parseInt(String(text).replace(/((?!(^[-?]|[0-9])).)/g, ""), 10),

  decimal: (text) =>
    String(text)
      .replace(/((?!(^[-?]|[0-9.])).)/g, "")
      .replace(/\.{1,}/g, ".")
      .split(".")
      .slice(0, 2)
      .join("."),

  email: (text) =>
    text
      .toLowerCase()
      .replace(/\.{1,}/g, ".")
      .replace(/@{1,}/g, "@")
      .replace(/@\./g, "@")
      .replace(/\.@/g, ".")
      .replace(/-{1,}/g, "-")
      .replace(/_{1,}/g, "_")
      .replace(/-\./g, "-")
      .replace(/\.-/g, ".")
      .replace(/_\./g, "_")
      .replace(/\._/g, ".")
      .replace(/-@/g, "@")
      .replace(/@-/g, "@")
      .split("@")
      .slice(0, 2)
      .join("@"),
};

export default Fields;
