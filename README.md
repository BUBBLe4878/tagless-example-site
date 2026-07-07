# Build a Pixel Canvas (completely static — no server needed)

This tutorial builds a full-screen pixel canvas where **the entire picture is one array**. No server, no database, no fetch — you can open the finished file straight in your browser (or host it anywhere static, like GitHub Pages).

Each step has:

1. **The new code** for that step
2. **What it should look like** when you open the page
3. **Total so far** — the complete file up to that point (collapsed, click to expand)

The one big idea, up front: **the array is the picture.** Every square on screen is a number in a 2D array, and drawing is just "read the number, paint the color." Change the numbers, change the picture.

---

## Step 1 — The HTML skeleton

Every canvas project starts the same way: a page with nothing on it except a `<canvas>` element stretched to fill the whole window.

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

Three small but important details:

- `margin: 0` — browsers add a default margin around the body. Without this, the canvas gets pushed away from the edges and you get scrollbars.
- `overflow: hidden` — stops scrollbars from ever appearing.
- `display: block` — canvas is `inline` by default, which adds a mysterious few pixels of space below it. `block` fixes that.

### What it should look like

A completely blank white page. Boring — but if you see scrollbars, something is wrong. Check the CSS.

<details>
<summary><strong>Total so far</strong></summary>

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

</details>

---

## Step 2 — Hook up the canvas and make it sharp

Add a `<script>` after the `</body>` tag. First job: grab the canvas, get its 2D drawing context, and size it correctly.

Here's the trap: the CSS makes the canvas *look* 100vw × 100vh, but the canvas's internal drawing surface is a separate size (300 × 150 by default). If you don't match them up, everything you draw comes out stretched and blurry.

We also multiply by `devicePixelRatio` so the squares stay crisp on high-DPI screens (and by an extra 5 to over-sample — the squares get *really* sharp):

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

  // sanity check: draw one test square
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, squareWidth - 0.5, squareWidth - 0.5);
</script>
```

What's going on:

- `canvas.width` / `canvas.height` set the internal pixel resolution to match the window (times the scale factor).
- `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)` scales all our drawing up by the same factor, so we can keep thinking in normal screen coordinates. Draw an 8px square, get an 8px square.
- `squareWidth = 8` — every "pixel" on our canvas is an 8×8 square.
- The `- 0.5` on the size leaves a tiny gap between squares, which gives the grid its pixel-art look.

### What it should look like

A white page with **one tiny green square in the top-left corner**. That square is proof the whole pipeline works.

<details>
<summary><strong>Total so far</strong></summary>

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

    // sanity check: draw one test square
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, squareWidth - 0.5, squareWidth - 0.5);
  </script>
</html>
```

</details>

---

## Step 3 — The array IS the picture

Here's the core of the whole project. We make one 2D array, `pixelData`, sized to fill the screen. `pixelData[row][col]` is a number, and a lookup table says what color each number means:

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

`window.innerHeight / squareWidth` = "how many 8-pixel squares fit top to bottom" — so the grid always exactly fills the window, no matter the screen size.

Then drawing is dead simple. One function paints a single square by *reading its number from the array*, and another loops over the whole grid:

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

(This replaces the test square from Step 2.)

The position math is the heart of it:

- **column → x:** `squareWidth * col` (column 3 starts at x = 24)
- **row → y:** `squareWidth * row` (row 2 starts at y = 16)

The `|| "green"` is a safety net: if a number sneaks into the array that isn't in the `colors` table, we paint green instead of crashing with `fillStyle = undefined`.

> ⚠️ **Off-by-one warning (learned the hard way):** keep everything 0-based — row 0 is the top row, drawn at `y = squareWidth * 0`. If you start counting rows at 1 in one place and 0 in another, your grid gets shifted by one row and clicks land on the wrong pixel. Pick 0-based and stick with it *everywhere*.

### What it should look like

The whole window fills with a **grid of green squares** with thin white gaps between them. Try it: set `pixelData[2][5] = 4;` right before `drawPattern()` and refresh — a blue square appears at row 2, column 5. The picture really is just the data.

<details>
<summary><strong>Total so far</strong></summary>

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

</details>

---

## Step 4 — Draw pictures in the array

Since the picture is just numbers, you can *draw with your keyboard*. A small picture is a smaller 2D array — write it so it visually looks like the thing (that's the fun part):

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

Squint at the numbers — you can see the heart and the face right in the code.

Now a `stamp` function that copies a small picture into the big grid at any position:

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

Notes:

- `pixelData[top + row][left + col] = art[row][col]` is the whole trick: cell `(row, col)` of the small picture lands at `(top + row, left + col)` of the big grid.
- The `if` guard skips anything that would land outside the grid, so stamping near an edge can't crash. (Without it, `pixelData[999]` is `undefined` and `undefined[3] = 2` throws an error.)
- **Stamp before you draw.** `stamp()` only changes the array — the screen updates when `drawPattern()` reads the array. Data first, then display.

### What it should look like

The green grid, now with a **red pixel heart** and a **blue pixel smiley** near the top-left. Try changing `stamp(heart, 5, 10)` to different numbers and refresh — the heart moves. Stamp it ten times in a loop. Make your own art array. This is exactly how the old-school "HELLO WORLD" letter grids work too — each letter is just a small array.

<details>
<summary><strong>Total so far</strong></summary>

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

</details>

---

## Step 5 — Click to paint

Last step: make it interactive. When the user clicks, we figure out **which square** they clicked. That's the reverse of the drawing math — instead of `col × squareWidth = x`, we do `x ÷ squareWidth = col` and round down:

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

And while we're at it, redraw when the window resizes so the grid never goes stale:

```js
window.addEventListener("resize", function () {
  resizeCanvas();
  drawPattern();
});
```

Breaking down the click math:

- `event.clientX` is where you clicked **in the window**; `rect.left` is where the canvas starts. Subtracting gives the position **inside the canvas**.
- `Math.floor(x / squareWidth)` converts a pixel position into a grid column. A click at x = 20 with 8px squares → `Math.floor(2.5)` → column 2. ✔️
- We do **not** multiply the click coordinates by `dpr`. The `setTransform` from Step 2 already handles scaling for drawing, so click math works in plain screen coordinates. (Multiplying by dpr here is a classic bug that makes every click land way off — if clicks paint the wrong square, check this first.)
- Look at the order inside the handler: **update the array first, then call `drawPixel`**. We never paint the canvas directly with a hardcoded color — we change the data and let the same draw function do its job. One source of truth, one way to draw. That discipline is what makes the code easy to extend later.

### What it should look like

The finished thing: green grid, red heart, blue smiley — and **clicking any square turns it blue**, exactly under your cursor, with `Painted row 12, col 34` in the console (F12). Resize the window and the grid redraws to fit.

Refreshing wipes your clicks — that's the honest cost of "completely static." The array only lives in the page's memory. (Making clicks survive a refresh is what a server or `localStorage` is for — see below.)

<details>
<summary><strong>Total so far (the finished file)</strong></summary>

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

</details>

---

## Where to go next

- **More colors** — the `colors` table is begging for it. Add `1: "black", 3: "yellow"`, make a little palette UI, and store the currently selected number in a variable the click handler uses.
- **Remember drawings without a server** — `localStorage.setItem("pixels", JSON.stringify(pixelData))` after each click, `JSON.parse` it back on load. Still 100% static!
- **Letter stamps** — make a small array for each letter (like the H/E/L/O experiment) and a `stampWord()` that stamps them side by side.
- **Go multiplayer** — when you want everyone to share one canvas, that's when you need a server and database. That's exactly what `index.html` + `server.js` in this project do: every click POSTs to `/api/pixels`, and the page loads all saved pixels on start.
