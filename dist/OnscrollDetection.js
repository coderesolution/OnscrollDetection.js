function t(){return t=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r])}return t},t.apply(this,arguments)}module.exports=/*#__PURE__*/function(){function e(e){void 0===e&&(e={}),this.elements=e.elements||"[data-onscroll]",this.screen=e.screen||"(min-width: 1025px)",this.triggers=new Map,this.classDefaults=t({scrollingClass:"is-scrolling",scrolledClass:"has-scrolled",stickyClass:"is-sticky",stuckClass:"has-stuck"},e.classDefaults),this.eventHandlers={},this.init()}var s=e.prototype;return s.init=function(){var t=this;gsap.utils.toArray(this.elements).forEach(function(e,s){var r=t.getTrigger(e),i=t.getScreen(e),a=gsap.matchMedia(),n=t.getFromProperties(e,s),o=t.getToProperties(e,s,r);a.add(i,function(){var s=gsap.fromTo(e,n,o);t.triggers.set(s.scrollTrigger,{element:e,fromProperties:n,toProperties:o,gsapAnimation:s})}),t.debugMode(e,s)})},s.on=function(t,e){this.eventHandlers[t]||(this.eventHandlers[t]=[]),this.eventHandlers[t].push(e)},s.emit=function(t){var e=arguments;this.eventHandlers[t]&&this.eventHandlers[t].forEach(function(t){return t.apply(void 0,[].slice.call(e,1))})},s.getTrigger=function(t){return this.hasAttributes(t,["data-onscroll-auto"])&&!t.hasAttribute("data-onscroll-trigger")?t.parentElement:t.hasAttribute("data-onscroll-trigger")?document.querySelector(t.dataset.onscrollTrigger)||(console.error("Element specified by data-onscroll-trigger not found: "+t.dataset.onscrollTrigger),t):t},s.getScreen=function(t){return t.hasAttribute("data-onscroll-screen")?t.dataset.onscrollScreen:this.screen},s.getFromProperties=function(e,s){var r=this.getAnimateFrom(e),i=this.getOffsetAndDistance(e).offset;return t({},r,{bottom:this.hasAttributes(e,["data-onscroll-auto","data-onscroll-reverse"])?"auto":null,top:this.hasAttributes(e,["data-onscroll-auto"])&&!this.hasAttributes(e,["data-onscroll-reverse"])?"auto":null,x:!this.hasAttributes(e,["data-onscroll-direction"])||"x"!==this.getDirection(e)&&"xy"!==this.getDirection(e)?null:i,y:!this.hasAttributes(e,["data-onscroll-direction"])||this.hasAttributes(e,["data-onscroll-direction"])&&("y"===this.getDirection(e)||"xy"===this.getDirection(e))?i:null})},s.getToProperties=function(e,s,r){var i=this,a=this.getAnimateTo(e),n=this.getStickyProperties(e),o=this.hasAttributes(e,["data-onscroll-sticky"]),l=e.getAttribute("data-onscroll-call"),c=function(t,s){l&&window.dispatchEvent(new CustomEvent(l,{detail:{target:e,direction:1===s?"down":"up",when:t}}))};return t({},a,{x:this.getX(e),y:this.getY(e),ease:"none",scrollTrigger:{trigger:o?e:r,start:this.getStart(e),end:this.getEnd(e),invalidateOnRefresh:!0,pin:n.pin,pinSpacing:n.pinSpacing,scrub:this.getScrub(e),markers:this.hasAttributes(e,["data-onscroll-debug"]),onEnter:function(t){var s=t.direction;e.classList.add(i.classDefaults.scrollingClass,i.classDefaults.scrolledClass),o&&e.classList.add(i.classDefaults.stickyClass,i.classDefaults.stuckClass),c("onEnter",s),i.emit("onEnter",e)},onLeave:function(t){var s=t.direction;e.classList.remove(i.classDefaults.scrollingClass),o&&e.classList.remove(i.classDefaults.stickyClass),c("onLeave",s),i.emit("onLeave",e)},onEnterBack:function(t){var s=t.direction;e.classList.add(i.classDefaults.scrollingClass),o&&e.classList.add(i.classDefaults.stickyClass),c("onEnterBack",s),i.emit("onEnterBack",e)},onLeaveBack:function(t){var s=t.direction;e.classList.remove(i.classDefaults.scrollingClass),o&&e.classList.remove(i.classDefaults.stickyClass),c("onLeaveBack",s),i.emit("onLeaveBack",e)}}})},s.getStickyProperties=function(t){return t.hasAttribute("data-onscroll-sticky")?{pin:!0,pinSpacing:!1}:{pin:!1,pinSpacing:!0}},s.hasAttributes=function(t,e){return e.every(function(e){return t.hasAttribute(e)})},s.getAnimateFrom=function(t){return t.hasAttribute("data-onscroll-from")?JSON.parse(t.dataset.onscrollFrom):[]},s.getAnimateTo=function(t){return t.hasAttribute("data-onscroll-to")?JSON.parse(t.dataset.onscrollTo):[]},s.getOffset=function(t){return t.hasAttribute("data-onscroll-offset")?parseInt(t.dataset.onscrollOffset):null},s.getDirection=function(t){return t.dataset.onscrollDirection},s.getX=function(t){return t.hasAttribute("data-onscroll-sticky")?null:!this.hasAttributes(t,["data-onscroll-direction"])||"x"!==this.getDirection(t)&&"xy"!==this.getDirection(t)?void 0:this.getDistanceOrSpeed(t)},s.getY=function(t){return t.hasAttribute("data-onscroll-sticky")?null:!this.hasAttributes(t,["data-onscroll-direction"])||this.hasAttributes(t,["data-onscroll-direction"])&&("y"===this.getDirection(t)||"xy"===this.getDirection(t))?this.getDistanceOrSpeed(t):void 0},s.getOffsetAndDistance=function(t){if(t.hasAttribute("data-onscroll-sticky"))return{offset:null,distance:null};var e=null,s=null,r=this.getTrigger(t).offsetHeight;if(t.hasAttribute("data-onscroll-offset")){var i=t.dataset.onscrollOffset.split(","),a=i[0],n=i[1];e=a.trim().endsWith("%")?parseFloat(a)/100*r:parseFloat(a),s=n.trim().endsWith("%")?parseFloat(n)/100*r:parseFloat(n)}return{offset:e,distance:s}},s.getDistanceOrSpeed=function(t){var e=this.getOffsetAndDistance(t).distance,s=window.innerHeight,r=t.dataset.onscrollSpeed,i=0;if(r&&r.includes(",")){var a=r.split(",").map(parseFloat);i=a[1]/100*s,(r=a[0])<0&&(i*=-1)}else r=parseFloat(r||"0");if(this.hasAttributes(t,["data-onscroll-auto"])){var n=this.getTrigger(t),o=Math.abs(n.offsetHeight-t.offsetHeight);return this.hasAttributes(t,["data-onscroll-reverse"])?-o:o}if(this.hasAttributes(t,["data-onscroll-speed"])){var l=r*t.offsetHeight+i;return this.hasAttributes(t,["data-onscroll-reverse"])?-l:l}if(null!==e)return this.hasAttributes(t,["data-onscroll-reverse"])?-e:e},s.getScrub=function(t){return!this.hasAttributes(t,["data-onscroll-delay"])||parseInt(t.dataset.onscrollDelay)},s.getStart=function(t){if(t.hasAttribute("data-onscroll-sticky")){var e=0;if(t.hasAttribute("data-onscroll-offset")){var s=t.dataset.onscrollOffset.split(",");e=parseFloat(s[0])}return(t.dataset.onscrollStart?t.dataset.onscrollStart:"top top")+"+="+e}return t.dataset.onscrollStart?t.dataset.onscrollStart:"top bottom"},s.getEnd=function(t){if(t.hasAttribute("data-onscroll-sticky")){var e=this.getTrigger(t),s=0;if(t.hasAttribute("data-onscroll-offset")){var r=t.dataset.onscrollOffset.split(",");s=parseFloat(r[1])}return"+="+(e.clientHeight-t.clientHeight-s)}if(this.hasAttributes(t,["data-onscroll-speed"])&&!t.hasAttribute("data-onscroll-end")){var i=this.getDistanceOrSpeed(t);return this.getOffsetAndDistance(t),"bottom"+(i>=0?"+=":"-=")+Math.abs(i)+" top"}return t.dataset.onscrollEnd?t.dataset.onscrollEnd:"bottom top"},s.debugMode=function(t,e){if(this.hasAttributes(t,["data-onscroll-debug"])){var s,r,i=this.getOffsetAndDistance(t).offset;if(this.hasAttributes(t,["data-onscroll-speed"])){var a=t.dataset.onscrollSpeed.split(",");s=a[0],r=a[1]}console.group("OnscrollDetection() debug instance (#"+(e+1)+")"),console.log({element:t,trigger:this.getTrigger(t),triggerStart:this.getStart(t),triggerEnd:this.getEnd(t),auto:this.hasAttributes(t,["data-onscroll-auto"]),offsetBefore:i,offsetAfter:this.getDistanceOrSpeed(t),delay:this.getScrub(t),screen:this.getScreen(t),speed:this.hasAttributes(t,["data-onscroll-speed"])?parseFloat(s*t.clientHeight+r/100*window.innerHeight)+" ("+parseFloat(s)+"x element height + "+parseFloat(r)+"% of the viewport height)":null,direction:this.hasAttributes(t,["data-onscroll-direction"])?t.dataset.onscrollDirection:"y",reverse:this.hasAttributes(t,["data-onscroll-reverse"]),sticky:!!this.hasAttributes(t,["data-onscroll-sticky"]),animateFrom:this.getAnimateFrom(t),animateTo:this.getAnimateTo(t),customEvent:this.hasAttributes(t,["data-onscroll-call"])?t.getAttribute("data-onscroll-call"):null}),console.groupEnd()}},s.fetch=function(t){if("number"==typeof t)return Array.from(this.triggers.keys())[t];var e=null;return this.triggers.forEach(function(s,r){s.element===t&&(e=r)}),e},s.refresh=function(){ScrollTrigger.refresh(),this.emit("refresh")},s.restart=function(){this.stop(),ScrollTrigger.getAll().forEach(function(t){return t.kill()}),ScrollTrigger.refresh(),this.init(),this.emit("restart")},s.stop=function(t){if(void 0===t&&(t=null),t){var e=this.triggers.get(t);e&&(e.gsapAnimation.kill(),this.triggers.delete(t))}else this.triggers.forEach(function(t){t.gsapAnimation.kill()}),this.triggers.clear();this.emit("stop",t)},s.update=function(e,s,r){var i=this.triggers.get(e);if(i){i.gsapAnimation.kill();var a=gsap.fromTo(i.element,s,r);this.triggers.set(a.scrollTrigger,t({},i,{fromProperties:s,toProperties:r,gsapAnimation:a}))}},s.destroy=function(){this.stop(),this.triggers=null},e}();
//# sourceMappingURL=OnscrollDetection.js.map
