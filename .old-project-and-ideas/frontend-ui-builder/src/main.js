import m from 'mithril';

/* CSS */
import '@static/css/spacing.min.css';
import '@static/style.css';

/* Pure-JS */
import '@static/js/colors.js';

/* Components */
import App from './app';

/* App */
window.m = m;
window.$ui = App;

/* Mount */
m.route(document.body, '/home', {
	'/home': {
		render() {
			return m(App.view['home'], {
				projectName: '(vite + mithril)',
			});
		},
	},
	'/edit/:key': {
		render(vnode) {
			return m(App.view['edit'], vnode.attrs);
		},
	},
});
