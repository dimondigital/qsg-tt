import { Container, DisplayObject, Rectangle } from "pixi.js";
import { GameConfig } from "../game-config";
import { ScreenManager } from "../screen/screen-maganer";
import { NPC } from "./npc";
import * as PIXI from 'pixi.js';
import { EventManager } from "../event/event-manager";
import { AppEvent } from "../event/app-event";
import { Debug } from "../debug/debug";

export enum Direction {
    NW = 0,
    N = 1,
    NE = 2,
    E = 3,
    SE = 4,
    S = 5,
    SW = 6,
    W = 7,
}

export class NPCGenerator {
    private _view: Container;
    private _mc: Container;
    private _direction: Direction;
    private _graphics: PIXI.Graphics;
    npss: NPC[] = [];
    
    constructor(mainContainer: Container, direction: Direction, time: number = 2000, x: number, y: number) {

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

        setInterval(() => {
            this.npss.push(new NPC(this._mc, +this._view.x, +this._view.y, this._direction, Date.now()+Math.random()*999));
        }, Math.round(Math.random() * (time - 3000)) + 3000);

        this.play();

        EventManager.eventStream$
            .subscribe(({e, props}) => {
                switch(e) {
                    case AppEvent.NPC_DEATH:
                        if (props instanceof NPC && this.npss.includes(props)) {
                            EventManager.eventStream$.next({e: AppEvent.USER_POINTS_ADD, props: this});
                            props.playDeath();
                            this.npss = this.npss.filter(item => item.id !== props.id);
                            props.destroy();
                        }
                    break;
                    case AppEvent.NPC_TELEPORT:
                        //@ts-ignore
                        if (props.npc instanceof NPC && this.npss.includes(props.npc)) {
                            //@ts-ignore
                            this.npss = this.npss.filter(item => item.id !== props.npc.id);
                            //@ts-ignore
                            props.npc.destroy();
                        }
                    break;
                }
            });
    }

    play() {
        let elapsed = 0.0;
        ScreenManager.app.ticker.add(() => {
            this.npss.forEach((npc: NPC) => {
                switch(npc.direction) {
                    case Direction.NW : npc.view.y += 0.5, npc.view.x += 0.5; break;
                    case Direction.N : npc.view.y += 0.5; break;
                    case Direction.NE : npc.view.y += 0.5, npc.view.x -= 0.5; break;
                    case Direction.E : npc.view.x -= 0.5; break;
                    case Direction.SE : npc.view.y -= 0.5, npc.view.x -= 0.5; break;
                    case Direction.S : npc.view.y -= 0.5; break;
                    case Direction.SW : npc.view.y -= 0.5, npc.view.x += 0.5; break;
                    case Direction.W : npc.view.x += 0.5; break;
                }
            });

            if(Debug.isDebug) {
                this._graphics.alpha = 1;
            } else {
                this._graphics.alpha = 0;
            }
            
        });
    }

}