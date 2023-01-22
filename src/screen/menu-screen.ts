import EventEmitter from "eventemitter3";
import { Container, Text, TextStyle } from "pixi.js";
import { GEventType } from "../global-event/GEventType";
import { AScreen } from "./a-screen";

export class MenuScreen extends AScreen {
    constructor(mainContainer: Container) {
        super();

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
        // button.buttonMode = true;
        button.on('click', this.startGame)
    }

    startGame() {
        // console.log('event');
        let event = new EventEmitter();
        event.emit(GEventType.START_GAME, this);
        // this.view.emit(GEventType.START_GAME);
        // super.generateGlobalEvent(GEventType.START_GAME);
    }
}