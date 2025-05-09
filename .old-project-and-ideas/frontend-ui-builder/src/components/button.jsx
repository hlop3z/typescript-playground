import Css from '@/plugins/styleCss.js';

export default {
	oninit(vnode) {
		vnode.state.style = Css.style(vnode.attrs.props);
	},
	view(vnode) {
		const { style } = vnode.state;
		const { onclick, text } = vnode.attrs;
		return (
			<button
				onclick={onclick}
				style={style.css + vnode.attrs.style}
				class={vnode.attrs.class}
			>
				{!vnode.attrs.icon ? null : (
					<span class={`mr-1 mdi ${vnode.attrs.icon}`}></span>
				)}
				{text}
			</button>
		);
	},
};
