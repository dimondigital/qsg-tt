import { AnimatedSprite, Container,  Graphics, Texture } from "pixi.js";
import { Subscription } from 'rxjs';
import { NPCDirection } from "./npc-direction";
import { INPC } from "./inpc";

export class NPC implements INPC {

    protected sheet: Texture;
    protected _view: Container;
    protected _mc: Container;
    protected frameHeight: number;
    protected frameWidth: number;
    
    protected _id: number;
    protected _direction: NPCDirection;
    protected _npcSpeedPower: number;
    protected _health: number = 1;
    
    protected _clickSub: Subscription;
    public hitRect: Graphics;
    public animS: AnimatedSprite;
    public destroyed: boolean;

    constructor(
        mainContainer: Container, 
        x: number, y: number, 
        direction: NPCDirection, 
        id: number, 
        npcSpeedPower: number
    ) {
        this._mc = mainContainer;
        this._view = new Container();
        this._view.x = x;
        this._view.y = y;
        this._direction = direction;
        this._id = id;
        this._npcSpeedPower = npcSpeedPower * 6;
    }

    init(): void {
        console.log(`NPC > init () empty call`);
    }

    walk():void {
        console.log(`NPC > walk () empty call`);
    }

    playDeath():void {
        console.log(`NPC > playDeath () empty call`);
    }

    playTeleporting():void {
        console.log(`NPC > playTeleporting () empty call`);
    }

    setTexture(direction: NPCDirection):Texture[] {
        console.log(`NPC > setTexture () empty call`);
        const texturePack = [new Texture(null)];
        return texturePack;
    }

    destroy(): void {
        this._clickSub.unsubscribe();
        this._view.removeChild(this.hitRect);
        this._view.removeChild(this.animS);
        this._mc.removeChild(this._view);
    };

    get view(): Container { return this._view; }
    get direction(): NPCDirection { return this._direction; }
    get id(): number { return this._id; }

}