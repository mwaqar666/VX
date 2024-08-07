import { Inject, InjectionToken, ModuleWithProviders, NgModule, Optional } from "@angular/core";
import { ConfigService, ConfigValidatorService } from "@vx/config/services";
import { IConfigWithKey } from "@vx/config/types";

export const CONFIG: InjectionToken<unknown> = new InjectionToken<unknown>("config");

@NgModule({
	providers: [ConfigService, ConfigValidatorService],
})
export class ConfigModule<M extends object> {
	public constructor(
		private readonly configService: ConfigService,
		private readonly configValidatorService: ConfigValidatorService,
		@Inject(CONFIG) @Optional() configWithKey: Nullable<IConfigWithKey<M>>,
	) {
		if (!configWithKey) return;

		this.configValidatorService.validate(configWithKey.config);
	}

	public static forFeature<C extends object>(key: string, config: C): ModuleWithProviders<ConfigModule<C>> {
		return {
			ngModule: ConfigModule<C>,
			providers: [
				{
					provide: CONFIG,
					useValue: { key, config },
				},
			],
		};
	}
}
