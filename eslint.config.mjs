// @ts-check
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig({
	ignores: ['eslint.config.mjs'],

	// Base ESLint, Prettier, and TypeScript recommended configs
	extends: [
		'eslint:recommended',
		...tseslint.configs.recommendedTypeChecked,
		'prettier',
	],

	languageOptions: {
		globals: {
			...globals.node,
			...globals.jest,
		},
		sourceType: 'commonjs',
		parserOptions: {
			projectService: true,
			tsconfigRootDir: import.meta.dirname,
		},
	},

	rules: {
		'@typescript-eslint/no-floating-promises': 'warn',
		'@typescript-eslint/no-unsafe-argument': 'warn',
		'prettier/prettier': ['error', { endOfLine: 'auto' }],
	},
});
