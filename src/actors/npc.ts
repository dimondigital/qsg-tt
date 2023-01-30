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

    sheet = PIXI.Texture.from('assets/adt_minotaur_shaman.png');
    frameWidth = 140;
    frameHeight = 140;
    private _view: Container;
    private _direction: Direction;
    private _health: number = 1;
    private _mc: Container;
    private _clickSub: Subscription;
    public animS: AnimatedSprite;
    private _id: number;
    private _hitRect: PIXI.Graphics;

    constructor(mainContainer: Container, x: number, y: number, direction: Direction, id: number) {
        this._view = new Container();
        console.log(`id: ${id}, y: ${y}`);
        this._view.x = x;
        this._view.y = y;
        this._direction = direction;
        this._id = id;
        this._mc = mainContainer;

        let scaleX = 0.5;
        let scaleY = 0.5; 

        let npcSheet: any = {};
        // const numFrames = 8;
            
        switch(direction) {
            case Direction.NW : 
                npcSheet[Direction.NW] = this.setTexture(Direction.NW);
                this.animS = new AnimatedSprite(npcSheet[Direction.NW]);
                this.animS.anchor.set(scaleX, scaleY);
                this._view.scale.set(scaleX, scaleY);
                this.animS.loop = true;
                this.animS.animationSpeed = .25;

                // hit rect
                this._hitRect = new PIXI.Graphics();
                this._hitRect.beginFill(0x00ffff, 0.3);
                this._hitRect.drawRect(-25, -15, 50, 70);
                this._hitRect.endFill();
                this._view.addChild(this._hitRect);
               
                this.animS.hitArea = new PIXI.Rectangle(-25, -15, 50, 70);
                this.animS.play();
                this.animS.interactive = true;

                this._view.addChild(this.animS)
                this._mc.addChild(this._view);
            break;
            case Direction.N :  
                npcSheet[Direction.N] = this.setTexture(Direction.N);
                this.animS = new AnimatedSprite(npcSheet[Direction.N]);
                this.animS.anchor.set(scaleX, scaleY);
                this._view.scale.set(scaleX, scaleY);
                this.animS.loop = true;
                this.animS.animationSpeed = .25;

                // hit rect
                this._hitRect = new PIXI.Graphics();
                this._hitRect.beginFill(0x00ffff, 0.3);
                this._hitRect.drawRect(-25, -15, 50, 70);
                this._hitRect.endFill();
                this._view.addChild(this._hitRect);

                this.animS.hitArea = new PIXI.Rectangle(-25, -15, 50, 70);
                this.animS.play();
                this.animS.interactive = true;

                this._view.addChild(this.animS)
                this._mc.addChild(this._view);
            break;
            case Direction.NE :
                npcSheet[Direction.NE] = this.setTexture(Direction.NE);
                this.animS = new AnimatedSprite(npcSheet[Direction.NE]);
                this.animS.anchor.set(scaleX, scaleY);
                this._view.scale.set(-scaleX, scaleY);
                this.animS.loop = true;
                this.animS.animationSpeed = .25;

                // hit rect
                this._hitRect = new PIXI.Graphics();
                this._hitRect.beginFill(0x00ffff, 0.3);
                this._hitRect.drawRect(-25, -15, 50, 70);
                this._hitRect.endFill();
                this._view.addChild(this._hitRect);

                this.animS.hitArea = new PIXI.Rectangle(-25, -15, 50, 70);
                this.animS.play();
                this.animS.interactive = true;

                this._view.addChild(this.animS)
                this._mc.addChild(this._view);
            break;
        }
        
        const src = fromEvent(this.animS, 'click');
        this._clickSub = src.subscribe(e => {
            if (this._health > 0) {
                this._health -= User.power;
                EventManager.eventStream$.next({e: AppEvent.NPC_HIT, props: this});
            } else {
                EventManager.eventStream$.next({e: AppEvent.NPC_DEATH, props: this});
            }
        })

        ScreenManager.app.ticker.add(() => {
            if(Debug.isDebug) {
                this._hitRect.alpha = .3;
            } else {
                this._hitRect.alpha = 0;
            }
        });
        

        


        // npcSheet['N'] = [
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 1, 0, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 2, 0, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 3, 0, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 4, 0, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 5, 0, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 6, 0, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 7, 0, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 8, 0, w, h))
        // ];
        // npcSheet['S'] = [
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 1, h * 4, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 2, h * 4, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 3, h * 4, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 4, h * 4, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 5, h * 4, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 6, h * 4, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 7, h * 4, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 8, h * 4, w, h))
        // ];
        // npcSheet['runLeft'] = [
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 1, h * 2, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 2, h * 2, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 3, h * 2, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 4, h * 2, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 5, h * 2, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 6, h * 2, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 7, h * 2, w, h)),
        //     new PIXI.Texture(sheet.baseTexture, new PIXI.Rectangle(w * 8, h * 2, w, h))
        // ];

        
       
        // const npcMoveDown = new AnimatedSprite(npcSheet.S);
        // const npcMoveLeft = new AnimatedSprite(npcSheet.runLeft);
        // const npcMoveRight = new AnimatedSprite(npcSheet.runLeft);

        
        
        // npcMoveDown.loop = true;
        // npcMoveLeft.loop = true;
        // npcMoveRight.loop = true;
        
        
        // npcMoveDown.animationSpeed = .25;
        // npcMoveLeft.animationSpeed = .25;
        // npcMoveRight.animationSpeed = .25;

        // N.scale.set(scaleX, scaleY);
        // npcMoveDown.scale.set(scaleX, scaleY);
        // npcMoveLeft.scale.set(scaleX, scaleY);
        // npcMoveRight.scale.set(-scaleX, scaleY);

        // const debug = new PIXI.Graphics();
        // debug.beginFill(0xff00ff, .3);
        // const rect: PIXI.Rectangle = N.getBounds();
        // debug.drawRect(0, 0, rect.width, rect.height);
        // debug.endFill();
        // this._view.addChild(debug);

        // npcMoveUp.anchor.set(0, 0);
        
        // 
        // N.anchor.set(w*.5, h*.5);
        // npcMoveLeft.anchor.set(w*.5, h*.5);
        // npcMoveRight.anchor.set(w*.5, h*.5);

        // npcMoveUp.x = npcMoveUp.width/ 2;

        // N.y -= 10;
        // npcMoveDown.x = w;
        // npcMoveLeft.x = w * 2;
        // npcMoveRight.x = w * 3;

        
           
        
        // npcMoveRight.y += h;
        
        // npcMoveRight.scale.y *= 1;    /* flip vertically */

        

        
        // npcMoveDown.play();
        // npcMoveLeft.play();
        // npcMoveRight.play();

        
        // N.onmouseup = (event) => {
        //     console.log('tap');
        //     const colorMatrix = new ColorMatrixFilter();
        //     colorMatrix.blackAndWhite(true);
        //     colorMatrix.brightness(0, true);
        //     N.filters = [colorMatrix];
        //     gsap.from(colorMatrix, {
        //         brightness: 10, repeat: 0, duration: .1
        //     });
        //     gsap.to(colorMatrix, {
        //         brightness: 1, repeat: 0, duration: .1
        //     });
        // }

        // this._view.addChild(N);
        // this._view.addChild(npcMoveDown);
        // this._view.addChild(npcMoveLeft);
        // this._view.addChild(npcMoveRight);
        

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
            case Direction.E : ;
            case Direction.SE : ;
            case Direction.S : ;
            case Direction.SW : ;
            case Direction.W : ;
        }
    }

    destroy() {
        this._view.removeChild(this._hitRect);
        this._view.removeChild(this.animS);
        this._mc.removeChild(this._view);
        this._clickSub.unsubscribe();
    };

    get view(): Container { return this._view; }
    get direction(): Direction { return this._direction; }
    get id(): number { return this._id; }

}