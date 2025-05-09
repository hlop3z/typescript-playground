const Table = {};

Table['component'] = `
CREATE TABLE IF NOT EXISTS component (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  props JSON,
  script TEXT,
  template TEXT,
  transformed TEXT
)
`;

export default Table;
