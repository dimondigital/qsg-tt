import EventEmitter from "eventemitter3";
import { Container, EventBoundary, FederatedEvent, FederatedPointerEvent, Text, TextStyle } from "pixi.js";
import { fromEvent } from "rxjs";
import { AppEvent } from "../event/app-event";
import { EventManager } from "../event/event-manager";
import { AScreen } from "./a-screen";

export class MenuScreen extends AScreen {

    constructor(mainContainer: Container) {
        super(mainContainer);
    }

    public override init(): void {
        // header
        const header = new Text('Menu Screen', {
            fontFamily: 'Georgia',
            fontSize: 15,
            fill: 0xffffff,
            align: 'left'
        })
        this.view.addChild(header);

        // start game button
        let button = new Text('start game', {
            fill: 0xffffff,
            fontFamily: 'Georgia',
            fontSize: 15,
            align: 'center',
        })
        button.y = 50;
        this.view.addChild(button);
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