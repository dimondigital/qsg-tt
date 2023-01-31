import { AnimatedSprite, ColorMatrixFilter, Container, IHitArea, Rectangle, Sprite, Text, Texture } from "pixi.js";
import { AScreen } from "./a-screen";
import * as PIXI from 'pixi.js';
import UGConfig from "../assets/unit-generator.config.json";
import gsap from "gsap";
import { Teleport } from "../actors/teleport";
import { Direction, NPCGenerator } from "../actors/npc-generator";
import { EventManager } from "../event/event-manager";
import { AppEvent } from "../event/app-event";
import { User } from "../user/user";
import { ScreenManager } from "./screen-maganer";


export class GameScreen extends AScreen {

    private _npcGenerators: NPCGenerator[] = [];

    constructor(mainContainer: Container, cb: Function) {
        super(mainContainer, cb);

        /* init scene actors */

        // background
        const bgSprite = new Sprite(Texture.from('assets/map.png'));
        this._mc.addChildAt(bgSprite, 0);

        // teleport
        const tlprt = new Teleport(mainContainer);
        
        // unit generators
        const json: any[] = Object.values(UGConfig);
        console.log(json);
        
        for(let i = 0; i < json.length; i++) {
            this._npcGenerators.push(new NPCGenerator(mainContainer, i, 10000, json[i].x, json[i].y));
        }

        // ui
        const userPointsCounter = new Text('POINTS: 0', {
            fontFamily: 'Georgia',
            fontSize: 15,
            fill: 0xffffff,
            align: 'justify'
        });
        this.view.addChild(userPointsCounter);
        EventManager.eventStream$
            .subscribe(({e, props}) => {
                switch(e) {
                    case AppEvent.USER_POINTS_SHOW:
                        userPointsCounter.text = `POINTS: ${User.points}`
                    break;
                }
        });

        // hitTest for teleport & each npc
        ScreenManager.app.ticker.add(() => {
            for(let npcG of this._npcGenerators) {
                for(let npc of npcG.npss) {
                    if (this.boxesIntersect(npc.hitRect, tlprt.hitRect)) {
                        EventManager.eventStream$.next({e: AppEvent.NPC_TELEPORT, props: {tlprt, npc}})
                    }
                }
            }
        });
    }

    boxesIntersect(a:PIXI.Graphics, b:PIXI.Graphics): boolean
    {
        const aPos = a.getGlobalPosition();
        const aBounds = a.getBounds();
        const bPos = b.getGlobalPosition();
        const bBounds = b.getBounds();

        return a.getBounds().intersects(b.getBounds());
    }

}