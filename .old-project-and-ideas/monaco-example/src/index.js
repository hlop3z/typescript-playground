import * as monaco from "monaco-editor";

// Import Monaco Editor languages and features
// In v0.52.2, we should use the monaco-editor-webpack-plugin to handle language loading
// No need to manually import each language contribution

// Only import the editor core and essential features
import "monaco-editor/esm/vs/editor/editor.main";

// Styles
import "./styles.css";

// Export monaco for external use if needed
window.monaco = monaco;
export default monaco;
