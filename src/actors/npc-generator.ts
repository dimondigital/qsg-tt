import { Container } from "pixi.js";
import { GameConfig } from "../game-config";
import { NPC } from "./npc";

export enum Direction {
    NORTH = 'N',
}

export class NPCGenerator {
    private _view: Container;
    private _mc: Container;
    
    constructor(mainContainer: Container, direction: Direction, time: number = 2000) {

        this._view = new Container();
        this._mc = mainContainer;

        switch(direction) {
            case Direction.NORTH: 
                this._view.x = GameConfig.GAMESCREEN_WIDTH / 2;
                // this._view.y = GameConfig.GAMESCREEN_HEIGHT;
                this._view.y = 450;
        }

        this._mc.addChild(this._view);

        this.init(time);
    }

    init(time: number) {
        setTimeout(() => {
            const npc = new NPC(this._mc, this._view.x, this._view.y);
        }, time)

        this.play();
    }

    gameLoop() {
        this._mc.ticker
    }

}