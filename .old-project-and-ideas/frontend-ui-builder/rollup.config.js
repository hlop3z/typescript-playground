import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import pkg from './package.json';

const input = './dist/lib.js';
const name = 'app';

export default [
	// Browser-Friendly
	{
		input: input,
		output: {
			name: name,
			file: `dist/${name}.js`,
			format: 'iife',
		},
		plugins: [resolve(), commonjs()],
	},
];
