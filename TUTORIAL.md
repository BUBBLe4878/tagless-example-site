# pixel canvas tutorial (no server needed)

Hey, so this is a tutorial for how I made the pixel canvas. This version is completely static, meaning theres no server or database or anything. The whole picture is just one array. You can literally double click the html file and it opens in your browser and works.

Every step has 3 parts:

1. the new code for that step
2. what the page should look like when you open it
3. the total code so far, so if yours isnt working you can compare

Before we start, the one big idea that makes this whole thing click: **the array IS the picture.** Every square on the screen is just a number in a 2D array. Drawing is just reading the number and painting the right color. Change the numbers, the picture changes. Thats it, thats the whole project.

---

## step 1 - the html skeleton

Just a page with nothing on it except a canvas stretched to fill the whole window.

```html
<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        overflow: hidden;
        font-family: Arial, sans-serif;
      }
      canvas {
        display: block;
        width: 100vw;
        height: 100vh;
      }
    </style>
  </head>
  <body>
    <canvas id="canvas-id"></canvas>
  </body>
</html>
```

A couple things in the css that look pointless but arent:

- `margin: 0` - browsers add a default margin around the body for some reason. Without this the canvas gets pushed away from the edges and you get scrollbars.
- `overflow: hidden` - makes sure scrollbars never show up.
- `display: block` - canvas is inline by default which adds this mysterious little gap of space under it. block fixes that.

### what it should look like

A completely blank white page. Boring, I know. But if you see scrollbars something is already wrong, go check the css.

### total so far

```html
<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        overflow: hidden;
        font-family: Arial, sans-serif;
      }
      canvas {
        display: block;
        width: 100vw;
        height: 100vh;
      }
    </style>
  </head>
  <body>
    <canvas id="canvas-id"></canvas>
  </body>
</html>
```

---

## step 2 - hook up the canvas and make it sharp

Add a script tag after the body. First job is grabbing the canvas, getting its 2d context, and sizing it right.

Heres the thing that got me at first: the css makes the canvas LOOK like its 100vw x 100vh, but the canvas has its own internal size thats separate (300x150 by default, dont ask me why). If you dont match them up everything you draw comes out stretched and blurry.

We also multiply by devicePixelRatio so the squares stay crisp on high res screens. I multiply by an extra 5 on top of that to oversample it, which honestly might be overkill but the squares come out really sharp so im keeping it.

```html
<script>
  const canvas = document.getElementById("canvas-id");
  const ctx = canvas.getContext("2d");
  const squareWidth = 8;

  function resizeCanvas() {
    const dpr = window.devicePixelRatio * 5 || 1;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resizeCanvas();

  // test square to make sure everything works
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, squareWidth - 0.5, squareWidth - 0.5);
</script>
```

Whats going on here:

- `canvas.width` and `canvas.height` set the internal resolution to match the window (times the scale factor).
- `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)` scales all our drawing up by that same factor, so we can keep thinking in normal screen coordinates. You draw an 8px square, you get an 8px square.
- `squareWidth = 8` means every "pixel" on our canvas is an 8x8 square.
- the `- 0.5` on the size leaves a tiny gap between squares. Thats what gives it the pixel art grid look instead of just being a solid blob of color.

### what it should look like

White page with one tiny green square in the top left corner. Not impressive but that square proves the whole pipeline works.

### total so far

```html
<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        overflow: hidden;
        font-family: Arial, sans-serif;
      }
      canvas {
        display: block;
        width: 100vw;
        height: 100vh;
      }
    </style>
  </head>
  <body>
    <canvas id="canvas-id"></canvas>
  </body>
  <script>
    const canvas = document.getElementById("canvas-id");
    const ctx = canvas.getContext("2d");
    const squareWidth = 8;

    function resizeCanvas() {
      const dpr = window.devicePixelRatio * 5 || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resizeCanvas();

    // test square to make sure everything works
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, squareWidth - 0.5, squareWidth - 0.5);
  </script>
</html>
```

---

## step 3 - the array is the picture

Ok this is the core of the whole project. We make one 2D array called pixelData, sized to fill the screen. `pixelData[row][col]` is a number, and a lookup table says what color each number means.

```js
// number -> color. add more colors here whenever you want
const colors = {
  0: "green",
  2: "red",
  4: "blue",
};

// the whole picture is one 2D array: pixelData[row][col]
const ROWS = Math.floor(window.innerHeight / squareWidth);
const COLS = Math.floor(window.innerWidth / squareWidth);

const pixelData = [];
for (let row = 0; row < ROWS; row++) {
  pixelData.push(Array(COLS).fill(0));
}
```

`window.innerHeight / squareWidth` is basically asking "how many 8 pixel squares fit top to bottom", so the grid always exactly fills the window no matter the screen size.

Then drawing is simple. One function paints a single square by reading its number from the array, and another one loops over the whole grid.

```js
// paint one square, reading its color from the array
function drawPixel(row, col) {
  ctx.fillStyle = colors[pixelData[row][col]] || "green";
  ctx.fillRect(
    squareWidth * col,
    squareWidth * row,
    squareWidth - 0.5,
    squareWidth - 0.5,
  );
}

// paint the whole grid
function drawPattern() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      drawPixel(row, col);
    }
  }
}

resizeCanvas();
drawPattern();
```

(this replaces the test square from step 2)

The position math is the heart of it. Column 3 starts at x = 3 * 8 = 24. Row 2 starts at y = 2 * 8 = 16. Multiply the grid position by squareWidth and thats where the square goes.

The `|| "green"` is a safety net. If some number sneaks into the array thats not in the colors table, we just paint green instead of setting fillStyle to undefined and wondering why nothing draws.

Also, a warning from experience: keep everything 0 based. Row 0 is the top row, drawn at y = 0. I originally had my rows start counting at 1 in one place and 0 in another and my whole grid was shifted by one row and clicks landed on the wrong pixel. I spent way too long on that. Pick 0 based and stick with it everywhere.

### what it should look like

The whole window fills up with a grid of green squares with thin gaps between them. Try this: put `pixelData[2][5] = 4;` right before drawPattern() and refresh. A blue square shows up at row 2 column 5. The picture really is just the data.

### total so far

```html
<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        overflow: hidden;
        font-family: Arial, sans-serif;
      }
      canvas {
        display: block;
        width: 100vw;
        height: 100vh;
      }
    </style>
  </head>
  <body>
    <canvas id="canvas-id"></canvas>
  </body>
  <script>
    const canvas = document.getElementById("canvas-id");
    const ctx = canvas.getContext("2d");
    const squareWidth = 8;

    // number -> color. add more colors here whenever you want
    const colors = {
      0: "green",
      2: "red",
      4: "blue",
    };

    // the whole picture is one 2D array: pixelData[row][col]
    const ROWS = Math.floor(window.innerHeight / squareWidth);
    const COLS = Math.floor(window.innerWidth / squareWidth);

    const pixelData = [];
    for (let row = 0; row < ROWS; row++) {
      pixelData.push(Array(COLS).fill(0));
    }

    function resizeCanvas() {
      const dpr = window.devicePixelRatio * 5 || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // paint one square, reading its color from the array
    function drawPixel(row, col) {
      ctx.fillStyle = colors[pixelData[row][col]] || "green";
      ctx.fillRect(
        squareWidth * col,
        squareWidth * row,
        squareWidth - 0.5,
        squareWidth - 0.5,
      );
    }

    // paint the whole grid
    function drawPattern() {
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          drawPixel(row, col);
        }
      }
    }

    resizeCanvas();
    drawPattern();
  </script>
</html>
```

---

## step 4 - drawing pictures in the array

Since the picture is just numbers, you can draw with your keyboard. A small picture is just a smaller 2D array. Write it out so it visually looks like the thing, thats honestly the fun part.

```js
// small pictures are just smaller arrays (2 = red, 4 = blue)
const heart = [
  [0, 2, 2, 0, 2, 2, 0],
  [2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2],
  [0, 2, 2, 2, 2, 2, 0],
  [0, 0, 2, 2, 2, 0, 0],
  [0, 0, 0, 2, 0, 0, 0],
];

const smiley = [
  [0, 4, 4, 4, 4, 4, 0],
  [4, 0, 0, 0, 0, 0, 4],
  [4, 0, 4, 0, 4, 0, 4],
  [4, 0, 0, 0, 0, 0, 4],
  [4, 0, 4, 0, 4, 0, 4],
  [4, 0, 0, 4, 0, 0, 4],
  [0, 4, 4, 4, 4, 4, 0],
];
```

Squint at the numbers and you can see the heart and the face right there in the code.

Now we need a stamp function that copies a small picture into the big grid at whatever position you want.

```js
// copy a small picture into the big grid, top-left corner at (top, left)
function stamp(art, top, left) {
  for (let row = 0; row < art.length; row++) {
    for (let col = 0; col < art[row].length; col++) {
      if (
        pixelData[top + row] &&
        pixelData[top + row][left + col] !== undefined
      ) {
        pixelData[top + row][left + col] = art[row][col];
      }
    }
  }
}

stamp(heart, 5, 10);
stamp(smiley, 5, 25);
```

How it works:

- `pixelData[top + row][left + col] = art[row][col]` is the whole trick. Cell (row, col) of the small picture lands at (top + row, left + col) of the big grid.
- the if check skips anything that would land outside the grid, so stamping near an edge cant crash. Without it, pixelData[999] is undefined and trying to index into undefined throws an error and your whole script dies.
- stamp BEFORE you draw. stamp() only changes the array, the screen doesnt update until drawPattern() reads the array. Data first, then display.

### what it should look like

The green grid, but now with a red pixel heart and a blue pixel smiley near the top left. Try changing `stamp(heart, 5, 10)` to different numbers and refresh, the heart moves. Stamp it 10 times in a loop. Make your own art array. This is also exactly how you'd do letters btw, each letter is just a small array (my first version of this project drew HELLO WORLD that way).

### total so far

```html
<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        overflow: hidden;
        font-family: Arial, sans-serif;
      }
      canvas {
        display: block;
        width: 100vw;
        height: 100vh;
      }
    </style>
  </head>
  <body>
    <canvas id="canvas-id"></canvas>
  </body>
  <script>
    const canvas = document.getElementById("canvas-id");
    const ctx = canvas.getContext("2d");
    const squareWidth = 8;

    // number -> color. add more colors here whenever you want
    const colors = {
      0: "green",
      2: "red",
      4: "blue",
    };

    // the whole picture is one 2D array: pixelData[row][col]
    const ROWS = Math.floor(window.innerHeight / squareWidth);
    const COLS = Math.floor(window.innerWidth / squareWidth);

    const pixelData = [];
    for (let row = 0; row < ROWS; row++) {
      pixelData.push(Array(COLS).fill(0));
    }

    // small pictures are just smaller arrays (2 = red, 4 = blue)
    const heart = [
      [0, 2, 2, 0, 2, 2, 0],
      [2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2],
      [0, 2, 2, 2, 2, 2, 0],
      [0, 0, 2, 2, 2, 0, 0],
      [0, 0, 0, 2, 0, 0, 0],
    ];

    const smiley = [
      [0, 4, 4, 4, 4, 4, 0],
      [4, 0, 0, 0, 0, 0, 4],
      [4, 0, 4, 0, 4, 0, 4],
      [4, 0, 0, 0, 0, 0, 4],
      [4, 0, 4, 0, 4, 0, 4],
      [4, 0, 0, 4, 0, 0, 4],
      [0, 4, 4, 4, 4, 4, 0],
    ];

    // copy a small picture into the big grid, top-left corner at (top, left)
    function stamp(art, top, left) {
      for (let row = 0; row < art.length; row++) {
        for (let col = 0; col < art[row].length; col++) {
          if (
            pixelData[top + row] &&
            pixelData[top + row][left + col] !== undefined
          ) {
            pixelData[top + row][left + col] = art[row][col];
          }
        }
      }
    }

    stamp(heart, 5, 10);
    stamp(smiley, 5, 25);

    function resizeCanvas() {
      const dpr = window.devicePixelRatio * 5 || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // paint one square, reading its color from the array
    function drawPixel(row, col) {
      ctx.fillStyle = colors[pixelData[row][col]] || "green";
      ctx.fillRect(
        squareWidth * col,
        squareWidth * row,
        squareWidth - 0.5,
        squareWidth - 0.5,
      );
    }

    // paint the whole grid
    function drawPattern() {
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          drawPixel(row, col);
        }
      }
    }

    resizeCanvas();
    drawPattern();
  </script>
</html>
```

---

## step 5 - click to paint

Last step, making it interactive. When you click we need to figure out which square you clicked. Its just the drawing math in reverse. Drawing was col * squareWidth = x, so clicking is x / squareWidth = col, rounded down.

```js
canvas.addEventListener("click", function (event) {
  const rect = canvas.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const col = Math.floor(x / squareWidth);
  const row = Math.floor(y / squareWidth);

  // ignore clicks outside the grid
  if (!pixelData[row] || pixelData[row][col] === undefined) return;

  pixelData[row][col] = 4;
  drawPixel(row, col);
  console.log(`Painted row ${row}, col ${col}`);
});
```

And while were at it, redraw when the window resizes so the grid doesnt go stale:

```js
window.addEventListener("resize", function () {
  resizeCanvas();
  drawPattern();
});
```

Breaking down the click math:

- `event.clientX` is where you clicked in the window, `rect.left` is where the canvas starts. Subtract and you get the position inside the canvas.
- `Math.floor(x / squareWidth)` turns a pixel position into a grid column. Click at x = 20 with 8px squares, thats Math.floor(2.5), column 2.
- do NOT multiply the click coordinates by dpr. The setTransform from step 2 already handles the scaling for drawing, so the click math works in plain screen coordinates. I had a bug where I multiplied by dpr here and every click landed way off from where I actually clicked. If your clicks paint the wrong square, check this first.
- look at the order in the handler: update the array FIRST, then call drawPixel. We never paint the canvas directly with some hardcoded color, we change the data and let the same draw function do its thing. One source of truth, one way to draw. Keeping that rule is what makes this easy to add stuff to later.

### what it should look like

The finished thing. Green grid, red heart, blue smiley, and clicking any square turns it blue right under your cursor. Open the console (F12) and youll see `Painted row 12, col 34` for every click. Resize the window and the grid redraws to fit.

One honest downside: refreshing wipes your clicks. Thats the cost of completely static, the array only lives in the pages memory. Making clicks survive a refresh is what a server (or localStorage) is for, see below.

### total so far (the finished file)

```html
<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        overflow: hidden;
        font-family: Arial, sans-serif;
      }
      canvas {
        display: block;
        width: 100vw;
        height: 100vh;
      }
    </style>
  </head>
  <body>
    <canvas id="canvas-id"></canvas>
  </body>
  <script>
    const canvas = document.getElementById("canvas-id");
    const ctx = canvas.getContext("2d");
    const squareWidth = 8;

    // number -> color. add more colors here whenever you want
    const colors = {
      0: "green",
      2: "red",
      4: "blue",
    };

    // the whole picture is one 2D array: pixelData[row][col]
    const ROWS = Math.floor(window.innerHeight / squareWidth);
    const COLS = Math.floor(window.innerWidth / squareWidth);

    const pixelData = [];
    for (let row = 0; row < ROWS; row++) {
      pixelData.push(Array(COLS).fill(0));
    }

    // small pictures are just smaller arrays (2 = red, 4 = blue)
    const heart = [
      [0, 2, 2, 0, 2, 2, 0],
      [2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2],
      [0, 2, 2, 2, 2, 2, 0],
      [0, 0, 2, 2, 2, 0, 0],
      [0, 0, 0, 2, 0, 0, 0],
    ];

    const smiley = [
      [0, 4, 4, 4, 4, 4, 0],
      [4, 0, 0, 0, 0, 0, 4],
      [4, 0, 4, 0, 4, 0, 4],
      [4, 0, 0, 0, 0, 0, 4],
      [4, 0, 4, 0, 4, 0, 4],
      [4, 0, 0, 4, 0, 0, 4],
      [0, 4, 4, 4, 4, 4, 0],
    ];

    // copy a small picture into the big grid, top-left corner at (top, left)
    function stamp(art, top, left) {
      for (let row = 0; row < art.length; row++) {
        for (let col = 0; col < art[row].length; col++) {
          if (
            pixelData[top + row] &&
            pixelData[top + row][left + col] !== undefined
          ) {
            pixelData[top + row][left + col] = art[row][col];
          }
        }
      }
    }

    stamp(heart, 5, 10);
    stamp(smiley, 5, 25);

    function resizeCanvas() {
      const dpr = window.devicePixelRatio * 5 || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // paint one square, reading its color from the array
    function drawPixel(row, col) {
      ctx.fillStyle = colors[pixelData[row][col]] || "green";
      ctx.fillRect(
        squareWidth * col,
        squareWidth * row,
        squareWidth - 0.5,
        squareWidth - 0.5,
      );
    }

    // paint the whole grid
    function drawPattern() {
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          drawPixel(row, col);
        }
      }
    }

    canvas.addEventListener("click", function (event) {
      const rect = canvas.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const col = Math.floor(x / squareWidth);
      const row = Math.floor(y / squareWidth);

      // ignore clicks outside the grid
      if (!pixelData[row] || pixelData[row][col] === undefined) return;

      pixelData[row][col] = 4;
      drawPixel(row, col);
      console.log(`Painted row ${row}, col ${col}`);
    });

    window.addEventListener("resize", function () {
      resizeCanvas();
      drawPattern();
    });

    resizeCanvas();
    drawPattern();
  </script>
</html>
```

---

## where to go from here

Some ideas if you wanna keep going:

- **more colors** - the colors table makes this easy. Add like `1: "black", 3: "yellow"`, make a little palette on the side, and keep the currently selected number in a variable that the click handler uses instead of hardcoding 4.
- **remember drawings without a server** - `localStorage.setItem("pixels", JSON.stringify(pixelData))` after each click, then JSON.parse it back when the page loads. Still 100% static.
- **letter stamps** - make a small array for each letter and a stampWord() that stamps them side by side. Thats how the HELLO WORLD version worked.
- **go multiplayer** - if you want everyone to share one canvas thats when you actually need a server and a database. Every click POSTs the pixel to the server, and the page loads all the saved pixels when it starts. Thats what the real index.html + server.js in this repo do, but thats a whole other tutorial.

Thanks for reading, hope this helped.
