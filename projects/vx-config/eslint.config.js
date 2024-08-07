// @ts-check
const typescriptEslint = require("typescript-eslint");
const rootConfig = require("../../eslint.config.js");

module.exports = typescriptEslint.config(
	...rootConfig,
	{
		files: ["**/*.ts"],
		rules: {
			"@angular-eslint/directive-selector": [
				"error",
				{
					type: "attribute",
					prefix: "vx-config",
					style: "camelCase",
				},
			],
			"@angular-eslint/component-selector": [
				"error",
				{
					type: "element",
					prefix: "vx-config",
					style: "kebab-case",
				},
			],
		},
	},
	{
		files: ["**/*.html"],
		rules: {},
	},
);
