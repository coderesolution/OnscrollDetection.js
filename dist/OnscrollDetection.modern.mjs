function t(){return t=Object.assign?Object.assign.bind():function(t){for(var r=1;r<arguments.length;r++){var o=arguments[r];for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&(t[e]=o[e])}return t},t.apply(this,arguments)}class r{constructor(t={}){this.elements=t.elements||"[data-onscroll]",this.init()}init(){console.log("OnscrollDetection has been instanstiated"),gsap.utils.toArray(this.elements).forEach((r,o)=>{let e,a=null,l=null,s="top bottom",n="bottom top";e=r;let i=[],c=[];function d(){return(1-parseFloat(r.dataset.onscrollSpeed))*(ScrollTrigger.maxScroll(window)-(this.scrollTrigger?this.scrollTrigger.start:0))}function u(){return r.hasAttribute("data-onscroll-reverse")?a?+a:null:a?-a:null}function h(){return r.hasAttribute("data-onscroll-auto"),r.hasAttribute("data-onscroll-reverse")?-l:l}r.hasAttribute("data-onscroll-from")&&(i=JSON.parse(r.dataset.onscrollFrom)),r.hasAttribute("data-onscroll-to")&&(c=JSON.parse(r.dataset.onscrollTo)),r.hasAttribute("data-onscroll-offset")&&(a=parseInt(r.dataset.onscrollOffset)),r.hasAttribute("data-onscroll-distance")&&(l=parseInt(r.dataset.onscrollDistance)),r.hasAttribute("data-onscroll-auto")&&(e=r.parentElement,l=r.offsetHeight-r.parentElement.offsetHeight),gsap.fromTo(r,t({},i,{bottom:r.hasAttribute("data-onscroll-auto")&&r.hasAttribute("data-onscroll-reverse")?"auto":null,top:r.hasAttribute("data-onscroll-auto")&&!r.hasAttribute("data-onscroll-reverse")?"auto":null,x:!r.hasAttribute("data-onscroll-direction")||"x"!==r.dataset.onscrollDirection&&"xy"!==r.dataset.onscrollDirection?null:u(),y:!r.hasAttribute("data-onscroll-direction")||r.hasAttribute("data-onscroll-direction")&&("y"===r.dataset.onscrollDirection||"xy"===r.dataset.onscrollDirection)?u():null}),t({},c,{x:()=>{if(r.hasAttribute("data-onscroll-direction")&&("x"===r.dataset.onscrollDirection||"xy"===r.dataset.onscrollDirection))return r.hasAttribute("data-onscroll-speed")?d():h()},y:()=>{if(!r.hasAttribute("data-onscroll-direction")||r.hasAttribute("data-onscroll-direction")&&("y"===r.dataset.onscrollDirection||"xy"===r.dataset.onscrollDirection))return r.hasAttribute("data-onscroll-speed")?d():h()},ease:"none",scrollTrigger:{trigger:r.dataset.onscrollTrigger?document.querySelector(r.dataset.onscrollTrigger):e,start:r.dataset.onscrollStart?r.dataset.onscrollStart:s,end:r.dataset.onscrollEnd?r.dataset.onscrollEnd:n,invalidateOnRefresh:!0,scrub:!0,markers:!!r.hasAttribute("data-onscroll-debug")}})),r.hasAttribute("data-onscroll-debug")&&(console.group(`uOnscrollDetection() debug instance (${o+1})`),console.log({element:r,auto:!!r.hasAttribute("data-onscroll-auto"),offset:a,distance:l,speed:r.hasAttribute("data-onscroll-speed")?r.dataset.onscrollSpeed+" calculated at "+(1-parseFloat(r.dataset.onscrollSpeed))*(ScrollTrigger.maxScroll(window)-(this.scrollTrigger?this.scrollTrigger.start:0)):null,direction:r.hasAttribute("data-onscroll-direction")?r.dataset.onscrollDirection:"y",reverse:!!r.hasAttribute("data-onscroll-reverse"),trigger:e,triggerStart:s,triggerEnd:n,animateFrom:r.hasAttribute("data-onscroll-to")?JSON.parse(r.dataset.onscrollFrom):null,animateTo:r.hasAttribute("data-onscroll-to")?JSON.parse(r.dataset.onscrollTo):null}),console.groupEnd())})}}export{r as default};
//# sourceMappingURL=OnscrollDetection.modern.mjs.map
