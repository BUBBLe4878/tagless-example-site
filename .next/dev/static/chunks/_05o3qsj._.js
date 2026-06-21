(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
//this is goning to be the no ai vertion hand coded my self.
//I'm doing this to "claen" up the code and know it and what it does.
"use client";
;
function Home() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pixelDataRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const rowNumRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(1);
    const squareWidth = 4; //8
    const colorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])("blue"); // Use useRef instead
    const zoomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(1);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const numCols = canvas.width * 2; //please change this later me <---- //later me: its fine // later-later me: it needed fixing it took forever figureing this one out
            let mousePosX = 0; //for the zoom in
            let mousePosY = 0; //for the zoom in
            let rowNum = 0;
            let pixelData = {
                row0: []
            };
            //=========== Event Listeners============
            canvas.addEventListener("mousemove", {
                "Home.useEffect": (event)=>{
                    event.preventDefault();
                    mousePosX = event.x;
                    mousePosY = event.y;
                }
            }["Home.useEffect"]);
            // zoom
            canvas.addEventListener("wheel", {
                "Home.useEffect": (event)=>{
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
                }
            }["Home.useEffect"]);
            document.addEventListener("keydown", {
                "Home.useEffect": (event)=>{
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
                }
            }["Home.useEffect"]);
            // left click
            canvas.addEventListener("click", {
                "Home.useEffect": function(event) {
                    const rect = canvas.getBoundingClientRect();
                    const clickX = event.clientX - rect.left;
                    const clickY = event.clientY - rect.top;
                    // Check if clicked in nav bar area
                    if (clickY < 75) {
                        // Nav bar height with some padding
                        let xPos = 10;
                        colorPalette.forEach({
                            "Home.useEffect": (col)=>{
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
                            }
                        }["Home.useEffect"]);
                    } else {
                        // Normal pixel
                        let x = clickX;
                        let y = clickY;
                        x = x / zoomRef.current;
                        y = y / zoomRef.current;
                        const col = Math.floor(x / squareWidth);
                        const row = Math.floor(y / squareWidth);
                        console.log(`Clicked pixel at row: ${row}, col: ${col}`);
                        ctx.fillStyle = declareColor();
                        ctx.fillRect(col * squareWidth, row * squareWidth, squareWidth - 0.5, squareWidth - 0.5);
                        editPixelData(row, col);
                    }
                }
            }["Home.useEffect"]);
            canvas.addEventListener("contextmenu", {
                "Home.useEffect": function(event) {
                    event.preventDefault();
                }
            }["Home.useEffect"]);
            //=========== Start ============
            function start() {
                resizeCanvas();
                while(rowNum < canvas.height / squareWidth){
                    addPixels();
                }
                navBar();
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
                colorPalette.forEach({
                    "Home.useEffect.navBar": (col, index)=>{
                        ctx.fillStyle = col.hex;
                        ctx.fillRect(xPos, 35, boxSize, boxSize);
                        xPos += boxSize + spacing;
                    }
                }["Home.useEffect.navBar"]);
            }
            //========== Building the pixels ==============
            function addPixels() {
                let row = `row${rowNum}`;
                console.log(row);
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
                pixels.forEach({
                    "Home.useEffect.loadPixelData": (pixel)=>{
                        const rowKey = `row${pixel.row_num}`;
                        if (pixelData[rowKey] && pixel.col_num < pixelData[rowKey].length) {
                            pixelData[rowKey][pixel.col_num] = pixel.value;
                        }
                    //dont do this :skulk: editPixelData(pixel.row_num, pixel.col_num, pixel.value);
                    }
                }["Home.useEffect.loadPixelData"]);
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
                }).then({
                    "Home.useEffect.editPixelData": (response)=>response.json()
                }["Home.useEffect.editPixelData"]).then({
                    "Home.useEffect.editPixelData": (data)=>{
                        console.log("Pixel saved:", data);
                        let rowNum = `row${row}`;
                        if (!pixelData[rowNum]) {
                            pixelData[rowNum] = [];
                        }
                        pixelData[rowNum][col] = saveValue;
                    }
                }["Home.useEffect.editPixelData"]).catch({
                    "Home.useEffect.editPixelData": (err)=>console.error("Error saving pixel:", err)
                }["Home.useEffect.editPixelData"]);
            }
            // ============= color ============
            function declareColor(value) {
                const val = value || color;
                if (typeof val === "string" && val.startsWith("#")) {
                    return val;
                }
                const found = colorPalette.find({
                    "Home.useEffect.declareColor.found": (col)=>col.value === val
                }["Home.useEffect.declareColor.found"]);
                if (found) {
                    return found.hex;
                }
                return "green";
            }
            //not a roomba said to add real time updates.
            function syncPixels() {
                // Poll for updates every 500ms
                setInterval({
                    "Home.useEffect.syncPixels": async ()=>{
                        try {
                            const response = await fetch("/api/pixels");
                            const pixels = await response.json();
                            // Check for new or changed pixels
                            pixels.forEach({
                                "Home.useEffect.syncPixels": (pixel)=>{
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
                                }
                            }["Home.useEffect.syncPixels"]);
                        } catch (err) {
                            console.error("Sync error:", err);
                        }
                    }
                }["Home.useEffect.syncPixels"], 500); // Check every 500ms
            }
            loadPixelData();
            syncPixels();
        //start();
        }
    }["Home.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
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
                    lineNumber: 316,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 315,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                    ref: canvasRef,
                    id: "canvas-id"
                }, void 0, false, {
                    fileName: "[project]/app/page.js",
                    lineNumber: 330,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 329,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 314,
        columnNumber: 5
    }, this);
}
_s(Home, "eS3JhFTVdtCISiecaEOWlCB+LGU=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_05o3qsj._.js.map