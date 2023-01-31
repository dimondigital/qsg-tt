import { AnimatedSprite, ColorMatrixFilter, Container, IHitArea, Rectangle, Sprite, Text, Texture, Ticker } from "pixi.js";
import { AScreen } from "./a-screen";
import * as PIXI from 'pixi.js';
import UGConfig from "../assets/unit-generator.config.json";
import gsap from "gsap";
import { Teleport } from "../actors/teleport";
import { NPCGenerator } from "../actors/npc-generator";
import { EventManager } from "../event/event-manager";
import { AppEvent } from "../event/app-event";
import { User } from "../user/user";
import { GameController } from "./screen-maganer";
import { GameConfig } from "../game-config";
import { Utils } from "../utils/utils";


export class GameScreen extends AScreen {

    private _npcGenerators: NPCGenerator[] = [];
    private _gameTicker: Ticker;

    constructor(mainContainer: Container) {
        super(mainContainer);
    }

    public override init(): void {

        /* init scene actors */

        // background
        const bgSprite = new Sprite(Texture.from('assets/map.png'));
        this._mc.addChild(bgSprite);

        // teleport
        const tlprt = new Teleport(this._mc);
        
        // unit generators
        const json: any[] = Object.values(UGConfig);
        for(let i = 0; i < json.length; i++) {
            this._npcGenerators.push(new NPCGenerator(this._mc, i, 10000, json[i].x, json[i].y));
        }

        /* UI */
        // points counter
        const userPointsCounter = new Text('POINTS: 0', {
            fontFamily: 'Trebuchet MS',
            fontSize: 15,
            fill: 0xffffff,
            align: 'justify'
        });
        this._mc.addChild(userPointsCounter);

        EventManager.eventStream$
            .subscribe(({e, props}) => {
                switch(e) {
                    case AppEvent.UI_POINTS_SHOW:
                        userPointsCounter.text = `POINTS: ${User.points}`
                    break;
                    case AppEvent.NPC_ADD_EXTRA:
                        const randomNPCGeneratorIdx: number = Math.floor(Math.random() * this._npcGenerators.length);
                        this._npcGenerators[randomNPCGeneratorIdx].addExtraNPC();
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
        this._mc.addChild(enemiesCounter);

        if (!this.destroyed) {
            this._gameTicker = GameController.app.ticker.add(() => {
                

                // hitTest for teleport & each npc
                if (this._npcGenerators) {
                    for(let npcG of this._npcGenerators) {
                        for(let npc of npcG.npss) {
                            if (Utils.boxesIntersect(npc.hitRect, tlprt.hitRect)) {
                                EventManager.eventStream$.next({e: AppEvent.NPC_TELEPORT, props: {tlprt, npc}})
                            }
                        }
                    }
                }

                // update enemies counter
                if(this._npcGenerators) enemiesCounter.text = `ENEMIES: ${this.countTotalAliveEnemies()}`;
            });
        }
    }

    public override destroy(): void {
        this.destroyed = true;
        for(let npcG of this._npcGenerators) {
            for(let npc of npcG.npss) {
                npc.destroyed = true;
                npcG.npss = npcG.npss.filter(ii => ii.id === npc.id);
                npc.destroy();
            }
            npcG.destroy();
        }
        // this._npcGenerators = undefined;
        // this._gameTicker.destroy();
        this.destroyed = false;
        super.destroy();
    }

    countTotalAliveEnemies(): number {
        let counter = 0;
        for(let npcg of this._npcGenerators) {
            counter += npcg.npss.length;
        }
        return counter;
    }

}