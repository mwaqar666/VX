// @ts-check
const eslint = require("@eslint/js");
const typescriptEslint = require("typescript-eslint");
const angularEslint = require("angular-eslint");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = typescriptEslint.config(
	{
		files: ["**/*.ts"],
		extends: [
			// Extensions
			eslint.configs.recommended,
			...typescriptEslint.configs.recommended,
			...typescriptEslint.configs.stylistic,
			...angularEslint.configs.tsRecommended,
			eslintPluginPrettierRecommended,
		],
		processor: angularEslint.processInlineTemplates,
		rules: {
			"@typescript-eslint/explicit-module-boundary-types": "error",
			"@typescript-eslint/explicit-function-return-type": "error",
			"@typescript-eslint/explicit-member-accessibility": "error",
			"@typescript-eslint/naming-convention": [
				"error",
				{
					selector: "interface",
					format: ["PascalCase"],
					custom: {
						regex: "^I[A-Z]",
						match: true,
					},
				},
			],
			"@typescript-eslint/array-type": [
				"error",
				{
					default: "generic",
				},
			],
		},
	},
	{
		files: ["**/*.html"],
		extends: [
			// Extensions
			...angularEslint.configs.templateRecommended,
			...angularEslint.configs.templateAccessibility,
		],
		rules: {
			"@angular-eslint/template/attributes-order": [
				"error",
				{
					alphabetical: true,
				},
			],
		},
	},
);
