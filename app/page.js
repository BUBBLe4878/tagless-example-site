"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef(null);
  const pixelDataRef = useRef({});
  const rowNumRef = useRef(1);
  const squareWidth = 8;
  let color = "blue";

  document.addEventListener("keydown", (event) => {
    const e = event.key;
    console.log(e.key);
    changeColor(e);
  });

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

    canvas.addEventListener("click", function (event) {
      const dpr = window.devicePixelRatio * 5 || 1;
      const rect = canvas.getBoundingClientRect();

      // Scale the coordinates by DPR to match canvas scaling
      /*const x = (event.clientX - rect.left) * dpr;
          const y = (event.clientY - rect.top) * dpr;
    */
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const col = Math.floor(x / squareWidth);
      const row = Math.floor(y / squareWidth);

      console.log(`Clicked pixel at row: ${row}, col: ${col}`);
      ctx.fillStyle = color;
      ctx.fillRect(
        col * squareWidth,
        row * squareWidth,
        squareWidth - 0.5,
        squareWidth - 0.5,
      );
      editPixelData(row, col);
      const rowKey = `row${row + 1}`;
      if (pixelData[rowKey] && pixelData[rowKey][col] !== undefined) {
        console.log(`Pixel value: ${pixelData[rowKey][col]}`);
      }
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
    function editPixelData(row, col) {
      fetch("/api/pixels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          row: row,
          col: col,
          value: 4,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Pixel saved:", data);
          // Update local pixelData too
          let rowNum = `row${row}`;
          pixelData[rowNum][col] = 4;
        })
        .catch((err) => console.error("Error saving pixel:", err));
    }

    async function loadPixelData() {
      try {
        const response = await fetch("/api/pixels");

        if (!response.ok) {
          console.error("Server error:", response.status);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let pixels = await response.json();
        if (!Array.isArray(pixels)) {
          console.error("Expected array, got:", pixels);
          pixels = [];
        }

        // Create empty rows - use a fixed number of columns
        const cols = 200;
        for (let i = 0; i < 500; i++) {
          pixelData[`row${i}`] = Array(cols).fill(0);
        }

        // Fill in saved pixels from database
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
        // Fallback: just draw empty canvas
        for (let i = 0; i < 50; i++) {
          pixelData[`row${i}`] = Array(200).fill(0);
        }
        start();
      }
    }
    function changeColor(e) {
      if (e.key === "1") {
        color = "green";
      }
      if (e.key === "2") {
        color = "red";
      }
    }
    loadPixelData();
    //start();
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
