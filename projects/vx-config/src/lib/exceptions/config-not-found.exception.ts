export class ConfigNotFoundException extends Error {
	public constructor(key: string) {
		super(`Config with key [${key}] not found!`);
	}
}
