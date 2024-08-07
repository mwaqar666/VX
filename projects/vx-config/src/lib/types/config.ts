import { ZodBoolean, ZodNumber, ZodObject, ZodString } from "zod";

export interface IConfigWithKey<C> {
	key: string;
	config: C;
}

export type TConfigValidator<T> = T extends number
	? // Zod Number
		ZodNumber
	: T extends string
		? // Zod String
			ZodString
		: T extends boolean
			? // Zod Boolean
				ZodBoolean
			: T extends object
				? // Zod Object
					ZodObject<{ [K in Key<T>]: TConfigValidator<T[K]> }, "strip">
				: never;
