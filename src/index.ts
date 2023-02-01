import "../src/main.css";
import '@pixi/spritesheet';
import { GameController } from "./screen/screen-maganer";
import { EventManager } from "./event/event-manager";
import { User } from "./user/user";
import { Debugger } from "./debug/debug";


export class App {
  eventManager = new EventManager();
  screenManager = new GameController();
  user = new User();
  debug = new Debugger();
}

new App();
