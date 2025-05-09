const ALL_EVENTS = [
  "click",
  "dblclick",
  "mousedown",
  "mouseup",
  "contextmenu",
  "mouseout",
  "mousewheel",
  "mouseover",
  "touchstart",
  "touchend",
  "touchmove",
  "touchcancel",
  "keydown",
  "keyup",
  "keypress",
  "focus",
  "blur",
  "change",
  "submit",
  "resize",
  "scroll",
  "load",
  "unload",
  "hashchange",
];

function mountToRoot(root, velement) {
  if ("string" === typeof root) {
    const parentNode = document.querySelector(root);
    parentNode.appendChild(velement.dom);
  } else {
    root.appendChild(velement.dom);
  }
}

class VirtualDom {
  constructor(vdomObject) {
    this.$el = null;
    this.unmounted = [];
    this.vdomObject = vdomObject;
    this.dom = this.create();
    this.$root = null;
  }

  create() {
    let element;
    if (this.vdomObject.tag === "#text") {
      element = document.createTextNode(this.vdomObject.text);
    } else {
      element = document.createElement(this.vdomObject.tag);
      if (this.vdomObject.attrs) {
        for (const attr in this.vdomObject.attrs) {
          element.setAttribute(attr, this.vdomObject.attrs[attr]);
        }
      }

      if (this.vdomObject.events) {
        for (const event in this.vdomObject.events) {
          if (ALL_EVENTS.includes(event)) {
            element.addEventListener(event, this.vdomObject.events[event]);
          } else {
            if (event === "mounted") {
              this.vdomObject.events[event]();
            }
          }
        }
      }

      if (this.vdomObject.children) {
        for (const child of this.vdomObject.children) {
          const childDom = new VirtualDom(child).create();
          element.appendChild(childDom);
        }
      }
    }

    this.$el = element;
    return this.$el;
  }

  update(vdomObject) {
    this.vdomObject = vdomObject;
    const newDom = this.create();
    this.dom.parentNode.replaceChild(newDom, this.dom);
    this.dom = newDom;
  }

  remove() {
    this.$el.remove();
  }

  mount(root = null) {
    /**
     * Mount { Virtual-DOM } to { document.<node> }
     * @param  {String | Object} root A String for { querySelector } or an { Element-Object }
     */
    if (this.root) {
      mountToRoot(this.$root, this);
    } else {
      this.$root = root;
      mountToRoot(root, this);
    }
  }
}

// Create
const vdomObject = {
  tag: "div",
  attrs: [],
  children: [
    {
      tag: "h1",
      attrs: {},
      events: {
        click: (e) => console.log("We Doing it" + e),
        mounted: () => console.log("Mounted"),
        unmounted: () => console.log("Un-Mounted"),
      },
      children: [
        {
          tag: "#text",
          text: "Hell Yeah!",
        },
      ],
      text: null,
    },
  ],
};

function vDom(object) {
  return new VirtualDom(object);
}

// export default vDom

// Init
const virtualDom = vDom(vdomObject);

// Mount
virtualDom.mount("#app");

// Updates
const newVdomObject = {
  tag: "div",
  attrs: [],
  children: [
    {
      tag: "h1",
      attrs: {},
      events: {
        click: (e) => console.log("We Doing it" + e),
      },
      children: [
        {
          tag: "#text",
          text: "Now Go Say Sum!",
        },
      ],
      text: null,
    },
  ],
};

setTimeout(() => {
  virtualDom.update(newVdomObject);
}, 2000);

setTimeout(() => {
  virtualDom.remove();
}, 4000);
