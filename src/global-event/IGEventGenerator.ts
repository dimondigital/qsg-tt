import { GEventType } from "./GEventType";
import { IGEvent } from "./IGEvent";

export interface IGEventGenerator {
    generateGlobalEvent(event: GEventType): void
}