// Sample code for different languages
const DEFAULT_CONTENT = {
  javascript: `// JavaScript Example
function helloWorld() {
  console.log("Hello, world!");
  return true;
}

// Call the function
helloWorld();`,
  typescript: `// TypeScript Example
interface Person {
  name: string;
  age: number;
}

function greet(person: Person): string {
  return \`Hello, \${person.name}! You are \${person.age} years old.\`;
}

const john: Person = { name: "John", age: 30 };
console.log(greet(john));`,
  html: `<!DOCTYPE html>
<html>
<head>
  <title>Sample Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a sample HTML page</p>
</body>
</html>`,
  css: `/* CSS Example */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
}

h1 {
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}`,
  python: `# Python Example
def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n-1)

# Calculate factorial of 5
result = factorial(5)
print(f"Factorial of 5 is {result}")`,
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  cpp: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
  rust: `fn main() {
    println!("Hello, World!");
}`,
  json: `{
    "name": "Monaco Editor",
    "version": "0.52.2",
    "features": ["syntax highlighting", "code completion", "formatting"],
    "languages": 20,
    "isAwesome": true
}`,
  markdown: `# Monaco Editor

## Features
- Syntax highlighting
- Code completion
- IntelliSense

> This is a blockquote

\`\`\`javascript
// Code block
function hello() {
    console.log("Hello, Markdown!");
}
\`\`\``,
  yaml: `version: '3'
services:
  app:
    image: node:14-alpine
    ports:
      - "3000:3000"
    volumes:
      - ./:/app
    environment:
      - NODE_ENV=development`,
  handlebars: `{{#if isAdmin}}
  <p>Welcome, admin!</p>
{{else}}
  <p>Access denied.</p>
{{/if}}`,
  dockerfile: `# Dockerfile example
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]`,

  graphql: `# GraphQL example
type User {
  id: ID!
  name: String!
  email: String!
}

query GetUser($id: ID!) {
  user(id: $id) {
    name
    email
  }
}`,

  powershell: `# PowerShell example
$Name = "World"
Write-Output "Hello, $Name!"
Get-Process | Where-Object { $_.CPU -gt 100 }`,

  scss: `// SCSS example
$primary-color: #3498db;

body {
  font-family: sans-serif;
  color: $primary-color;

  .container {
    padding: 1rem;
    &:hover {
      background-color: lighten($primary-color, 10%);
    }
  }
}`,

  shell: `# Shell script example
#!/bin/bash
echo "Starting build..."
npm install
npm run build
echo "Done!"`,

  sql: `-- SQL example
SELECT id, name, email
FROM users
WHERE active = TRUE
ORDER BY created_at DESC;`,

  xml: `<!-- XML example -->
<note>
  <to>User</to>
  <from>System</from>
  <heading>Reminder</heading>
  <body>Don't forget to back up your files!</body>
</note>`,
};

// Initialize editor with options
let editor;
let currentTheme = "vs"; // Default light theme

function initializeEditor(language = "javascript") {
  const container = document.getElementById("editor-container");

  if (editor) {
    editor.dispose();
  }

  // Create editor
  editor = monaco.editor.create(container, {
    value: DEFAULT_CONTENT[language] || `// ${language} code goes here`,
    language: language,
    theme: currentTheme,
    automaticLayout: true,
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineNumbers: "on",
    fontFamily: 'Consolas, "Courier New", monospace',
  });
}

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Initialize with JavaScript
  initializeEditor("javascript");

  // Setup language selector
  const languageSelect = document.getElementById("language-select");
  languageSelect.addEventListener("change", (e) => {
    initializeEditor(e.target.value);
  });

  // Setup theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "vs" ? "vs-dark" : "vs";
    monaco.editor.setTheme(currentTheme);
  });

  // Make editor instance available globally for debugging
  window.monacoEditor = editor;
});

// Ensure proper sizing
window.addEventListener("resize", () => {
  if (editor) {
    editor.layout();
  }
});
