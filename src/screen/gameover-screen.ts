import EventEmitter from "eventemitter3";
import { Container, Graphics, Rectangle, Text } from "pixi.js";
import { fromEvent } from "rxjs";
import { AppEvent } from "../event/app-event";
import { EventManager } from "../event/event-manager";
import { GameConfig } from "../game-config";
import { AScreen } from "./a-screen";

export class GameoverScreen extends AScreen {
    
    constructor(mainContainer: Container) {
        super(mainContainer);
    }

    public override init(): void {
        
        // bg
        const bg = new Graphics();
        bg.beginFill(0x000000, 1);
        bg.drawRect(0, 0, GameConfig.GAMESCREEN_WIDTH, GameConfig.GAMESCREEN_HEIGHT);
        bg.endFill();
        // this._mc.removeChildren();
        // this._mc.addChild(this.view);
        this._mc.addChild(bg);

        // header
        const header = new Text('Gameover Screen', {
            fontFamily: 'Georgia',
            fontSize: 15,
            fill: 0xffffff,
            align: 'left'
        })
        this._mc.addChild(header);

        // start game button
        let button = new Text('start new game', {
            fill: 0xffffff,
            fontFamily: 'Georgia',
            fontSize: 15,
            align: 'center',
            
        })
        button.y = 50;
        this._mc.addChild(button);
        button.interactive = true;

        const src = fromEvent(button, 'click');
        this._clickSub = src.subscribe((e) => {
            EventManager.eventStream$.next({e: AppEvent.GAME_INIT, props: this});
        });
    }

    public override destroy(): void {
        this._clickSub.unsubscribe();
        super.destroy();
    }

}