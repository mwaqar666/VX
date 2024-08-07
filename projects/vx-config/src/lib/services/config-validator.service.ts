import { Injectable } from "@angular/core";
import { IConfigValidator } from "@vx/config/interfaces";
import { TConfigValidator } from "@vx/config/types";

@Injectable()
export class ConfigValidatorService implements IConfigValidator {
	public validate<C extends object>(config: C): C {
		config.vxKeyValueMap<C, TConfigValidator<C>>().map((v: C) => {});
	}
}
