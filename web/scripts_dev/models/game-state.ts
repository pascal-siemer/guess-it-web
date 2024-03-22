import {Option, Some, None} from "../mechanics/option.js";
import {Question} from "./question.js";
import {Choice} from "./choice.js";

export class GameState {
    public question: Option<Question>;
    public selection: Option<Choice>;

    public constructor(question: Option<Question>, selection: Option<Choice>) {
        this.question = question;
        this.selection = selection;
    }

    public static init(): GameState {
        const prompt = "Ist dieser Satz falsch?";
        const answer = Choice.create("Err ääähm ehhh.... *explosion!");
        const choices = [
            Choice.create("Ja"),
            Choice.create("Nein"),
            answer
        ];

        const question = Question.create(prompt, choices, answer);
        return new GameState(question, new None<Choice>());
    }

    public prompt(): Option<string> {
        return this.question.map(item => new Some(item.prompt));
    }

    public choices(): Option<Choice[]> {
        return this.question.map(item => new Some(item.choices));
    }

    public choice(index: number): Option<Choice> {
        return this.question.map(item =>
            item.choices[index]
                ? new Some(item.choices[index]!)
                : new None<Choice>());
    }



}