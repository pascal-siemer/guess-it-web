import {QuestionView} from "./views/question-view.js";
import {GameState} from "./models/game-state.js";
import {Observable} from "./mechanics/observable.js";
import {GameStateHub} from "./hubs/game-state-hub.js";

const body = document.body;
const entry = body.querySelector('.container')! as HTMLElement;
const state = Observable.of(GameState.init());
const hub = await GameStateHub.connect('http://localhost:8080/hub', state);
const view = new QuestionView(state);
view.render(entry)

console.log("done!");