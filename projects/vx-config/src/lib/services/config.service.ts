import { Injectable } from "@angular/core";
import { ConfigNotFoundException } from "@vx/config/exceptions";
import { IConfig } from "@vx/config/interfaces";

@Injectable()
export class ConfigService implements IConfig {
	private _config: Record<string, unknown> = {};

	public get<C>(key: string): C {
		const config: Optional<C> = this._config[key] as Optional<C>;

		if (config) return config;

		throw new ConfigNotFoundException(key);
	}

	public set<C>(key: string, config: C): void {
		this._config[key] = config;
	}
}
