import {QuestionView} from "./views/question-view.js";
import {GameState} from "./data/game-state.js";
import {Observable} from "./data/observable";

const body = document.body;
const entry = <HTMLElement>body.querySelector('.container')!;

const state = Observable.of(GameState.init());

const view = new QuestionView(state);
view.render(entry)


console.log("done!");