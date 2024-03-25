import {Identifier} from "./identifier.js";
import {Choice} from "./choice.js";
import {IdentifiableInterface} from "../interfaces/identifiable-interface.js";
import {None, Option, Some} from "../mechanics/option.js";

// falls Fabian drüberschaut, IdentifiableInterface sollte eig. Identifiable heißen. Das scheint sich beim Refactoren der Dateien geändert zu haben..

// TODO Setter-Validierung

export class Question implements IdentifiableInterface {

    public readonly identifier: Identifier;
    public prompt: string;
    public choices: Array<Choice>;
    public answer: Choice;

    private constructor(
        identifier: Identifier,
        prompt: string,
        choices: Array<Choice>,
        answer: Choice)
    {
        this.identifier = identifier;
        this.prompt = prompt;
        this.choices = choices;
        this.answer = answer;
    }

    public static create(prompt: string, choices: Array<Choice>, answer: Choice): Option<Question> {
        const question = new Question(
            Identifier.random(),
            prompt,
            choices,
            answer
        );

        return this.isSolvable(question)
            ? new Some(question)
            : new None();
    }

    public static isSolvable(question: Question): boolean {
        return !!question.choices.find(choice => choice === question.answer);
    }
}
