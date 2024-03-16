import {GlobalState} from "./global-state.js";
import {Choice} from "./data/choice.js";
import {Question} from "./data/question.js";
import {QuestionView} from "./views/question-view.js";

const body = document.body;
const entry = <HTMLElement>body.querySelector('.container')!;

if (GlobalState.question.isSome()) {
    const question = GlobalState.question.value;
    const view = new QuestionView(question);
    view.render(entry);
}

console.log("done!");