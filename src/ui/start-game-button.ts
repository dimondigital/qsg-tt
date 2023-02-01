import { AnimatedSprite, Rectangle, Texture } from "pixi.js";
import { fromEvent, Subscription } from "rxjs";
import { AppEvent } from "../event/app-event";
import { EventManager } from "../event/event-manager";

export class StartGameButton {

    public animS: AnimatedSprite;
    private _mouseOver: Subscription;
    private _mouseOut: Subscription;
    private _mouseDown: Subscription;
    private _mouseClick: Subscription;

    constructor() {
        const buttonIDLE = new Texture(Texture.from('../assets/button.png').baseTexture, new Rectangle(286, 0, 286, 75));
        const buttonHOVER = new Texture(Texture.from('../assets/button.png').baseTexture, new Rectangle(0, 0, 286, 75));
        const buttonMOUSEDOWN = new Texture(Texture.from('../assets/button.png').baseTexture, new Rectangle(572, 0, 239, 63));
        const buttonSprite = new AnimatedSprite([buttonIDLE, buttonHOVER, buttonMOUSEDOWN]);

        this.animS = buttonSprite;

        this.animS.interactive = true;

        const srcMOUSEOVER = fromEvent(this.animS, 'mouseover');
        this._mouseOver = srcMOUSEOVER.subscribe((e) => {
            buttonSprite.texture = buttonHOVER;
        });

        const srcMOUSEOUT = fromEvent(this.animS, 'mouseout');
        this._mouseOut = srcMOUSEOUT.subscribe((e) => {
            buttonSprite.texture = buttonIDLE;
        });

        const srcMOUSEDOWN = fromEvent(this.animS, 'mousedown');
        this._mouseDown = srcMOUSEDOWN.subscribe((e) => {
            buttonSprite.texture = buttonMOUSEDOWN;
        });

        const srcMOUSEUP = fromEvent(this.animS, 'mouseup');
        this._mouseClick = srcMOUSEUP.subscribe((e) => {
            EventManager.eventStream$.next({e: AppEvent.GAME_INIT, props: this});
        });
    }

    destroy(): void {
        this._mouseOver.unsubscribe();
        this._mouseOut.unsubscribe();
        this._mouseDown.unsubscribe();
        this._mouseClick.unsubscribe();
    }
    

}