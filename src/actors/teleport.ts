import { AnimatedSprite, Container, Graphics, Rectangle } from "pixi.js";
import * as PIXI from 'pixi.js';
import { GameController } from "../screen/screen-maganer";
import { Debugger } from "../debug/debug";

export class Teleport {

    _view: Container;
    _mc: Container;
    _animSprite: AnimatedSprite;
    hitRect: Graphics;
    hitArea: Container;

    constructor(mainContainer: Container) {
        this._view = new Container();
        this._mc = mainContainer;
        this.init();
    }

    init() {
        const sheet = PIXI.Texture.from('assets/teleport.png'), 
        w = 128, h = 64;

        let teleportSheet: any = {};
        teleportSheet['static'] = [
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(0, 0, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(0, h * 1, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(0, h * 2, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(0, h * 3, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(0, h * 4, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(0, 0, w, h))
        ];

        this._animSprite = new AnimatedSprite(teleportSheet['static']);
        this._animSprite.loop = false;
        this._animSprite.animationSpeed = .25;
        this._animSprite.gotoAndStop(0);
        

        this._animSprite.interactive = true;

        this._view.x = 800 / 2 - w / 2;
        this._view.y = 600 / 2 - h / 2;
        this._view.addChild(this._animSprite);
        

        // hit rect
        this.hitRect = new PIXI.Graphics();
        this.hitRect.beginFill(0xf29766, 1);
        this.hitRect.drawRect(40, 10, 50, 28);
        this._view.hitArea = new Rectangle(40, 10, 50, 28);
        this.hitRect.endFill();
        
        this._view.addChild(this.hitRect);
        this._mc.addChild(this._view);

        GameController.app.ticker.add(() => {
            if(Debugger.isDebug) {
                this.hitRect.alpha = .3;
            } else {
                this.hitRect.alpha = 0;
            }
        });
    }

    playTeleport() {
        this._animSprite.gotoAndPlay(1);
    }

    get view(): Container { return this._view; }
}