import {Server} from './server.js';

const port: number = 8000;
const path: string = '../web/';
new Server(port, path).Start();
