function Singleton(className, properties) {
  function createClass(className, properties) {
    const newClass = function () {};
    newClass.prototype = Object.create(properties);
    newClass.prototype.constructor = className;
    return newClass;
  }

  function createSingleton(classToSingletonize) {
    let instance = null;
    return class extends classToSingletonize {
      constructor() {
        if (!instance) {
          instance = super();
        }
        return instance;
      }
    };
  }
  const MyClass = createClass(className, properties);
  const SingletonizedMyClass = createSingleton(MyClass);
  return () => new SingletonizedMyClass();
}

// Test

const myClass = Singleton("MyClass", {
  data: "some data",
  method() {
    console.log("doing something");
    console.log(this.data);
  },
});

const singleton1 = myClass();
const singleton2 = myClass();

console.log(singleton1 === singleton2); // true
singleton1.method(); // 'doing something'
console.log(myClass);
