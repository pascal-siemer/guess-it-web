import {Identifier} from "./identifier";
import {IdentifiableInterface} from "../interfaces/identifiable-interface";

export class Choice implements IdentifiableInterface {

    public readonly identifier: Identifier;
    public message: string;

    private constructor(identifier: Identifier, message: string) {
        this.identifier = identifier;
        this.message = message;
    }

    public static create(message: string): Choice {
        return new Choice(
            Identifier.random(),
            message
        );
    }


}