import Database from './database/crud.js';
import Model from './models.js';

let SQL = Database('./frontend.sqlite3');
let Table = {};

Object.keys(Model).forEach((key) => {
	Table[key] = SQL.table(key);
	SQL.database.run(Model[key]);
});

export default {
	database: SQL,
	table: Table,
};
