import{d as h,l as u,T as g,g as w,b as o,t,a as r,w as l,aG as y,o as $,e as m,u as a,bP as k,n as C}from"./app-DFNFXxLc.js";import{_ as p}from"./VButton.vue_vue_type_script_setup_true_lang-4xu5Xl2d.js";import{_ as V}from"./VInput.vue_vue_type_script_setup_true_lang-O9gq6JhU.js";import{_ as b}from"./InputError.vue_vue_type_script_setup_true_lang-CjTXeXq2.js";import{_ as U}from"./InputLabel.vue_vue_type_script_setup_true_lang-CmfJ_4W6.js";import{_ as x}from"./Modal.vue_vue_type_script_setup_true_lang-Cj8KeD00.js";const D={class:"space-y-4"},B={class:"text-lg font-medium text-gray-900"},E={class:"mt-1 text-sm text-gray-600"},N={class:"text-lg font-medium text-gray-900"},S={class:"mt-2 text-gray-600"},T={class:"mt-6"},F={class:"mt-6 flex justify-end"},P=h({__name:"DeleteUserForm",setup(I){const n=u(!1),_=u(null),s=g({password:""}),f=()=>{n.value=!0,y(()=>{var e;return(e=_.value)==null?void 0:e.focus()})},c=()=>{s.delete(route("profile.destroy"),{preserveScroll:!0,onSuccess:()=>i(),onError:()=>{var e;return(e=_.value)==null?void 0:e.focus()},onFinish:()=>{s.reset()}})},i=()=>{n.value=!1,s.clearErrors(),s.reset()};return(e,d)=>($(),w("section",D,[o("header",null,[o("h2",B,t(e.$t("supprimer_le_compte")),1),o("p",E,t(e.$t("une_fois_votre_compte_supprim_toutes_ses_ressource")),1)]),r(p,{variant:"danger",onClick:f},{default:l(()=>[m(t(e.$t("supprimer_le_compte")),1)]),_:1}),r(x,{show:n.value,onClose:i},{default:l(()=>[o("h2",N,t(e.$t("tesvous_sr_de_vouloir_supprimer_votre_compte")),1),o("p",S,t(e.$t("une_fois_que_votre_compte_est_supprim_toutes_ses_r")),1),o("div",T,[r(U,{for:"password",value:e.$t("mot_de_passe"),class:"sr-only"},null,8,["value"]),r(V,{id:"password",ref_key:"passwordInput",ref:_,modelValue:a(s).password,"onUpdate:modelValue":d[0]||(d[0]=v=>a(s).password=v),type:"password",class:"mt-1 block w-3/4",placeholder:e.$t("mot_de_passe"),onKeyup:k(c,["enter"])},null,8,["modelValue","placeholder"]),r(b,{message:a(s).errors.password,class:"mt-2"},null,8,["message"])]),o("div",F,[r(p,{variant:"tertiary",onClick:i},{default:l(()=>[m(t(e.$t("annuler")),1)]),_:1}),r(p,{class:C(["ms-3",{"opacity-25":a(s).processing}]),disabled:a(s).processing,onClick:c,variant:"danger"},{default:l(()=>[m(t(e.$t("supprimer_le_compte")),1)]),_:1},8,["class","disabled"])])]),_:1},8,["show"])]))}});export{P as _};