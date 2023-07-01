function t(){return t=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r])}return t},t.apply(this,arguments)}var e=/*#__PURE__*/function(){function e(t){void 0===t&&(t={}),this.elements=t.elements||"[data-onscroll]",this.screen=t.screen||"(min-width: 1025px)",this.triggers=new Map,this.debug=t.debug||!1,this.scrollingClass=t.scrollingClass||"is-scrolling",this.scrolledClass=t.scrolledClass||"has-scrolled",this.stickyClass=t.stickyClass||"is-sticky",this.stuckClass=t.stuckClass||"has-stuck",this.eventHandlers={},this.autoStart=void 0===t.autoStart||t.autoStart,this.autoStart&&this.init()}var s=e.prototype;return s.init=function(){var t=this;gsap.utils.toArray(this.elements).forEach(function(e,s){var r=t.getTrigger(e),i=t.getScreen(e),o=gsap.matchMedia(),n=t.getFromProperties(e,s);n.startAt={backgroundColor:"red"},n.immediateRender=!0;var a=t.getToProperties(e,s,r);o.add(i,function(){var s=gsap.fromTo(e,n,a);t.triggers.set(s.scrollTrigger,{element:e,fromProperties:n,toProperties:a,gsapAnimation:s})}),t.debugMode(e,s)})},s.start=function(){this.init()},s.on=function(t,e){this.eventHandlers[t]||(this.eventHandlers[t]=[]),this.eventHandlers[t].push(e)},s.emit=function(t){var e=arguments;this.eventHandlers[t]&&this.eventHandlers[t].forEach(function(t){return t.apply(void 0,[].slice.call(e,1))})},s.getTrigger=function(t){return this.hasAttributes(t,["data-onscroll-auto"])&&!t.hasAttribute("data-onscroll-trigger")?t.parentElement:t.hasAttribute("data-onscroll-trigger")?document.querySelector(t.dataset.onscrollTrigger)||(console.error("Element specified by data-onscroll-trigger not found: "+t.dataset.onscrollTrigger),t):t},s.getScreen=function(t){return t.hasAttribute("data-onscroll-screen")?t.dataset.onscrollScreen:this.screen},s.getFromProperties=function(e,s){var r=this.getAnimateFrom(e),i=this.getOffsetAndDistance(e).offset;return t({},r,{bottom:this.hasAttributes(e,["data-onscroll-auto","data-onscroll-reverse"])?"auto":null,top:this.hasAttributes(e,["data-onscroll-auto"])&&!this.hasAttributes(e,["data-onscroll-reverse"])?"auto":null,x:!this.hasAttributes(e,["data-onscroll-direction"])||"x"!==this.getDirection(e)&&"xy"!==this.getDirection(e)?null:i,y:!this.hasAttributes(e,["data-onscroll-direction"])||this.hasAttributes(e,["data-onscroll-direction"])&&("y"===this.getDirection(e)||"xy"===this.getDirection(e))?i:null})},s.getToProperties=function(e,s,r){var i=this,o=this.getAnimateTo(e),n=this.getStickyProperties(e),a=this.hasAttributes(e,["data-onscroll-sticky"]),l=e.getAttribute("data-onscroll-call"),c=e.getAttribute("data-onscroll-progress"),d=function(t,s){l&&window.dispatchEvent(new CustomEvent(l,{detail:{target:e,direction:1===s?"down":"up",when:t}}))};return t({},o,{x:this.getX(e),y:this.getY(e),ease:"none",scrollTrigger:{trigger:a?e:r,start:this.getStart(e),end:this.getEnd(e),invalidateOnRefresh:!0,pin:n.pin,pinSpacing:n.pinSpacing,scrub:this.getScrub(e),markers:this.hasAttributes(e,["data-onscroll-debug"]),onUpdate:function(t){var s=t.progress.toFixed(2);e.style.setProperty("--onscrollProgress",s),c&&function(t,s){c&&window.dispatchEvent(new CustomEvent(c,{detail:{element:e,progress:t,direction:1===s?"down":"up"}}))}(s,t.direction)},onToggle:function(t){t.isActive||e.style.setProperty("--onscrollProgress",0)},onEnter:function(t){var s=t.direction;e.classList.add(i.scrollingClass,i.scrolledClass),a&&e.classList.add(i.stickyClass,i.stuckClass),d("onEnter",s),i.emit("onEnter",e)},onLeave:function(t){var s=t.direction;e.classList.remove(i.scrollingClass),a&&e.classList.remove(i.stickyClass),d("onLeave",s),i.emit("onLeave",e)},onEnterBack:function(t){var s=t.direction;e.classList.add(i.scrollingClass),a&&e.classList.add(i.stickyClass),d("onEnterBack",s),i.emit("onEnterBack",e)},onLeaveBack:function(t){var s=t.direction;e.classList.remove(i.scrollingClass),a&&e.classList.remove(i.stickyClass),d("onLeaveBack",s),i.emit("onLeaveBack",e)}}})},s.getStickyProperties=function(t){return t.hasAttribute("data-onscroll-sticky")?{pin:!0,pinSpacing:!1}:{pin:!1,pinSpacing:!0}},s.hasAttributes=function(t,e){return e.every(function(e){return t.hasAttribute(e)})},s.getAnimateFrom=function(t){return t.hasAttribute("data-onscroll-from")?JSON.parse(t.dataset.onscrollFrom):[]},s.getAnimateTo=function(t){return t.hasAttribute("data-onscroll-to")?JSON.parse(t.dataset.onscrollTo):[]},s.getOffset=function(t){return t.hasAttribute("data-onscroll-offset")?parseInt(t.dataset.onscrollOffset):null},s.getDirection=function(t){return t.dataset.onscrollDirection?t.dataset.onscrollDirection:"y"},s.getX=function(t){return t.hasAttribute("data-onscroll-sticky")?null:!this.hasAttributes(t,["data-onscroll-direction"])||"x"!==this.getDirection(t)&&"xy"!==this.getDirection(t)?void 0:this.getDistanceOrSpeed(t)},s.getY=function(t){return t.hasAttribute("data-onscroll-sticky")?null:!this.hasAttributes(t,["data-onscroll-direction"])||this.hasAttributes(t,["data-onscroll-direction"])&&("y"===this.getDirection(t)||"xy"===this.getDirection(t))?this.getDistanceOrSpeed(t):void 0},s.getOffsetAndDistance=function(t){if(t.hasAttribute("data-onscroll-sticky"))return{offset:null,distance:null};var e=null,s=null,r=this.getTrigger(t).offsetHeight;if(t.hasAttribute("data-onscroll-offset")){var i=t.dataset.onscrollOffset.split(","),o=i[0],n=i[1];e=o.trim().endsWith("%")?parseFloat(o)/100*r:parseFloat(o),s=n.trim().endsWith("%")?parseFloat(n)/100*r:parseFloat(n)}return{offset:e,distance:s}},s.getDistanceOrSpeed=function(t){var e=this.getOffsetAndDistance(t).distance,s=window.innerHeight,r=t.dataset.onscrollSpeed,i=0;if(r&&r.includes(",")){var o=r.split(",").map(parseFloat);i=o[1]/100*s,(r=o[0])<0&&(i*=-1)}else r=parseFloat(r||"0");if(this.hasAttributes(t,["data-onscroll-auto"])){var n=this.getTrigger(t),a=Math.abs(n.offsetHeight-t.offsetHeight);return this.hasAttributes(t,["data-onscroll-reverse"])?-a:a}return this.hasAttributes(t,["data-onscroll-speed"])?r*t.offsetHeight+i:null!==e?e:void 0},s.getScrub=function(t){return!this.hasAttributes(t,["data-onscroll-delay"])||parseInt(t.dataset.onscrollDelay)},s.getStart=function(t){if(t.hasAttribute("data-onscroll-sticky")){var e=0;if(t.hasAttribute("data-onscroll-offset")){var s=t.dataset.onscrollOffset.split(",");e=parseFloat(s[0])}return(t.dataset.onscrollStart?t.dataset.onscrollStart:"top top")+"+="+e}if(this.hasAttributes(t,["data-onscroll-preset","data-onscroll-offset"])&&"x"!==this.getDirection(t)&&!this.hasAttributes(t,["data-onscroll-start","data-onscroll-sticky"])){var r=t.dataset.onscrollOffset.split(",")[0];return(parseFloat(r)<0?"top+="+r:"top+=0")+" bottom"}return t.dataset.onscrollStart?t.dataset.onscrollStart:"top bottom"},s.getEnd=function(t){if(t.hasAttribute("data-onscroll-sticky")){var e=this.getTrigger(t),s=0;if(t.hasAttribute("data-onscroll-offset")){var r=t.dataset.onscrollOffset.split(",");s=parseFloat(r[1])}return t.dataset.onscrollEnd?t.dataset.onscrollEnd:"+="+(e.clientHeight-t.clientHeight-s)}if(this.hasAttributes(t,["data-onscroll-speed"])&&!t.hasAttribute("data-onscroll-end")){var i=this.getDistanceOrSpeed(t);return this.getOffsetAndDistance(t),"bottom"+(i>=0?"+=":"-=")+Math.abs(i)+" top"}return this.hasAttributes(t,["data-onscroll-preset","data-onscroll-offset"])&&"x"!==this.getDirection(t)&&!this.hasAttributes(t,["data-onscroll-end","data-onscroll-sticky"])?"bottom+="+t.dataset.onscrollOffset.split(",")[1]+" top":t.dataset.onscrollEnd?t.dataset.onscrollEnd:"bottom top"},s.debugMode=function(t,e){if(this.debug||this.hasAttributes(t,["data-onscroll-debug"])){var s,r,i=this.getOffsetAndDistance(t).offset;if(this.hasAttributes(t,["data-onscroll-speed"])){var o=t.dataset.onscrollSpeed.split(",");s=o[0],r=o[1]}var n=t.dataset,a=this.hasAttributes(t,["data-onscroll-speed"]),l=this.hasAttributes(t,["data-onscroll-preset"]),c=this.hasAttributes(t,["data-onscroll-sticky"]),d=this.hasAttributes(t,["data-onscroll-reverse"]);console.group("OnscrollDetection() debug instance (#"+(e+1)+")"),console.log({element:t,trigger:this.getTrigger(t),triggerStart:this.getStart(t),triggerEnd:this.getEnd(t),auto:this.hasAttributes(t,["data-onscroll-auto"]),offsetBefore:i,offsetAfter:this.getDistanceOrSpeed(t),delay:this.getScrub(t),screen:this.getScreen(t),speed:a?parseFloat(s*t.clientHeight+r/100*window.innerHeight)+" ("+parseFloat(s)+"x element height + "+parseFloat(r)+"% of the viewport height)":null,direction:this.hasAttributes(t,["data-onscroll-direction"])?n.onscrollDirection:"y",preset:l,reverse:d,sticky:c,animateFrom:this.getAnimateFrom(t),animateTo:this.getAnimateTo(t),customEvent:this.hasAttributes(t,["data-onscroll-call"])?n.onscrollCall:null}),[{condition:this.hasAttributes(t,["data-onscroll-offset"])&&a,message:"`offset` and `speed` should not be used together"},{condition:l&&(this.hasAttributes(t,["data-onscroll-start"])||this.hasAttributes(t,["data-onscroll-end"])),message:"`preset` should not be used in conjunction with `start` or `end` settings"},{condition:c&&a,message:"`sticky` should not be used in conjunction with `speed`"},{condition:c&&this.hasAttributes(t,["data-onscroll-offset"])&&this.hasAttributes(t,["data-onscroll-end"]),message:"Your bottom `offset` will be ignored due to custom `end` on the `sticky` element"},{condition:d&&(!this.hasAttributes(t,["data-onscroll-auto"])||this.hasAttributes(t,["data-onscroll-offset"])||c||a),message:"`reverse` is not compatible with `offset`, `speed` or `sticky` and should only be used in conjunction with `auto`"},{condition:a&&l,message:"`preset` has no effect in conjunction with `speed` setting"},{condition:"x"===this.getDirection(t)&&l,message:"`preset` has no effect in conjunction with `x` direction"}].forEach(function(t){return t.condition&&console.warn(t.message)}),console.groupEnd()}},s.fetch=function(t){if("number"==typeof t)return Array.from(this.triggers.keys())[t];var e=null;return this.triggers.forEach(function(s,r){s.element===t&&(e=r)}),e},s.refresh=function(){ScrollTrigger.refresh(),this.emit("refresh")},s.restart=function(){this.stop(),ScrollTrigger.getAll().forEach(function(t){return t.kill()}),ScrollTrigger.refresh(),this.init(),this.emit("restart")},s.stop=function(t){if(void 0===t&&(t=null),t){var e=this.triggers.get(t);e&&(e.gsapAnimation.kill(),this.triggers.delete(t))}else this.triggers.forEach(function(t){t.gsapAnimation.kill()}),this.triggers.clear();this.emit("stop",t)},s.update=function(e,s,r){var i=this.triggers.get(e);if(i){i.gsapAnimation.kill();var o=gsap.fromTo(i.element,s,r),n=ScrollTrigger.create({animation:o,trigger:this.getTrigger(i.element),start:this.getStart(i.element),end:this.getEnd(i.element),scrub:this.getScrub(i.element)});this.triggers.set(e,t({},i,{fromProperties:s,toProperties:r,gsapAnimation:o,trigger:n}))}},s.destroy=function(){this.stop(),this.triggers=null},e}();export{e as default};
//# sourceMappingURL=OnscrollDetection.mjs.map
