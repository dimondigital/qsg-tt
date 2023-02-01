import * as PIXI from 'pixi.js';
import { Container } from 'pixi.js';
import { AppEvent } from '../event/app-event';
import { EventManager } from '../event/event-manager';
import { AScreen } from './a-screen';
import { GameScreen } from './game-screen';
import { GameoverScreen } from './gameover-screen';
import { MenuScreen } from './menu-screen';

export enum ScreenName {
    MENU = 0, 
    GAME = 1,
    GAME_OVER = 2
}

export class GameController {

    public static app: PIXI.Application;
    private mainContainer: Container;
    private screens: AScreen[] = [];
    private currentScreen: AScreen;

    // entry view point
    constructor() {
        this.initMain();
        this.initMenuScreen();
    }

    initMenuScreen() {
        this.screens[ScreenName.MENU].init();
        this.currentScreen = this.screens[ScreenName.MENU];
    };

    initGameScreen() {
        this.screens[ScreenName.GAME].init();
        this.currentScreen = this.screens[ScreenName.GAME];
    }; 

    initGameoverScreen() {
        this.screens[ScreenName.GAME_OVER].init();
        this.currentScreen = this.screens[ScreenName.GAME_OVER];
    };

    initMain() {
        GameController.app = new PIXI.Application({
            view: document.getElementById('canvas') as HTMLCanvasElement
        });
        document.body.appendChild(GameController.app.view as HTMLCanvasElement);

        this.mainContainer = new Container();
        this.screens[ScreenName.MENU] = new MenuScreen(this.mainContainer);
        this.screens[ScreenName.GAME] = new GameScreen(this.mainContainer);
        this.screens[ScreenName.GAME_OVER] = new GameoverScreen(this.mainContainer);
        GameController.app.stage.addChild(this.mainContainer);

        EventManager.eventStream$
            .subscribe(({e, props}) => {
                switch(e) {
                    case AppEvent.GAME_INIT:
                        this.destroy();
                        this.initGameScreen();
                    break;
                    case AppEvent.GAME_OVER:
                        this.destroy();
                        this.initGameoverScreen();
                    break;
                }
        });
    }
    
    destroy(): void {
        this.currentScreen.destroy();
    }

}