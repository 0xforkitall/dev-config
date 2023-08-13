'use strict';

const lintExtends = [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:testing-library/react',
];

const lintExtendsTypescript = [...lintExtends, 'plugin:@typescript-eslint/recommended'];

const rules = {
    'no-console': 'warn',
    'padding-line-between-statements': ['warn', { blankLine: 'always', prev: '*', next: 'return' }],
    curly: 'warn',
    'brace-style': 'warn',
    'prefer-template': 'warn',
    'no-useless-concat': 'warn',
    'import/no-cycle': ['warn', { maxDepth: 10 }],
    'react/self-closing-comp': 'warn',
    'react/prop-types': 'off',
    'react/no-unknown-property': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
};

const rulesTypescript = {
    ...rules,
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],
    '@typescript-eslint/consistent-type-imports': ['warn', { fixStyle: 'inline-type-imports' }],
};

module.exports = {
    env: {
        es6: true,
        commonjs: true,
        browser: true,
        node: true,
        jest: true,
    },
    extends: lintExtends,
    plugins: ['@typescript-eslint', 'import'],
    rules: rules,
    parser: '@typescript-eslint/parser',
    settings: {
        react: {
            version: 'detect',
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: true,
            node: true,
        },
    },
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            extends: lintExtendsTypescript,
            rules: rulesTypescript,
        },
    ],
};
