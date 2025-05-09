const MonacoEditor = (function() {
    require.config({
        paths: {
            vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs'
        }
    });

    const MonacoEditorComponent = {
        name: 'MonacoEditor',
        methods: {},
        render: function(createElement) {
            return createElement('pre', {
                staticStyle: {
                    "width": "100%"
                }
            })
        },
        data: function() {
            return {
                editor: null
            };
        },
        props: {
            code: {
                type: String,
                default: ['function hello() {', '\tconsole.log("Hello world!");', '}'].join('\n')
            },
            language: {
                type: String,
                default: 'javascript' // python, graphql, javascript, html
            },
            theme: {
                type: String,
                default: 'vs-dark'
            },
            readOnly: {
                type: Boolean,
                default: false,
            },
            options: {
                type: Object,
                default: () => ({}),
            },
        },
        mounted: function() {
            const vm = this;

            // Load Method 
            const loadMonaco = () => require(['vs/editor/editor.main'], function() {
                const options = {
                    value: vm.code,
                    language: vm.language,
                    theme: vm.theme,
                    readOnly: vm.readOnly
                };
                const editor = monaco.editor.create(vm.$el, {
                    ...options,
                    ...vm.options
                });
                vm.editor = editor;

                editor.getModel().onDidChangeContent(() => {
                    let value = editor.getValue();
                    if (vm.language === "json") {
                        try {
                            value = JSON.stringify(JSON.parse(value), null, "\t");
                        } catch (e) {}
                    }
                    vm.$emit("update:code", value);
                })
            });

            // Real Load
            setTimeout(loadMonaco, 200);
        }
    }

    return {
        install(app) {
            // configure the app
            app.mixin({
                components: {
                    monacoEditor: MonacoEditorComponent,
                }
            })
        }
    }
})();