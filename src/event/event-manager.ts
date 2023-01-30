import { Subject } from 'rxjs';
import { NPC } from '../actors/npc';
import { VisualFx } from '../visual-effects/visual-fx';
import { AppEvent } from './app-event';

export class EventManager {
    public static eventStream$ = new Subject<{e: AppEvent, props: {}}>();

    constructor() {
        EventManager.eventStream$
        .subscribe(({e, props}) => {
            switch(e) {
                case AppEvent.NPC_HIT:
                    if (props instanceof NPC) VisualFx.whiteFlash(props.animS);
            }
        });
    }

    
    
}