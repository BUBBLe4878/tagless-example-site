module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[project]/app/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pusher$2d$js$2f$dist$2f$node$2f$pusher$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pusher-js/dist/node/pusher.js [app-ssr] (ecmascript)");
//this is goning to be the no ai vertion hand coded my self.
//I'm doing this to "claen" up the code and know it and what it does.
"use client";
;
;
;
function Home() {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pixelDataRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    const rowNumRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(1);
    const squareWidth = 4; //8
    const colorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])("blue"); // Use useRef instead
    const zoomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(1);
    const boxSize = 20;
    const spacing = 10;
    const colorPalette = [
        {
            name: "Red",
            value: 2,
            hex: "#FF0000"
        },
        {
            name: "Orange",
            value: 4,
            hex: "#FFA500"
        },
        {
            name: "Yellow",
            value: 5,
            hex: "#FFFF00"
        },
        {
            name: "Green",
            value: 3,
            hex: "#00FF00"
        },
        {
            name: "Blue",
            value: 1,
            hex: "#0000FF"
        },
        {
            name: "Indigo",
            value: 6,
            hex: "#4B0082"
        },
        {
            name: "Violet",
            value: 7,
            hex: "#9400D3"
        },
        {
            name: "Custom",
            value: 8,
            hex: "#000000"
        }
    ];
    let color = 1; // 3 is green. 1 is blue. 2 is red
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // ======== Pusher initialization ========
        const pusher = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pusher$2d$js$2f$dist$2f$node$2f$pusher$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]("55f12054815fd6e2f2c9", {
            cluster: "mt1"
        });
        // ======== Pusher initialization ========
        //ai debug
        pusher.connection.bind("connected", ()=>{
            console.log("✅ Pusher connected!");
        });
        pusher.connection.bind("failed", ()=>{
            console.log("❌ Pusher failed to connect");
        });
        const channel = pusher.subscribe("cursors");
        channel.bind("pusher:subscription_succeeded", ()=>{
            console.log("✅ Subscribed to cursors channel!");
        });
        //const channel = pusher.subscribe("cursors");
        const otherCursors = {}; // to store cursor positions
        const clientId = Math.random().toString().substring(2, 8); // is this the fix :sho: i hopesies
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const numCols = canvas.width * 2; //please change this later me <---- //later me: its fine // later-later me: it needed fixing it took forever figureing this one out
        let mousePosX = 0; //for the zoom in
        let mousePosY = 0; //for the zoom in
        let rowNum = 0;
        let pixelData = {
            row0: []
        };
        let brushSize = 1;
        let pixelXPos = 0;
        let pixelYPos = 0;
        // Bind to Pusher channel for live cursors
        channel.bind("cursor-move", (data)=>{
            console.log("Received cursor:", data); // yay debug :(
            otherCursors[data.clientId] = {
                x: data.x,
                y: data.y
            };
        });
        //=========== Event Listeners============
        canvas.addEventListener("mousemove", (event)=>{
            mousePosX = event.x;
            mousePosY = event.y;
            // Send to backend instead
            fetch("/api/pixels/cursor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    clientId: clientId,
                    x: event.clientX,
                    y: event.clientY
                })
            });
        });
        // zoom
        canvas.addEventListener("wheel", (event)=>{
            event.preventDefault();
            const zoomSpeed = 0.1;
            if (event.deltaY < 0) {
                zoomRef.current += zoomSpeed; //zoom in
            } else {
                zoomRef.current -= zoomSpeed; //zoom out
            }
            zoomRef.current = Math.max(1, Math.min(zoomRef.current, 5)); // Limit zoom took forever to get the values right
            canvas.style.transformOrigin = `${mousePosX}px ${mousePosY}px`; //zoom in on cursor position
            canvas.style.transform = `scale(${zoomRef.current})`;
        });
        document.addEventListener("keydown", (event)=>{
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
            if (event.key === "4") {
                color = prompt("enter a 6 digit hex color"); //custom
                console.log(" this should be green 'hex number string': " + color);
                console.log("Switched to: green");
            }
            if (event.key === "5") {
                brushSize = 9;
                console.log("brushSize " + brushSize);
            }
            if (event.key === "6") {
                brushSize = 25;
                console.log("brushSize " + brushSize);
            }
        });
        // left click
        canvas.addEventListener("click", function(event) {
            const rect = canvas.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const clickY = event.clientY - rect.top;
            // Check if clicked in nav bar area
            if (clickY < 75) {
                // Nav bar height with some padding
                let xPos = 10;
                colorPalette.forEach((col)=>{
                    if (clickX >= xPos && clickX <= xPos + boxSize && clickY >= 35 && clickY <= 75) {
                        if (col.name === "Custom") {
                            color = prompt("Enter hex color (e.g. #FF5733)") || color;
                            console.log("Switched to custom:", color);
                        } else {
                            color = col.value;
                            console.log("Switched to:", col.name);
                        }
                    }
                    xPos += boxSize + spacing;
                });
            } else {
                // Normal pixel
                for(var i = 0; i < brushSize; i++){
                    let x = clickX;
                    let y = clickY;
                    x = x / zoomRef.current;
                    y = y / zoomRef.current;
                    defPixelPos(i);
                    const col = Math.floor(x / squareWidth) + pixelXPos;
                    const row = Math.floor(y / squareWidth) + pixelYPos;
                    console.log(`Clicked pixel at row: ${row}, col: ${col}`);
                    ctx.fillStyle = declareColor();
                    ctx.fillRect(col * squareWidth, row * squareWidth, squareWidth - 0.5, squareWidth - 0.5);
                    editPixelData(row, col);
                }
            }
        });
        function defPixelPos(i) {
            let positions = {};
            if (brushSize === 9) {
                positions = {
                    1: [
                        1,
                        0
                    ],
                    2: [
                        0,
                        1
                    ],
                    3: [
                        1,
                        1
                    ],
                    4: [
                        0,
                        -1
                    ],
                    5: [
                        1,
                        -1
                    ],
                    6: [
                        -1,
                        -1
                    ],
                    7: [
                        -1,
                        0
                    ],
                    8: [
                        -1,
                        1
                    ],
                    9: [
                        0,
                        0
                    ]
                };
            }
            if (brushSize === 25) {
                let index = 1;
                for(let y = -2; y <= 2; y++){
                    for(let x = -2; x <= 2; x++){
                        positions[index++] = [
                            x,
                            y
                        ];
                    }
                }
            }
            [pixelXPos, pixelYPos] = positions[i] || [
                0,
                0
            ];
        }
        canvas.addEventListener("contextmenu", function(event) {
            event.preventDefault();
        });
        //=========== Start ============
        function start() {
            fetch("/api/pixels/cleanup", {
                method: "POST"
            });
            resizeCanvas();
            while(rowNum < canvas.height / squareWidth){
                addPixels();
            }
            navBar();
        //drawOtherCursors();
        //loadPixelData();
        }
        function resizeCanvas() {
            let dpr = window.devicePixelRatio;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        function navBar() {
            const barHeight = 60;
            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            ctx.fillRect(0, 0, canvas.width, barHeight);
            ctx.fillStyle = "white";
            ctx.font = "14px Arial";
            ctx.fillText(`Press 1/2/3 for blue, red and green or click colors here:`, 10, 25);
            // Draw color boxes
            let xPos = 10;
            colorPalette.forEach((col, index)=>{
                ctx.fillStyle = col.hex;
                ctx.fillRect(xPos, 35, boxSize, boxSize);
                xPos += boxSize + spacing;
            });
        }
        //========== Building the pixels ==============
        function addPixels() {
            let row = `row${rowNum}`;
            //console.log(row);
            for(var i = 0; i < canvas.width; i++){
                ctx.fillStyle = declareColor(pixelData[row][i]);
                ctx.fillRect(squareWidth * i, squareWidth * rowNum - squareWidth, squareWidth - 0.5, squareWidth - 0.5);
            }
            rowNum++;
        }
        async function loadPixelData() {
            //try {
            const response = await fetch("/api/pixels");
            let pixels = await response.json();
            for(let i = 0; i < 500; i++){
                pixelData[`row${i}`] = Array(numCols).fill(0);
            }
            pixels.forEach((pixel)=>{
                const rowKey = `row${pixel.row_num}`;
                if (pixelData[rowKey] && pixel.col_num < pixelData[rowKey].length) {
                    pixelData[rowKey][pixel.col_num] = pixel.value;
                }
            //dont do this :skulk: editPixelData(pixel.row_num, pixel.col_num, pixel.value);
            });
            console.log("Pixel data loaded:", pixels.length, "pixels");
            start();
        /*} catch (err) {
        console.error("Error loading pixel data:", err);
        for (let i = 0; i < 500; i++) {
          pixelData[`row${i}`] = Array(200).fill(0);
        }
        start();
      }*/ }
        //========== Edit Pixels =============
        function editPixelData(row, col, value) {
            let saveValue = color;
            if (typeof color === "string" && color.startsWith("#")) {
                saveValue = 8;
            }
            console.log("color value: " + saveValue);
            fetch("/api/pixels", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    row: row + 1,
                    col: col,
                    value: saveValue
                })
            }).then((response)=>response.json()).then((data)=>{
                console.log("Pixel saved:", data);
                let rowNum = `row${row}`;
                if (!pixelData[rowNum]) {
                    pixelData[rowNum] = [];
                }
                pixelData[rowNum][col] = saveValue;
            }).catch((err)=>console.error("Error saving pixel:", err));
        }
        // ============= color ============
        function declareColor(value) {
            const val = value || color;
            if (typeof val === "string" && val.startsWith("#")) {
                return val;
            }
            const found = colorPalette.find((col)=>col.value === val);
            if (found) {
                return found.hex;
            }
            return "green";
        }
        //not a roomba said to add real time updates.
        function syncPixels() {
            drawOtherCursors();
            // Poll for updates every 500ms
            setInterval(async ()=>{
                try {
                    const response = await fetch("/api/pixels");
                    const pixels = await response.json();
                    // Check for new or changed pixels
                    pixels.forEach((pixel)=>{
                        const rowKey = `row${pixel.row_num}`;
                        if (pixelData[rowKey]) {
                            // If pixel changed, redraw it
                            if (pixelData[rowKey][pixel.col_num] !== pixel.value) {
                                pixelData[rowKey][pixel.col_num] = pixel.value;
                                // Redraw just this pixel
                                ctx.fillStyle = declareColor(pixel.value);
                                ctx.fillRect(squareWidth * pixel.col_num, squareWidth * pixel.row_num - squareWidth, squareWidth - 0.5, squareWidth - 0.5);
                            }
                        }
                    });
                } catch (err) {
                    console.error("Sync error:", err);
                }
            }, 500); // Check every 500ms
        }
        function drawOtherCursors() {
            console.log(" otherCursors:", otherCursors);
            //console.log("drawing..."); //dont need ts anymore
            //:grr: why doesnt this work???!!!
            //wait, does it work???
            //ima put this in a loop and see what happens.
            Object.entries(otherCursors).forEach(([clientId, pos])=>{
                ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
                ctx.fillRect(pos.x, pos.y, 10, 10);
                ctx.fillStyle = "white";
                ctx.font = "12px Arial";
                ctx.fillText(clientId.substring(0, 4), pos.x + 15, pos.y + 15);
            });
        }
        //actuaully ima do this in server.js
        /*
    function deleteOverlaped(){
        const response = await fetch("/api/pixels");
        const pixels = await response.json();
        pixels.forEach((pixel) =>{

        })
    }
        */ //ts did not work
        function animationLoop() {
            drawOtherCursors();
            requestAnimationFrame(animationLoop);
        }
        animationLoop();
        loadPixelData();
        syncPixels();
    //start();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                    children: `
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
        `
                }, void 0, false, {
                    fileName: "[project]/app/page.js",
                    lineNumber: 440,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 439,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                    ref: canvasRef,
                    id: "canvas-id"
                }, void 0, false, {
                    fileName: "[project]/app/page.js",
                    lineNumber: 454,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 453,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 438,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1wux9wl._.js.map