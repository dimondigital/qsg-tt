import EventEmitter from 'eventemitter3';
import { PixelateFilter } from 'pixi-filters';
import * as PIXI from 'pixi.js';
import { AnimatedSprite, Container, EventSystem, Renderer, Texture } from 'pixi.js';
import { GameScreen } from './game-screen';
import { GameoverScreen } from './gameover-screen';
import { MenuScreen } from './menu-screen';

export class ScreenManager {

    public static app: PIXI.Application;
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
        ScreenManager.app = new PIXI.Application({
            view: document.getElementById('canvas') as HTMLCanvasElement
        });
        document.body.appendChild(ScreenManager.app.view as HTMLCanvasElement);

        this.mainContainer = new Container();

        ScreenManager.app.stage.addChild(this.mainContainer);
    }
    

}