import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import { fileURLToPath } from 'node:url'
import ts from 'typescript-eslint'
import svelteConfig from './svelte.config.js'

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url))

export default ts.config(
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs.recommended,
    prettier,
    ...svelte.configs.prettier,
    {
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
        },
        rules: {
            // typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
            // see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
            'no-undef': 'off',
            // General ESLint rules
            'no-unused-vars': 'off', // Turn off base rule
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_' },
            ],
            'no-console': 'warn',
            'no-debugger': 'warn',

            // Svelte-specific rules
            'svelte/no-at-html-tags': 'error',
            'svelte/no-target-blank': 'error',
            'svelte/no-at-debug-tags': 'warn',
            'svelte/no-reactive-functions': 'error',
            'svelte/no-reactive-literals': 'error',
            'svelte/require-store-reactive-access': 'error',
            'svelte/valid-compile': 'error',

            // Style preferences
            'svelte/html-quotes': ['error', { prefer: 'double' }],
            'svelte/mustache-spacing': 'error',
            'svelte/no-spaces-around-equal-signs-in-attribute': 'error',
            'svelte/shorthand-attribute': 'error',
            'svelte/shorthand-directive': 'error',
            'svelte/spaced-html-comment': 'error',
        },
        ignores: ['node_modules/', 'build/', 'dist/', '.svelte-kit/', '*.cjs'],
    },
    {
        files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                extraFileExtensions: ['.svelte'],
                parser: ts.parser,
                svelteConfig,
            },
        },
    }
)