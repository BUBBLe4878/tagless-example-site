module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

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
//this is goning to be the no ai vertion hand coded my self.
//I'm doing this to "claen" up the code and know it and what it does.
"use client";
;
;
function Home() {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pixelDataRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    const rowNumRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(1);
    const squareWidth = 4; //8
    const colorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])("blue"); // Use useRef instead
    const zoomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(1);
    const numCols = 100; //please change this later me <----
    let color = 1; // 3 is green. 1 is blue. 2 is red
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let mousePosX = 0; //for the zoom in
        let mousePosY = 0; //for the zoom in
        let rowNum = 0;
        let pixelData = {
            row0: []
        };
        //=========== Event Listeners============
        canvas.addEventListener("mousemove", (event)=>{
            event.preventDefault();
            mousePosX = event.x;
            mousePosY = event.y;
        });
        // SCROLL TO ZOOM
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
        });
        // left click
        //changing the color on the pixels
        canvas.addEventListener("click", function(event) {
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
            ctx.fillRect(col * squareWidth, row * squareWidth, squareWidth - 0.5, squareWidth - 0.5);
            editPixelData(row, col);
        });
        canvas.addEventListener("contextmenu", function(event) {
            event.preventDefault();
        });
        //=========== Start ============
        function start() {
            resizeCanvas();
            while(rowNum < 500){
                addPixels();
            }
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
        //========== Building the pixels ==============
        function addPixels() {
            let row = `row${rowNum}`;
            console.log(row);
            for(var i = 0; i < canvas.width / squareWidth; i++){
                if (pixelData[row][i] === 4) {
                    ctx.fillStyle = "blue";
                } else if (pixelData[row][i] === 2) {
                    ctx.fillStyle = "red";
                } else {
                    ctx.fillStyle = "green";
                }
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
            console.log("color value: " + color);
            fetch("/api/pixels", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    row: row + 1,
                    col: col,
                    value: color
                })
            }).then((response)=>response.json()).then((data)=>{
                console.log("Pixel saved:", data);
                let rowNum = `row${row}`;
                if (!pixelData[rowNum]) {
                    pixelData[rowNum] = [];
                }
                pixelData[rowNum][col] = color;
            }).catch((err)=>console.error("Error saving pixel:", err));
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
        loadPixelData();
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
                    lineNumber: 227,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                    ref: canvasRef,
                    id: "canvas-id"
                }, void 0, false, {
                    fileName: "[project]/app/page.js",
                    lineNumber: 241,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 240,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 225,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0rkmsw2._.js.map