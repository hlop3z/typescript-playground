function minifyHTML(code) {
  return code
    .replace(/\s+/g, " ") // Replaces multiple spaces with single space
    .replace(/<!--[\s\S]*?-->/g, "") // Removes HTML comments
    .replace(/\s*(<\/?[a-z][^>]*>)\s*/g, "$1"); // Removes whitespace before and after tags
}

function createNodeFromString(code) {
  const xmlDoc = parser.parseFromString(minifyHTML(code), "text/xml");
  return xmlDoc.documentElement;
}

function createHyperscript(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }
  const children = Array.from(node.childNodes).map(createHyperscript);
  const attributes = Array.from(node.attributes).reduce((attrs, attr) => {
    attrs[attr.name] = attr.value;
    return attrs;
  }, {});
  // Tag-Name
  const elemTag = node.tagName.toLowerCase();
  return [elemTag, attributes, children];
}
