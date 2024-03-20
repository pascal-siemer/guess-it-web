import {QuestionView} from "./views/question-view.js";
import {GameState} from "./data/game-state.js";
import {Observable} from "./data/observable.js";
import {GameStateHub} from "./hubs/game-state-hub.js";

const body = document.body;
const entry = <HTMLElement>body.querySelector('.container')!;
const state = Observable.of(GameState.init());
const hub = await GameStateHub.connect('http://localhost:8080', state);
const view = new QuestionView(state);
view.render(entry)

console.log("done!");