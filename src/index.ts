import "../src/main.css";
import { PixelateFilter } from 'pixi-filters';
import * as PIXI from 'pixi.js';
import { Application, Assets, Container, ICanvas, Sprite } from 'pixi.js';
import { NPC } from "./npc/npc";
import '@pixi/spritesheet';

const app = new PIXI.Application({
    view: document.getElementById('canvas') as HTMLCanvasElement
});
document.body.appendChild(app.view as HTMLCanvasElement);
const texture = await Assets.load('https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg');
// const cat = new Sprite(texture);

// cat.x = app.renderer.width / 2;
// cat.y = app.renderer.height / 2;

// cat.anchor.x = 0.5;
// cat.anchor.y = 0.5;

// filters
const pixelFilter = new PixelateFilter(2);
const container = new Container();
container.filters = [pixelFilter];

container.addChild(new NPC().view);
app.stage.addChild(container);

app.ticker.add(() => {
    // cat.rotation += 0.01;
})