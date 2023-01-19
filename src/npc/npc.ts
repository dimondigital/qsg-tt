import { AnimatedSprite, Application, Assets, BaseTexture, ColorMatrixFilter, Container, Filter, Loader, ObservablePoint, Sprite, Spritesheet, Texture } from "pixi.js";
import * as PIXI from 'pixi.js';
import sheetData from "../assets/run-up.json";
import { GlowFilter } from "pixi-filters";
const texture = await PIXI.Texture.from('assets/run-up.png');
import gsap from "gsap";

export class NPC {

    private _view: Container;

    constructor() {
        this._view = new Container();
       
        const sheet = PIXI.Texture.from('assets/adt_minotaur_shaman.png');
        const w = 140;
        const h = 140;
        const numFrames = 8;

        let npcSheet: any = {};
        npcSheet['runUp'] = [
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 1, 0, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 2, 0, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 3, 0, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 4, 0, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 5, 0, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 6, 0, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 7, 0, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 8, 0, w, h))
        ];
        npcSheet['runDown'] = [
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 1, h * 4, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 2, h * 4, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 3, h * 4, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 4, h * 4, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 5, h * 4, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 6, h * 4, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 7, h * 4, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 8, h * 4, w, h))
        ];
        npcSheet['runLeft'] = [
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 1, h * 2, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 2, h * 2, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 3, h * 2, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 4, h * 2, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 5, h * 2, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 6, h * 2, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 7, h * 2, w, h)),
            new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 8, h * 2, w, h))
        ];

        let scaleX = 0.5;
        let scaleY = 0.5; 
        const npcMoveUp = new AnimatedSprite(npcSheet.runUp);
        const npcMoveDown = new AnimatedSprite(npcSheet.runDown);
        const npcMoveLeft = new AnimatedSprite(npcSheet.runLeft);
        const npcMoveRight = new AnimatedSprite(npcSheet.runLeft);

        
        npcMoveUp.loop = true;
        npcMoveDown.loop = true;
        npcMoveLeft.loop = true;
        npcMoveRight.loop = true;
        
        npcMoveUp.animationSpeed = .25;
        npcMoveDown.animationSpeed = .25;
        npcMoveLeft.animationSpeed = .25;
        npcMoveRight.animationSpeed = .25;

        npcMoveUp.scale.set(scaleX, scaleY);
        npcMoveDown.scale.set(scaleX, scaleY);
        npcMoveLeft.scale.set(scaleX, scaleY);
        npcMoveRight.scale.set(-scaleX, scaleY);

        const debug = new PIXI.Graphics();
        debug.beginFill(0xff00ff, .3);
        const rect: PIXI.Rectangle = npcMoveUp.getBounds();
        debug.drawRect(0, 0, rect.width, rect.height);
        debug.endFill();
        this._view.addChild(debug);

        // npcMoveUp.anchor.set(0, 0);
        npcMoveUp.hitArea = new PIXI.Rectangle(45, 50, 50, 70);
        // npcMoveUp.anchor.set(35, 35);
        // npcMoveDown.anchor.set(w*.5, h*.5);
        // npcMoveLeft.anchor.set(w*.5, h*.5);
        // npcMoveRight.anchor.set(w*.5, h*.5);

        // npcMoveUp.x = npcMoveUp.width/ 2;
        npcMoveUp.y -= 10;
        npcMoveDown.x = w;
        npcMoveLeft.x = w * 2;
        npcMoveRight.x = w * 3;

        
           
        
        // npcMoveRight.y += h;
        
        // npcMoveRight.scale.y *= 1;    /* flip vertically */

        

        npcMoveUp.play();
        npcMoveDown.play();
        npcMoveLeft.play();
        npcMoveRight.play();

        npcMoveUp.interactive = true;
        npcMoveUp.onmouseup = (event) => {
            console.log('tap');
            const colorMatrix = new ColorMatrixFilter();
            colorMatrix.blackAndWhite(true);
            colorMatrix.brightness(0, true);
            npcMoveUp.filters = [colorMatrix];
            gsap.from(colorMatrix, {
                brightness: 10, repeat: 0, duration: .1
            });
            gsap.to(colorMatrix, {
                brightness: 1, repeat: 0, duration: .1
            });
        }

        this._view.addChild(npcMoveUp);
        this._view.addChild(npcMoveDown);
        this._view.addChild(npcMoveLeft);
        this._view.addChild(npcMoveRight);

    }

    get view(): Container { return this._view; }

}