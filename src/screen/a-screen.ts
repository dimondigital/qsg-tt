import { Container } from "pixi.js";
import { GEventType } from "../global-event/GEventType";
import { IGEvent } from "../global-event/IGEvent";
import { IGEventGenerator } from "../global-event/IGEventGenerator";
import * as PIXI from 'pixi.js';
import EventEmitter from 'eventemitter3';

export class AScreen implements IGEventGenerator {
    _view: Container;

    constructor() {
        this._view = new Container();
        // this._view.dispatchEvent(new Event('e'));
        // console.log(this._view);
        // this.view.emit(GEventType.START_GAME);
        // console.log('dd')

        // const event = new CustomEvent(GEventType.START_GAME);
        // this._view.dispatchEvent(event);
    }

    generateGlobalEvent(eType: GEventType): void {
        // let event = new EventEmitter();
        // event.emit(eType, this);

        // this.view.emit(GEventType.START_GAME);
        // this.

        
       
        
        
        // function emitted() {
        //     console.log(this === context); // true
        //   }
    }

    get view(): Container { return this._view; }
}