import DBApp from "./database.js";

const getKeys = (obj) => Object.keys(obj).filter((key) => key !== "id");

function Create(table, form) {
  let keys = getKeys(form);
  let values = [];

  // (keyOne, keyTwo)
  keys.forEach((key) => {
    let val = form[key];
    values.push(val);
  });

  // (?, ?)
  const sqlVals = "? ".repeat(keys.length).trim().split(" ").join(", ");

  // SQL - Code
  const query = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${sqlVals})`;
  return {
    query: query,
    values: values,
  };
}
function Update(table, form) {
  let keys = getKeys(form);
  let values = [];
  let sqlVals = [];

  // (keyOne, keyTwo)
  keys.forEach((key) => {
    let val = form[key];
    values.push(val);
    sqlVals.push(`${key} = ?`);
  });

  values.push(form.id);
  // SQL - Code
  const query = `UPDATE ${table} SET ${sqlVals.join(", ")} WHERE id = ?`;
  return {
    query: query,
    values: values,
  };
}

function Delete(table, id) {
  return {
    query: `DELETE FROM ${table} WHERE id = ?`,
    values: [id],
  };
}
function Get(table, id) {
  return {
    query: `SELECT * FROM ${table} WHERE id = ?`,
    values: [id],
  };
}
function All(table) {
  return {
    query: `SELECT * FROM ${table}`,
    values: null,
  };
}

class Table {
  constructor(db, name) {
    this.$db = db;
    this.$table = name;
  }
  create(form) {
    const sql = Create(this.$table, form);
    return this.$db.run(sql.query, sql.values);
  }
  update(form) {
    const sql = Update(this.$table, form);
    return this.$db.run(sql.query, sql.values);
  }
  delete(id) {
    const sql = Delete(this.$table, id);
    return this.$db.run(sql.query, sql.values);
  }
  get(id) {
    const sql = Get(this.$table, id);
    return this.$db.get(sql.query, sql.values);
  }
  get all() {
    const sql = All(this.$table);
    return this.$db.all(sql.query);
  }
}
class Database {
  constructor(database) {
    this.$db = new DBApp(database);
  }
  table(name) {
    return new Table(this.$db, name);
  }
  get database() {
    return this.$db;
  }
  get db() {
    return this.$db;
  }
}

export default (database) => new Database(database);
