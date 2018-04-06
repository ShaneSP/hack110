import {
    Sprite,
    Application,
    Rectangle,
    Graphics
} from "pixi.js";

const app: Application = new Application(512, 512);
document.body.appendChild(app.view);

let background: Sprite = Sprite.fromImage("./dungeon.png");
app.stage.addChild(background);

/* New stuff! :D

   Below you see that we're using the Sprite class again to create
   our protagonist (Jiffrey). We then access Jiffrey's x, y-coordinates
   to set his starting position. Finally, we append our protagonist to
   our app. 
*/
let jiffrey: Sprite = Sprite.fromImage("./jiffrey.jpg");
jiffrey.scale.x = 0.12;
jiffrey.scale.y = 0.12;
jiffrey.x = 40;
jiffrey.y = 240;
app.stage.addChild(jiffrey);

/*
   You'll notice our goal (or cpuhat) is also a Sprite, we'll describe
   how we're going to differentiate these objects later. 
*/
let cpuhat: Sprite = Sprite.fromImage("./cpuhat.png");
cpuhat.scale.x = 0.1;
cpuhat.scale.y = 0.1;
cpuhat.x = 450;
cpuhat.y = 240;
app.stage.addChild(cpuhat);

window.onkeydown = (e: KeyboardEvent): void => {
    // const LEFT: number = 37;
    // const UP: number = 38;
    // const RIGHT: number = 39;
    // const DOWN: number = 40;
    // const STEP: number = 5;
    // if (e.keyCode === LEFT) {
    //     jiffrey.x -= STEP;
    // } else if (e.keyCode === UP) {
    //     jiffrey.y -= STEP;
    // } else if (e.keyCode === RIGHT) {
    //     jiffrey.x += STEP;
    // } else if (e.keyCode === DOWN) {
    //     jiffrey.y += STEP;
    // }
};