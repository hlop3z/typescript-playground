function tokenizeBraces(string) {
  const words = string.match(/{(.*?)}/g);
  return words ? words.map((word) => word.slice(1, -1)) : [];
}

function tokenizeDoubleBraces(string) {
  const words = string.match(/{{(.*?)}}/g);
  return words ? words.map((word) => word.slice(2, -2)) : [];
}

function createTokensDoubleBraces(str) {
  const inData = tokenizeDoubleBraces(str);
  const data = {};
  inData.forEach((key) => {
    data[key] = inData[key] || " ";
  });
  return data;
}

function parseString(str, data) {
  let token = createTokensDoubleBraces(str);
  token = { ...token, ...data };
  const parts = str.split(/{{\s*|\s*}}/);
  return parts.map((part) => token[part] || part).join("");
}

/*
// Demo A
const string = "This is a { test } string with {multiple} {words} in {braces}.";
console.log(tokenizeBraces(string));



// Demo B
const string2 =
  "This is a {{ test }} string with {{multiple}} {{words}} in {{double braces}}.";

console.log(parseString(string2, {test:"i said ilike like that"}));
*/
