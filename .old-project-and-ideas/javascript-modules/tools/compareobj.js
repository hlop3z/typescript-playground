function getObjectDiff(obj1, obj2) {
  const obj1Parsed = JSON.parse(JSON.stringify(obj1));
  const obj2Parsed = JSON.parse(JSON.stringify(obj2));
  const diff = {};
  for (let key in obj1Parsed) {
    if (obj1Parsed[key] !== obj2Parsed[key]) {
      diff[key] = obj2Parsed[key];
    }
  }
  return diff;
}

console.log(getObjectDiff({ id: 1 }, { id: 2 }));
