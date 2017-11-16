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

let jiffrey: Sprite = Sprite.fromImage("./jiffrey.jpg");
jiffrey.scale.x = 0.12;
jiffrey.scale.y = 0.12;
jiffrey.x = 40;
jiffrey.y = 240;
app.stage.addChild(jiffrey);

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

window.onkeydown = function(e: KeyboardEvent): void {
  const LEFT: number = 37;
  const UP: number = 38;
  const RIGHT: number = 39;
  const DOWN: number = 40;
  const STEP: number = 5;
  if (e.keyCode === LEFT) {
    jiffrey.x -= STEP;
  } else if (e.keyCode === UP) {
    jiffrey.y -= STEP;
  } else if (e.keyCode === RIGHT) {
    jiffrey.x += STEP;
  } else if (e.keyCode === DOWN) {
    jiffrey.y += STEP;
  }
};

function isColliding(a: DisplayObject, b: DisplayObject): boolean {
  const ab: Rectangle = a.getBounds();
  const bb: Rectangle = b.getBounds();
  return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

function resetJiffrey(): void {
  jiffrey.x = 30;
  jiffrey.y = 240;
}

let hasWon: boolean = false;

let message: Text = new Text("You won!!");
let messageBox: Graphics = new Graphics();

function handleWin(): void {
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

app.ticker.add(function(delta: number): void {
  for (let i: number = 0; i < blobs.length; i++) {
    const blob: Blob = blobs[i];
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
    if (isColliding(jiffrey, blob.sprite)) {
      resetJiffrey();
    }
    if (isColliding(jiffrey, cpuhat)) {
      handleWin();
    }
    if (isColliding(jiffrey, messageBox) && hasWon) {
      resetJiffrey();
      app.stage.removeChild(message);
      app.stage.removeChild(messageBox);
      hasWon = false;
    }
  }
});