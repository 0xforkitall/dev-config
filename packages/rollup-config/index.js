'use strict';

const path = require('path');
const { visualizer } = require('rollup-plugin-visualizer');
const cleanup = require('rollup-plugin-delete');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const images = require('@rollup/plugin-image');
const preserveDirectives = require('rollup-plugin-preserve-directives').default;
const svgr = require('@svgr/rollup');
const terser = require('@rollup/plugin-terser');

/**
 * Builds the configuration for Rollup.
 * @param {Object=} config Options to customise the Rollup configs.
 * @param {?string} config.packagePath Path to package.json file, defaults to './package.json'
 * @param {?string} config.tsConfigPath Path to tsconfig.json file, defaults to './tsconfig.json'
 * @param {?boolean} config.analyze Analyzes the bundle size when set to true, defaults to checking the ANALYZE environment variable
 * @returns {import('rollup').RollupOptions} Rollup configuration options.
 */
const buildConfigs = (config) => {
    const { tsConfigPath = './tsconfig.json', analyze = process.env.ANALYZE === 'true' } = config ?? {};

    const tsConfigFile = require(path.join(process.cwd(), tsConfigPath));
    const { outDir = 'dist' } = tsConfigFile.compilerOptions ?? {};

    const outputFormats = ['es', 'cjs'];

    /** @type {import('rollup').RollupOptions} */
    const configs = {
        input: {
            index: './src/index.ts',
        },
        output: outputFormats.map((format) => ({
            format,
            dir: outDir,
            entryFileNames: '[name].[format].js',
            sourcemap: true,
            interop: 'auto',
            plugins: [analyze ? visualizer({ filename: `stats.${format}.html`, open: true }) : undefined],
            preserveModules: true,
            preserveModulesRoot: 'src',
        })),
        external: (id) => !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('\0'),
        plugins: [
            // Cleaup dist folder
            cleanup({ targets: `${outDir}/*` }),

            // Resolve eventual 3rd-party dependency skipping the ones listed as externals
            nodeResolve(),

            // Convert 3rd-party CommonJs modules to ES6
            commonjs(),

            // Emits types
            typescript({
                compilerOptions: {
                    noEmit: false,
                    declaration: true,
                    emitDeclarationOnly: true,
                    declarationDir: `${outDir}/types`,
                    jsx: 'react-jsx',
                    outDir,
                },
                exclude: ['**/*.spec.tsx', '**/*.spec.ts', '**/*.test.tsx', '**/*.test.ts', '**/*.stories.tsx'],
            }),

            // Bundle images
            images({ include: ['**/*.png', '**/*.jpg'] }),

            // Export svgs as React components
            svgr(),

            // Preserve 'use client' directives as removed by default by Rollup
            preserveDirectives(),

            // Minify bundle
            terser({
                compress: { directives: false },
            }),
        ],
        onwarn: (warning, warn) => {
            const { code, message } = warning;
            const isUseClientWarning = code === 'MODULE_LEVEL_DIRECTIVE' && message.includes('use client');

            if (isUseClientWarning) {
                return;
            }

            warn(warning);
        },
    };

    return configs;
};

module.exports = { buildConfigs };
