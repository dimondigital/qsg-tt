import { Subject } from 'rxjs';
import { Teleport } from '../actors/teleport';
import { User } from '../user/user';
import { AppEvent } from './app-event';

export class EventManager {
    public static eventStream$ = new Subject<{e: AppEvent, props: any}>();

    constructor() {
        EventManager.eventStream$
        .subscribe(({e, props}) => {
            switch(e) {
                case AppEvent.USER_POINTS_ADD:
                    User.pointsAdd();
                break;
                case AppEvent.NPC_TELEPORT:
                    if (props.tlprt instanceof Teleport) props.tlprt.playTeleport();
                    EventManager.eventStream$.next({e: AppEvent.NPC_ADD_EXTRA, props: this});
                break;
                case AppEvent.GAME_OVER:
                    User.setHighestScore();
                break;
            }
        });
    }
    
}