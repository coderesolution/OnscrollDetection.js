function t(){return t=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r])}return t},t.apply(this,arguments)}class e{constructor(t={}){this.elements=t.elements||"[data-onscroll]",this.screen=t.screen||"(min-width: 768px)",this.triggers=new Map,this.init()}init(){gsap.utils.toArray(this.elements).forEach((t,e)=>{const s=this.getTrigger(t),r=this.getScreen(t),i=gsap.matchMedia(),o=this.getFromProperties(t,e),a=this.getToProperties(t,e,s);i.add(r,()=>{const e=gsap.fromTo(t,o,a);this.triggers.set(e.scrollTrigger,{element:t,fromProperties:o,toProperties:a,gsapAnimation:e})}),this.debugMode(t,e)})}getTrigger(t){return this.hasAttributes(t,["data-onscroll-auto"])&&!t.hasAttribute("data-onscroll-trigger")||t.hasAttribute("data-onscroll-trigger")?t.parentElement:t}getScreen(t){return t.hasAttribute("data-onscroll-screen")?t.dataset.onscrollScreen:this.screen}getFromProperties(e,s){const r=this.getAnimateFrom(e),{offset:i}=this.getOffsetAndDistance(e);return t({},r,{bottom:this.hasAttributes(e,["data-onscroll-auto","data-onscroll-reverse"])?"auto":null,top:this.hasAttributes(e,["data-onscroll-auto"])&&!this.hasAttributes(e,["data-onscroll-reverse"])?"auto":null,x:!this.hasAttributes(e,["data-onscroll-direction"])||"x"!==this.getDirection(e)&&"xy"!==this.getDirection(e)?null:i,y:!this.hasAttributes(e,["data-onscroll-direction"])||this.hasAttributes(e,["data-onscroll-direction"])&&("y"===this.getDirection(e)||"xy"===this.getDirection(e))?i:null})}getToProperties(e,s,r){const i=this.getAnimateTo(e);return this.getOffsetAndDistance(e),t({},i,{x:this.getX(e),y:this.getY(e),ease:"none",scrollTrigger:{trigger:r,start:this.getStart(e),end:this.getEnd(e),invalidateOnRefresh:!0,scrub:this.getScrub(e),markers:this.hasAttributes(e,["data-onscroll-debug"])}})}hasAttributes(t,e){return e.every(e=>t.hasAttribute(e))}getAnimateFrom(t){return t.hasAttribute("data-onscroll-from")?JSON.parse(t.dataset.onscrollFrom):[]}getAnimateTo(t){return t.hasAttribute("data-onscroll-to")?JSON.parse(t.dataset.onscrollTo):[]}getOffset(t){return t.hasAttribute("data-onscroll-offset")?parseInt(t.dataset.onscrollOffset):null}getDirection(t){return t.dataset.onscrollDirection}getX(t){if(this.hasAttributes(t,["data-onscroll-direction"])&&("x"===this.getDirection(t)||"xy"===this.getDirection(t)))return this.getDistanceOrSpeed(t)}getY(t){if(!this.hasAttributes(t,["data-onscroll-direction"])||this.hasAttributes(t,["data-onscroll-direction"])&&("y"===this.getDirection(t)||"xy"===this.getDirection(t)))return this.getDistanceOrSpeed(t)}getOffsetAndDistance(t){let e=null,s=null;const r=this.getTrigger(t).offsetHeight;if(t.hasAttribute("data-onscroll-offset")){const[i,o]=t.dataset.onscrollOffset.split(",");e=i.trim().endsWith("%")?parseFloat(i)/100*r:parseFloat(i),s=o.trim().endsWith("%")?parseFloat(o)/100*r:parseFloat(o)}return{offset:e,distance:s}}getDistanceOrSpeed(t){const{distance:e}=this.getOffsetAndDistance(t),s=window.innerHeight;let r=t.dataset.onscrollSpeed,i=0;if(r&&r.includes(",")){const[t,e]=r.split(",").map(parseFloat);r=t,i=e/100*s,r<0&&(i*=-1)}else r=parseFloat(r||"0");if(this.hasAttributes(t,["data-onscroll-auto"])){const e=this.getTrigger(t),s=Math.abs(e.offsetHeight-t.offsetHeight);return this.hasAttributes(t,["data-onscroll-reverse"])?-s:s}if(this.hasAttributes(t,["data-onscroll-speed"])){const e=r*t.offsetHeight+i;return this.hasAttributes(t,["data-onscroll-reverse"])?-e:e}if(null!==e)return this.hasAttributes(t,["data-onscroll-reverse"])?-e:e}getScrub(t){return!this.hasAttributes(t,["data-onscroll-delay"])||parseInt(t.dataset.onscrollDelay)}getStart(t){return t.dataset.onscrollStart?t.dataset.onscrollStart:"top bottom"}getEnd(t){if(this.hasAttributes(t,["data-onscroll-speed"])&&!t.hasAttribute("data-onscroll-end")){const e=this.getDistanceOrSpeed(t);return this.getOffsetAndDistance(t),`bottom${e>=0?"+=":"-="}${Math.abs(e)} top`}return t.dataset.onscrollEnd?t.dataset.onscrollEnd:"bottom top"}debugMode(t,e){if(this.hasAttributes(t,["data-onscroll-debug"])){const{offset:s}=this.getOffsetAndDistance(t);console.group(`OnscrollDetection() debug instance (#${e+1})`),console.log({element:t,trigger:this.getTrigger(t),triggerStart:this.getStart(t),triggerEnd:this.getEnd(t),auto:this.hasAttributes(t,["data-onscroll-auto"]),offsetBefore:s,offsetAfter:this.getDistanceOrSpeed(t),delay:this.getScrub(t),screen:this.getScreen(t),speed:this.hasAttributes(t,["data-onscroll-speed"])?t.dataset.onscrollSpeed+" calculated at "+(1-parseFloat(t.dataset.onscrollSpeed))*(ScrollTrigger.maxScroll(window)-(this.scrollTrigger?this.scrollTrigger.start:0)):null,direction:this.hasAttributes(t,["data-onscroll-direction"])?t.dataset.onscrollDirection:"y",reverse:this.hasAttributes(t,["data-onscroll-reverse"]),animateFrom:this.getAnimateFrom(t),animateTo:this.getAnimateTo(t)}),console.groupEnd()}}refresh(){ScrollTrigger.refresh()}restart(){this.stop(),ScrollTrigger.getAll().forEach(t=>t.kill()),ScrollTrigger.refresh(),this.init()}stop(t=null){if(t){const e=this.triggers.get(t);e&&(e.gsapAnimation.kill(),this.triggers.delete(t))}else this.triggers.forEach(({gsapAnimation:t})=>{t.kill()}),this.triggers.clear()}update(e,s,r){const i=this.triggers.get(e);if(i){i.gsapAnimation.kill();const e=gsap.fromTo(i.element,s,r);this.triggers.set(e.scrollTrigger,t({},i,{fromProperties:s,toProperties:r,gsapAnimation:e}))}}destroy(){this.stop(),this.triggers=null}}export{e as default};
//# sourceMappingURL=OnscrollDetection.modern.mjs.map
