//this is goning to be the no ai vertion hand coded my self.
//I'm doing this to "claen" up the code and know it and what it does.
"use client";

import { useEffect, useRef } from "react";
export default function Home() {
  const canvasRef = useRef(null);
  const pixelDataRef = useRef({});
  const rowNumRef = useRef(1);
  const squareWidth = 4; //8
  const colorRef = useRef("blue"); // Use useRef instead
  const zoomRef = useRef(1);

  let color = 1; // 3 is green. 1 is blue. 2 is red

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let mousePosX = 0; //for the zoom in
    let mousePosY = 0; //for the zoom in
    let rowNum = 0;
    let pixelData = {
      row0: [],
    };

    //=========== Event Listeners============
    canvas.addEventListener("mousemove", (event) => {
      event.preventDefault();
      mousePosX = event.x;
      mousePosY = event.y;
    });

    // SCROLL TO ZOOM
    canvas.addEventListener("wheel", (event) => {
      event.preventDefault();

      const zoomSpeed = 0.1;
      if (event.deltaY < 0) {
        zoomRef.current += zoomSpeed; //zoom in
      } else {
        zoomRef.current -= zoomSpeed; //zoom out
      }

      zoomRef.current = Math.max(0.2, Math.min(zoomRef.current, 5)); // Limit zoom between 0 and 5x

      canvas.style.transformOrigin = `${mousePosX}px ${mousePosY}px`; //zoom in on cursor position
      canvas.style.transform = `scale(${zoomRef.current})`;
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "1") {
        color = 1; //blue
        console.log(" this should be blue '1': " + color);
        console.log("Switched to: blue");
      }
      if (event.key === "2") {
        color = 2; //red
        console.log(" this should be red '2': " + color);
        console.log("Switched to: red");
      }
      if (event.key === "3") {
        color = 3; //green
        console.log(" this should be green '3': " + color);
        console.log("Switched to: green");
      }
    });

    // left click
    //changing the color on the pixels
    canvas.addEventListener("click", function (event) {
      const rect = canvas.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;

      // Account for CSS zoom
      x = x / zoomRef.current;
      y = y / zoomRef.current;

      const col = Math.floor(x / squareWidth);
      const row = Math.floor(y / squareWidth);

      console.log(`Clicked pixel at row: ${row}, col: ${col}`);
      ctx.fillStyle = declareColor();
      console.log(declareColor());
      ctx.fillRect(
        col * squareWidth,
        row * squareWidth,
        squareWidth - 0.5,
        squareWidth - 0.5,
      );
      editPixelData(row, col);
    });

    canvas.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });

    //=========== Start ============
    function start() {
      resizeCanvas();
    }

    function resizeCanvas() {
      let dpr = window.devicePixelRatio;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    //========== Building the pixels ==============
    function editPixelData(row, col, value) {
      console.log("color value: " + color);
      fetch("/api/pixels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          row: row + 1, //testing out if the pixel will stay. //later me: it does work it use to be that when u refresh ut will go up 1
          col: col,
          value: color,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Pixel saved:", data);
          let rowNum = `row${row}`;
          if (!pixelData[rowNum]) {
            pixelData[rowNum] = [];
          }

          pixelData[rowNum][col] = color;
        })
        .catch((err) => console.error("Error saving pixel:", err));
    }

    // ============= color ============
    function declareColor(value) {
      //color 1 = blue
      //color 2 = red
      //color 3 = green
      //color 4 = custom
      if (color === 1 || value === 1) {
        return "blue";
      }

      if (color === 2 || value === 2) {
        return "red";
      }

      if (color === 3 || value === 3) {
        return "green";
      }

      if (color === 4 || value === 4) {
        return "orange"; //for now
      }
    }

    start();
  }, []);
  return (
    <html>
      <head>
        <style>{`
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
        `}</style>
      </head>
      <body>
        <canvas ref={canvasRef} id="canvas-id" />
      </body>
    </html>
  );
}
