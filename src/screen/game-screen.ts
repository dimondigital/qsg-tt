import { AnimatedSprite, ColorMatrixFilter, Container, Text } from "pixi.js";
import { AScreen } from "./a-screen";
import * as PIXI from 'pixi.js';
import sheetData from "../assets/run-up.json";
import gsap from "gsap";
import { Teleport } from "../actors/teleport";
import { Direction, NPCGenerator } from "../actors/npc-generator";

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

        // init scene actors
        const tlprt = new Teleport(mainContainer);
        const unitGen = new NPCGenerator(mainContainer, Direction.NORTH);

        

        

        

        // this._view.addChild(tlprt);


        // setTimeout(() => {
        //     super.initNextScreen();
        // }, 5000)
    }

}