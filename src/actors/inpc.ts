import { Graphics, Texture } from "pixi.js";
import { NPCDirection } from "./npc-direction";

export interface INPC {
    id: number,
    hitRect: Graphics, 
    destroyed: boolean,
    setTexture(direction: NPCDirection): Texture[],
    init(): void,
    walk(): void,
    destroy(): void,
    playDeath(): void,
    playTeleporting(): void
}