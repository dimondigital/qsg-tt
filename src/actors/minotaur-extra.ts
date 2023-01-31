import { ColorMatrixFilter, Container } from "pixi.js";
import { INPC } from "./inpc";
import { Minotaur } from "./minotaur";
import { NPCDirection } from "./npc-direction";

export class MinotaurExtra extends Minotaur implements INPC {

    constructor(
        mainContainer: Container,
        x: number, y: number,
        direction: NPCDirection,
        id: number, 
        npcSpeedPower: number
    ) {
        super(mainContainer, x, y, direction, id, npcSpeedPower * 2);
        const colorMatrix = new ColorMatrixFilter();
        colorMatrix.contrast(2, true);
        this._view.filters = [colorMatrix];
    }

}