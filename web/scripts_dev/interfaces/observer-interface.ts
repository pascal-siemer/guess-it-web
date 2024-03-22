import {Observable} from "../mechanics/observable.js";

export interface Observer<Value> {
    observe(value: Observable<Value>): void;
}