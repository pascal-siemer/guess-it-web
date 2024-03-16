import {Identifier} from "./identifier.js";
import {Choice} from "./choice.js";
import {Identifiable} from "./interfaces/identifiable.js";
import {None, Option, Some} from "./option.js";

export class Question implements Identifiable {

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

    public static Test() {
        console.log('Hello World!');
    }

    public static Create(prompt: string, choices: Array<Choice>, answer: Choice): Option<Question> {
        const isSolvable = !!choices.find(choice => choice === answer);
        if (!isSolvable) {
            return new None();
        }

        const question = new Question(
            Identifier.random(),
            prompt,
            choices,
            answer
        );

        return new Some(question);
    }
}