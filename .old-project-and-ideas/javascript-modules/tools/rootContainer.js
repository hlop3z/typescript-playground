class RootContainer {
  constructor() {
    this.root = document.createElement("div");
    this.virtualDom = {};
    this.actualDom = {};
  }

  createChild(elementType, attributes, children) {
    const virtualChild = {
      elementType,
      attributes,
      children,
      key: Date.now(),
    };
    this.virtualDom[virtualChild.key] = virtualChild;
    this.update();
    return virtualChild.key;
  }

  update() {
    Object.keys(this.virtualDom).forEach((key) => {
      const virtualChild = this.virtualDom[key];
      let actualChild = this.actualDom[key];
      if (!actualChild) {
        actualChild = document.createElement(virtualChild.elementType);
        this.actualDom[key] = actualChild;
        this.root.appendChild(actualChild);
      }
      for (const attribute in virtualChild.attributes) {
        actualChild.setAttribute(attribute, virtualChild.attributes[attribute]);
      }
      while (actualChild.firstChild) {
        actualChild.removeChild(actualChild.firstChild);
      }
      virtualChild.children.forEach((child) => {
        if (typeof child === "string") {
          actualChild.innerHTML = child;
        } else {
          actualChild.appendChild(child);
        }
      });
    });
  }
}

// Root
const root = new RootContainer();
document.body.appendChild(root.root);
