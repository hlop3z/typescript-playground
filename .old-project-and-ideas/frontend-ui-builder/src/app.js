const camelCase = (text) =>
	text
		.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
			if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
			return index === 0 ? match.toLowerCase() : match.toUpperCase();
		})
		.replace(/[^\w-]+/g, '')
		.replace(/[-_]+/g, '');

/* Dynamic Load */
const requireViews = import.meta.globEager('./views/**/*.jsx');
const requireComponents = import.meta.globEager(
	'./components/**/*.jsx'
);
const requireStore = import.meta.globEager('./store/**/*.store.js');

// Collection of Views
const views = {};

Object.keys(requireViews).forEach((filename) => {
	const moduleName = filename
		.replace('views/', '')
		.replace(/(\.\/|\.jsx)/g, '')
		.replace(/^\w/, (c) => c.toLowerCase());

	views[camelCase(moduleName)] =
		requireViews[filename].default || requireViews[filename];
});

// Collection of Components
const components = {};

Object.keys(requireComponents).forEach((filename) => {
	const moduleName = filename
		.replace('components/', '')
		.replace(/(\.\/|\.jsx)/g, '')
		.replace(/^\w/, (c) => c.toLowerCase());

	let active =
		requireComponents[filename].default ||
		requireComponents[filename];

	components[camelCase(moduleName)] = active;
});

// Collection of Store(Reactives)
const store = {};

Object.keys(requireStore).forEach((filename) => {
	const moduleName = filename
		.replace('store/', '')
		.replace(/(\.\/|\.store\.js)/g, '')
		.replace(/^\w/, (c) => c.toLowerCase());

	store[camelCase(moduleName)] =
		requireStore[filename].default || requireStore[filename];
});

// Export
export default {
	store: store,
	view: views,
	component: components,
	keys: {
		store: Object.keys(store),
		view: Object.keys(views),
		component: Object.keys(components),
	},
	go(path) {
		m.route.set(path);
	},
};
