(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,81694,e=>{"use strict";var t=e.i(43476),r=e.i(71645);e.s(["default",0,function(){let e=(0,r.useRef)(null);(0,r.useRef)({}),(0,r.useRef)(1),(0,r.useRef)("blue");let n=(0,r.useRef)(1);return(0,r.useEffect)(()=>{t.getContext("2d");let t=e.current,r=0,s=0;t.addEventListener("mousemove",e=>{e.preventDefault(),r=e.x,s=e.y}),t.addEventListener("wheel",e=>{e.preventDefault(),e.deltaY<0?n.current+=.1:n.current-=.1,n.current=Math.max(.2,Math.min(n.current,5)),t.style.transformOrigin=`${r}px ${s}px`,t.style.transform=`scale(${n.current})`})},[]),(0,t.jsxs)("html",{children:[(0,t.jsx)("head",{children:(0,t.jsx)("style",{children:`
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
        `})}),(0,t.jsx)("body",{children:(0,t.jsx)("canvas",{ref:e,id:"canvas-id"})})]})}])}]);