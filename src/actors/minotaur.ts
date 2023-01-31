import { AnimatedSprite, Container, Graphics, Rectangle, Texture } from "pixi.js";
import { VisualFx } from "../visual-effects/visual-fx";
import { NPC } from "./npc";
import { NPCDirection } from "./npc-direction";
import { fromEvent } from 'rxjs';
import { EventManager } from "../event/event-manager";
import { User } from "../user/user";
import { AppEvent } from "../event/app-event";
import { GameController } from "../screen/screen-maganer";
import { Debugger as Debugger } from "../debug/debug";
import { INPC } from "./inpc";


export class Minotaur extends NPC implements INPC { 

    constructor(
        mainContainer: Container,
        x: number, y: number,
        direction: NPCDirection,
        id: number, 
        npcSpeedPower: number
    ) {
        super(mainContainer, x, y, direction, id, npcSpeedPower);

        this.init();
    }

    public override init() {
        this.frameWidth = 140;
        this.frameHeight = 140;
        this.sheet = Texture.from('assets/adt_minotaur_shaman+fx.png');

        let scaleX = 0.5;
        let scaleY = 0.5; 

        let npcSheet: any = {};
        npcSheet[this.direction] = this.setTexture(this.direction);
        this.animS = new AnimatedSprite(npcSheet[this.direction]);
            
        switch(this.direction) {
            case NPCDirection.NW : this._view.scale.set(scaleX, scaleY); break;
            case NPCDirection.N :  this._view.scale.set(scaleX, scaleY); break;
            case NPCDirection.NE : this._view.scale.set(-scaleX, scaleY); break;
            case NPCDirection.E :  this._view.scale.set(-scaleX, scaleY); break;
            case NPCDirection.SE : this._view.scale.set(-scaleX, scaleY); break;
            case NPCDirection.S :  this._view.scale.set(-scaleX, scaleY); break;
            case NPCDirection.SW : this._view.scale.set(scaleX, scaleY); break;
            case NPCDirection.W :  this._view.scale.set(scaleX, scaleY); break;
        }

        this.animS.anchor.set(scaleX, scaleY);
        this.animS.loop = true;
        this.animS.animationSpeed = .15;

        // hit rect
        this.hitRect = new Graphics();
        this.hitRect.beginFill(0x00ffff, 0.3);
        this.hitRect.drawRect(-35, -25, 60, 80);
        this.hitRect.endFill();
        this._view.addChildAt(this.hitRect, 0);

        this.animS.hitArea = new Rectangle(-35, -25, 60, 80);

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

        if (!this.destroyed) {
        
            GameController.app.ticker.add(() => {
                if(Debugger.isDebug) {
                    this.hitRect.alpha = .3;
                } else {
                    this.hitRect.alpha = 0;
                }
            });
        }
    };

    public override walk() {
        const nsp = this._npcSpeedPower;
        switch(this._direction) {
            case NPCDirection.NW : this.view.y += 0.5 + nsp, this.view.x += 0.5 + nsp; break;
            case NPCDirection.N : this.view.y += 0.5 + nsp; break;
            case NPCDirection.NE : this.view.y += 0.5 + nsp, this.view.x -= 0.5 + nsp; break;
            case NPCDirection.E : this.view.x -= 0.5 + nsp; break;
            case NPCDirection.SE : this.view.y -= 0.5 + nsp, this.view.x -= 0.5 + nsp; break;
            case NPCDirection.S : this.view.y -= 0.5 + nsp; break;
            case NPCDirection.SW : this.view.y -= 0.5 + nsp, this.view.x += 0.5 + nsp; break;
            case NPCDirection.W : this.view.x += 0.5 + nsp; break;
        }
    }

    public override playDeath(): void {
        const animDeath = new AnimatedSprite([
            new Texture(this.sheet.baseTexture, new Rectangle(140 * 0, 140 * 10, 140, 140)),
            new Texture(this.sheet.baseTexture, new Rectangle(140 * 1, 140 * 10, 140, 140)),
            new Texture(this.sheet.baseTexture, new Rectangle(140 * 2, 140 * 10, 140, 140)),
            new Texture(this.sheet.baseTexture, new Rectangle(140 * 3, 140 * 10, 140, 140)),
        ]);
        animDeath.x = this._view.x;
        animDeath.y = this._view.y;
        animDeath.anchor.set(0.5, 0.5);
        animDeath.scale.set(0.5, 0.5);
        animDeath.loop = false;
        animDeath.animationSpeed = (.25 + this._npcSpeedPower);
        animDeath.play();

        this._mc.addChild(animDeath);
        VisualFx.whiteFlash(animDeath);

        setTimeout(() => {
            this._mc.removeChild(animDeath);
        }, 2000)
    };

    public override playTeleporting() {
        const animTeleport = new AnimatedSprite([
            new Texture(this.sheet.baseTexture, new Rectangle(140 * 4, 140 * 5, 140, 140)),
            new Texture(this.sheet.baseTexture, new Rectangle(140 * 5, 140 * 5, 140, 140)),
            new Texture(this.sheet.baseTexture, new Rectangle(140 * 6, 140 * 5, 140, 140)),
            new Texture(this.sheet.baseTexture, new Rectangle(140 * 7, 140 * 5, 140, 140)),
            new Texture(this.sheet.baseTexture, new Rectangle(140 * 8, 140 * 5, 140, 140)),
            new Texture(this.sheet.baseTexture, new Rectangle(140 * 8, 140 * 6, 140, 140)),
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

    public override setTexture(direction: NPCDirection) {
        const w = this.frameWidth;
        const h = this.frameHeight;
        switch(direction) {
            case NPCDirection.NW : return [
                new Texture(this.sheet.baseTexture, new Rectangle(w * 1, h * 3, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 2, h * 3, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 3, h * 3, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 4, h * 3, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 5, h * 3, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 6, h * 3, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 7, h * 3, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 8, h * 3, w, h))
            ];
            case NPCDirection.N : return [
                new Texture(this.sheet.baseTexture, new Rectangle(w * 1, h * 4, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 2, h * 4, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 3, h * 4, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 4, h * 4, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 5, h * 4, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 6, h * 4, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 7, h * 4, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 8, h * 4, w, h))
            ];
            case NPCDirection.NE : return [
                new Texture(this.sheet.baseTexture, new Rectangle(w * 1, h * 3, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 2, h * 3, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 3, h * 3, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 4, h * 3, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 5, h * 3, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 6, h * 3, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 7, h * 3, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 8, h * 3, w, h))
            ];
            case NPCDirection.E : return [
                new Texture(this.sheet.baseTexture, new Rectangle(w * 1, h * 2, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 2, h * 2, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 3, h * 2, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 4, h * 2, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 5, h * 2, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 6, h * 2, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 7, h * 2, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 8, h * 2, w, h))
            ];
            case NPCDirection.SE : return [
                new Texture(this.sheet.baseTexture, new Rectangle(w * 1, h * 1, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 2, h * 1, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 3, h * 1, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 4, h * 1, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 5, h * 1, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 6, h * 1, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 7, h * 1, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 8, h * 1, w, h))
            ];
            case NPCDirection.S : return [
                new Texture(this.sheet.baseTexture, new Rectangle(w * 1, 0, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 2, 0, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 3, 0, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 4, 0, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 5, 0, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 6, 0, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 7, 0, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 8, 0, w, h))
            ];
            case NPCDirection.SW : return [
                new Texture(this.sheet.baseTexture, new Rectangle(w * 1, h * 1, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 2, h * 1, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 3, h * 1, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 4, h * 1, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 5, h * 1, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 6, h * 1, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 7, h * 1, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 8, h * 1, w, h))
            ];
            case NPCDirection.W : return [
                new Texture(this.sheet.baseTexture, new Rectangle(w * 1, h * 2, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 2, h * 2, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 3, h * 2, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 4, h * 2, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 5, h * 2, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 6, h * 2, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 7, h * 2, w, h)),
                new Texture(this.sheet.baseTexture, new Rectangle(w * 8, h * 2, w, h))
            ];
        }
    };

    destroy(): void {
        super.destroy();
    };
    
}