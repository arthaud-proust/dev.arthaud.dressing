import{o as l,g,b as i,d as c,i as a,c as d,w as m,n as f,b7 as p,u as v,r as h,h as y,k as C}from"./app-DFNFXxLc.js";const x=(n,e)=>{const t=n.__vccOpts||n;for(const[o,s]of e)t[o]=s;return t},w={},B={width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"};function k(n,e){return l(),g("svg",B,e[0]||(e[0]=[i("circle",{cx:"12",cy:"12",r:"9",stroke:"currentColor","stroke-opacity":"0.25","stroke-width":"3"},null,-1),i("path",{d:"M3.52032 15.0158C3.05774 13.7151 2.90056 12.3255 3.06095 10.9543C3.22135 9.58319 3.69501 8.26732 4.4453 7.10852C5.19559 5.94973 6.2024 4.97906 7.38784 4.27161C8.57328 3.56416 9.90557 3.1389 11.2817 3.02871",stroke:"currentColor","stroke-width":"3"},null,-1)]))}const _=x(w,[["render",k]]),N=c({__name:"VButton",props:{href:{},type:{default:"button"},variant:{default:"primary"},disabled:{type:Boolean},loading:{type:Boolean},external:{type:Boolean},rounded:{type:Boolean,default:!0},icon:{type:Boolean},small:{type:Boolean},padded:{type:Boolean,default:!0}},setup(n){const e=n,t=a(()=>e.icon&&e.rounded?"rounded-full":e.small?"rounded-md":"rounded-lg"),o=a(()=>e.small?"min-w-8 h-8":"min-w-10 h-10"),s=a(()=>e.icon?e.small?"p-1":"p-2":e.small?"px-2 py-1":"px-4 py-2"),u=a(()=>{if(!e.padded)return e.icon?e.small?"-m-2":"-m-3":e.small?"-mx-2 -my-1":"-mx-4 -my-2"}),b=a(()=>{if(e.variant==="primary")return"bg-amber-500 disabled:hover:bg-amber-500 ring-amber-700 hover:bg-amber-600 text-amber-50";if(e.variant==="secondary")return"bg-amber-100/80 disabled:hover:bg-amber-100/80 ring-amber-700 hover:bg-amber-100 text-amber-800";if(e.variant==="tertiary")return"bg-neutral-100 disabled:hover:bg-neutral-100 ring-neutral-400 hover:bg-neutral-200 text-neutral-800";if(e.variant==="ghost")return"bg-transparent disabled:hover:bg-transparent ring-neutral-400 hover:bg-neutral-100 text-neutral-500";if(e.variant==="danger")return"bg-red-100 disabled:hover:bg-red-100 ring-red-300 hover:bg-red-200 text-red-900";if(e.variant==="warning")return"bg-orange-100 disabled:hover:bg-orange-100 ring-orange-300 hover:bg-orange-200 text-orange-900";if(e.variant==="success")return"bg-green-500 disabled:hover:bg-green-500 ring-green-700 hover:bg-green-600 text-green-50";if(e.variant==="info")return"bg-blue-100 disabled:hover:bg-blue-100 ring-blue-300 hover:bg-blue-200 text-blue-900"});return(r,z)=>(l(),d(p(r.href?r.external?"a":v(C):"button"),{type:r.href?void 0:r.type,disabled:r.disabled,href:r.disabled?void 0:r.href,class:f(["inline-flex items-center justify-center gap-2 font-bold ring-offset-2 focus:outline-none disabled:brightness-100 disabled:contrast-[0.85] disabled:saturate-50 sm:focus:ring-4",[t.value,s.value,u.value,b.value,o.value]])},{default:m(()=>[h(r.$slots,"default"),r.loading?(l(),d(_,{key:0,class:"size-5 animate-spin"})):y("",!0)]),_:3},8,["type","disabled","href","class"]))}});export{N as _,x as a};