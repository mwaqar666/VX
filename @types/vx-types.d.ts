declare global {
	type Primitive = string | number | boolean;

	type Nullable<T> = T | null;

	type Optional<T> = T | undefined;

	type Key<T> = keyof T;

	type Value<T> = T[Key<T>];

	type Delegate<T extends Array<unknown>, R> = (...args: T) => R;

	type Action<T extends Array<unknown>> = Delegate<T, void>;

	type PossibleArray<T> = T | Array<T>;

	type Constructable<T, TArgs extends Array<never> = Array<never>> = new (...args: TArgs) => T;

	type PartialOnly<T, K extends Key<T>> = Partial<Pick<T, K>> & Omit<T, K>;

	type Without<T, R> = { [K in Exclude<Key<T>, Key<R>>]?: never };

	type SingleExclusiveUnion<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

	type ExclusiveUnion<T extends Array<unknown>> = T extends [infer Only] ? Only : T extends [infer First, infer Second, ...infer Rest] ? ExclusiveUnion<[SingleExclusiveUnion<First, Second>, ...Rest]> : never;

	interface IKeyValuePair<K, V> {
		key: K;
		value: V;
	}

	type MappedEntry<T> = { [K in Key<T>]: IKeyValuePair<K, T[K]> };

	type IEntry<T> = MappedEntry<T>[Key<T>];

	type IEntryKey<T> = IEntry<T>["key"];

	type IEntryValue<T> = IEntry<T>["value"];

	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface String {
		toTitleCase(): string;
	}

	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface Object {
		vxKeyEntries<T>(): Array<Key<T>>;

		vxKeyMap<T, R = T>(delegate: Delegate<[IEntry<T>, number], IEntryKey<R>>): R;

		vxValueEntries<T>(): Array<Value<T>>;

		vxValueMap<T, R = T>(delegate: Delegate<[IEntry<T>, number], IEntryValue<R>>): R;

		vxKeyValueEntries<T>(): Array<IEntry<T>>;

		vxKeyValueMap<T, R = T>(delegate: Delegate<[IEntry<T>, number], IEntry<R>>): R;
	}
}

export {};
