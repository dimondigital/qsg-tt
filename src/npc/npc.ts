import { AnimatedSprite, Application, Assets, BaseTexture, Container, Loader, ObservablePoint, Sprite, Spritesheet, Texture } from "pixi.js";
import * as PIXI from 'pixi.js';
import sheetData from "../assets/run-up.json";
const texture = await PIXI.Texture.from('assets/run-up.png');

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
        let scaleX = 0.5;
        let scaleY = 0.5; 
        const npcMoveUp = new AnimatedSprite(npcSheet.runUp);
        const npcMoveDown = new AnimatedSprite(npcSheet.runDown);

        
        npcMoveUp.loop = true;
        npcMoveUp.animationSpeed = .25;

        npcMoveDown.loop = true;
        npcMoveDown.animationSpeed = .25;
        npcMoveDown.y = h * 2;
           
        npcMoveUp.scale.set(scaleX, scaleY);
        npcMoveDown.scale.set(scaleX, scaleY);
        this._view.addChild(npcMoveUp);
        this._view.addChild(npcMoveDown);
        npcMoveUp.play();
        npcMoveDown.play();

    }

    get view(): Container { return this._view; }

}