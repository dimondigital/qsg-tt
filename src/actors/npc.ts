import { AnimatedSprite, Application, Assets, BaseTexture, ColorMatrixFilter, Container, Filter, Graphics, Loader, ObservablePoint, Rectangle, Sprite, Spritesheet, Texture } from "pixi.js";
import * as PIXI from 'pixi.js';
import npcFrames from "../assets/run-up.json";
import { GlowFilter } from "pixi-filters";
const texture = await PIXI.Texture.from('assets/run-up.png');
import { App } from "..";
import { AppEvent } from "../event/app-event";
import { EventManager } from "../event/event-manager";
import { VisualFx } from "../visual-effects/visual-fx";
import { User } from "../user/user";
import { fromEvent, Subscription } from 'rxjs';
import { Debugger } from "../debug/debug";
import { GameController } from "../screen/screen-maganer";
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
        console.log(`NPC > init () empty call`, 'background: #222; color: #bada55');
    }

    walk():void {
        console.log(`NPC > walk () empty call`, 'background: #222; color: #bada55');
    }

    playDeath():void {
        console.log(`NPC > playDeath () empty call`, 'background: #222; color: #bada55');
    }

    playTeleporting():void {
        console.log(`NPC > playTeleporting () empty call`, 'background: #222; color: #bada55');
    }

    setTexture(direction: NPCDirection):Texture[] {
        console.log(`NPC > setTexture () empty call`, 'background: #222; color: #bada55');
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