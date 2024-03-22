import {Observable} from "../mechanics/observable";

export interface Observer<Value> {
    observe(value: Observable<Value>): void;
}