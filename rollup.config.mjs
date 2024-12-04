import copy from 'rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';

export default {
	input: 'src/index.js',

	output: {
		file: 'dist/index.js',
		format: 'esm'
	},

	plugins: [
		resolve(),
		copy({
			targets: [
				{ src: 'src/index.html', dest: 'dist' },
				{ src: 'src/main.css', dest: 'dist' },
				{ src: 'src/assets', dest: 'dist' }
			]
		})
	]
};
