import { Graphics } from "pixi.js";

export class Utils {

    static boxesIntersect(a:Graphics, b:Graphics): boolean
    {
        const aPos = a.getGlobalPosition();
        const aBounds = a.getBounds();
        const bPos = b.getGlobalPosition();
        const bBounds = b.getBounds();

        return a.getBounds().intersects(b.getBounds());
    }

    static generateRandomId(): number {
        return Date.now()+Math.random()*999;
    }

    static generateFlexibleTimeRange(fullTime: number, flexRange: number): number {
        return Math.round(Math.random() * (fullTime - flexRange)) + flexRange;
    }

}