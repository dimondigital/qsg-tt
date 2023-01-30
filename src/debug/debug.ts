import { fromEvent } from 'rxjs';

export class Debug {

    public static isDebug: boolean;

    constructor() {
        const src = fromEvent(document, 'keydown');
        const sub = src.subscribe((e: KeyboardEvent) => {
            if (e.key === 'd') {
                Debug.isDebug = !Debug.isDebug;
                console.log(`DEBUG IS: ${Debug.isDebug}`);
            }
        });
    }

    

}