import{_ as p}from"./VButton.vue_vue_type_script_setup_true_lang-4xu5Xl2d.js";import{_ as C}from"./VStretchedButton.vue_vue_type_script_setup_true_lang-DwYSnxu0.js";import{_ as v}from"./ClothingCard.vue_vue_type_script_setup_true_lang-DZ7iF53v.js";import{_ as k}from"./ClothingDetails.vue_vue_type_style_index_0_lang-BIDliIBd.js";import{_ as y}from"./VPageHeader.vue_vue_type_script_setup_true_lang-D9WX3ZzD.js";import{u as b}from"./useClothesCategories-CeUMBG1P.js";import{_ as B}from"./AuthenticatedLayout.vue_vue_type_script_setup_true_lang-DxEbvx_p.js";import{d as w,l as N,g as a,a as t,u as i,w as r,F as l,o as s,Z as V,e as c,t as n,b4 as _,c as h,h as F,b as g}from"./app-DFNFXxLc.js";import{r as z}from"./PlusIcon-DJDZKEKZ.js";import{r as S}from"./PencilIcon-Cy1XJcO2.js";import"./dressing-BmchCSS1.js";import"./generated-Ca4FKDe-.js";import"./VTag.vue_vue_type_script_setup_true_lang-CYcPrYNJ.js";import"./HangerIcon-CvtA8XtD.js";import"./Modal.vue_vue_type_script_setup_true_lang-Cj8KeD00.js";import"./useDressings-Br-h5-jH.js";import"./NoLayout.vue_vue_type_script_setup_true_lang-DUNHjSsW.js";import"./TagIcon-B_LyVS6c.js";import"./TrashIcon-eC3s6lcW.js";const D={class:"mt-4"},E={class:"text-xl"},I={class:"mt-2 flex items-start gap-2 overflow-y-auto pb-4 pr-8"},te=w({__name:"Show",props:{dressing:{},clothesByCategory:{}},setup(L){const o=N(null),$=b();return(e,m)=>(s(),a(l,null,[t(i(V),{title:e.$t("dashboard")},null,8,["title"]),t(B,null,{header:r(()=>[t(y,{"back-to":e.route("dashboard"),title:e.$t("dressing_name",{name:e.dressing.name})},{default:r(()=>[t(p,{href:e.route("dressings.clothes.create",e.dressing)},{default:r(()=>[t(i(z),{class:"size-5"}),c(" "+n(e.$t("vtement")),1)]),_:1},8,["href"]),t(p,{href:e.route("dressings.edit",e.dressing),variant:"secondary"},{default:r(()=>[t(i(S),{class:"size-5"}),c(" "+n(e.$t("modifier")),1)]),_:1},8,["href"])]),_:1},8,["back-to","title"])]),default:r(()=>[(s(!0),a(l,null,_(e.clothesByCategory,({category:d,clothes:u})=>(s(),a("section",D,[g("h3",E,n(i($).nameFromId(d.id))+" ("+n(u.length)+") ",1),g("div",I,[(s(!0),a(l,null,_(u,f=>(s(),h(C,{class:"w-32 shrink-0","sr-text":e.$t("voir_le_dtail"),onClick:T=>o.value=f},{default:r(()=>[t(v,{clothing:f},null,8,["clothing"])]),_:2},1032,["sr-text","onClick"]))),256))])]))),256)),o.value?(s(),h(k,{key:0,clothing:o.value,onClose:m[0]||(m[0]=d=>o.value=null)},null,8,["clothing"])):F("",!0)]),_:1})],64))}});export{te as default};
