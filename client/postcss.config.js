import autoprefixer from 'autoprefixer';
import purgecss from '@fullhuman/postcss-purgecss';
export default {
	plugins: [
		autoprefixer(),
		purgecss({
			content: ['./src/**/*.{astro,html,js,ts,jsx,md,mdx,svelte,tsx,vue}'],
			safelist: {
				standard: [],
				deep: [/class$/],
				greedy: [],
				keyframes: [],
				variables: [],
			},
			defaultExtractor: (content) => content.match(/[\w-/:%@]+(?<!:)/g) || [],
		}),
	],
};
