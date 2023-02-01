import { Container, Rectangle, Sprite, Text, Texture } from "pixi.js";
import { StartGameButton } from "../ui/start-game-button";
import { User } from "../user/user";
import { AScreen } from "./a-screen";


export class GameoverScreen extends AScreen {

    btn: StartGameButton;
    
    constructor(mainContainer: Container) {
        super(mainContainer);
    }

    public override init(): void {
        
        // bg
        const bg = new Texture(Texture.from('../assets/gameover-screen.png').baseTexture, new Rectangle(0, 0, 800, 600));
        const bgSprite = new Sprite(bg);
        this._view.addChild(bgSprite);

        // count current score
        const yourScore = new Text(User.points, {
            fontFamily: 'Trebuchet MS',
            fontSize: 30,
            fontWeight: 'bold',
            fill: 0xffffff,
            align: 'right'
        });
        yourScore.x = 200;
        yourScore.y = 72;
        this.view.addChild(yourScore);

        // count highest score
        const highestScore = new Text(User.highest, {
            fontFamily: 'Trebuchet MS',
            fontSize: 30,
            fontWeight: 'bold',
            fill: 0xffffff,
            align: 'right'
        });
        highestScore.x = 240;
        highestScore.y = 200;
        this.view.addChild(highestScore);

        // start new game button
        this.btn = new StartGameButton();
        const btnSprite = this.btn.animS;
        btnSprite.x = 460;
        btnSprite.y = 350;
        this.view.addChild(btnSprite);

        this._mc.addChild(this.view);
    }

    public override destroy(): void {
        this.btn.destroy();
        super.destroy();
    }

}