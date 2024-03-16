import {Identifier} from "./identifier.js";
import {Identifiable} from "./interfaces/identifiable.js";

export class Choice implements Identifiable {

    public readonly identifier: Identifier;
    public message: string;

    private constructor(identifier: Identifier, message: string) {
        this.identifier = identifier;
        this.message = message;
    }

    public static Create(message: string): Choice {
        return new Choice(
            Identifier.random(),
            message
        );
    }


}