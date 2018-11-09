
/* 
   This import statement is pulling in the 
   classes we need from the pixi.js API
*/

import {
    Sprite,
    Application
} from "pixi.js";

/* 
   Here we're creating the Application object required by
   pixi.js to run our game. We can define the window size of 
   the app in the Application constructor call.
*/


let init = () => {
    const app: Application = new Application(512, 512);
    document.body.appendChild(app.view); // <-- this appends the app's view property to the HTML document element

    /* 
    We've added an image to the background of our application, 
    using the Sprite class--a Sprite is just a visual element in
    our app.
    */
    let background: Sprite = Sprite.fromImage("./dungeon.png");
    app.stage.addChild(background);
}