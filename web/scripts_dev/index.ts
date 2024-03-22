import {QuestionView} from "./views/question-view";
import {GameState} from "./models/game-state";
import {Observable} from "./mechanics/observable";
import {GameStateHub} from "./hubs/game-state-hub";

const body = document.body;
const entry = <HTMLElement>body.querySelector('.container')!;
const state = Observable.of(GameState.init());
const hub = await GameStateHub.connect('http://localhost:8080/hub', state);
const view = new QuestionView(state);
view.render(entry)

console.log("done!");