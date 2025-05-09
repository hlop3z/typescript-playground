function setValueByPath(obj, path, value) {
  let pathArray = path.split(".");
  let current = obj;

  function setValue(obj, pathArray, value) {
    let key = pathArray.shift();
    if (!obj.hasOwnProperty(key)) {
      return;
    }
    if (pathArray.length === 0) {
      obj[key] = value;
    } else {
      setValue(obj[key], pathArray, value);
    }
  }
  setValue(current, pathArray, value);
  return current;
}

function getValueByPath(obj, path) {
  const lookup = (namespace) => {
    return namespace.split(".").reduce((o, i) => {
      if (o) return o[i];
    }, obj);
  };
  return lookup(path);
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

function container() {
  return new Container();
}
// export default container

/* @ Demo
-----------*/
// Define
const myComponent = { name: "component" };

// Init
const GLOBAL = container();

// set
GLOBAL.add("components.myComponent", myComponent);

// Get
const retrievedComponent = container.get("components.myComponent");
console.log(retrievedComponent);
