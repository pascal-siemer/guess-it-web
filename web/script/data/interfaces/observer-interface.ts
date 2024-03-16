import {Observable} from "../observable";

export interface Observer<Value> {
    observe(value: Observable<Value>): void;
}