/* tslint:disable */

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

let background: Sprite = Sprite.fromImage("./dungeon.png");
app.stage.addChild(background);

let kris: Sprite = Sprite.fromImage("./kris.png");
kris.scale.x = 0.12;
kris.scale.y = 0.12;
kris.x = 40;
kris.y = 240;
app.stage.addChild(kris);

let cpuhat: Sprite = Sprite.fromImage("./cpuhat.png");
cpuhat.scale.x = 0.1;
cpuhat.scale.y = 0.1;
cpuhat.x = 450;
cpuhat.y = 240;
app.stage.addChild(cpuhat);

window.onkeydown = (e: KeyboardEvent): void => {
    const LEFT: number = 37;
    const UP: number = 38;
    const RIGHT: number = 39;
    const DOWN: number = 40;
    const STEP: number = 5;
    if (e.keyCode === LEFT) {
        kris.x -= STEP;
    } else if (e.keyCode === UP) {
        kris.y -= STEP;
    } else if (e.keyCode === RIGHT) {
        kris.x += STEP;
    } else if (e.keyCode === DOWN) {
        kris.y += STEP;
    }
};

/* Let's add some enemies!

   We create a class for our enemies since there are multiple instances 
   of them doing the same thing, then we add them to the app with a for-loop.
*/

class Blob {
    sprite: Sprite;
    direction: number = 1;
    constructor(sprite: Sprite) {
        this.sprite = sprite;
    }
}

let blobs: Blob[] = [];
for (let i: number = 1; i <= 4; i++) {
    let sprite: Sprite = Sprite.fromImage("./blob.png");
    sprite.x = 450 / 4 * i - 20;
    sprite.y = 256;
    let blob: Blob = new Blob(sprite);
    blobs[blobs.length] = blob;
    app.stage.addChild(blob.sprite);
}

/* The collisions are checked by comparing two DisplayObjects 
   and testing if their bounds are intersecting.
*/

let isColliding = (a: DisplayObject, b: DisplayObject): boolean => {
    const ab: Rectangle = a.getBounds();
    const bb: Rectangle = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
};

let resetKris = (): void => {
    kris.x = 30;
    kris.y = 240;
};

app.ticker.add((delta: number): void => {
    for (let i: number = 0; i < blobs.length; i++) {
        //   Let's have the enemies move.
        
          const blob: Blob = blobs[i];
          blob.sprite.y += 5 * blob.direction;
        // random direction change
          if (Math.random() < 0.01) { // 1% chance every tick
            blob.direction *= -1;
          }
        // don't go out of bounds
          if (blob.sprite.y <= 0) {
            blob.direction = 1;
            blob.sprite.y = 1;
          } else if (blob.sprite.y >= 512) {
            blob.direction = -1;
            blob.sprite.y = 511;
          }
        
        //   This tests if the enemies are colliding with the protagonist.
        
          if (isColliding(kris, blob.sprite)) {
            resetKris();
          }
    }
});