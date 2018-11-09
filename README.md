# Common Terms and Issues with Game Building for Hack110
------
## ~~Cheatsheet~~

**Docs**: from most to least helpful
* [PixiJS Documentation](http://pixijs.download/release/docs/index.html)
* [PixiJS Simple Game Demo](http://pixijs.io/examples/#/basics/basic.js)
* [Learning PixiJS](https://github.com/kittykatattack/learningPixi)

**Our Example Code:**
[CPU Hat Adventure](https://github.com/ShaneSP/hack110/tree/master/src/hack110)

## Lingo
**Stage**
* The `stage` is what we can see in the game, to see an object we’ve created we have to add it as a child to the stage using the `addChild` method.
* If a student can’t see something they’ve created, this is probably where the issue lies.
* The order in which something is added to the stage matters, the most recently added will appear on top of everything: _like adding something to a stack of paper_.

**Sprite**
* _Basically just a picture._
* Most commonly filled with the [`fromImage`](http://pixijs.download/release/docs/PIXI.BaseTexture.html#.fromImage) method.
* Has lots of good documentation on the Pixi.JS website for actual Sprite methods.

**Graphics**
* A vector drawing of a shape (uses math to display it instead of pixels).
* There are specific [`drawRect`](http://pixijs.download/release/docs/PIXI.Graphics.html#drawRect) and [`drawCircle`](http://pixijs.download/release/docs/PIXI.Graphics.html#drawCircle) functions to create shapes.

**Sprite vs. Graphic vs. Display Object**
* A [`DisplayObject`](http://pixijs.download/release/docs/PIXI.DisplayObject.html) is the (parent) abstract class of a `Sprite` and a `Graphic`.
    * Generally only used in collision checking (see our example code)
* A sprite is basically just a picture while a `Graphic` can be many different shapes.
* Graphics have their own functions which are pretty well covered in the Graphics documentation on Pixi.JS’s website.

**Event Listeners**
```javascript
window.addEventListener('keydown', (e: KeyboardEvent): void  => { ... }
```
* `'keydown'` and `keyup` are most common.
* The above function is called whenever a key is pressed and held down; _programmers_ usually assign this an anonymous function.
    * Only allows for one key to be pressed at a time so will run into issues for multiplayer games.

**Ticker**
* Ticker updates the stage (what you’re seeing) 60 times a second so whatever you put in here will happen 60 times per second.
* Best used for checking for collisions, updating player positions, and other changes in the game’s state.
* Please please please don’t create any objects here, issues galore will arise. (_There are exceptions to this_)

## Common Issues
"I can’t register more than one button press at a time..."
* Create boolean values to represent whether or not a button is currently being pressed.
    * Handler => `window.onkeydown`
    * Expectation => _set booleans to true_
    * Handler => `window.onkeyup`
    * Expectation => _sets booleans to false_
* Use those booleans in the `ticker` method to update position or whatever the desired result is.

"Something isn’t appearing on my screen..."
* See if `displayObject` is added to stage.
    * Students may try to add an object to the stage but only display objects can be added like a graphics or a sprite.
* Check if object is being created in `ticker` method.
    * This creates the object 60 times per second and can create serious issues.

"Something won’t move..."
* Check if object is being created in `ticker` method.
    * This creates the object 60 times per second so it can’t be updated.



