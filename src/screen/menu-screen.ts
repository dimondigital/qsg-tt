import EventEmitter from "eventemitter3";
import { Container, EventBoundary, FederatedEvent, FederatedPointerEvent, Text, TextStyle } from "pixi.js";
import { AScreen } from "./a-screen";

export class MenuScreen extends AScreen {
    _mainContainer:Container;
    _cb: Function;
    constructor(mainContainer: Container, cb: Function) {
        super(mainContainer, cb);
        this._cb = cb;
        this._mainContainer = mainContainer;

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

        var EE = new EventEmitter()
        , context = this;
        EE.once('click',this.initNextScreen, context);
        button.on('click', this.initNextScreen, context);
    }
}