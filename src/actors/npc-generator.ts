import { Container, DisplayObject, Rectangle } from "pixi.js";
import { GameConfig } from "../game-config";
import { ScreenManager } from "../screen/screen-maganer";
import { NPC } from "./npc";
import * as PIXI from 'pixi.js';
import { EventManager } from "../event/event-manager";
import { AppEvent } from "../event/app-event";

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
    npss: NPC[] = [];
    
    constructor(mainContainer: Container, direction: Direction, time: number = 2000, x: number, y: number) {

        this._view = new Container();
        this._mc = mainContainer;
        // console.log(` dir: ${direction}`);
        this._direction = direction;
        this._view.x = x;
        this._view.y = y;

        const debug = new PIXI.Graphics();
        debug.beginFill(0xff00ff, .3);
        const rect: PIXI.Rectangle = new Rectangle(0, 0, 15, 15);
        debug.drawRect(0, 0, rect.width, rect.height);
        debug.endFill();
        this._view.addChild(debug);
        

        switch(direction) {
            // case Direction.NORTH: 
        }

        this._mc.addChild(this._view);

        this.init(time);
    }
    
    init(time: number) {
       
        setInterval(() => {
            // console.log(`xxx: ${this._view.x}`);
            // console.log(`yyy: ${this._view.y}`);
            this.npss.push(new NPC(this._mc, +this._view.x, +this._view.y, this._direction, Date.now()));
        }, time)

        this.play();

        EventManager.eventStream$
            .subscribe(({e, props}) => {
                switch(e) {
                    case AppEvent.NPC_DEATH:
                        if (props instanceof  NPC) {
                            this.npss = this.npss.filter(item => item.id !== props.id);
                            props.destroy();
                        }
                }
            });
    }

    play() {
        let elapsed = 0.0;
        ScreenManager.app.ticker.add(() => {
            this.npss.forEach((npc: NPC) => {
                switch(npc.direction) {
                    case Direction.NW : npc.view.y += 1, npc.view.x += 1; break;
                    case Direction.N : npc.view.y += 1; break;
                    case Direction.NE : npc.view.y += 1, npc.view.x -= 1; break;
                    case Direction.E : npc.view.x -= .266;
                    case Direction.SE : npc.view.y -= .266, npc.view.x -= .266;
                    case Direction.S : npc.view.y -= .266;
                    case Direction.SW : npc.view.y -= .266, npc.view.x += .266;
                    case Direction.W : npc.view.x += .266;
                }
                
            })
            
        });
    }

}