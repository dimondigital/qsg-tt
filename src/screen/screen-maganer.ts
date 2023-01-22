import EventEmitter from 'eventemitter3';
import { PixelateFilter } from 'pixi-filters';
import * as PIXI from 'pixi.js';
import { Container, EventSystem, Renderer } from 'pixi.js';
import { GEventType } from '../global-event/GEventType';
import { IGEventListener } from '../global-event/IGEventListener';
import { GameScreen } from './game-screen';
import { MenuScreen } from './menu-screen';

delete Renderer.__plugins.interaction;

export class ScreenManager implements IGEventListener {

    private app: PIXI.Application;
    private mainContainer: Container;

    // entry view point
    constructor() {
        this.initMain();
        this.initMenuScreen();

        var events = new EventEmitter()
        // this.mainContainer.addSystem(EventSystem, 'events');
        this.mainContainer.on(GEventType.START_GAME, () => {
            console.log('gotcha');
        });
    }

    initMain() {
        this.app = new PIXI.Application({
            view: document.getElementById('canvas') as HTMLCanvasElement
        });
        document.body.appendChild(this.app.view as HTMLCanvasElement);

        // init app events
        // Assuming your renderer is at "app.renderer"
        if (!('events' in this.app.renderer)) {
            //@ts-ignore
            this.app.renderer.addSystem(EventSystem, 'events');
        }

        // global pixelate filter
        const pixelFilter = new PixelateFilter(2);
        this.mainContainer = new Container();
        this.mainContainer.filters = [pixelFilter];

        this.app.stage.addChild(this.mainContainer);
        // app.ticker.add(() => {
            // cat.rotation += 0.01;
        // })

    }

    initMenuScreen() {
        const menuScreen = new MenuScreen(this.mainContainer);
        this.app.stage.addChild(menuScreen.view);
    }

    initGameScreen() {
        const gameScreen = new GameScreen(this.mainContainer);
        this.app.stage.addChild(gameScreen.view);
    }

    listenGlobalEvents(eventType: GEventType): void {
        
        console.log('gotcha');
        switch(eventType) {
            case GEventType.START_GAME:
                this.initGameScreen();
        }
    }

}