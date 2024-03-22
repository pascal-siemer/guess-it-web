import {Observer} from "../interfaces/observer-interface.js";

export class Observable<Value> {

    private _value: Value;
    private _subscribers: Observer<Value>[] = [];

    private constructor(value: Value) {
        this._value = value;
    }

    public static of<Value>(value: Value): Observable<Value> {
        return new Observable(value);
    }


    public get value() {    
//  public get value(this: unknown) {
//      if (this.observe) {
//          subscrive(this);
//      }
        
        return this._value;
    }

    public set value(value: Value) {
        this._value = value;
        this.notify();
    }

    public subscribe(observer: Observer<Value>): void {
        this._subscribers.push(observer);
    }

    public unsubscribe(observer: Observer<Value>): void {
        this._subscribers = this._subscribers.filter(
            subscriber => subscriber !== observer
        );
    }

    public notify(): void {
        for (const subscriber of this._subscribers) {
            subscriber.observe(this);
        }
    }
}
