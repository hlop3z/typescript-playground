import colors from "@static/js/colors.js";

class StyleCSS {
  constructor() {
    this.$items = {};
  }
  static init() {
    return new StyleCSS();
  }
  add(key, value) {
    if (key && value) {
      const val = value.replace(";", "");
      this.$items[key] = `${key}: ${val};`;
    }
  }
  get css() {
    return Object.values(this.$items).join(" ");
  }
}

class ClassCSS {
  constructor() {
    this.$items = [];
  }
  static init() {
    return new ClassCSS();
  }
  add(value) {
    this.$items.push(value);
  }
  get css() {
    return this.$items.join(" ");
  }
}

function cssStyle(setup = null) {
  /* Create Style 
		@param {
			height		: string,
			width		: string,
			color		: string,
			text-color	: string,
			border-color: string,
			border-size	: string,
			border-style: string,
			text-case	: string (options: title, upper, lower),
		}
	*/
  const style = StyleCSS.init();
  if (setup) {
    if (setup["height"]) {
      style.add("height", setup["height"]);
    }
    if (setup["width"]) {
      style.add("width", setup["width"]);
    }
    if (setup.color) {
      const color = colors[setup["color"]];
      style.add("background-color", color ? color : setup["color"]);
    }
    if (setup["text-color"]) {
      const color = colors[setup["text-color"]];
      style.add("color", color ? color : setup["text-color"]);
    }
    if (setup["border-color"]) {
      const color = colors[setup["border-color"]];
      style.add("border-color", color ? color : setup["border-color"]);
      if (setup["border-size"]) {
        style.add("border-width", setup["border-size"]);
      }
      if (setup["border-style"]) {
        style.add("border-style", setup["border-style"]);
      }
    }
    if (setup["text-case"]) {
      let activeCase = null;
      switch (setup["text-case"].toLowerCase()) {
        case "title":
          activeCase = "capitalize";
          break;
        case "upper":
          activeCase = "uppercase";
          break;
        case "lower":
          activeCase = "lowercase";
          break;
        default:
          activeCase = false;
      }
      style.add("text-transform", activeCase);
    }
  }
  return style;
}

const SIZES = ["xs", "sm", "md", "lg", "xl"];

function ComponentSize(setup) {
  let $size = setup.size || "md";
  if (SIZES.includes($size)) {
  } else {
    $size = "md";
  }
  return $size;
}

/* Manager */
export default {
  style: cssStyle,
  class: ClassCSS.init,
  size: {
    sizes: SIZES,
    get(val) {
      return ComponentSize(val);
    },
  },
};
