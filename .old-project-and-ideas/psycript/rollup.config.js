import pkg from "./package.json" assert { type: "json" };
import terser from "@rollup/plugin-terser";

export default [
  // ESM (ECMAScript — Module)
  {
    input: pkg.initFile,
    output: [
      {
        file: `dist/${pkg.name}.js`,
        format: "iife",
        name: pkg.name,
        plugins: [terser()],
      },
      { file: `dist/${pkg.name}.mjs`, format: "es" },
      { file: `dist/${pkg.name}.cjs.js`, format: "cjs" },
    ],
  },
];
