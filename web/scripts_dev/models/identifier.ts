import {UUID} from "./uuid.js";


export class Identifier {
    public value: UUID;

    private constructor(value: UUID) {
        this.value = value;
    }

    public static random() {
        const uuid = crypto.randomUUID();
        return new Identifier(uuid);
    }


}