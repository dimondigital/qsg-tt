import { Container, DisplayObject, Rectangle } from "pixi.js";
import { GameConfig } from "../game-config";
import { GameController } from "../screen/screen-maganer";
import { NPC } from "./npc";
import * as PIXI from 'pixi.js';
import { EventManager } from "../event/event-manager";
import { AppEvent } from "../event/app-event";
import { Debugger } from "../debug/debug";
import { NPCDirection } from "./npc-direction";
import { Minotaur } from "./minotaur";
import { Utils } from "../utils/utils";
import { INPC } from "./inpc";
import { MinotaurExtra } from "./minotaur-extra";



export class NPCGenerator {
    private _view: Container;
    private _mc: Container;
    private _direction: NPCDirection;
    private _graphics: PIXI.Graphics;
    private _npcSpeedPower: number = 0.005;
    private _increaseSpeedInterval: NodeJS.Timer;
    private _generateNPCInterval: NodeJS.Timer;
    npss: INPC[] = [];
    
    constructor(
        mainContainer: Container, 
        direction: NPCDirection, 
        time: number = 2000, 
        x: number, y: number
    ) {

        this._view = new Container();
        this._mc = mainContainer;
        // console.log(` dir: ${direction}`);
        this._direction = direction;
        this._view.x = x;
        this._view.y = y;

        this._graphics = new PIXI.Graphics();
        this._graphics.beginFill(0xff00ff, .3);
        const rect: PIXI.Rectangle = new Rectangle(0, 0, 15, 15);
        this._graphics.drawRect(0, 0, rect.width, rect.height);
        this._graphics.endFill();
        this._view.addChild(this._graphics);
        this._mc.addChild(this._view);

        this.init(time);
    }
    
    init(time: number) {
        
        // increase speed interval
        this._increaseSpeedInterval = setInterval(() => {
            this._npcSpeedPower += this._npcSpeedPower;
        }, 10000);

        // generate npcs
        this._generateNPCInterval = setInterval(() => {
            this.npss.push(new Minotaur(
                this._mc,
                +this._view.x,
                +this._view.y,
                this._direction, 
                Utils.generateRandomId(), 
                this._npcSpeedPower)
            );
        }, Utils.generateFlexibleTimeRange(10000, 3000));

        this.play();

        EventManager.eventStream$
            .subscribe(({e, props}) => {
                switch(e) {
                    case AppEvent.NPC_DEATH:
                        if (props instanceof Minotaur && this.npss.includes(props)) {
                            EventManager.eventStream$.next({e: AppEvent.USER_POINTS_ADD, props: this});
                            props.playDeath();
                            this.npss = this.npss.filter(item => item.id !== props.id);
                            props.destroy();
                        }
                    break;
                    case AppEvent.NPC_TELEPORT:
                        if (props.npc instanceof MinotaurExtra && this.npss.includes(props.npc)) {
                            EventManager.eventStream$.next({e: AppEvent.GAME_OVER, props: this});
                        } else if (props.npc instanceof Minotaur && this.npss.includes(props.npc)) {
                            props.npc.playTeleporting();
                            this.npss = this.npss.filter(item => item.id !== props.npc.id);
                            props.npc.destroy();
                        }
                    break;
                    
                }
            });
    }

    addExtraNPC(): void {
        this.npss.push(
            new MinotaurExtra(
                this._mc,
                +this._view.x,
                +this._view.y,
                this._direction, 
                Utils.generateRandomId(), 
                this._npcSpeedPower)
        );
    }

    play() {
        let elapsed = 0.0;
        GameController.app.ticker.add(() => {
            this.npss.forEach((npc: INPC) => {
                const nsp = this._npcSpeedPower;
                npc.walk();
            });

            if(Debugger.isDebug) {
                this._graphics.alpha = 1;
            } else {
                this._graphics.alpha = 0;
            }
            
        });
    }

    destroy(): void {
        this.npss = [];
        clearInterval(this._generateNPCInterval);
        clearInterval(this._increaseSpeedInterval);
    }

}