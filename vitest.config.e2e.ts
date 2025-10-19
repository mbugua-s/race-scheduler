import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
	test: {
		include: ['**/*.e2e-spec.ts'],
		globals: true,
		alias: {
			'@src': './src',
			'@test': './test',
		},
		root: './',
	},
	resolve: {
		alias: {
			src: resolve(__dirname, './src'),
			test: resolve(__dirname, './test'),
		},
	},
	plugins: [swc.vite()],
});
