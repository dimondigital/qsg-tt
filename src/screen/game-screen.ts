import { Container, Text } from "pixi.js";
import { AScreen } from "./a-screen";

export class GameScreen extends AScreen {

    constructor(mainContainer: Container) {
        super();

        // header
        const header = new Text('Menu Screen', {
            fontFamily: 'Georgia',
            fontSize: 15,
            fill: 0xffffff,
            align: 'left'
        })
        this.view.addChild(header);
    }

}