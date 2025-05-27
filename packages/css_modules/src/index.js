import postcss from "postcss";
import localByDefault from "postcss-modules-local-by-default";
import scope from "postcss-modules-scope";

function cssModules(idSize, prefix) {
  const SIZE_ID = idSize || 20;
  const PREFIX = (prefix || "_").toLowerCase();

  function generateScopedName(name, filename = "", css = "") {
    const hash = btoa(name + css)
      .slice(0, SIZE_ID)
      .replace(/[^a-zA-Z0-9]/g, "");
    return `${name}-${PREFIX}_${hash}`;
  }

  async function processCssModule(cssString) {
    const classMap = {};

    const processor = postcss([
      localByDefault(),
      scope({ generateScopedName }),
    ]);

    const result = await processor.process(cssString, { from: undefined });

    result.root.walkRules((rule) => {
      rule.selectors.forEach((sel) => {
        const match = sel.match(/\.(\w+)/);
        if (match) {
          classMap[match[1]] = sel.replace(".", "");
        }
      });
    });

    return {
      css: result.css.split(":export")[0],
      tokens: classMap,
    };
  }

  return processCssModule;
}

export default cssModules;
