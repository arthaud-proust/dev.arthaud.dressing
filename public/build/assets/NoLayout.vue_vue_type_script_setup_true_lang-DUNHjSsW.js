import{_ as me}from"./VButton.vue_vue_type_script_setup_true_lang-4xu5Xl2d.js";import{o as T,g as A,b as R,u as K,aP as q,aG as re,l as x,b1 as ae,bJ as F,af as ve,aS as ye,ae as se,bf as B,bd as ge,i as S,bl as he,d as Z,a as W,e as we,t as be,w as Se,n as ee,c7 as _e,c as te,F as Te,b4 as xe,h as ie,y as ke,r as U}from"./app-DFNFXxLc.js";function Ae(e,t){return T(),A("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[R("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})])}function Fe(e,t){return T(),A("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[R("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6 18 18 6M6 6l12 12"})])}function X(e){return ve()?(ye(e),!0):!1}function O(e){return typeof e=="function"?e():K(e)}const oe=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const Oe=Object.prototype.toString,le=e=>Oe.call(e)==="[object Object]",Q=()=>{};function ue(e,t){function n(...r){return new Promise((i,a)=>{Promise.resolve(e(()=>t.apply(this,r),{fn:t,thisArg:this,args:r})).then(i).catch(a)})}return n}const ce=e=>e();function Ee(e,t={}){let n,r,i=Q;const a=c=>{clearTimeout(c),i(),i=Q};return c=>{const v=O(e),d=O(t.maxWait);return n&&a(n),v<=0||d!==void 0&&d<=0?(r&&(a(r),r=null),Promise.resolve(c())):new Promise((p,u)=>{i=t.rejectOnCancel?u:p,d&&!r&&(r=setTimeout(()=>{n&&a(n),r=null,p(c())},d)),n=setTimeout(()=>{r&&a(r),r=null,p(c())},v)})}}function Me(e=ce){const t=x(!0);function n(){t.value=!1}function r(){t.value=!0}const i=(...a)=>{t.value&&e(...a)};return{isActive:ae(t),pause:n,resume:r,eventFilter:i}}function Re(e){let t;function n(){return t||(t=e()),t}return n.reset=async()=>{const r=t;t=void 0,r&&await r},n}function Ce(e,t,n=!1){return Object.fromEntries(Object.entries(e).filter(([r,i])=>(!n||i!==void 0)&&!t.includes(r)))}function De(e){return se()}function nt(e,t=200,n={}){return ue(Ee(t,n),e)}function Ne(e,t,n={}){const{eventFilter:r=ce,...i}=n;return F(e,ue(r,t),i)}function je(e,t,n={}){const{eventFilter:r,...i}=n,{eventFilter:a,pause:m,resume:c,isActive:v}=Me(r);return{stop:Ne(e,t,{...i,eventFilter:a}),pause:m,resume:c,isActive:v}}function fe(e,t=!0,n){De()?q(e,n):t?e():re(e)}const j=oe?window:void 0,de=oe?window.navigator:void 0;function N(e){var t;const n=O(e);return(t=n==null?void 0:n.$el)!=null?t:n}function C(...e){let t,n,r,i;if(typeof e[0]=="string"||Array.isArray(e[0])?([n,r,i]=e,t=j):[t,n,r,i]=e,!t)return Q;Array.isArray(n)||(n=[n]),Array.isArray(r)||(r=[r]);const a=[],m=()=>{a.forEach(p=>p()),a.length=0},c=(p,u,g,s)=>(p.addEventListener(u,g,s),()=>p.removeEventListener(u,g,s)),v=F(()=>[N(t),O(i)],([p,u])=>{if(m(),!p)return;const g=le(u)?{...u}:u;a.push(...n.flatMap(s=>r.map(l=>c(p,s,l,g))))},{immediate:!0,flush:"post"}),d=()=>{v(),m()};return X(d),d}function $e(){const e=x(!1),t=se();return t&&q(()=>{e.value=!0},t),e}function Y(e){const t=$e();return S(()=>(t.value,!!e()))}function ze(e,t={}){const{immediate:n=!0,fpsLimit:r=void 0,window:i=j}=t,a=x(!1),m=r?1e3/r:null;let c=0,v=null;function d(g){if(!a.value||!i)return;c||(c=g);const s=g-c;if(m&&s<m){v=i.requestAnimationFrame(d);return}c=g,e({delta:s,timestamp:g}),v=i.requestAnimationFrame(d)}function p(){!a.value&&i&&(a.value=!0,c=0,v=i.requestAnimationFrame(d))}function u(){a.value=!1,v!=null&&i&&(i.cancelAnimationFrame(v),v=null)}return n&&p(),X(u),{isActive:ae(a),pause:u,resume:p}}function Le(e,t,n){let r,i;le(n)?(r=n,i=Ce(n,["window","immediate","commitStyles","persist","onReady","onError"])):(r={duration:n},i=n);const{window:a=j,immediate:m=!0,commitStyles:c,persist:v,playbackRate:d=1,onReady:p,onError:u=o=>{console.error(o)}}=r,g=Y(()=>a&&HTMLElement&&"animate"in HTMLElement.prototype),s=B(void 0),l=ge({startTime:null,currentTime:null,timeline:null,playbackRate:d,pending:!1,playState:m?"idle":"paused",replaceState:"active"}),b=S(()=>l.pending),w=S(()=>l.playState),D=S(()=>l.replaceState),k=S({get(){return l.startTime},set(o){l.startTime=o,s.value&&(s.value.startTime=o)}}),J=S({get(){return l.currentTime},set(o){l.currentTime=o,s.value&&(s.value.currentTime=o,L())}}),$=S({get(){return l.timeline},set(o){l.timeline=o,s.value&&(s.value.timeline=o)}}),z=S({get(){return l.playbackRate},set(o){l.playbackRate=o,s.value&&(s.value.playbackRate=o)}}),I=()=>{if(s.value)try{s.value.play(),L()}catch(o){M(),u(o)}else y()},G=()=>{var o;try{(o=s.value)==null||o.pause(),M()}catch(_){u(_)}},E=()=>{var o;s.value||y();try{(o=s.value)==null||o.reverse(),L()}catch(_){M(),u(_)}},H=()=>{var o;try{(o=s.value)==null||o.finish(),M()}catch(_){u(_)}},f=()=>{var o;try{(o=s.value)==null||o.cancel(),M()}catch(_){u(_)}};F(()=>N(e),o=>{o&&y()}),F(()=>t,o=>{s.value&&y(),!N(e)&&s.value&&(s.value.effect=new KeyframeEffect(N(e),O(o),i))},{deep:!0}),fe(()=>y(!0),!1),X(f);function y(o){const _=N(e);!g.value||!_||(s.value||(s.value=_.animate(O(t),i)),v&&s.value.persist(),d!==1&&(s.value.playbackRate=d),o&&!m?s.value.pause():L(),p==null||p(s.value))}C(s,["cancel","finish","remove"],M),C(s,"finish",()=>{var o;c&&((o=s.value)==null||o.commitStyles())});const{resume:h,pause:pe}=ze(()=>{s.value&&(l.pending=s.value.pending,l.playState=s.value.playState,l.replaceState=s.value.replaceState,l.startTime=s.value.startTime,l.currentTime=s.value.currentTime,l.timeline=s.value.timeline,l.playbackRate=s.value.playbackRate)},{immediate:!1});function L(){g.value&&h()}function M(){g.value&&a&&a.requestAnimationFrame(pe)}return{isSupported:g,animate:s,play:I,pause:G,reverse:E,finish:H,cancel:f,pending:b,playState:w,replaceState:D,startTime:k,currentTime:J,timeline:$,playbackRate:z}}function Pe(e,t={}){const{controls:n=!1,navigator:r=de}=t,i=Y(()=>r&&"permissions"in r),a=B(),m={name:e},c=B(),v=()=>{var p,u;c.value=(u=(p=a.value)==null?void 0:p.state)!=null?u:"prompt"};C(a,"change",v);const d=Re(async()=>{if(i.value){if(!a.value)try{a.value=await r.permissions.query(m)}catch{a.value=void 0}finally{v()}if(n)return he(a.value)}});return d(),n?{state:c,isSupported:i,query:d}:c}const P=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},V="__vueuse_ssr_handlers__",Ve=We();function We(){return V in P||(P[V]=P[V]||{}),P[V]}function Be(e,t){return Ve[e]||t}function qe(e){return e==null?"any":e instanceof Set?"set":e instanceof Map?"map":e instanceof Date?"date":typeof e=="boolean"?"boolean":typeof e=="string"?"string":typeof e=="object"?"object":Number.isNaN(e)?"any":"number"}const Je={boolean:{read:e=>e==="true",write:e=>String(e)},object:{read:e=>JSON.parse(e),write:e=>JSON.stringify(e)},number:{read:e=>Number.parseFloat(e),write:e=>String(e)},any:{read:e=>e,write:e=>String(e)},string:{read:e=>e,write:e=>String(e)},map:{read:e=>new Map(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e.entries()))},set:{read:e=>new Set(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e))},date:{read:e=>new Date(e),write:e=>e.toISOString()}},ne="vueuse-storage";function rt(e,t,n,r={}){var i;const{flush:a="pre",deep:m=!0,listenToStorageChanges:c=!0,writeDefaults:v=!0,mergeDefaults:d=!1,shallow:p,window:u=j,eventFilter:g,onError:s=f=>{console.error(f)},initOnMounted:l}=r,b=(p?B:x)(typeof t=="function"?t():t);if(!n)try{n=Be("getDefaultStorage",()=>{var f;return(f=j)==null?void 0:f.localStorage})()}catch(f){s(f)}if(!n)return b;const w=O(t),D=qe(w),k=(i=r.serializer)!=null?i:Je[D],{pause:J,resume:$}=je(b,()=>I(b.value),{flush:a,deep:m,eventFilter:g});u&&c&&fe(()=>{n instanceof Storage?C(u,"storage",E):C(u,ne,H),l&&E()}),l||E();function z(f,y){if(u){const h={key:e,oldValue:f,newValue:y,storageArea:n};u.dispatchEvent(n instanceof Storage?new StorageEvent("storage",h):new CustomEvent(ne,{detail:h}))}}function I(f){try{const y=n.getItem(e);if(f==null)z(y,null),n.removeItem(e);else{const h=k.write(f);y!==h&&(n.setItem(e,h),z(y,h))}}catch(y){s(y)}}function G(f){const y=f?f.newValue:n.getItem(e);if(y==null)return v&&w!=null&&n.setItem(e,k.write(w)),w;if(!f&&d){const h=k.read(y);return typeof d=="function"?d(h,w):D==="object"&&!Array.isArray(h)?{...w,...h}:h}else return typeof y!="string"?y:k.read(y)}function E(f){if(!(f&&f.storageArea!==n)){if(f&&f.key==null){b.value=w;return}if(!(f&&f.key!==e)){J();try{(f==null?void 0:f.newValue)!==k.write(b.value)&&(b.value=G(f))}catch(y){s(y)}finally{f?re($):$()}}}}function H(f){E(f.detail)}return b}function at(e={}){const{navigator:t=de,requestPermissions:n=!1,constraints:r={audio:!0,video:!0},onUpdated:i}=e,a=x([]),m=S(()=>a.value.filter(l=>l.kind==="videoinput")),c=S(()=>a.value.filter(l=>l.kind==="audioinput")),v=S(()=>a.value.filter(l=>l.kind==="audiooutput")),d=Y(()=>t&&t.mediaDevices&&t.mediaDevices.enumerateDevices),p=x(!1);let u;async function g(){d.value&&(a.value=await t.mediaDevices.enumerateDevices(),i==null||i(a.value),u&&(u.getTracks().forEach(l=>l.stop()),u=null))}async function s(){if(!d.value)return!1;if(p.value)return!0;const{state:l,query:b}=Pe("camera",{controls:!0});if(await b(),l.value!=="granted"){let w=!0;try{u=await t.mediaDevices.getUserMedia(r)}catch{u=null,w=!1}g(),p.value=w}else p.value=!0;return p.value}return d.value&&(n&&s(),C(t.mediaDevices,"devicechange",g),g()),{devices:a,ensurePermissions:s,permissionGranted:p,videoInputs:m,audioInputs:c,audioOutputs:v,isSupported:d}}const Ie={class:"absolute bottom-0 left-0 right-0"},Ge=2e3,He=Z({__name:"VToast",props:{type:{},content:{}},emits:["close"],setup(e,{emit:t}){const n=t,r=x(),{play:i,playState:a}=Le(r,{width:0},{immediate:!1,duration:Ge});return F(a,m=>{m==="finished"&&n("close")}),q(()=>{i()}),(m,c)=>(T(),A("div",{class:ee(["relative flex max-w-lg items-center gap-2 overflow-hidden rounded-lg px-4 py-2 shadow-lg",{"bg-green-100 text-green-900":m.type==="success","bg-red-100 text-red-900":m.type==="error"}])},[W(K(Ae),{class:"size-7"}),we(" "+be(m.content)+" ",1),W(me,{class:"ml-auto after:absolute after:inset-0",icon:"",small:"",variant:"ghost",onClick:c[0]||(c[0]=v=>n("close"))},{default:Se(()=>[W(K(Fe),{class:ee(["size-5",{"text-green-900":m.type==="success","text-red-900":m.type==="error"}])},null,8,["class"])]),_:1}),R("div",Ie,[R("div",{ref_key:"progressBar",ref:r,class:"h-0.5 w-full bg-green-800"},null,512)])],2))}}),Ue={key:0,class:"pointer-events-none fixed left-4 right-4 top-4 z-50 flex flex-col items-center gap-2"},Ke=Z({__name:"FlashedMessages",setup(e){const t=_e(),n=x(new Map),r=(a,m)=>{a&&n.value.set(a.id,{type:"success",content:a.content})},i=a=>{n.value.delete(a)};return q(()=>{r(t.props.flash.success),r(t.props.flash.error)}),F(()=>t.props.flash.success,a=>{r(a)}),F(()=>t.props.flash.error,a=>{r(a)}),(a,m)=>(T(),te(ke,{to:"body"},[n.value.size?(T(),A("div",Ue,[(T(!0),A(Te,null,xe(n.value.entries(),([c,v])=>(T(),te(He,{class:"pointer-events-auto",key:c,content:v.content,type:v.type,onClose:d=>i(c)},null,8,["content","type","onClose"]))),128))])):ie("",!0)]))}}),Qe={class:"relative flex min-h-dvh flex-col"},Ze={key:0,class:"sticky top-0 z-30 border-b bg-white"},Xe={class:"mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"},Ye={class:"mx-auto flex h-full w-full max-w-7xl grow flex-col px-4 py-6 sm:px-6 lg:px-8"},st=Z({__name:"NoLayout",setup(e){return(t,n)=>(T(),A("div",Qe,[t.$slots.header?(T(),A("header",Ze,[R("div",Xe,[U(t.$slots,"header")])])):ie("",!0),R("div",Ye,[U(t.$slots,"default")]),U(t.$slots,"footer"),W(Ke)]))}});export{st as _,rt as a,nt as b,Fe as c,Ae as r,at as u};