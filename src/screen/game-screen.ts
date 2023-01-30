import { AnimatedSprite, ColorMatrixFilter, Container, Sprite, Text, Texture } from "pixi.js";
import { AScreen } from "./a-screen";
import * as PIXI from 'pixi.js';
import UGConfig from "../assets/unit-generator.config.json";
import gsap from "gsap";
import { Teleport } from "../actors/teleport";
import { Direction, NPCGenerator } from "../actors/npc-generator";

export interface UGC {
    x: number,
    y: number
}

export class GameScreen extends AScreen {

    constructor(mainContainer: Container, cb: Function) {
        super(mainContainer, cb);

        // header
        const header = new Text('Game Screen', {
            fontFamily: 'Georgia',
            fontSize: 15,
            fill: 0xffffff,
            align: 'left'
        })
        this.view.addChild(header);

        /* init scene actors */

        // background
        const bgSprite = new Sprite(Texture.from('assets/map.png'));
        this._mc.addChild(bgSprite);

        // teleport
        const tlprt = new Teleport(mainContainer);
        
        // unit generators
        const json: any[] = Object.values(UGConfig);
        console.log(json);
        // for(let i = 0; i < json.length; i++) {
        for(let i = 0; i < 3; i++) {
            // console.log(json[i].x);
            new NPCGenerator(mainContainer, i, 3000, json[i].x, json[i].y);
        }


        // const unitGen = new NPCGenerator(mainContainer, Direction.NORTH);
    }

}