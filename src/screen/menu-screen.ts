import { Container, Rectangle, Sprite, Texture } from "pixi.js";
import { StartGameButton } from "../ui/start-game-button";
import { AScreen } from "./a-screen";

export class MenuScreen extends AScreen {

    btn: StartGameButton;

    constructor(mainContainer: Container) {
        super(mainContainer);
    }

    public override init(): void {

        // bg
        const bg = new Texture(Texture.from('../assets/menu-screen.png').baseTexture, new Rectangle(0, 0, 800, 600));
        const bgSprite = new Sprite(bg);
        this._view.addChild(bgSprite);

        // start game button
        this.btn = new StartGameButton();
        const btnSprite = this.btn.animS;
        btnSprite.x = 460;
        btnSprite.y = 350;
        this._view.addChild(btnSprite);
        this._mc.addChild(this._view);
    }

    public override destroy(): void {
        this.btn.destroy();
        super.destroy();
    }
}