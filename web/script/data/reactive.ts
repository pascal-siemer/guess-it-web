export type Observe<Instance> = (instance: Instance) => void;

export class Reactive<Instance> {
    private readonly _instance: Instance;
    private _subscribers: Observe<Instance>[];

    private constructor(instance: Instance) {
        this._instance = instance;
        this._subscribers = [];
    }

    public static of<Instance>(instance: Instance): Reactive<Instance> {
        return new Reactive<Instance>(instance);
    }

    public get instance() {
        return this._instance;
    }

    public update(fn: (instance: Instance) => void): void {
        fn(this._instance);
    }

    public watch(observe: Observe<Instance>): void {
        const subscriber = [this, observe];
        this._subscribers.push(subscriber);
    }

    public ignore(observe: Observe<Instance>) {
        this._subscribers.filter(fn => fn !== observe);
    }
}
