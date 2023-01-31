import { AppEvent } from "../event/app-event";
import { EventManager } from "../event/event-manager";

export class User {

    static power: number = 10;
    static points: number = 0;

    static pointsAdd() {
        User.points += 10;
        EventManager.eventStream$.next({e: AppEvent.UI_POINTS_SHOW, props: this});
    }

    static clearProgress(): void {
        User.points = 0;
    }
    
}