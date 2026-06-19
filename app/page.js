"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef(null);
  const pixelDataRef = useRef({});
  const rowNumRef = useRef(1);
  const squareWidth = 4; //8
  const colorRef = useRef("blue"); // Use useRef instead
  const zoomRef = useRef(1);

  const colorToNumber = {
    green: 0,
    red: 2,
    blue: 4,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let pixelData = {
      row0: [],
    };

    pixelDataRef.current = pixelData;
    let rowNum = 1;

    function start() {
      resizeCanvas();
      while (rowNum < 500) {
        colorPixel();
      }
    }
    // SCROLL TO ZOOM
    canvas.addEventListener("wheel", (event) => {
      event.preventDefault();

      const zoomSpeed = 0.1;
      if (event.deltaY < 0) {
        zoomRef.current += zoomSpeed; // Scroll up = zoom in
      } else {
        zoomRef.current -= zoomSpeed; // Scroll down = zoom out
      }

      zoomRef.current = Math.max(0.5, Math.min(zoomRef.current, 5)); // Limit zoom between 0.5x and 5x

      canvas.style.transform = `scale(${zoomRef.current})`;
      canvas.style.transformOrigin = "0 0"; // Zoom from top-left
    });
    
    function resizeCanvas() {
      const dpr = window.devicePixelRatio * 5 || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function colorPixel() {
      let row = `row${rowNum}`;
      console.log(row);
      for (var i = 0; i < canvas.width / squareWidth; i++) {
        if (pixelData[row][i] === 4) {
          ctx.fillStyle = "blue";
        } else if (pixelData[row][i] === 2) {
          ctx.fillStyle = "red";
        } else {
          ctx.fillStyle = "green";
        }
        ctx.fillRect(
          squareWidth * i,
          squareWidth * rowNum - squareWidth, //get it to the very top
          squareWidth - 0.5,
          squareWidth - 0.5,
        );
      }

      rowNum++;
    }

    // KEYBOARD CONTROLS
    document.addEventListener("keydown", (event) => {
      if (event.key === "1") {
        colorRef.current = "green";
        console.log("Switched to: green");
      }
      if (event.key === "2") {
        colorRef.current = "red";
        console.log("Switched to: red");
      }
      if (event.key === "3") {
        colorRef.current = "blue";
        console.log("Switched to: blue");
      }
    });

    // LEFT CLICK
    canvas.addEventListener("click", function (event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const col = Math.floor(x / squareWidth);
      const row = Math.floor(y / squareWidth);

      console.log(`Clicked pixel at row: ${row}, col: ${col}`);
      ctx.fillStyle = colorRef.current;
      ctx.fillRect(
        col * squareWidth,
        row * squareWidth,
        squareWidth - 0.5,
        squareWidth - 0.5,
      );
      editPixelData(row, col);
    });

    // RIGHT CLICK - Reset to green
    canvas.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const col = Math.floor(x / squareWidth);
      const row = Math.floor(y / squareWidth);

      console.log(`Right-clicked pixel at row: ${row}, col: ${col}`);
      ctx.fillStyle = "green";
      ctx.fillRect(
        col * squareWidth,
        row * squareWidth,
        squareWidth - 0.5,
        squareWidth - 0.5,
      );

      editPixelData(row, col, 0); // 0 = green
    });

    /* this one was b4 i had claude so the server code sry i dont like using ai :(
    // function editPixelData(row, col) {
      let rowNum = `row${row}`;
      console.log(col);
      console.log(row);
      console.log("before: " + pixelData[rowNum][col]);

      console.log(col);
      pixelData[rowNum][col] = 4;
      console.log("after: " + pixelData[rowNum][col]);
      console.log(pixelData);
    }
*/
    function editPixelData(row, col, value = null) {
      // Use provided value or current color
      const numericValue =
        value !== null ? value : colorToNumber[colorRef.current];

      fetch("/api/pixels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          row: row + 1, //testing out if the pixel will stay.
          col: col,
          value: numericValue,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Pixel saved:", data);
          let rowNum = `row${row}`;
          pixelData[rowNum][col] = numericValue;
        })
        .catch((err) => console.error("Error saving pixel:", err));
    }

    async function loadPixelData() {
      try {
        const response = await fetch("/api/pixels");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let pixels = await response.json();
        if (!Array.isArray(pixels)) pixels = [];

        const cols = 200;
        for (let i = 0; i < 500; i++) {
          pixelData[`row${i}`] = Array(cols).fill(0);
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
        for (let i = 0; i < 500; i++) {
          pixelData[`row${i}`] = Array(200).fill(0);
        }
        start();
      }
    }

    loadPixelData();
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
