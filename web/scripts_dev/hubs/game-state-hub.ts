import {HubConnection, HubConnectionBuilder} from "../../packages/signalr/index";
import {GameState} from "../models/game-state";
import {Observable} from "../mechanics/observable";
import {Question} from "../models/question";
import {Option, None, Some} from "../mechanics/option";
import {Choice} from "../models/choice";



export class GameStateHub {
    private _connection: HubConnection;
    private _gamestate: Observable<GameState>;

    private constructor(connection: HubConnection, gamestate: Observable<GameState>) {
        this._connection = connection;
        this._gamestate = gamestate;
        this.registerMethods();
    }

    public static async connect(url: string, gamestate: Observable<GameState>): Promise<GameStateHub> {
        const connection = new HubConnectionBuilder()
            .withUrl(url)
            .build();

        const hub = new GameStateHub(connection, gamestate);
        await connection.start();

        await hub.greet();
        return hub;
    }

    public async greet(): Promise<void> {
        this._connection.send("receiveGreeting","hello comrade!")
    }

    private registerMethods(): void {
        this._connection.on('receiveQuestion', this.receiveQuestionHandler.bind(this))
    }

    private receiveQuestionHandler(question: Question): void {
        this._gamestate.value.question = Question.isSolvable(question)
            ? new Some(question)
            : new None()

        this._gamestate.notify();
    }

    public sendSelection(selection: Option<Choice>): Promise<void> {
        return this._connection.send('receiveSelection', selection);
    }

}