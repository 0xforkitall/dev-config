'use strict';

const path = require('path');
const { visualizer } = require('rollup-plugin-visualizer');
const cleanup = require('rollup-plugin-delete');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const images = require('@rollup/plugin-image');
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
    const {
        packagePath = './package.json',
        tsConfigPath = './tsconfig.json',
        analyze = process.env.ANALYZE === 'true',
    } = config ?? {};

    const packageFile = require(path.join(__dirname, packagePath));
    const tsConfigFile = require(path.join(__dirname, tsConfigPath));

    const { outDir = 'dist' } = tsConfigFile.compilerOptions;

    const outputFormats = ['es', 'cjs'];

    /** @type {import('rollup').RollupOptions} */
    const configs = {
        input: {
            index: 'src/index.ts',
        },
        output: outputFormats.map((format) => ({
            format,
            dir: outDir,
            entryFileNames: '[name].[format].js',
            sourcemap: true,
            interop: 'auto',
            plugins: [analyze ? visualizer({ filename: `stats.${format}.html`, open: true }) : undefined],
        })),
        external: Object.keys(packageFile.dependencies),
        plugins: [
            cleanup({ targets: `${outDir}/*` }),
            nodeResolve(),
            commonjs(),
            typescript({
                compilerOptions: {
                    noEmit: false,
                    declaration: true,
                    emitDeclarationOnly: true,
                    declarationDir: `${outDir}/types`,
                    outDir,
                },
                exclude: ['**/*.spec.tsx', '**/*.spec.ts', '**/*.test.tsx', '**/*.test.ts', '**/*.stories.tsx'],
            }),
            images({ include: ['**/*.png', '**/*.jpg', '**/*.svg'] }),
            terser(),
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
