class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
    this.virtualDom = null;
    this.actualDom = null;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.update();
  }

  createVirtualDom() {
    // override this method to create the virtual DOM
    // using the VirtualDom() function
  }

  update() {
    this.virtualDom = this.createVirtualDom();
    this.updateActualDom();
  }

  updateActualDom() {
    if (!this.actualDom) {
      this.actualDom = document.createElement(this.virtualDom.tagName);
      document.body.appendChild(this.actualDom);
    }

    // compare old props with new props
    const oldProps = this.actualDom.dataset;
    const newProps = this.virtualDom.props;
    for (let prop in oldProps) {
      if (!newProps[prop]) {
        this.actualDom.removeAttribute(prop);
      }
    }
    for (let prop in newProps) {
      if (oldProps[prop] !== newProps[prop]) {
        this.actualDom.setAttribute(prop, newProps[prop]);
      }
    }

    // compare old children with new children
    const oldChildren = this.actualDom.childNodes;
    const newChildren = this.virtualDom.children;
    let maxLength = Math.max(oldChildren.length, newChildren.length);
    for (let i = 0; i < maxLength; i++) {
      let oldChild = oldChildren[i],
        newChild = newChildren[i];
      if (!oldChild) {
        // if there is no old child, append the new child
        this.actualDom.appendChild(newChild);
      } else if (!newChild) {
        // if there is no new child, remove the old child
        this.actualDom.removeChild(oldChild);
      } else if (newChild.nodeName === "#text") {
        // if the new child is a text node, update the text content
        if (oldChild.nodeValue !== newChild.nodeValue) {
          oldChild.nodeValue = newChild.nodeValue;
        }
      } else if (newChild.nodeName === "#component") {
        // if the new child is a component, update the component
        newChild.update();
      } else {
        // if the new child is a dom node, update the dom node
        this.updateActualDom(newChild, oldChild);
      }
    }
  }
}

const VirtualDom = (tagName, props, children) => {
  return { tagName, props, children };
};

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "Hello, World!" };
  }

  createVirtualDom() {
    const children = [
      VirtualDom("span", { class: "message" }, this.state.message),
      VirtualDom(
        "button",
        {
          class: "button",
          onClick: () => this.setState({ message: "Hello, New World!" }),
        },
        "Change message"
      ),
    ];
    return VirtualDom("div", { class: "my-component" }, children);
  }
}

const component = new MyComponent({ name: "john" });
component.createVirtualDom();
console.log(component.updateActualDom());
