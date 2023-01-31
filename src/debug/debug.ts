import { fromEvent } from 'rxjs';

export class Debugger {

    public static isDebug: boolean;

    constructor() {
        const src = fromEvent(document, 'keydown');
        const sub = src.subscribe((e: KeyboardEvent) => {
            if (e.key === 'd') {
                Debugger.isDebug = !Debugger.isDebug;
                console.log(`DEBUG IS: ${Debugger.isDebug}`);
            }
        });
    }

    

}