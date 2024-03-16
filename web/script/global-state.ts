import {Option} from "./data/option.js";
import {Question} from "./data/question.js";
import {Choice} from "./data/choice.js";


export class GlobalState {

    public static _subscribers: any[] = [];

    public static _answer = Choice.Create("Err ääähm ehhh.... *explodion!");

    public static get answer(): Choice { return this._answer; }
    public static set answer(value: Choice) {
        this._answer = value;
        this.notify();
    }

    public static _question = Question.Create(
        "Ist dieser Satz falsch?",
        [
            Choice.Create("Ja"),
            Choice.Create("Nein"),
            this._answer
        ], this._answer);

    public static get question(): Option<Question> { return this._question; }

    public static set question(value: Option<Question>) {
        this._question = value;
        this.notify();
    }

    public static _selection: Choice | null = null;

    public static get selection(): Choice | null { return this._selection; }

    public static set selection(value: Choice | null) {
        this._selection = value;
        this.notify();
    }



    private static notify() {
        for (const subscriber of this._subscribers) {

        }
    }

}