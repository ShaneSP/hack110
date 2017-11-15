/// <reference path="../../node_modules/@types/easeljs/index.d.ts" />

type SpriteSheet = createjs.SpriteSheet;
type Stage = createjs.Stage;

const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;

const stage: Stage = new createjs.Stage(canvas);
console.log(stage);

const map: SpriteSheet = new createjs.SpriteSheet({
  "images": ["assets/dungeon.png"],
  "frames": {
    "height": 512,
    "width": 512,
    "regX": 0,
    "regY": 0,
    "count": 1
 }
});

function main(): void {
  createGame();
}

function createGame(): void {

}