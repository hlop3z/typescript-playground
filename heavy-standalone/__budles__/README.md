# Web-Code

```html
<!-- TSX and SCSS with compression -->
<script src="./webcode.min.js"></script>
```

```js
class WebCode {
  // SASS
  static sass(source, compressed = false) {
    return this.sassBase(source, compressed);
  }

  // Prettier (format)
  static format(source, options) {
    return prettier.format(source, this.configPrettier(options));
  }

  // TSX (transform)
  static tsx(source, compress = false, mangle = false) {
    let code = Babel.transform(source, {
      presets: this.configBabel(),
      filename: "input.tsx",
    });
    if (compress) {
      code = this.minify(code, compress, mangle);
    }
    return code;
  }
}
```
