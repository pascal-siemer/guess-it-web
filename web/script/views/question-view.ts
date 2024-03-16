import {Question} from "../data/question.js";
import {DOM} from "../../DOM.js";
import {ChoiceView} from "./choice-view.js";

export class QuestionView implements View<Question> {

    private static template: string = `
        <div class="question-view">
            <h2 class="question-prompt"></h2>
        </div>
    `.trim();

    private _fragment: DocumentFragment;
    private _model: Question;

    private _view: HTMLDivElement;
    private _prompt: HTMLHeadingElement;
    private _choices: ChoiceView[];

    public get model() { return this._model;}
    public set model(data: Question) { this.update(_ => data); }

    public constructor(model: Question) {
        this._fragment = DOM.instanciate(QuestionView.template);
        this._model = model;

        this._view = this._fragment.querySelector('.question-view')!;
        this._prompt = this._fragment.querySelector('.question-prompt')!
        this._choices = [];

        this.update(_ => _);
    }

    public render(root: HTMLElement): void {
        root.append(this._fragment);
    }

    public update(fn: (model: Question) => Question): void {
        this._model = fn(this._model);

        if (this._prompt.innerText !== this._model.prompt) {
            this._prompt.innerText = this._model.prompt;
        }

        const length = Math.max(this._model.choices.length, this._choices.length);
        for (let index = 0; index < length; index++) {

           const updatedModel = this._model.choices[index];
           const choiceView = this._choices[index];

           if (updatedModel && choiceView) {
               choiceView.update(model => {
                   model.message = updatedModel.message;
                   return model;
               });
               continue;
           }

           if (updatedModel) {
               const choiceView = new ChoiceView(updatedModel);
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

    public destroy(): void {
        this._view.remove();
    }

}