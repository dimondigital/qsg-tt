import { Container } from "pixi.js";
import * as PIXI from 'pixi.js';
import EventEmitter from 'eventemitter3';

export class AScreen {
    _view: Container;
    _mc: Container;
    _cb: Function;

    constructor(mainContainer: Container, cb: Function) {
        this._view = new Container();
        this._mc = mainContainer;
        this._cb = cb;
        mainContainer.addChild(this._view);
    }

    initNextScreen() {
        this._view.visible = false;
        this._cb();
    }

    get view(): Container { return this._view; }
    get cb(): Function { return this._cb; }
}