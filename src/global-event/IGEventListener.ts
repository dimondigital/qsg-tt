import { GEventType } from "./GEventType";

export interface IGEventListener {
    listenGlobalEvents(event: GEventType): void
}