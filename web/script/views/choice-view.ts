import {Observer} from "../data/interfaces/observer-interface.js"
import {Observable} from "../data/observable";
import {Choice} from "../data/choice.js";
import {DOM} from "../../DOM.js";
import {Identifier} from "../data/identifier.js";
import {GameState} from "../data/game-state.js";
import {Some} from "../data/option.js";

export class ChoiceView implements ViewInterface, Observer<GameState> {

    private static _template: string = `
        <div class="choice-view">
            <p class="choice-message"></p>
        </div>
    `.trim();

    private _observable: Observable<GameState>;
    private _indexOfChoice: number;

    private _fragment: DocumentFragment;
    private _view: HTMLDivElement;
    private _message: HTMLDivElement;

    public constructor(observable: Observable<GameState>, indexOfChoice: number) {
        this._observable = observable;
        this._indexOfChoice = indexOfChoice;

        this._fragment = DOM.instanciate(ChoiceView._template);
        this._view = this._fragment.querySelector('.choice-view')!;
        this._message = this._fragment.querySelector('.choice-message')!;
    }

    private bindEvents(): void {
        this._view.addEventListener('click', this.onclick);
    }

    private unbindEvents(): void {
        this._view.removeEventListener('click', this.onclick);
    }

    public render(root: HTMLElement): void {
        this._observable.subscribe(this);
        this.observe(this._observable);
        root.append(this._fragment);
        this.bindEvents();
    }

    public destroy(): void {
        this.unbindEvents();
        this._view.remove();
        this._observable.unsubscribe(this);
    }

    public observe(observable: Observable<GameState>): void {
        const gamestate = observable.value;
        const choice = gamestate.choice(this._indexOfChoice);
        const selection = gamestate.selection;

        const message = choice.map(item => new Some(item.message)).value('');
        const isSelected = choice.isSome()
            && selection.isSome()
            && choice.unwrap() === selection.unwrap();

        this.update(message, isSelected);
    }

    private update(message: string, isSelected: boolean): void {
        if (this._message.innerText !== message) {
            this._message.innerText = message;
        }

        if (isSelected && !this._view.classList.contains('choice-selected')) {
            this._view.classList.add('choice-selected');
        }

        if (!isSelected && this._view.classList.contains('choice-selected')) {
            this._view.classList.remove('choice-selected');
        }
    }

    private onclick: (event: MouseEvent) => void = () => {
        const gamestate = this._observable.value;
        gamestate.selection = gamestate.choice(this._indexOfChoice);
        this._observable.value = gamestate;
    }

}