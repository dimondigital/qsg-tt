import { AppEvent } from "../event/app-event";
import { EventManager } from "../event/event-manager";

export class User {

    static power: number = 10;
    static points: number = 0;

    static pointsAdd() {
        // console.log('add')
        User.points += 10;
        EventManager.eventStream$.next({e: AppEvent.USER_POINTS_SHOW, props: this});
    }
}