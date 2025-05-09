import express from 'express';
import * as babel from '@babel/core';
import SQL from './database/index.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

function TransformedMithril(code, script) {
	const component = `
export default class Component {
	constructor(vnode) {
		// State Variables
		// this.count = 0;
	}
	view() {
		return ${code}
	}
}
	`.trim();
	let output = script + '\n\n';
	return output + component;
}

app.post('/mithril', (request, response) => {
	const codeIn = request.body.code;
	const scriptIn = request.body.script;
	var result = babel.transformSync(
		TransformedMithril(codeIn, scriptIn),
		{
			plugins: [
				[
					'@babel/plugin-transform-react-jsx',
					{
						pragma: 'm',
						pragmaFrag: "'['",
					},
				],
			],
		}
	);
	response.send({
		code: result.code,
	});
});

app.post('/component', (request, response) => {
	const { operation, variables } = request.body;
	if (variables.name) {
		variables.name = variables.name.toLowerCase();
	}
	SQL.table;
	function ApiMethod(method) {
		method
			.then((data) => {
				response.send({
					data: data,
					error: false,
				});
			})
			.catch((err) => {
				response.send({
					data: null,
					error: true,
				});
			});
	}
	if (operation === 'create') {
		ApiMethod(SQL.table['component'].create(variables));
	} else if (operation === 'update') {
		ApiMethod(SQL.table['component'].update(variables));
	} else if (operation === 'delete') {
		ApiMethod(SQL.table['component'].delete(variables.id));
	} else if (operation === 'get') {
		ApiMethod(SQL.table['component'].get(variables.id));
	} else {
		ApiMethod(SQL.table['component'].all);
	}
});

app.listen(port, () => {
	console.log(`Running on port http://localhost:${port}`);
});
