import { Delegate, IEntry, IEntryKey, IEntryValue, Key, Value } from "@vx/types";

Object.defineProperties(Object.prototype, {
	vxKeyEntries: {
		value: function <T>(): Array<Key<T>> {
			return Object.keys(this) as Array<Key<T>>;
		},
		writable: false,
		configurable: false,
		enumerable: false,
	},
	vxKeyMap: {
		value: function <T, R = T>(delegate: Delegate<[IEntry<T>, number], IEntryKey<R>>): R {
			return Object.fromEntries(
				this.vxKeyValueEntries().map((entry: IEntry<T>, index: number): [IEntryKey<R>, IEntryValue<T>] => {
					const key: IEntryKey<R> = delegate(entry, index);

					return [key, entry.value];
				}),
			) as R;
		},
		writable: false,
		configurable: false,
		enumerable: false,
	},
	vxValueEntries: {
		value: function <T>(): Array<Value<T>> {
			return Object.values(this);
		},
		writable: false,
		configurable: false,
		enumerable: false,
	},
	vxValueMap: {
		value: function <T, R = T>(delegate: Delegate<[IEntry<T>, number], IEntryValue<R>>): R {
			return Object.fromEntries(
				this.vxKeyValueEntries().map((entry: IEntry<T>, index: number): [IEntryKey<T>, IEntryValue<R>] => {
					const value: IEntryValue<R> = delegate(entry, index);

					return [entry.key, value];
				}),
			) as R;
		},
		writable: false,
		configurable: false,
		enumerable: false,
	},
	vxKeyValueEntries: {
		value: function <T>(): Array<IEntry<T>> {
			return Object.entries<T>(this).map(([key, value]): IEntry<T> => ({ key, value }) as IEntry<T>);
		},
		writable: false,
		configurable: false,
		enumerable: false,
	},
	vxKeyValueMap: {
		value: function <T, R = T>(delegate: Delegate<[IEntry<T>, number], IEntry<R>>): R {
			return Object.fromEntries(
				this.vxKeyValueEntries().map((entry: IEntry<T>, index: number): [IEntryKey<R>, IEntryValue<R>] => {
					const { key, value }: IEntry<R> = delegate(entry, index);

					return [key, value];
				}),
			) as R;
		},
		writable: false,
		configurable: false,
		enumerable: false,
	},
});
