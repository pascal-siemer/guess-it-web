import {DOM} from "../DOM";
import {ChoiceView} from "./choice-view";
import {Observable} from "../mechanics/observable";
import {Observer} from "../interfaces/observer-interface";
import {GameState} from "../models/game-state";

export class QuestionView implements ViewInterface, Observer<GameState> {

    private static template: string = `
        <div class="question-view">
            <h2 class="question-prompt"></h2>
        </div>
    `.trim();

    private _observable: Observable<GameState>

    private _fragment: DocumentFragment;
    private _view: HTMLDivElement;
    private _prompt: HTMLHeadingElement;
    private _choices: ChoiceView[];

    public constructor(observable: Observable<GameState>) {
        this._observable = observable;

        this._fragment = DOM.instanciate(QuestionView.template);
        this._view = this._fragment.querySelector('.question-view')!;
        this._prompt = this._fragment.querySelector('.question-prompt')!
        this._choices = [];
    }

    public render(root: HTMLElement): void {
        this._observable.subscribe(this);
        this.observe(this._observable);
        root.append(this._fragment);
    }

    public destroy(): void {
        this._view.remove();
        this._observable.unsubscribe(this);
    }

    public observe(observable: Observable<GameState>) {
        this.update(observable);
    }

    private update(observable: Observable<GameState>): void {
        const gamestate = observable.value;
        const prompt = gamestate.prompt().value('');
        const choices = gamestate.choices().value([]);

        if (this._prompt.innerText !== prompt) {
            this._prompt.innerText = prompt;
        }

        const length = Math.max(choices.length, this._choices.length);
        for (let index = 0; index < length; index++) {

            const updatedModel = choices[index];
            const choiceView = this._choices[index];

            if (updatedModel && choiceView) {
                continue;
            }

            if (updatedModel) {
                const choiceView = new ChoiceView(observable, index);
                this._choices.push(choiceView);
                choiceView.render(this._view);
                continue;
            }

            if (choiceView) {
                choiceView.destroy();
                this._choices = this._choices.filter(view => view != choiceView);
                continue;
            }

        }
    }


}