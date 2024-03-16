import {Choice} from "../data/choice.js";
import {DOM} from "../../DOM.js";
import {Notifiable} from "../data/interfaces/notifiable.js";
import {GlobalState} from "../global-state.js"
import {Identifier} from "../data/identifier.js";

export class ChoiceViewModel {
    public choiceIdentifier: Identifier;
    public message: string;
    public isSelected: boolean;

    private constructor(choiceIdentifier: Identifier, message: string, isSelected: boolean) {
        this.choiceIdentifier = choiceIdentifier;
        this.message = message;
        this.isSelected = isSelected
    }

    public static create(choice: Choice) {
        return new ChoiceViewModel(choice.identifier, choice.message, false);
    }
}

export class ChoiceView implements View<ChoiceViewModel>, Notifiable {

    private static _template: string = `
        <div class="choice-view">
            <p class="choice-message"></p>
        </div>
    `.trim();

    private _fragment: DocumentFragment;
    private _model: ChoiceViewModel;

    private _view: HTMLDivElement;
    private _message: HTMLDivElement;


    public get model() { return this._model; }
    public set model(data: ChoiceViewModel) { this.update(_ => data); }

    public constructor(model: Choice) {
        this._fragment = DOM.instanciate(ChoiceView._template);
        this._model = ChoiceViewModel.create(model);

        this._view = this._fragment.querySelector('.choice-view')!;
        this._message = this._fragment.querySelector('.choice-message')!;

        this.update(_ => _);
    }

    public render(root: HTMLElement): void {
        root.append(this._fragment);
    }

    public update(fn: (model: ChoiceViewModel) => ChoiceViewModel): void {
        this._model = fn(this._model);

        if (this._message.innerText !== this._model.message) {
            this._message.innerText = this._model.message;
        }

        if (this._model.isSelected && !this._view.classList.contains('.choice-selected')) {
            this._view.classList.add('.choice-selected');
        }

        if (!this._model.isSelected && this._view.classList.contains('.choice-selected')) {
            this._view.classList.remove('.choice-selected');
        }
    }

    public destroy(): void {
        this._view.remove();
    }

    receive(): void {
         this.update(model => {
             if (GlobalState.question.isNone()) {
                 return model;
             }

             const question = GlobalState.question.unwrap();

             for (const choice of question.choices) {
                 if (this._model.choiceIdentifier !== choice.identifier) {
                     continue;
                 }

                 this.model.message = choice.message;
             }


             this.model.isSelected = !!GlobalState.selection
                 && GlobalState.selection.identifier === this.model.choiceIdentifier;



             return this.model;
         })
    }

}