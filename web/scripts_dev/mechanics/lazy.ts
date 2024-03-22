export class Lazy<T> {
    private _value: T | undefined;
    private _function: () => T;
    private _hasBeenEvaluated: boolean

    private constructor(fn: () => T) {
        this._value = undefined;
        this._function = fn;
        this._hasBeenEvaluated = false;
    }

    public static create<T>(fn: () => T): Lazy<T> {
        return new Lazy<T>(fn);
    }

    public get value(): T {
        if (this._hasBeenEvaluated) {
            return this._value!;
        }

        this._value = this._function();
        this._hasBeenEvaluated = true;
        return this._value;
    }
}
