const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const globals = require("globals");
const parser = require("astro-eslint-parser");
const tsParser = require("@typescript-eslint/parser");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    extends: compat.extends("eslint:recommended"),

    languageOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        parserOptions: {},

        globals: {
            ...globals.browser,
            ...globals.node,
            console: "readonly",
            process: "readonly",
            Buffer: "readonly",
            Map: "readonly",
            Set: "readonly",
            IntersectionObserver: "readonly",
        },
    },

    rules: {
        "no-unused-vars": "warn",
        "no-undef": "off",
    },
}, {
    files: ["**/*.astro"],
    extends: compat.extends("plugin:astro/recommended"),

    languageOptions: {
        parser: parser,

        parserOptions: {
            parser: "@typescript-eslint/parser",
            extraFileExtensions: [".astro"],
        },

        globals: {
            ...globals.browser,
            ...globals.node,
        },
    },
}, {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 2022,
        sourceType: "module",
        parserOptions: {},

        globals: {
            ...globals.browser,
            ...globals.node,
        },
    },
}, globalIgnores(["**/dist/", "**/node_modules/", "**/*.config.js", "**/*.config.mjs"])]);