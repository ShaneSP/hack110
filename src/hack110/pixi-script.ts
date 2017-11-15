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
  graphics: Graphics;
  direction: number = 1;
  constructor(graphics: Graphics) {
    this.graphics = graphics;
  }
}

const jiffrey: Graphics = new Graphics();
jiffrey.beginFill(0xaa0000);
jiffrey.drawRect(0, 0, 20, 40);
jiffrey.x = 30;
jiffrey.y = 240;
app.stage.addChild(jiffrey);

const cpuhat: Graphics = new Graphics();
cpuhat.beginFill(0x4b9cd3);
cpuhat.drawCircle(490, 256, 10);
app.stage.addChild(cpuhat);

let blobs: Blob[] = [];
for (let i: number = 1; i <= 4; i++) {
  let graphics: Graphics = new Graphics();
  graphics.beginFill(0xffffff);
  graphics.drawEllipse(0, 0, 10, 20);
  graphics.x = 450 / 4 * i - 20;
  graphics.y = 256;
  let blob: Blob = new Blob(graphics);
  blobs.push(blob);
  app.stage.addChild(blob.graphics);
}

window.onkeydown = function(e: KeyboardEvent): void {
  const LEFT: number = 37;
  const UP: number = 38;
  const RIGHT: number = 39;
  const DOWN: number = 40;
  const STEP: number = 5;
  // e.preventDefault();
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

let hasWon: boolean = false;

const message: Text = new Text("You won!!");
const messageBox: Graphics = new Graphics();

function handleWin(): void {
  message.x = 216;
  message.y = 236;
  message.style.fill = 0xffffff;
  messageBox.beginFill(0x4444aa, 0.4);
  messageBox.drawRect(0, 0, 120, 50);
  messageBox.x = 256 - 40;
  messageBox.y = 256 - 25;
  app.stage.addChild(messageBox);
  app.stage.addChild(message);
  hasWon = true;
}

app.ticker.add(function(delta: number): void {
  for (let i: number = 0; i < blobs.length; i++) {
    const blob: Blob = blobs[i];
    blob.graphics.y += 5 * blob.direction;
    if (Math.random() < 0.01) {
      blob.direction *= -1;
    }
    if (blob.graphics.y <= 0) {
      blob.direction *= -1;
      blob.graphics.y = 1;
    } else if (blob.graphics.y >= 512) {
      blob.direction *= -1;
      blob.graphics.y = 511;
    }
    if (isColliding(jiffrey, blob.graphics)) {
      jiffrey.x = 30;
      jiffrey.y = 240;
    }
    if (isColliding(jiffrey, cpuhat)) {
      handleWin();
    }
    if (isColliding(jiffrey, messageBox) && hasWon) {
      jiffrey.x = 30;
      jiffrey.y = 240;
      app.stage.removeChild(message);
      app.stage.removeChild(messageBox);
      hasWon = false;
    }
  }
});