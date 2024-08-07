import Joi from "joi";
import { IApiConfig, IApplePayConfig, IConfigType, IConfigValidation, IPaymentConfig, IStorageConfig } from "@app/config/types";
import { Environment } from "@app/config/enum";
import { ApiProtocol } from "@app/api-gateway/enums";
import { StorageAdapter } from "@app/storage/enums";

export const ConfigValidation: Joi.ObjectSchema<IConfigValidation<IConfigType>> = Joi.object<IConfigValidation<IConfigType>>({
	env: Joi.string()
		.optional()
		.valid(...Object.values(Environment))
		.default(Environment.DEV),
	api: Joi.object<IConfigValidation<IApiConfig>>({
		protocol: Joi.string()
			.optional()
			.valid(...Object.values(ApiProtocol))
			.default(ApiProtocol.HTTP),
		baseUrl: Joi.string().required(),
	}),
	storage: Joi.object<IConfigValidation<IStorageConfig>>({
		adapter: Joi.string()
			.optional()
			.valid(...Object.values(StorageAdapter))
			.default(StorageAdapter.LOCAL_STORAGE),
	}),
	payment: Joi.object<IPaymentConfig>({
		apple: Joi.object<IApplePayConfig>({
			version: Joi.number().required(),
			sessionUrl: Joi.string().required(),
			checkoutUrl: Joi.string().required(),
			countryCode: Joi.string().required(),
			methodIdentifier: Joi.string().required(),
			merchantIdentifier: Joi.string().required(),
			merchantCapabilities: Joi.array<string>().required(),
			supportedNetworks: Joi.array<string>().required(),
		}),
	}),
});
