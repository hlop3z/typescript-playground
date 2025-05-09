function createID() {
  const uniqueIdNumb = () => Math.random().toString(36).substring(2);
  const uniqueIdDate = () =>
    (Date.now() + Math.random()).toString(36).substring(2);
  const randomUuid = () =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  const items = randomUuid().split("-");
  items.shift();
  items.shift();
  items.push(uniqueIdNumb());
  items.push(uniqueIdDate());
  items.push(...randomUuid().split("-"));
  items.push(uniqueIdDate());
  items.push(...randomUuid().split("-"));
  items.push(uniqueIdNumb());
  return items.join("-");
}
