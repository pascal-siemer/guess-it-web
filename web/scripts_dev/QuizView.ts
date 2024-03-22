// import {HubConnectionBuilder} from "@microsoft/signalr";
// import {Question} from "./data/question";
// import {Choice} from "./data/choice";
// import {None, Option} from "./data/option";
//
// export class Quiz {
//
//     private entryElement: HTMLElement
//     private containerElement: HTMLElement
//     private connection: any
//
//     private promptElement: HTMLDivElement;
//     private choicesContainerElement: HTMLDivElement;
//
//     private currentQuestion: Option<Question>
//
//
//     public constructor(entry: HTMLElement) {
//         this.entryElement = entry;
//         this.promptElement = document.createElement('div');
//         this.choicesContainerElement = document.createElement('div');
//
//         this.currentQuestion = new None();
//
//         this.connection = new HubConnectionBuilder()
//             .withUrl("/hub")
//             .build();
//
//         this.connection.start();
//     }
//
//     private template(question: Question) {
//         const templateString = `
//         <div class="quiz">
//             <div class="prompt"></div>
//             <div class="choice-container">
//             ${question.choices?.map((choice, index) =>
//             {
//                 `<div id=${index}>${choice}</div>`
//             }) ?? ''}
//             </div>
//         </div>`.trim();
//
//         const template = document.createElement('template');
//         template.innerHTML = templateString;
//         return template;
//     }
//
//     private emptyQuestion() {
//         const answer = Choice.Create("");
//         return Question.Create('', [answer], answer).unwrap();
//     };
//
//     public display() {
//         const question = this.currentQuestion || this.emptyQuestion();
//         const template = this.template(question);
//         const content = template.content;
//
//     }
//
//
//
// }
