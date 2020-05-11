import {
    Sprite,
    Container,
    Application,
    Rectangle,
    Graphics,
    DisplayObject,
    Text
} from "pixi.js";

const app: Application = new Application(512, 512);
document.body.appendChild(app.view);

// we use a class to make the blobs to speed things up as there are multiple of them
class Blob {
    sprite: Sprite;
    direction: number = 1;
    constructor(sprite: Sprite) {
        this.sprite = sprite;
    }
}

let background: Sprite = Sprite.fromImage("./dungeon.png");

// create the kris sprite from the png file
let kris: Sprite = Sprite.fromImage("./kris.png");
// adjust kris' size and starting postition
kris.scale.x = 0.16;
kris.scale.y = 0.16;
kris.x = 40;
kris.y = 240;
// used for movement in the ticker
const speed: number = 1;

let cpuhat: Sprite = Sprite.fromImage("./cpuhat.png");
cpuhat.scale.x = 0.1;
cpuhat.scale.y = 0.1;
cpuhat.x = 450;
cpuhat.y = 240;


app.stage.addChild(cpuhat);
app.stage.addChild(kris);
app.stage.addChild(background);


let isColliding = (a: DisplayObject, b: DisplayObject): boolean => {
    let ab: Rectangle = a.getBounds();
    let bb: Rectangle = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

let resetKris = (): void => {
    kris.x = 30;
    kris.y = 240;
}

/*
   We've now added a quasi-gamestate to check if our game is in a winning state.

   Then create a function to handle what happens when our win state is active.
*/

let hasWon: boolean = false;

let message: Text = new Text("You won!!");
let messageBox: Graphics = new Graphics();

let handleWin = (): void => {
    message.x = 216;
    message.y = 236;
    message.style.fill = 0xffffff;
    messageBox.beginFill(0x4444aa, 0.4);
    messageBox.drawRect(0, 0, 120, 50);
    messageBox.x = 256 - 45;
    messageBox.y = 256 - 25;
    app.stage.addChild(messageBox);
    app.stage.addChild(message);
    hasWon = true;
}

app.ticker.add((delta: number): void => {
    // creating our blob enemies
    let blobs: Blob[] = [];
    let sprite: Sprite = Sprite.fromImage("./blob.png");
    for (let i: number = 1; i <= 4; i++) {
        sprite.x = 450 / 4 * i - 20;
        sprite.y = 256;
        let blob: Blob = new Blob(sprite);
        blobs.push(blob);
    }

    // moving the blobs
    for (let i: number = 0; i < blobs.length; i++) {
        let blob: Blob = blobs[i];
        blob.sprite.y += 5 * blob.direction;
        if (Math.random() < 0.01) { // 1% chance every tick
            blob.direction *= -1;
        }

        // if the blobs go off screen, create a new one
        if (blob.sprite.y <= 0 || blob.sprite.y >= 512) {
            blobs[i] = new Blob(sprite);
            blobs[i].sprite.x = 450 / 4 * i - 20;
            blobs[i].sprite.y = 256;
            app.stage.addChild(blobs[i].sprite);
        } 

        window.addEventListener('keydown', (e: KeyboardEvent): void => {
            console.log("key: " + e.keyCode);
            if (e.keyCode === 37) {
                kris.x -= 5;
            } else if (e.keyCode === 38) {
                kris.y -= 5;
            } else if (e.keyCode === 39) {
                kris.x += 5;
            } else if (e.keyCode === 40) {
                kris.y += 5;
            }
        }, false);

        if (isColliding(kris, blob.sprite)) {
            resetKris();
        }
        if (isColliding(kris, cpuhat)) {
            handleWin();
        }
        if (isColliding(kris, messageBox) && hasWon) {
            resetKris();
            hasWon = false;
        }
    }
});
