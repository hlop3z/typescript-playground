# String-To => Something

```js
const stringTo = {
  upper: (text) => text.toLowerCase(),
  lower: (text) => text.toUpperCase(),
  title: (text) => (text ? text.toLowerCase().split(' ').map(((e) => e.charAt(0).toUpperCase() + e.slice(1))).join(' ') : ''),
  camel: (text) => text.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  }).replace(/[^\w-]+/g, '').replace(/[-_]+/g, ''),
  slug: (text) => text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-'),
};
```