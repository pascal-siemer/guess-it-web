import {Observable} from "../observable.js";

export interface Observer<Value> {
    observe(value: Observable<Value>): void;
}