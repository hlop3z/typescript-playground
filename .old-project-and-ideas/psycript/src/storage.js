const Session = {
  set: (k, v) => {
    sessionStorage.setItem(k, JSON.stringify(v));
  },
  get: (k) => JSON.parse(sessionStorage.getItem(k)),
  del: (k) => {
    sessionStorage.removeItem(k);
  },
  clear: () => {
    sessionStorage.clear();
  },
};

const Local = {
  set: (k, v) => {
    localStorage.setItem(k, JSON.stringify(v));
  },
  get: (k) => JSON.parse(localStorage.getItem(k)),
  del: (k) => {
    localStorage.removeItem(k);
  },
  clear: () => {
    localStorage.clear();
  },
};

export default {
  /**
   *
   * @param {string} key Storage's Key.
   * @param {string} value Key's Value.
   */
  $keys: ["session", "local", "set", "get", "del", "clear"],
  session: Session,
  local: Local,
};
