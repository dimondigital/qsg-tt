import { Container, Text } from "pixi.js";
import { AScreen } from "./a-screen";

export class GameScreen extends AScreen {

    constructor(mainContainer: Container, cb: Function) {
        super(mainContainer, cb);

        // header
        const header = new Text('Game Screen', {
            fontFamily: 'Georgia',
            fontSize: 15,
            fill: 0xffffff,
            align: 'left'
        })
        this.view.addChild(header);

        setTimeout(() => {
            super.initNextScreen();
        }, 5000)
    }

}