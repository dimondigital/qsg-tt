import EventEmitter from 'eventemitter3';
import { PixelateFilter } from 'pixi-filters';
import * as PIXI from 'pixi.js';
import { Container, EventSystem, Renderer } from 'pixi.js';
import { GameScreen } from './game-screen';
import { GameoverScreen } from './gameover-screen';
import { MenuScreen } from './menu-screen';

export class ScreenManager {

    private app: PIXI.Application;
    private mainContainer: Container;

    initGameScreen = (() => {
        const gameScreen = new GameScreen(this.mainContainer, this.initGameoverScreen);
    }); 

    initMenuScreen = (() => {
        const menuScreen = new MenuScreen(this.mainContainer, this.initGameScreen);
    });

    initGameoverScreen = (() => {
        const gameoverScreen = new GameoverScreen(this.mainContainer, this.initGameScreen);
    });

    // entry view point
    constructor() {
        this.initMain();
        this.initMenuScreen();
    }

    initMain() {
        this.app = new PIXI.Application({
            view: document.getElementById('canvas') as HTMLCanvasElement
        });
        document.body.appendChild(this.app.view as HTMLCanvasElement);

        // global pixelate filter
        const pixelFilter = new PixelateFilter(2);
        this.mainContainer = new Container();
        // this.mainContainer.filters = [pixelFilter];

        this.app.stage.addChild(this.mainContainer);

        this.app.ticker.add(this.gameLoop);
    }

    

    gameLoop(){
        requestAnimationFrame(this.gameLoop);
        renderer.render(stage);
        // for(let ch of this.mainContainer.children) {
        //     ch.render(this.app.stage);
        // }
        
    }

}