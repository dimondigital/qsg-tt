import { Container } from "pixi.js";
import { Subscription } from "rxjs";

export class AScreen {
    _view: Container;
    _mc: Container;
    protected _clickSub: Subscription;
    protected _mouseOver: Subscription;
    protected _mouseOut: Subscription;
    protected destroyed: boolean;

    constructor(mainContainer: Container) {
        this._view = new Container();
        this._mc = mainContainer;
        this._mc.addChild(this._view);
    }

    destroy(): void {
        this._mc.removeChild(this._view);
    }

    init(): void {}

    get view(): Container { return this._view; }
}