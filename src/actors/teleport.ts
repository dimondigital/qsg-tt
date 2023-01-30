import { AnimatedSprite, Container } from "pixi.js";
import * as PIXI from 'pixi.js';

export class Teleport {

    _view: Container;

    constructor(mainContainer: Container) {
        this._view = new Container();
        
        mainContainer.addChild(this._view);

        this.init();
    }

    init() {
        const sheet = PIXI.Texture.from('assets/teleport_1282.png'), 
        w = 128, h = 64, numFrames = 4;

        let teleportSheet: any = {};
        teleportSheet['static'] = [
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(0, 0, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(0, h * 1, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(0, h * 2, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(0, h * 3, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(0, h * 4, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(0, 0, w, h))
        ];

        const tlprtStatic = new AnimatedSprite(teleportSheet['static']);
        tlprtStatic.loop = false;
        tlprtStatic.animationSpeed = .25;
        tlprtStatic.gotoAndStop(0);
        tlprtStatic.x = 800 / 2 - w / 2;
        tlprtStatic.y = 600 / 2 - h / 2;

        tlprtStatic.interactive = true;
        // TODO: hitarea
        tlprtStatic.onmouseup = (event) => {
            tlprtStatic.gotoAndPlay(1);
        }

        this._view.addChild(tlprtStatic);
    }

    get view(): Container { return this._view; }
}