'use strict';

module.exports = {
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    rules: {
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],
        '@typescript-eslint/consistent-type-imports': ['warn', { fixStyle: 'inline-type-imports' }],
        'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
        'import/no-cycle': ['warn', { maxDepth: 10 }],
        'import/no-duplicates': 'warn',
        'no-console': 'warn',
        'newline-before-return': 'warn',
        curly: 'warn',
        'brace-style': 'warn',
        'react/self-closing-comp': 'warn',
        'prefer-template': 'warn',
        'no-useless-concat': 'warn',
    }
};
