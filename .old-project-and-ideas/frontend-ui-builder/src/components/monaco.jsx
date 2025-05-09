export default function Monaco(props = {}) {
	let editor = null;

	function MonacoOpts({
		value = props.value ? props.value : '',
		language = props.language ? props.language : 'javascript',
		theme = props.theme ? props.theme : 'vs-dark',
		readOnly = props.readOnly ? props.readOnly : false,
	} = {}) {
		return {
			value,
			language,
			theme,
			readOnly,
		};
	}

	const loader = (vnode) =>
		require(['vs/editor/editor.main'], function () {
			// Options
			const options = MonacoOpts(vnode.attrs.options);
			// Editor
			editor = monaco.editor.create(vnode.dom, options);
			editor.getModel().onDidChangeContent(() => {
				// Mithril
				const value = editor.getValue();
				if (props.onChange) {
					props.onChange(value);
				}
			});
		});

	return {
		oncreate(vnode) {
			loader(vnode);
			window.addEventListener('resize', () => {
				m.redraw();
			});
			window.addEventListener('keydown', (e) => {
				if (e.ctrlKey && e.key === 's') {
					e.preventDefault();
					const value = editor.getValue();
					if (props.onSave) {
						props.onSave(value);
					}
				}
			});
		},
		onremove() {
			window.removeEventListener('resize', () => {
				// Pass
			});
			window.removeEventListener('keydown', () => {
				// Pass
			});
		},
		view() {
			return m('div.content');
		},
	};
}
