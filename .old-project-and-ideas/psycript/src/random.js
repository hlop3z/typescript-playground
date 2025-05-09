const StringText = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  hexdigits: "0123456789abcdefABCDEF",
  others: "-._~",
};

function randomBase(size, choices) {
  let text = "";
  const possible = choices;
  for (let i = 0; i < size; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export default {
  /**
   *
   * @param {integer} count Create a random string.
   */
  $keys: [
    "lowercase",
    "uppercase",
    "letters",
    "alphanum",
    "digits",
    "hexdigits",
    "all",
  ],
  lowercase: (count) => randomBase(count, StringText.lowercase),
  uppercase: (count) => randomBase(count, StringText.uppercase),
  letters: (count) =>
    randomBase(count, StringText.lowercase + StringText.uppercase),
  alphanum: (count) =>
    randomBase(
      count,
      StringText.lowercase + StringText.uppercase + StringText.digits
    ),
  digits: (count) => randomBase(count, StringText.digits),
  hexdigits: (count) => randomBase(count, StringText.hexdigits),
  all: (count) =>
    randomBase(
      count,
      StringText.lowercase +
        StringText.uppercase +
        StringText.digits +
        StringText.hexdigits +
        StringText.others
    ),
};
