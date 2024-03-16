export type Option<T> = Some<T> | None;

export class Some<T> {
    public readonly value: T;

    public constructor(value: T) {
        this.value = value;
    }

    public isSome(): this is Some<T> {
        return true;
    }

    public isNone(): this is None {
        return false;
    }

    public unwrap(): T {
        return this.value;
    }

    public map<Out>(fn: (value: T) => Option<Out>): Option<Out> {
        return fn(this.value);
    }
}

export class None {
    public constructor() {}

    public isSome<T>(): this is Some<T> {
        return false;
    }

    public isNone(): this is None {
        return true;
    }

    public unwrap<T>(): T {
        throw new Error("cannot unwrap None!!");
    }

    public map<In, Out>(fn: (value: In) => Option<Out>): Option<Out> {
        return new None();
    }
}