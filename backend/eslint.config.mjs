import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylisticJs from '@stylistic/eslint-plugin'
import prettierConfig from 'eslint-config-prettier'

export default defineConfig([
	js.configs.recommended,
	{
		files: ['**/*.{js,mjs,cjs}'],
		plugins: {
			js,
			'@stylistic/js': stylisticJs,
		},
		extends: ['js/recommended'],
		languageOptions: {
			globals: globals.node,
			ecmaVersion: 'latest',
			sourceType: 'commonjs',
		},
		rules: {
			'@stylistic/js/linebreak-style': ['error', 'unix'],
			'@stylistic/js/semi': ['error', 'never'],
			'@stylistic/js/quotes': ['error', 'single'],
			eqeqeq: 'error',
			'no-trailing-spaces': 'error',
			'object-curly-spacing': ['error', 'always'],
			'arrow-spacing': ['error', { before: true, after: true }],
			'no-console': 'off',
		},
	},
	{
		ignores: ['dist/**', '.mjs'],
	},
])
