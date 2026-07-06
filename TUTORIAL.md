# Build a Multiplayer Pixel Canvas (r/place style)

This tutorial walks through building the pixel canvas site step by step. Each step has:

1. **The new code** for that step
2. **What it should look like** when you open the page
3. **Total so far** — the complete file up to that point (collapsed, click to expand)

By the end you'll have a full-screen grid of clickable pixels that saves every click to a database, so everyone who visits sees the same drawing.

**What you need:** a browser, a text editor, and (for steps 5–6) Node.js and a PostgreSQL database (a free Neon or Supabase database works fine).

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

- `margin: 0` — browsers add a default margin around the body. Without this, the canvas would be pushed away from the edges and you'd get scrollbars.
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

Now add a `<script>` after the `</body>` tag. First job: grab the canvas, get its 2D drawing context, and size it correctly.

Here's the trap: the CSS makes the canvas *look* 100vw × 100vh, but the canvas's internal drawing surface is a separate size (300 × 150 by default). If you don't match them up, everything you draw comes out stretched and blurry.

We also multiply by `devicePixelRatio` so the squares stay crisp on high-DPI screens (and we multiply by an extra 5 to over-sample — the squares get *really* sharp):

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
- The `- 0.5` on the size leaves a tiny gap between squares, which gives the grid its nice pixel-art look.

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

## Step 3 — Store the picture as data, then draw it

Here's the core idea of the whole project: **the picture is just numbers.** We keep an object called `pixelData` where each row is an array, and each number is a color code:

| Value | Color |
|-------|-------|
| `0`   | green (empty) |
| `2`   | red   |
| `4`   | blue  |

You *can* write the rows out by hand (great for debugging — put a `4` at the end of a row and watch a blue dot appear):

```js
let pixelData = {
  row0: [0, 0, 0, 0, 2, 0, 0, /* ... */ 0, 4],
  row1: [0, 0, 0, 0, 0, 0, 0, /* ... */ 0, 4],
  // ...
};
```

…but typing 200 zeros per row gets old fast, so we generate empty rows with a loop instead:

```js
let pixelData = {};
const ROWS = 50;
const COLS = 200;

for (let i = 0; i < ROWS; i++) {
  pixelData[`row${i}`] = Array(COLS).fill(0);
}

// drop in a couple of test pixels so we can see something
pixelData["row2"][5] = 4;  // blue
pixelData["row4"][10] = 2; // red
```

Then drawing is two loops: one function that paints a single row, and a loop that calls it for every row:

```js
let rowNum = 0;

function colorPixel() {
  let row = `row${rowNum}`;
  for (var i = 0; i < COLS; i++) {
    if (pixelData[row][i] === 4) {
      ctx.fillStyle = "blue";
    } else if (pixelData[row][i] === 2) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "green";
    }
    ctx.fillRect(
      squareWidth * i,
      squareWidth * rowNum,
      squareWidth - 0.5,
      squareWidth - 0.5,
    );
  }

  rowNum++;
}

function start() {
  resizeCanvas();
  rowNum = 0;
  while (rowNum < ROWS) {
    colorPixel();
  }
}

start();
```

The position math is the heart of it:

- **column → x:** `squareWidth * i` (column 3 starts at x = 24)
- **row → y:** `squareWidth * rowNum` (row 2 starts at y = 16)

> ⚠️ **Off-by-one warning (learned the hard way):** keep everything 0-based — row 0 is the top row, drawn at `y = squareWidth * 0`. If you start counting rows at 1 in one place and 0 in another, your grid gets shifted by one row and clicks land on the wrong pixel. Pick 0-based and stick with it *everywhere*.

### What it should look like

A big **grid of green squares** with thin white gaps between them, filling the top-left area of the screen (50 rows × 200 columns), with **one blue square** and **one red square** where you put the test values. Change a number in `pixelData`, refresh, and watch the square move. The picture really is just the data.

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

    let pixelData = {};
    const ROWS = 50;
    const COLS = 200;

    for (let i = 0; i < ROWS; i++) {
      pixelData[`row${i}`] = Array(COLS).fill(0);
    }

    // test pixels
    pixelData["row2"][5] = 4;  // blue
    pixelData["row4"][10] = 2; // red

    let rowNum = 0;

    function start() {
      resizeCanvas();
      rowNum = 0;
      while (rowNum < ROWS) {
        colorPixel();
      }
    }

    function resizeCanvas() {
      const dpr = window.devicePixelRatio * 5 || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function colorPixel() {
      let row = `row${rowNum}`;
      for (var i = 0; i < COLS; i++) {
        if (pixelData[row][i] === 4) {
          ctx.fillStyle = "blue";
        } else if (pixelData[row][i] === 2) {
          ctx.fillStyle = "red";
        } else {
          ctx.fillStyle = "green";
        }
        ctx.fillRect(
          squareWidth * i,
          squareWidth * rowNum,
          squareWidth - 0.5,
          squareWidth - 0.5,
        );
      }

      rowNum++;
    }

    start();
  </script>
</html>
```

</details>

---

## Step 4 — Click to paint

Time to make it interactive. When the user clicks, we need to figure out **which square** they clicked. That's the reverse of the drawing math — instead of `column × squareWidth = x`, we do `x ÷ squareWidth = column` and round down:

```js
canvas.addEventListener("click", function (event) {
  const rect = canvas.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const col = Math.floor(x / squareWidth);
  const row = Math.floor(y / squareWidth);

  console.log(`Clicked pixel at row: ${row}, col: ${col}`);

  // paint it right away so it feels instant
  ctx.fillStyle = "blue";
  ctx.fillRect(
    col * squareWidth,
    row * squareWidth,
    squareWidth - 0.5,
    squareWidth - 0.5,
  );

  editPixelData(row, col);
});

function editPixelData(row, col) {
  let rowKey = `row${row}`;
  pixelData[rowKey][col] = 4;
}
```

Breaking it down:

- `event.clientX` is where you clicked **in the window**; `rect.left` is where the canvas starts. Subtracting gives the position **inside the canvas**.
- `Math.floor(x / squareWidth)` converts a pixel position into a grid column. A click at x = 20 with 8px squares → `Math.floor(2.5)` → column 2. ✔️
- Note we do **not** multiply the click coordinates by `dpr`. The `setTransform` from Step 2 already handles the scaling for drawing, and the click math works in plain screen coordinates. (Multiplying by dpr here was a bug that made every click land way off — if your clicks paint the wrong square, this is the first thing to check.)
- We update `pixelData` too, not just the screen — so the data always matches the picture. Rule of thumb: **the data is the truth, the canvas is just a display of it.**

### What it should look like

Same green grid, but now **clicking any square turns it blue**, exactly under your cursor. Open the console (F12) and you'll see `Clicked pixel at row: 12, col: 34` for each click. Refresh the page and... your drawing is gone. That's the problem we fix next.

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

    let pixelData = {};
    const ROWS = 50;
    const COLS = 200;

    for (let i = 0; i < ROWS; i++) {
      pixelData[`row${i}`] = Array(COLS).fill(0);
    }

    let rowNum = 0;

    function start() {
      resizeCanvas();
      rowNum = 0;
      while (rowNum < ROWS) {
        colorPixel();
      }
    }

    function resizeCanvas() {
      const dpr = window.devicePixelRatio * 5 || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function colorPixel() {
      let row = `row${rowNum}`;
      for (var i = 0; i < COLS; i++) {
        if (pixelData[row][i] === 4) {
          ctx.fillStyle = "blue";
        } else if (pixelData[row][i] === 2) {
          ctx.fillStyle = "red";
        } else {
          ctx.fillStyle = "green";
        }
        ctx.fillRect(
          squareWidth * i,
          squareWidth * rowNum,
          squareWidth - 0.5,
          squareWidth - 0.5,
        );
      }

      rowNum++;
    }

    canvas.addEventListener("click", function (event) {
      const rect = canvas.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const col = Math.floor(x / squareWidth);
      const row = Math.floor(y / squareWidth);

      console.log(`Clicked pixel at row: ${row}, col: ${col}`);

      ctx.fillStyle = "blue";
      ctx.fillRect(
        col * squareWidth,
        row * squareWidth,
        squareWidth - 0.5,
        squareWidth - 0.5,
      );

      editPixelData(row, col);
    });

    function editPixelData(row, col) {
      let rowKey = `row${row}`;
      pixelData[rowKey][col] = 4;
    }

    start();
  </script>
</html>
```

</details>

---

## Step 5 — A server to remember the pixels

Right now `pixelData` lives in the browser's memory, so a refresh wipes it, and nobody else can see your drawing. Fix: a small Express server with a PostgreSQL database and two routes:

- `GET /api/pixels` — return every saved pixel
- `POST /api/pixels` — save (or update) one pixel

Set up the project:

```bash
npm init -y
npm install express pg cors dotenv
```

Put your database connection string in a `.env` file (**never commit this file** — add it to `.gitignore`):

```
DATABASE_URL=postgres://user:password@your-db-host/dbname
```

Then create `server.js`:

```js
require("dotenv").config();
const express = require("express");
const pg = require("pg");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(".")); // serves index.html

// PostgreSQL Connection Pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Create the table if it doesn't exist yet
async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS pixel_data (
      id SERIAL PRIMARY KEY,
      row_num INT NOT NULL,
      col_num INT NOT NULL,
      value INT NOT NULL,
      UNIQUE(row_num, col_num)
    );
  `);
  console.log("✓ Database table created/verified");
}

// GET: all saved pixels
app.get("/api/pixels", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pixel_data");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching pixels:", err);
    res.status(500).json({ error: "Failed to fetch pixels" });
  }
});

// POST: save one pixel
app.post("/api/pixels", async (req, res) => {
  try {
    const { row, col, value } = req.body;
    const result = await pool.query(
      `INSERT INTO pixel_data (row_num, col_num, value)
       VALUES ($1, $2, $3)
       ON CONFLICT (row_num, col_num)
       DO UPDATE SET value = $3
       RETURNING *`,
      [row, col, value],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error saving pixel:", err);
    res.status(500).json({ error: "Failed to save pixel" });
  }
});

app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await initializeDatabase();
});
```

The clever bit is the SQL. Each pixel is one row in the table, and `UNIQUE(row_num, col_num)` means there can only be one entry per grid position. The `ON CONFLICT ... DO UPDATE` (an "upsert") means: insert the pixel, but if that position already exists, just update its value instead. No duplicates, ever.

> Also note `$1, $2, $3` instead of gluing values into the SQL string. That's a *parameterized query* — it's how you stop people from typing SQL into your website and deleting your table.

### What it should look like

Run `node server.js` and you should see:

```
🚀 Server running on http://localhost:3001
✓ Database table created/verified
```

Open `http://localhost:3001` — the same grid as before, now served by *your server*. Visit `http://localhost:3001/api/pixels` directly and you'll see `[]` (an empty JSON array — no pixels saved yet).

<details>
<summary><strong>Total so far (server.js — new file, index.html unchanged)</strong></summary>

```js
require("dotenv").config();
const express = require("express");
const pg = require("pg");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("."));

// PostgreSQL Connection Pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Initialize database on startup
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pixel_data (
        id SERIAL PRIMARY KEY,
        row_num INT NOT NULL,
        col_num INT NOT NULL,
        value INT NOT NULL,
        UNIQUE(row_num, col_num)
      );
    `);
    console.log("✓ Database table created/verified");
  } catch (err) {
    console.error("Database initialization error:", err);
  }
}

// API Routes
app.get("/api/pixels", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pixel_data");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching pixels:", err);
    res.status(500).json({ error: "Failed to fetch pixels" });
  }
});

app.post("/api/pixels", async (req, res) => {
  try {
    const { row, col, value } = req.body;
    const result = await pool.query(
      `INSERT INTO pixel_data (row_num, col_num, value)
       VALUES ($1, $2, $3)
       ON CONFLICT (row_num, col_num)
       DO UPDATE SET value = $3
       RETURNING *`,
      [row, col, value],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error saving pixel:", err);
    res.status(500).json({ error: "Failed to save pixel" });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await initializeDatabase();
});
```

</details>

---

## Step 6 — Connect the front-end: save on click, load on start

Last step. Two changes to `index.html`:

**1. When you click, send the pixel to the server.** Replace the old `editPixelData` with a `fetch` POST:

```js
function editPixelData(row, col) {
  fetch("/api/pixels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      row: row,
      col: col,
      value: 4, // blue
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Pixel saved:", data);
      // Update local pixelData too
      let rowKey = `row${row}`;
      pixelData[rowKey][col] = 4;
    })
    .catch((err) => console.error("Error saving pixel:", err));
}
```

**2. When the page loads, fetch all saved pixels first, *then* draw.** This replaces the bare `start()` call at the bottom:

```js
async function loadPixelData() {
  try {
    const response = await fetch("/api/pixels");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const pixels = await response.json();

    // Start from a blank grid
    for (let i = 0; i < ROWS; i++) {
      pixelData[`row${i}`] = Array(COLS).fill(0);
    }

    // Fill in saved pixels from the database
    pixels.forEach((pixel) => {
      const rowKey = `row${pixel.row_num}`;
      if (pixelData[rowKey] && pixel.col_num < pixelData[rowKey].length) {
        pixelData[rowKey][pixel.col_num] = pixel.value;
      }
    });

    console.log("Pixel data loaded:", pixels.length, "pixels");
    start();
  } catch (err) {
    console.error("Error loading pixel data:", err);
    // Fallback: server's down, draw an empty grid anyway
    for (let i = 0; i < ROWS; i++) {
      pixelData[`row${i}`] = Array(COLS).fill(0);
    }
    start();
  }
}

loadPixelData(); // <-- this replaces start()
```

Things worth noticing:

- **Order matters.** We can't draw until the data arrives, which is why `start()` is called *inside* `loadPixelData()` after the fetch finishes — not at the bottom of the file. Calling `start()` immediately would draw an empty grid, then the data would show up too late.
- The server sends back rows shaped like `{ row_num: 12, col_num: 34, value: 4 }` (those names come from the database columns), and we translate them back into our `pixelData` format.
- The `try/catch` fallback means the page still shows a grid even when the server is unreachable — a broken page is worse than an empty canvas.
- Notice the click handler *still paints immediately* and lets the fetch finish in the background. The user never waits for the network. (Fancy name: *optimistic update*.)

### What it should look like

The full experience:

1. Click a bunch of squares — they turn blue instantly, and the console logs `Pixel saved: {...}` for each one.
2. **Refresh the page — your drawing is still there.** 🎉
3. Open the site in a second browser (or send the URL to a friend) — same drawing.
4. Stop the server and reload — you get the console error and a blank green grid instead of a broken page.

<details>
<summary><strong>Total so far (final index.html)</strong></summary>

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

    let pixelData = {};
    const ROWS = 50;
    const COLS = 200;

    for (let i = 0; i < ROWS; i++) {
      pixelData[`row${i}`] = Array(COLS).fill(0);
    }

    let rowNum = 0;

    function start() {
      resizeCanvas();
      rowNum = 0;
      while (rowNum < ROWS) {
        colorPixel();
      }
    }

    function resizeCanvas() {
      const dpr = window.devicePixelRatio * 5 || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function colorPixel() {
      let row = `row${rowNum}`;
      for (var i = 0; i < COLS; i++) {
        if (pixelData[row][i] === 4) {
          ctx.fillStyle = "blue";
        } else if (pixelData[row][i] === 2) {
          ctx.fillStyle = "red";
        } else {
          ctx.fillStyle = "green";
        }
        ctx.fillRect(
          squareWidth * i,
          squareWidth * rowNum,
          squareWidth - 0.5,
          squareWidth - 0.5,
        );
      }

      rowNum++;
    }

    canvas.addEventListener("click", function (event) {
      const rect = canvas.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const col = Math.floor(x / squareWidth);
      const row = Math.floor(y / squareWidth);

      console.log(`Clicked pixel at row: ${row}, col: ${col}`);

      ctx.fillStyle = "blue";
      ctx.fillRect(
        col * squareWidth,
        row * squareWidth,
        squareWidth - 0.5,
        squareWidth - 0.5,
      );

      editPixelData(row, col);
    });

    function editPixelData(row, col) {
      fetch("/api/pixels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          row: row,
          col: col,
          value: 4, // blue
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Pixel saved:", data);
          // Update local pixelData too
          let rowKey = `row${row}`;
          pixelData[rowKey][col] = 4;
        })
        .catch((err) => console.error("Error saving pixel:", err));
    }

    async function loadPixelData() {
      try {
        const response = await fetch("/api/pixels");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const pixels = await response.json();

        for (let i = 0; i < ROWS; i++) {
          pixelData[`row${i}`] = Array(COLS).fill(0);
        }

        pixels.forEach((pixel) => {
          const rowKey = `row${pixel.row_num}`;
          if (pixelData[rowKey] && pixel.col_num < pixelData[rowKey].length) {
            pixelData[rowKey][pixel.col_num] = pixel.value;
          }
        });

        console.log("Pixel data loaded:", pixels.length, "pixels");
        start();
      } catch (err) {
        console.error("Error loading pixel data:", err);
        for (let i = 0; i < ROWS; i++) {
          pixelData[`row${i}`] = Array(COLS).fill(0);
        }
        start();
      }
    }

    loadPixelData();
  </script>
</html>
```

</details>

---

## Where to go next

- **More colors** — add a color picker and send different `value`s (you already handle `2` = red!).
- **Live updates** — right now other people's pixels only show up when you refresh. WebSockets let the server *push* new pixels to everyone instantly (the real project's `server.js` already has the start of this).
- **A redraw function** — after loading new data, call `start()` again to repaint everything instead of only painting on click.
- **Rate limiting** — real r/place made you wait between pixels. One `Date.now()` check in the click handler gets you there.
