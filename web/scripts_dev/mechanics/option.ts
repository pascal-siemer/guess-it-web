export type Option<T>
    = Some<T>
    | None<T>;

export class Some<T> {
    public readonly _value: T;

    public constructor(value: T) {
        this._value = value;
    }

    public isSome(): this is Some<T> {
        return true;
    }

    public isNone(): this is None<T> {
        return false;
    }

    public value(_default: T): T {
        return this._value;
    }

    public unwrap(): T {
        return this._value;
    }

    public map<Out>(fn: (value: T) => Option<Out>): Option<Out> {
        return fn(this._value);
    }
}

export class None<T> {
    public constructor() {}

    public isSome(): this is Some<T> {
        return false;
    }

    public isNone(): this is None<T> {
        return true;
    }

    public value(_default: T) {
        return _default;
    }

    public unwrap(): T {
        throw new Error("cannot unwrap None!!");
    }

    public map<Out>(fn: (value: T) => Option<Out>): Option<Out> {
        return new None();
    }
}