export interface IConfig {
	get<C>(key: string): C;

	set<C>(key: string, config: C): void;
}

export interface IConfigValidator {
	validate<C>(config: C): C;
}
