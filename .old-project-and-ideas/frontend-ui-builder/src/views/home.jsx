let state = {
	search: null,
	name: null,
	nameIsExist: false,
	items: [],
};

const componentTemplate = `
<button
  type="button"
  onclick={buttonClicked}
  style="background-color: black; color: white;"
>
  Click Me
</button>
`.trim();

const componentScript = `
function buttonClicked() {
  alert("Hello World!");
}
`.trim();

function buttonComponent(text, onclick) {
	const { button } = $ui.component;
	return m(button, {
		text: text,
		onclick: () => onclick(),
		class: 'btn px-4',
		props: { color: 'black', 'text-color': 'white' },
	});
}
function createApi() {
	const { components } = $ui.store;
	if (state.name !== null && state.name !== '') {
		components.action.create({
			name: state.name,
			template: componentTemplate,
			script: componentScript,
		});
		console.log('created');
		console.log(state.name);
		console.log(components);
	}
}
function listApi() {
	const { components } = $ui.store;
	state.items = components.state.items.filter((item) => {
		if (state.search) {
			return item.name.includes(state.search);
		} else {
			return true;
		}
	});
}
export default {
	oninit() {
		const { components } = $ui.store;
		components.action.list();
	},
	view() {
		const { components } = $ui.store;
		listApi();

		return (
			<div style="overflow: hidden">
				<div style="text-align: center;">
					<h1>Components</h1>
					<label>Search</label>
					<input
						class="mb-4 ml-2"
						type="text"
						placeholder="Component Name"
						value={state.search}
						oninput={(e) => {
							state.search = e.target.value;
						}}
					/>
					<div class="input-icon-container no-select ml-n9">
						<span
							class="mdi mdi-magnify mdi-24px"
							style="position: relative; top: 6px; left: 3px"
						></span>
					</div>
					<span class="ml-4"></span>
					{buttonComponent('create', createApi)}
					<input
						class={`mb-4 ml-1 ${state.nameIsExist ? 'error' : ''}`}
						type="text"
						placeholder="Component Name"
						value={state.name}
						oninput={(e) => {
							state.name = e.target.value;
							const items = components.state.items.filter(
								(item) => item.name === state.name
							);
							if (items.length > 0) {
								state.nameIsExist = true;
							} else {
								state.nameIsExist = false;
							}
						}}
					/>
					<br />
					{state.nameIsExist ? (
						<span class="error-text">
							Component <strong>NAME</strong> is taken!{' '}
						</span>
					) : (
						[<br />]
					)}
				</div>
				<ul class="mt-2" style="height: 75vh; overflow-y: auto">
					{state.items.map((item) => (
						<li onclick={() => $ui.go('/edit/' + item.id)}>
							{item.name}
						</li>
					))}
				</ul>
			</div>
		);
	},
};
