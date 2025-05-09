import Css from '@/plugins/styleCss.js';

export default {
	oninit() {
		console.log(Css);
	},
	view() {
		return (
			<div>
				<button>Hello World</button>
			</div>
		);
	},
};
