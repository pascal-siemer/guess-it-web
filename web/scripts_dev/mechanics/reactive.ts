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
        this.report();
    }

    public watch(observe: Observe<Instance>): void {;
        this._subscribers.push(observe);
    }

    public ignore(observe: Observe<Instance>) {
        this._subscribers.filter(fn => fn !== observe);
    }

    private report() {
        for (const observe of this._subscribers) {
            observe(this._instance);
        }
    }
}
