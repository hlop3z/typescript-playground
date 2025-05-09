const MonacoLink = "https://cdn.jsdelivr.net/npm/monaco-editor@0.37.1/min/vs";

/*______         _   _   _           
  | ___ \       | | | | (_)          
  | |_/ / __ ___| |_| |_ _  ___ _ __ 
  |  __/ '__/ _ \ __| __| |/ _ \ '__|
  | |  | | |  __/ |_| |_| |  __/ |   
  \_|  |_|  \___|\__|\__|_|\___|_|                                                                         
*/
const FORMAT = {
  graphql(code) {
    return prettier.format(code, {
      parser: "graphql",
      plugins: prettierPlugins,
    });
  },
  javascript(code) {
    try {
      return prettier.format(code, {
        parser: "babel",
        plugins: prettierPlugins,
      });
    } catch (e) {
      return code;
    }
  },
  css(code) {
    return prettier.format(code, {
      parser: "css",
      plugins: prettierPlugins,
    });
  },
  json(code) {
    let value = code;
    try {
      value = JSON.stringify(JSON.parse(value), null, "\t");
    } catch (e) {
      //pass
    }
    return value;
  },
};

const MonacoEditor = (function () {
  const createJSX = (v) => FORMAT.javascript(JSX(v));

  /*
  ______                    _   
  | ___ \                  | |  
  | |_/ / __ ___  __ _  ___| |_ 
  |  __/ '__/ _ \/ _` |/ __| __|
  | |  | | |  __/ (_| | (__| |_ 
  \_|  |_|  \___|\__,_|\___|\__|                                                          
  */

  require.config({
    paths: { vs: MonacoLink },
  });

  // Add JSX tokenization rules
  require(["vs/editor/editor.main"], async function () {
    monaco.languages.setMonarchTokensProvider("javascript", JSXMonaco);
  });

  // Create Editor
  function createEditor(element, options) {
    require(["vs/editor/editor.main"], function () {
      createAndMountEditor(element, options);
    });
  }
  function createAndMountEditor(element, options) {
    // Mount the editor
    var editor = monaco.editor.create(element, {
      ...options,
      theme: "vs-dark",
    });
    // Framework Mount
    if (options.init) options.init({ editor: editor, jsx: createJSX });
    options.$init(editor);
  }

  function Monaco(prop) {
    const { useRef, useState, useEffect } = preact;

    // Component
    const vm = useRef(null);
    const [editor, setEditor] = useState({});

    const PrettyCode = (content) => {
      const language = prop.language || "javascript";
      switch (language) {
        case "javascript":
        case "typescript":
          content = FORMAT.javascript(content);
          break;
        case "css":
          content = FORMAT.css(content);
          break;
        case "json":
          content = FORMAT.json(content);
          break;
        case "graphql":
          content = FORMAT.graphql(content);
          break;
      }
      return content;
    };

    const handleKeyDown = (event) => {
      if (prop.keydown) prop.keydown(event);

      if (event.ctrlKey && event.key === "s") {
        // Ctrl + S pressed
        event.preventDefault();
        // Handle your logic here
        // Set the cursor position
        let content = editor.getValue();
        var currentPosition = editor.getPosition();
        content = PrettyCode(content);
        editor.setValue(content);
        editor.setPosition(currentPosition);
        // Save
        if (prop.save) prop.save({ code: content, output: createJSX(content) });
      }
    };
    useEffect(() => {
      const event = "keydown";
      // Attach the event listener
      vm.current.addEventListener(event, handleKeyDown);
      // Cleanup the event listener on component unmount
      return () => {
        vm.current.removeEventListener(event, handleKeyDown);
      };
    }, [editor]);

    useEffect(() => {
      createEditor(vm.current, {
        language: prop.language || "javascript",
        theme: prop.theme || "vs-dark",
        value: prop.value || "",
        automaticLayout: true,
        readOnly: prop.readonly === undefined ? false : prop.readonly,
        init: prop.init,
        $init(self) {
          setEditor(self);
          self.setValue(PrettyCode(self.getValue()));
          self.getModel().onDidChangeContent(() => {
            let value = self.getValue();
            // Input the value
            if (prop.input)
              if (
                ["javascript", "typescript"].includes(
                  prop.language || "javascript"
                )
              ) {
                prop.input({ code: value, output: createJSX(value) }, self);
              }
          });
        },
      });
    }, []);

    return h("div", {
      ref: vm,
      class: prop.class,
      style:
        `height: ${prop.height ? prop.height : "410px"};` + (prop.style || ""),
    });
  }

  /*
        ___  ___                            
        |  \/  |                            
        | .  . | ___  _ __   __ _  ___ ___  
        | |\/| |/ _ \| '_ \ / _` |/ __/ _ \ 
        | |  | | (_) | | | | (_| | (_| (_) |
        \_|  |_/\___/|_| |_|\__,_|\___\___/ 

    */
  const JSX_TAG = "predefined.sql";
  const HTML_TAG = "keyword";
  const HTML_VAR = "attribute.name";
  const NAMESPACES_TAG = "number.hex";
  const KW_TAG = "regexp";

  const Attrs = (custom = false) => [
    // JSX attribute names
    [/[a-zA-Z-]+(?=\s*=\s*(?:"[^"]*"|'[^']*'|\{[^}]*\}))/, HTML_VAR],

    // Continue tokenizing attributes
    {
      include: "@whitespace",
    },

    // self-closing tag
    [
      /\/?>/,
      {
        token: custom ? JSX_TAG : HTML_TAG,
        bracket: "@close",
        next: "@pop",
      },
    ],

    // Text
    [/"/, "string", "@string_double"],
    [/'/, "string", "@string_single"],
    [/`/, "string", "@string_backtick"],
    [/[\w+]/, ""],
  ];
  const JSX_TOKENS = {
    // Common
    namespaces: [/[a-zA-Z_$][\w$]*(?=\.)/, NAMESPACES_TAG],
    html: [
      [
        /<\/?[\$\w+]+[.A-Z]+[.\$\w+]*/,
        {
          token: JSX_TAG,
          bracket: "@open",
          next: "@jsxAttributes",
        },
      ],
      [
        /<\/?[\$A-Z]+[.A-Za-z]+[.\$\w+]*/,
        {
          token: JSX_TAG,
          bracket: "@open",
          next: "@jsxAttributes",
        },
      ],
      [
        /<\/?[a-z0-9]*\/?/,
        {
          token: HTML_TAG,
          bracket: "@open",
          next: "@htmlAttributes",
        },
      ],
    ],
    attrs: {
      jsxAttributes: Attrs(true, "jsxAttributes"),
      htmlAttributes: Attrs(),
    },
  };
  const TOKENS = {
    root: [[/[{}]/, "delimiter.bracket"], { include: "common" }],

    ...JSX_TOKENS.attrs,

    common: [
      [/\b(?:function|class|const|let|var)\b/, "keyword"],

      // words with dot as JavaScript namespaces
      JSX_TOKENS.namespaces,

      // identifiers and keywords
      [
        /[a-z_$][\w$]*/,
        {
          cases: {
            "@keywords": KW_TAG,
            "@default": "identifier",
          },
        },
      ],
      // [/[\w+].(<)?/, ""],
      [/[A-Z][\w\$]*\(/, "type.identifier"], // to show class names nicely

      // whitespace
      { include: "@whitespace" },

      // JSX element
      ...JSX_TOKENS.html,

      // regular expression: ensure it is terminated before beginning (otherwise it is an opeator)
      [
        /\/(?=([^\\\/]|\\.)+\/([dgimsuy]*)(\s*)(\.|;|,|\)|\]|\}|$))/,
        { token: "regexp", bracket: "@open", next: "@regexp" },
      ],

      // delimiters and operators
      [/[()\[\]]/, "@brackets"],
      [/[<>](?!@symbols)/, "@brackets"],
      [/!(?=([^=]|$))/, "delimiter"],
      [
        /@symbols/,
        {
          cases: {
            "@operators": "delimiter",
            "@default": "",
          },
        },
      ],

      // numbers
      [/(@digits)[eE]([\-+]?(@digits))?/, "number.float"],
      [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, "number.float"],
      [/0[xX](@hexdigits)n?/, "number.hex"],
      [/0[oO]?(@octaldigits)n?/, "number.octal"],
      [/0[bB](@binarydigits)n?/, "number.binary"],
      [/(@digits)n?/, "number"],

      // delimiter: after number because of .\d floats
      [/[;,.]/, "delimiter"],

      // strings
      [/"([^"\\]|\\.)*$/, "string.invalid"],
      [/'([^'\\]|\\.)*$/, "string.invalid"],
      [/"/, "string", "@string_double"],
      [/'/, "string", "@string_single"],
      [/`/, "string", "@string_backtick"],

      //[/(^.*[a]*)./, HTML_TAG],
    ],

    whitespace: [
      [/[ \t\r\n]+/, ""],
      [/\/\*\*(?!\/)/, "comment.doc", "@jsdoc"],
      [/\/\*/, "comment", "@comment"],
      [/\/\/.*$/, "comment"],
    ],

    comment: [
      [/[^\/*]+/, "comment"],
      [/\*\//, "comment", "@pop"],
      [/[\/*]/, "comment"],
    ],

    jsdoc: [
      [/[^\/*]+/, "comment.doc"],
      [/\*\//, "comment.doc", "@pop"],
      [/[\/*]/, "comment.doc"],
    ],

    // We match regular expression quite precisely
    regexp: [
      [
        /(\{)(\d+(?:,\d*)?)(\})/,
        [
          "regexp.escape.control",
          "regexp.escape.control",
          "regexp.escape.control",
        ],
      ],
      [
        /(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/,
        [
          "regexp.escape.control",
          { token: "regexp.escape.control", next: "@regexrange" },
        ],
      ],
      [/(\()(\?:|\?=|\?!)/, ["regexp.escape.control", "regexp.escape.control"]],
      [/[()]/, "regexp.escape.control"],
      [/@regexpctl/, "regexp.escape.control"],
      [/[^\\\/]/, "regexp"],
      [/@regexpesc/, "regexp.escape"],
      [/\\\./, "regexp.invalid"],
      [
        /(\/)([dgimsuy]*)/,
        [{ token: "regexp", bracket: "@close", next: "@pop" }, "keyword.other"],
      ],
    ],

    regexrange: [
      [/-/, "regexp.escape.control"],
      [/\^/, "regexp.invalid"],
      [/@regexpesc/, "regexp.escape"],
      [/[^\]]/, "regexp"],
      [
        /\]/,
        {
          token: "regexp.escape.control",
          next: "@pop",
          bracket: "@close",
        },
      ],
    ],

    string_double: [
      [/[^\\"]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/"/, "string", "@pop"],
    ],

    string_single: [
      [/[^\\']+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/'/, "string", "@pop"],
    ],

    string_backtick: [
      [/\$\{/, { token: "delimiter.bracket", next: "@bracketCounting" }],
      [/[^\\`$]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/`/, "string", "@pop"],
    ],

    bracketCounting: [
      [/\{/, "delimiter.bracket", "@bracketCounting"],
      [/\}/, "delimiter.bracket", "@pop"],
      { include: "common" },
    ],
  };

  const JSXMonaco = {
    tokenizer: TOKENS,

    keywords: [
      // Should match the keys of textToKeywordObj in
      // https://github.com/microsoft/TypeScript/blob/master/src/compiler/scanner.ts
      "abstract",
      "any",
      "as",
      "asserts",
      "bigint",
      "boolean",
      "break",
      "case",
      "catch",
      "class",
      "continue",
      "const",
      "constructor",
      "debugger",
      "declare",
      "default",
      "delete",
      "do",
      "else",
      "enum",
      "export",
      "extends",
      "false",
      "finally",
      "for",
      "from",
      "function",
      "get",
      "if",
      "implements",
      "import",
      "in",
      "infer",
      "instanceof",
      "interface",
      "is",
      "keyof",
      "let",
      "module",
      "namespace",
      "never",
      "new",
      "null",
      "number",
      "object",
      "out",
      "package",
      "private",
      "protected",
      "public",
      "override",
      "readonly",
      "require",
      "global",
      "return",
      "satisfies",
      "set",
      "static",
      "string",
      "super",
      "switch",
      "symbol",
      "this",
      "throw",
      "true",
      "try",
      "type",
      "typeof",
      "undefined",
      "unique",
      "unknown",
      "var",
      "void",
      "while",
      "with",
      "yield",
      "async",
      "await",
      "of",
    ],

    operators: [
      "<=",
      ">=",
      "==",
      "!=",
      "===",
      "!==",
      "=>",
      "+",
      "-",
      "**",
      "*",
      "/",
      "%",
      "++",
      "--",
      "<<",
      "</",
      ">>",
      ">>>",
      "&",
      "|",
      "^",
      "!",
      "~",
      "&&",
      "||",
      "??",
      "?",
      ":",
      "=",
      "+=",
      "-=",
      "*=",
      "**=",
      "/=",
      "%=",
      "<<=",
      ">>=",
      ">>>=",
      "&=",
      "|=",
      "^=",
      "@",
    ],

    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes:
      /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    digits: /\d+(_+\d+)*/,
    octaldigits: /[0-7]+(_+[0-7]+)*/,
    binarydigits: /[0-1]+(_+[0-1]+)*/,
    hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

    regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
    regexpesc:
      /\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,
  };

  return Monaco;
})();
