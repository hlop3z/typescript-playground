function getValueByPath(obj, path) {
  const lookup = (namespace) => {
    return namespace.split(".").reduce((o, i) => {
      if (o) return o[i];
    }, obj);
  };
  return lookup(path);
}

function setValueByPath(obj, path, value) {
  let pathArray = path.split(".");
  let current = obj;

  function setValue(obj, pathArray, value) {
    let key = pathArray.shift();
    if (pathArray.length === 0) {
      obj[key] = value;
    } else {
      if (!obj.hasOwnProperty(key)) {
        obj[key] = {};
      }
      setValue(obj[key], pathArray, value);
    }
  }
  setValue(current, pathArray, value);
  return current;
}

class Container {
  constructor() {
    if (Container.instance) {
      return Container.instance;
    }

    Container.instance = this;

    this.data = {};
  }

  add(path, value) {
    setValueByPath(this.data, path, value);
  }

  get(path) {
    return getValueByPath(this.data, path);
  }
}

// Define
const myComponent = { name: "component" };

// Init
const container = new Container();

// set
container.add("components.myComponent", myComponent);

// Get
const retrievedComponent = container.get("components.myComponent");
console.log(retrievedComponent);
