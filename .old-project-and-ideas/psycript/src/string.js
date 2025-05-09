const stringTo = {
  lower: (text) => text.toLowerCase(),

  upper: (text) => text.toUpperCase(),

  title: (text) =>
    text.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    ),

  pascal: (text) =>
    text
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (+match === 0) return "";
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      })
      .replace(/[^\w-]+/g, "")
      .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1)),

  camel: (text) =>
    text
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      })
      .replace(/[^\w-]+/g, ""),

  slug: (text) =>
    text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/g, ""),

  snake: (text) =>
    text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^\w-]+/g, "")
      .replace(/__+/g, "_"),

  cut: (text, size) => text.substring(0, size),
};

class TextBase {
  constructor(value) {
    this.$value = value;
    this.$keys = [
      "lower",
      "upper",
      "title",
      "pascal",
      "camel",
      "slug",
      "snake",
      "cut(size)",
    ];
  }

  transform(transformer, ...args) {
    return stringTo[transformer](this.$value, ...args);
  }

  cut(size) {
    return this.transform("cut", size);
  }

  get value() {
    return this.$value;
  }

  set value(newValue) {
    this.$value = newValue;
  }

  get lower() {
    return this.transform("lower");
  }

  get upper() {
    return this.transform("upper");
  }

  get title() {
    return this.transform("title");
  }

  get pascal() {
    return this.transform("pascal");
  }

  get camel() {
    return this.transform("camel");
  }

  get slug() {
    return this.transform("slug");
  }

  get snake() {
    return this.transform("snake");
  }
}

export default function Text(val) {
  return new TextBase(val);
}
