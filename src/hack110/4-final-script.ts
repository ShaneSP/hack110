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

class Blob {
    sprite: Sprite;
    direction: number = 1;
    constructor(sprite: Sprite) {
        this.sprite = sprite;
    }
}

let background: Sprite = Sprite.fromImage("./dungeon.png");
app.stage.addChild(background);

let kris: Sprite = Sprite.fromImage("./kris.png");
kris.scale.x = 0.12;
kris.scale.y = 0.12;
kris.x = 40;
kris.y = 240;
app.stage.addChild(kris);
const speed: number = 1;

let cpuhat: Sprite = Sprite.fromImage("./cpuhat.png");
cpuhat.scale.x = 0.1;
cpuhat.scale.y = 0.1;
cpuhat.x = 450;
cpuhat.y = 240;
app.stage.addChild(cpuhat);

let blobs: Blob[] = [];
for (let i: number = 1; i <= 4; i++) {
    let sprite: Sprite = Sprite.fromImage("./blob.png");
    sprite.x = 450 / 4 * i - 20;
    sprite.y = 256;
    let blob: Blob = new Blob(sprite);
    blobs.push(blob);
    app.stage.addChild(blob.sprite);
}

let L: number = 0;
let R: number = 0;
let D: number = 0;
let U: number = 0;

window.addEventListener('keydown', (e: KeyboardEvent): void  => {
    console.log("key: " + e.keyCode);
    const LEFT: number = 37;
    const UP: number = 38;
    const RIGHT: number = 39;
    const DOWN: number = 40;
    if (e.keyCode === LEFT) {
        L = -1;
    } else if (e.keyCode === UP) {
        U = -1;
    } else if (e.keyCode === RIGHT) {
        R = 1;
    } else if (e.keyCode === DOWN) {
        D = 1;
    }
}, false);

window.addEventListener('keyup', (e: KeyboardEvent): void  => {
    console.log("key: " + e.keyCode);
    const LEFT: number = 37;
    const UP: number = 38;
    const RIGHT: number = 39;
    const DOWN: number = 40;
    if (e.keyCode === LEFT) {
        L = 0;
    } else if (e.keyCode === UP) {
        U = 0;
    } else if (e.keyCode === RIGHT) {
        R = 0;
    } else if (e.keyCode === DOWN) {
        D = 0;
    }
}, false);

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
};

app.ticker.add((delta: number): void => {
    for (let i: number = 0; i < blobs.length; i++) {
        let blob: Blob = blobs[i];
        blob.sprite.y += 5 * blob.direction;
        if (Math.random() < 0.01) { // 1% chance every tick
            blob.direction *= -1;
        }
        if (blob.sprite.y <= 0) {
            blob.direction = 1;
            blob.sprite.y = 1;
        } else if (blob.sprite.y >= 512) {
            blob.direction = -1;
            blob.sprite.y = 511;
        }

        /* MAGIC */
        kris.x += (L + R) * speed;
        kris.y += (U + D) * speed;

        if (isColliding(kris, blob.sprite)) {
            resetKris();
        }
        if (isColliding(kris, cpuhat)) {
            handleWin();
        }
        if (isColliding(kris, messageBox) && hasWon) {
            resetKris();
            app.stage.removeChild(message);
            app.stage.removeChild(messageBox);
            hasWon = false;
        }
    }
});