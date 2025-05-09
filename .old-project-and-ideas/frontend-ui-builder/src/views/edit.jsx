// API.transformHTML(template, script);
let view = 'code';
let current = {
	id: -1,
	template: `
<div>
	<button
	type="button"
	onclick={buttonClicked}
	style="background-color: black; color: white;"
	>
	Click Me
	</button>
</div>`.trim(),
	script: `
function buttonClicked() {
	alert("Hello world!");
}`.trim(),
};

function buttonComponent({
	text = null,
	onclick = null,
	icon = null,
	style = null,
} = {}) {
	const { button } = $ui.component;
	return m(button, {
		text: text,
		onclick: () => onclick(),
		icon: icon,
		style: style,
		class: 'btn mx-1 px-4',
		props: { color: 'black', 'text-color': 'white' },
	});
}

function simpleButtonComponent(
	text,
	onclick,
	icon = null,
	style = ''
) {
	return buttonComponent({
		text: text,
		onclick: onclick,
		icon: icon,
		style: style,
	});
}

function monacoComponent(props = {}) {
	const { monaco } = $ui.component;
	const editor = monaco(props);
	return m(editor);
}

function prettyCode() {
	current.template = $Format.html(current.template);
	current.script = $Format.javascript(current.script);
	m.redraw();
}

function saveCode() {
	const { components } = $ui.store;
	prettyCode();
	components.action.update(current);
}

function buttonPreview() {
	const { components } = $ui.store;
	components.api
		.transformHTML(current.template, current.script)
		.then((data) => {
			const code = $Format.javascript(data.code);
			current.transformed = code;
			components.action.update(current);
			view = 'preview';
			m.redraw();
		});
}

function deleteCode() {
	const { components } = $ui.store;
	components.action.delete(current.id);
	$ui.go('/');
}

function copyTextToClipboard(text) {
	navigator.clipboard.writeText(text).then(
		() => {
			/* clipboard successfully set */
		},
		() => {
			/* clipboard write failed */
			console.error('copy to clipboard failed');
		}
	);
}
export default {
	oninit(vnode) {
		const { components } = $ui.store;
		components.action.get(vnode.attrs.key);
		current.id = vnode.attrs.key;
	},
	view() {
		// console.log($Format);
		/* Api Component */
		const { components } = $ui.store;
		const active = components.state.current;
		if (Object.keys(active).length > 0) {
			current = { ...active };
			current.id = active.id;
			current.script = $Format.javascript(active.script);
			current.template = $Format.html(active.template);
		}
		/* Monaco */
		const htmlMonaco = monacoComponent({
			language: 'html',
			onChange: (val) => (current.template = val),
			onSave: () => saveCode(),
			value: current.template,
		});
		const javascriptMonaco = monacoComponent({
			language: 'javascript',
			onChange: (val) => (current.script = val),
			value: current.script,
		});
		let xcomp = null;
		if (current.transformed) {
			const active = current.transformed.replace(
				'export default',
				''
			);
			const xcode = new Function(`${active}; return Component`)();
			xcomp = new xcode();
			xcomp = xcomp.view();
		}
		return (
			<div>
				{view !== 'code' ? null : (
					<div style="text-align:center">
						{simpleButtonComponent(
							'All Components',
							() => $ui.go('/'),
							'mdi-graph',
							'float: left; background-color: #607D8B;'
						)}
						<span style="font-size: 20px" class="mr-2">
							<strong>Name: </strong>
							<input value={current.name} disabled class="px-2" />
						</span>
						{simpleButtonComponent(
							'Preview',
							buttonPreview,
							'mdi-eye-arrow-right'
						)}
						{simpleButtonComponent(
							'Save',
							saveCode,
							'mdi-content-save'
						)}
						{simpleButtonComponent(
							'Delete',
							deleteCode,
							'mdi-trash-can',
							'float: right; background-color: red;'
						)}
					</div>
				)}
				{view !== 'preview' ? null : (
					<div style="text-align:center">
						{simpleButtonComponent(
							'Go Back',
							() => (view = 'code'),
							'mdi-arrow-left'
						)}
					</div>
				)}
				{view !== 'code' ? null : (
					<div style="display: flex;">
						<div style="width: 50%; font-size: 24px; font-weight: 900; text-align: center;">
							Template (HTML & JSX)
						</div>
						<div style="width: 50%; font-size: 24px; font-weight: 900; text-align: center;">
							Script (JavaScript)
						</div>
					</div>
				)}
				{view !== 'code' ? null : (
					<div class="container">
						{htmlMonaco}
						{javascriptMonaco}
					</div>
				)}
				{view !== 'preview' ? null : (
					<div class="container">{xcomp}</div>
				)}
			</div>
		);
	},
};
