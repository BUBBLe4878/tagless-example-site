module.exports=[18622,(a,b,c)=>{b.exports=a.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},42602,(a,b,c)=>{"use strict";b.exports=a.r(18622)},87924,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].ReactJsxRuntime},72131,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].React},30100,a=>{"use strict";var b=a.i(87924),c=a.i(72131);a.s(["default",0,function(){let a=(0,c.useRef)(null);(0,c.useRef)({}),(0,c.useRef)(1),(0,c.useRef)("blue");let d=(0,c.useRef)(1);return(0,c.useEffect)(()=>{b.getContext("2d");let b=a.current,c=0,e=0;b.addEventListener("mousemove",a=>{a.preventDefault(),c=a.x,e=a.y}),b.addEventListener("wheel",a=>{a.preventDefault(),a.deltaY<0?d.current+=.1:d.current-=.1,d.current=Math.max(.2,Math.min(d.current,5)),b.style.transformOrigin=`${c}px ${e}px`,b.style.transform=`scale(${d.current})`})},[]),(0,b.jsxs)("html",{children:[(0,b.jsx)("head",{children:(0,b.jsx)("style",{children:`
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
        `})}),(0,b.jsx)("body",{children:(0,b.jsx)("canvas",{ref:a,id:"canvas-id"})})]})}])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__181xbug._.js.map