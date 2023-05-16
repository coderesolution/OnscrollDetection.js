!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t||self).onscrolldetection=e()}(this,function(){function t(){return t=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s])}return t},t.apply(this,arguments)}/*#__PURE__*/
return function(){function e(t){void 0===t&&(t={}),this.elements=t.elements||"[data-onscroll]",this.screen=t.screen||"(min-width: 768px)",this.scrollTriggers=new Map,this.init()}var r=e.prototype;return r.init=function(){var t=this;gsap.utils.toArray(this.elements).forEach(function(e,r){var s=t.getTrigger(e),i=t.getScreen(e),o=gsap.matchMedia(),n=t.getFromProperties(e,r),a=t.getToProperties(e,r,s);o.add(i,function(){var r=gsap.fromTo(e,n,a);t.scrollTriggers.set(r.scrollTrigger,{element:e,fromProperties:n,toProperties:a,gsapAnimation:r})}),t.debugMode(e,r)})},r.getTrigger=function(t){return t.hasAttribute("data-onscroll-auto")?t.parentElement:t},r.getScreen=function(t){return t.hasAttribute("data-onscroll-screen")?t.dataset.onscrollScreen:this.screen},r.getFromProperties=function(e,r){var s=this.getAnimateFrom(e),i=this.getOffset(e);return t({},s,{bottom:this.hasAttributes(e,["data-onscroll-auto","data-onscroll-reverse"])?"auto":null,top:this.hasAttributes(e,["data-onscroll-auto"])&&!this.hasAttributes(e,["data-onscroll-reverse"])?"auto":null,x:!this.hasAttributes(e,["data-onscroll-direction"])||"x"!==this.getDirection(e)&&"xy"!==this.getDirection(e)?null:i,y:!this.hasAttributes(e,["data-onscroll-direction"])||this.hasAttributes(e,["data-onscroll-direction"])&&("y"===this.getDirection(e)||"xy"===this.getDirection(e))?i:null})},r.getToProperties=function(e,r,s){return t({},this.getAnimateTo(e),{x:this.getX(e),y:this.getY(e),ease:"none",scrollTrigger:{trigger:s,start:this.getStart(e),end:this.getEnd(e),invalidateOnRefresh:!0,scrub:!0,markers:this.hasAttributes(e,["data-onscroll-debug"])}})},r.hasAttributes=function(t,e){return e.every(function(e){return t.hasAttribute(e)})},r.getAnimateFrom=function(t){return t.hasAttribute("data-onscroll-from")?JSON.parse(t.dataset.onscrollFrom):[]},r.getAnimateTo=function(t){return t.hasAttribute("data-onscroll-to")?JSON.parse(t.dataset.onscrollTo):[]},r.getOffset=function(t){return t.hasAttribute("data-onscroll-offset")?parseInt(t.dataset.onscrollOffset):null},r.getDirection=function(t){return t.dataset.onscrollDirection},r.getX=function(t){if(this.hasAttributes(t,["data-onscroll-direction"])&&("x"===this.getDirection(t)||"xy"===this.getDirection(t)))return this.getDistanceOrSpeed(t)},r.getY=function(t){if(!this.hasAttributes(t,["data-onscroll-direction"])||this.hasAttributes(t,["data-onscroll-direction"])&&("y"===this.getDirection(t)||"xy"===this.getDirection(t)))return this.getDistanceOrSpeed(t)},r.getDistanceOrSpeed=function(t){if(this.hasAttributes(t,["data-onscroll-speed"]))return(1-parseFloat(t.dataset.onscrollSpeed))*(ScrollTrigger.maxScroll(window)-(this.scrollTrigger?this.scrollTrigger.start:0));var e=parseInt(t.dataset.onscrollDistance);return this.hasAttributes(t,["data-onscroll-auto"])&&(e=t.offsetHeight-t.parentElement.offsetHeight),this.hasAttributes(t,["data-onscroll-reverse"])?-e:e},r.getStart=function(t){return t.dataset.onscrollStart?t.dataset.onscrollStart:"top bottom"},r.getEnd=function(t){return t.dataset.onscrollEnd?t.dataset.onscrollEnd:"bottom top"},r.debugMode=function(t,e){this.hasAttributes(t,["data-onscroll-debug"])&&(console.group("OnscrollDetection() debug instance ("+(e+1)+")"),console.log({element:t,trigger:this.getTrigger(t),triggerStart:this.getStart(t),triggerEnd:this.getEnd(t),auto:this.hasAttributes(t,["data-onscroll-auto"]),offset:this.getOffset(t),distance:this.getDistanceOrSpeed(t),screen:this.getScreen(t),speed:this.hasAttributes(t,["data-onscroll-speed"])?t.dataset.onscrollSpeed+" calculated at "+(1-parseFloat(t.dataset.onscrollSpeed))*(ScrollTrigger.maxScroll(window)-(this.scrollTrigger?this.scrollTrigger.start:0)):null,direction:this.hasAttributes(t,["data-onscroll-direction"])?t.dataset.onscrollDirection:"y",reverse:this.hasAttributes(t,["data-onscroll-reverse"]),animateFrom:this.getAnimateFrom(t),animateTo:this.getAnimateTo(t)}),console.groupEnd())},r.refresh=function(){ScrollTrigger.refresh()},r.restart=function(){this.stop(),ScrollTrigger.getAll().forEach(function(t){return t.kill()}),ScrollTrigger.refresh(),this.init()},r.stop=function(t){if(void 0===t&&(t=null),t){var e=this.scrollTriggers.get(t);e&&(e.gsapAnimation.kill(),this.scrollTriggers.delete(t))}else this.scrollTriggers.forEach(function(t){t.gsapAnimation.kill()}),this.scrollTriggers.clear()},r.update=function(e,r,s){var i=this.scrollTriggers.get(e);if(i){i.gsapAnimation.kill();var o=gsap.fromTo(i.element,r,s);this.scrollTriggers.set(o.scrollTrigger,t({},i,{fromProperties:r,toProperties:s,gsapAnimation:o}))}},r.destroy=function(){this.stop(),this.scrollTriggers=null},e}()});
//# sourceMappingURL=OnscrollDetection.umd.js.map
