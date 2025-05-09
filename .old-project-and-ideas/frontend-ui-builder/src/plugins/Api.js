export default function API(base) {
	const url = (endpoint) => {
		return base + endpoint;
	};
	return {
		transformHTML(template, script) {
			return m.request({
				method: 'POST',
				url: url('/mithril'),
				body: {
					code: template,
					script: script,
				},
			});
		},
		component(operation = null, variables = {}) {
			/*
            data = {
                operation: 'create',
                variables: { name: 'button' },
            };
            data = {
                operation: 'update',
                variables: { id: 2, name: 'cards' },
            };
            data = {
                operation: 'delete',
                variables: { id: 5 },
            };
            */
			return m.request({
				method: 'POST',
				url: url('/component'),
				body: {
					operation: operation,
					variables: variables,
				},
			});
		},
	};
}
