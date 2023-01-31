import { AnimatedSprite, Application, Assets, BaseTexture, ColorMatrixFilter, Container, Filter, Loader, ObservablePoint, Rectangle, Sprite, Spritesheet, Texture } from "pixi.js";
import * as PIXI from 'pixi.js';
import npcFrames from "../assets/run-up.json";
import { GlowFilter } from "pixi-filters";
const texture = await PIXI.Texture.from('assets/run-up.png');

import { Direction } from "./npc-generator";
import { App } from "..";
import { AppEvent } from "../event/app-event";
import { EventManager } from "../event/event-manager";
import { VisualFx } from "../visual-effects/visual-fx";
import { User } from "../user/user";
import { fromEvent, Subscription } from 'rxjs';
import { Debug } from "../debug/debug";
import { ScreenManager } from "../screen/screen-maganer";

export class NPC {

    // sheet = PIXI.Texture.from('assets/adt_minotaur_shaman.png');
    sheet = PIXI.Texture.from('assets/adt_minotaur_shaman+fx.png');
    frameWidth = 140;
    frameHeight = 140;
    private _view: Container;
    private _direction: Direction;
    private _health: number = 1;
    private _mc: Container;
    private _clickSub: Subscription;
    public animS: AnimatedSprite;
    private _id: number;
    hitRect: PIXI.Graphics;
    private _npcSpeedPower: number;

    constructor(mainContainer: Container, x: number, y: number, direction: Direction, id: number, npcSpeedPower: number) {
        this._view = new Container();
        // console.log(`id: ${id}, y: ${y}`);
        this._view.x = x;
        this._view.y = y;
        this._direction = direction;
        this._id = id;
        this._mc = mainContainer;
        this._npcSpeedPower = npcSpeedPower;

        let scaleX = 0.5;
        let scaleY = 0.5; 

        let npcSheet: any = {};
        // const numFrames = 8;

        npcSheet[direction] = this.setTexture(direction);
        this.animS = new AnimatedSprite(npcSheet[direction]);
            
        switch(direction) {
            case Direction.NW : this._view.scale.set(scaleX, scaleY); break;
            case Direction.N :  this._view.scale.set(scaleX, scaleY); break;
            case Direction.NE : this._view.scale.set(-scaleX, scaleY); break;
            case Direction.E :  this._view.scale.set(-scaleX, scaleY); break;
            case Direction.SE : this._view.scale.set(-scaleX, scaleY); break;
            case Direction.S :  this._view.scale.set(-scaleX, scaleY); break;
            case Direction.SW : this._view.scale.set(scaleX, scaleY); break;
            case Direction.W :  this._view.scale.set(scaleX, scaleY); break;
        }

        this.animS.anchor.set(scaleX, scaleY);
        this.animS.loop = true;
        this.animS.animationSpeed = .15;

        // hit rect
        this.hitRect = new PIXI.Graphics();
        this.hitRect.beginFill(0x00ffff, 0.3);
        this.hitRect.drawRect(-35, -25, 60, 80);
        this.hitRect.endFill();
        this._view.addChildAt(this.hitRect, 0);

        this.animS.hitArea = new PIXI.Rectangle(-35, -25, 60, 80);
        // this.hitArea = new Container();
        // this.hitArea.addChild(this.hitRect);

        this.animS.play();
        this.animS.interactive = true;
        this._view.addChild(this.animS)
        this._mc.addChild(this._view);
        
        const src = fromEvent(this.animS, 'click');
        this._clickSub = src.subscribe(e => {
            // console.log('clk')
            this._health -= User.power;
            if (this._health > 0) {
                EventManager.eventStream$.next({e: AppEvent.NPC_HIT, props: this});
            } else {
                EventManager.eventStream$.next({e: AppEvent.NPC_DEATH, props: this});
            }
        })

        ScreenManager.app.ticker.add(() => {
            if(Debug.isDebug) {
                this.hitRect.alpha = .3;
            } else {
                this.hitRect.alpha = 0;
            }
        });

    }

    setTexture(direction: Direction) {
        const w = this.frameWidth;
        const h = this.frameHeight;
        switch(direction) {
            case Direction.NW : return [
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 1, h * 3, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 2, h * 3, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 3, h * 3, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 4, h * 3, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 5, h * 3, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 6, h * 3, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 7, h * 3, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 8, h * 3, w, h))
            ];
            case Direction.N : return [
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 1, h * 4, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 2, h * 4, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 3, h * 4, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 4, h * 4, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 5, h * 4, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 6, h * 4, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 7, h * 4, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 8, h * 4, w, h))
            ];
            case Direction.NE : return [
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 1, h * 3, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 2, h * 3, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 3, h * 3, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 4, h * 3, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 5, h * 3, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 6, h * 3, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 7, h * 3, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 8, h * 3, w, h))
            ];
            case Direction.E : return [
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 1, h * 2, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 2, h * 2, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 3, h * 2, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 4, h * 2, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 5, h * 2, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 6, h * 2, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 7, h * 2, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 8, h * 2, w, h))
            ];
            case Direction.SE : return [
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 1, h * 1, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 2, h * 1, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 3, h * 1, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 4, h * 1, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 5, h * 1, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 6, h * 1, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 7, h * 1, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 8, h * 1, w, h))
            ];
            case Direction.S : return [
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 1, 0, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 2, 0, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 3, 0, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 4, 0, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 5, 0, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 6, 0, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 7, 0, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 8, 0, w, h))
            ];
            case Direction.SW : return [
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 1, h * 1, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 2, h * 1, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 3, h * 1, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 4, h * 1, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 5, h * 1, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 6, h * 1, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 7, h * 1, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 8, h * 1, w, h))
            ];
            case Direction.W : return [
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 1, h * 2, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 2, h * 2, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 3, h * 2, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 4, h * 2, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 5, h * 2, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 6, h * 2, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 7, h * 2, w, h)),
                new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(w * 8, h * 2, w, h))
            ];
        }
    }

    destroy() {
        this._view.removeChild(this.hitRect);
        this._view.removeChild(this.animS);
        this._mc.removeChild(this._view);
        this._clickSub.unsubscribe();
    };

    playDeath() {
        const animDeath = new AnimatedSprite([
            new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(140 * 0, 140 * 10, 140, 140)),
            new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(140 * 1, 140 * 10, 140, 140)),
            new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(140 * 2, 140 * 10, 140, 140)),
            new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(140 * 3, 140 * 10, 140, 140)),
        ]);
        animDeath.x = this._view.x;
        animDeath.y = this._view.y;
        animDeath.anchor.set(0.5, 0.5);
        animDeath.scale.set(0.5, 0.5);
        animDeath.loop = false;
        animDeath.animationSpeed = .25;
        animDeath.play();

        this._mc.addChild(animDeath);
        VisualFx.whiteFlash(animDeath);

        setTimeout(() => {
            this._mc.removeChild(animDeath);
        }, 2000)
    }

    playTeleporting() {
        const animTeleport = new AnimatedSprite([
            new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(140 * 4, 140 * 5, 140, 140)),
            new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(140 * 5, 140 * 5, 140, 140)),
            new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(140 * 6, 140 * 5, 140, 140)),
            new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(140 * 7, 140 * 5, 140, 140)),
            new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(140 * 8, 140 * 5, 140, 140)),
            new PIXI.Texture(this.sheet.baseTexture, new PIXI.Rectangle(140 * 8, 140 * 6, 140, 140)),
        ]);

        animTeleport.x = this._view.x;
        animTeleport.y = this._view.y;
        animTeleport.anchor.set(0.5, 0.5);
        animTeleport.scale.set(0.5, 0.5);
        animTeleport.loop = false;
        animTeleport.animationSpeed = .25;
        animTeleport.play();
        this._mc.addChild(animTeleport);

        setTimeout(() => {
            this._mc.removeChild(animTeleport);
        }, 1000)
    }

    walk() {
        const nsp = this._npcSpeedPower;
        switch(this._direction) {
            case Direction.NW : this.view.y += 0.5 + nsp, this.view.x += 0.5 + nsp; break;
            case Direction.N : this.view.y += 0.5 + nsp; break;
            case Direction.NE : this.view.y += 0.5 + nsp, this.view.x -= 0.5 + nsp; break;
            case Direction.E : this.view.x -= 0.5 + nsp; break;
            case Direction.SE : this.view.y -= 0.5 + nsp, this.view.x -= 0.5 + nsp; break;
            case Direction.S : this.view.y -= 0.5 + nsp; break;
            case Direction.SW : this.view.y -= 0.5 + nsp, this.view.x += 0.5 + nsp; break;
            case Direction.W : this.view.x += 0.5 + nsp; break;
        }
    }

    get view(): Container { return this._view; }
    get direction(): Direction { return this._direction; }
    get id(): number { return this._id; }

}