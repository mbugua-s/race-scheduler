import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';

export default defineConfig([
	{
		ignores: [
			'eslint.config.mjs',
			'**/.husky/**',
			'**/generated/**',
			'**/node_modules/**',
			'**/dist/**',
			'commitlint.config.js',
		],
	},

	js.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,

	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
			sourceType: 'commonjs',
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			'@typescript-eslint/no-floating-promises': 'warn',
			'@typescript-eslint/no-unsafe-argument': 'warn',
		},
	},

	{
		files: ['src/common/mocks/**/*.{ts,tsx,js,jsx}'],
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
		},
	},
]);
