import "../src/main.css";
import { PixelateFilter } from 'pixi-filters';
import * as PIXI from 'pixi.js';
import { Application, Assets, Container, ICanvas, Sprite } from 'pixi.js';
import { NPC } from "./actors/npc";
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
 



// const texture = await Assets.load('https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg');
// const cat = new Sprite(texture);

// cat.x = app.renderer.width / 2;
// cat.y = app.renderer.height / 2;

// cat.anchor.x = 0.5;
// cat.anchor.y = 0.5;



// container.addChild(new NPC().view);
