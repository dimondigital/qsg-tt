import { AnimatedSprite, ColorMatrixFilter, DisplayObject } from "pixi.js";
import gsap from "gsap";

export class VisualFx {

    public static whiteFlash(displayO: DisplayObject | AnimatedSprite): void {
        const colorMatrix = new ColorMatrixFilter();
        colorMatrix.blackAndWhite(true);
        colorMatrix.brightness(0, true);
        displayO.filters = [colorMatrix];
        gsap.from(colorMatrix, {
            brightness: 10, repeat: 0, duration: .1
        });
        gsap.to(colorMatrix, {
            brightness: 1, repeat: 0, duration: .1
        });
    }

}