import API from '@/plugins/Api.js';

const Api = API('http://localhost:3000');

const state = {
	current: {},
	items: [],
};

const action = {
	list() {
		Api.component('list').then((response) => {
			state.items = response.data;
		});
	},
	get(id) {
		Api.component('get', { id: id }).then((response) => {
			state.current = response.data;
		});
	},
	create(form) {
		Api.component('create', form).then((response) => {
			action.list();
		});
	},
	update(form) {
		Api.component('update', form).then((res) => {
			if (!res.error) {
				action.get(form.id);
			}
		});
	},
	delete(id) {
		Api.component('delete', { id: id }).then((response) => {
			action.list();
		});
	},
};

export default {
	state,
	action,
	api: Api,
};
