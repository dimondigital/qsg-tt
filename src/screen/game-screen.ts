import { AnimatedSprite, ColorMatrixFilter, Container, IHitArea, Rectangle, Sprite, Text, Texture } from "pixi.js";
import { AScreen } from "./a-screen";
import * as PIXI from 'pixi.js';
import UGConfig from "../assets/unit-generator.config.json";
import gsap from "gsap";
import { Teleport } from "../actors/teleport";
import { NPCGenerator } from "../actors/npc-generator";
import { EventManager } from "../event/event-manager";
import { AppEvent } from "../event/app-event";
import { User } from "../user/user";
import { ScreenManager } from "./screen-maganer";
import { GameConfig } from "../game-config";
import { Utils } from "../utils/utils";


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

        /* UI */
        // points counter
        const userPointsCounter = new Text('POINTS: 0', {
            fontFamily: 'Trebuchet MS',
            fontSize: 15,
            fill: 0xffffff,
            align: 'justify'
        });
        this.view.addChild(userPointsCounter);
        EventManager.eventStream$
            .subscribe(({e, props}) => {
                switch(e) {
                    case AppEvent.UI_POINTS_SHOW:
                        userPointsCounter.text = `POINTS: ${User.points}`
                    break;
                }
        });

        // enemy counter
        const enemiesCounter = new Text('ENEMIES: 0', {
            fontFamily: 'Trebuchet MS',
            fontSize: 15,
            fill: 0xffffff,
            align: 'right'
        });
        enemiesCounter.x = GameConfig.GAMESCREEN_WIDTH - enemiesCounter.width - 30;
        this.view.addChild(enemiesCounter);
        ScreenManager.app.ticker.add(() => {
            enemiesCounter.text = `ENEMIES: ${this.countTotalAliveEnemies()}`;
        });

        // hitTest for teleport & each npc
        ScreenManager.app.ticker.add(() => {
            for(let npcG of this._npcGenerators) {
                for(let npc of npcG.npss) {
                    if (Utils.boxesIntersect(npc.hitRect, tlprt.hitRect)) {
                        EventManager.eventStream$.next({e: AppEvent.NPC_TELEPORT, props: {tlprt, npc}})
                    }
                }
            }
        });
    }

    countTotalAliveEnemies(): number {
        let counter = 0;
        for(let npcg of this._npcGenerators) {
            counter += npcg.npss.length;
        }
        return counter;
    }

}