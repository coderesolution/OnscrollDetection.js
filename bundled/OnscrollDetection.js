(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.OnscrollDetection = factory());
})(this, (function () {
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }

  var OnscrollDetection = /*#__PURE__*/function () {
    function OnscrollDetection(options) {
      var _this = this;
      if (options === void 0) {
        options = {};
      }
      this.init = function () {
        /**
         * Loop each element
         */
        gsap.utils.toArray(_this.elements).forEach(function (oElement, iIndex) {
          /* Defaults */
          var oTrigger,
            iOffset = null,
            iDistance = null,
            iStart = 'top bottom',
            iBottom = 'bottom top';

          /* Assign scroll trigger to element */
          oTrigger = oElement;

          /* Determine custom from->to properties */
          var aAnimateFrom = [],
            aAnimateTo = [];
          if (oElement.hasAttribute('data-onscroll-from')) {
            aAnimateFrom = JSON.parse(oElement.dataset.onscrollFrom);
          }
          if (oElement.hasAttribute('data-onscroll-to')) {
            aAnimateTo = JSON.parse(oElement.dataset.onscrollTo);
          }

          /* Set offset */
          if (oElement.hasAttribute('data-onscroll-offset')) {
            iOffset = parseInt(oElement.dataset.onscrollOffset);
          }

          /* Set distance */
          if (oElement.hasAttribute('data-onscroll-distance')) {
            iDistance = parseInt(oElement.dataset.onscrollDistance);
          }

          /* Get speed */
          var fnGetSpeed = function fnGetSpeed() {
            return (1 - parseFloat(oElement.dataset.onscrollSpeed)) * (ScrollTrigger.maxScroll(window) - (_this.scrollTrigger ? _this.scrollTrigger.start : 0));
          };

          /* Determine auto */
          if (oElement.hasAttribute('data-onscroll-auto')) {
            oTrigger = oElement.parentElement;
            iDistance = oElement.offsetHeight - oElement.parentElement.offsetHeight;
          }

          /* Get offset */
          function fnGetOffset() {
            if (oElement.hasAttribute('data-onscroll-reverse')) {
              return iOffset ? +iOffset : null;
            } else {
              return iOffset ? -iOffset : null;
            }
          }

          /* Get distance */
          function fnGetDistance() {
            if (oElement.hasAttribute('data-onscroll-auto')) {
              return oElement.hasAttribute('data-onscroll-reverse') ? -iDistance : iDistance;
            } else {
              return oElement.hasAttribute('data-onscroll-reverse') ? -iDistance : iDistance;
            }
          }

          /* Apply animations */
          var aAnimation = gsap.fromTo(oElement, _extends({}, aAnimateFrom, {
            bottom: oElement.hasAttribute('data-onscroll-auto') && oElement.hasAttribute('data-onscroll-reverse') ? 'auto' : null,
            top: oElement.hasAttribute('data-onscroll-auto') && !oElement.hasAttribute('data-onscroll-reverse') ? 'auto' : null,
            x: oElement.hasAttribute('data-onscroll-direction') && (oElement.dataset.onscrollDirection === 'x' || oElement.dataset.onscrollDirection === 'xy') ? fnGetOffset() : null,
            y: !oElement.hasAttribute('data-onscroll-direction') || oElement.hasAttribute('data-onscroll-direction') && (oElement.dataset.onscrollDirection === 'y' || oElement.dataset.onscrollDirection === 'xy') ? fnGetOffset() : null
          }), _extends({}, aAnimateTo, {
            x: function x() {
              if (oElement.hasAttribute('data-onscroll-direction') && (oElement.dataset.onscrollDirection === 'x' || oElement.dataset.onscrollDirection === 'xy')) {
                if (oElement.hasAttribute('data-onscroll-speed')) {
                  return fnGetSpeed();
                } else {
                  return fnGetDistance();
                }
              }
            },
            y: function y() {
              if (!oElement.hasAttribute('data-onscroll-direction') || oElement.hasAttribute('data-onscroll-direction') && (oElement.dataset.onscrollDirection === 'y' || oElement.dataset.onscrollDirection === 'xy')) {
                if (oElement.hasAttribute('data-onscroll-speed')) {
                  return fnGetSpeed();
                } else {
                  return fnGetDistance();
                }
              }
            },
            ease: 'none',
            scrollTrigger: {
              trigger: oElement.dataset.onscrollTrigger ? document.querySelector(oElement.dataset.onscrollTrigger) : oTrigger,
              start: oElement.dataset.onscrollStart ? oElement.dataset.onscrollStart : iStart,
              end: oElement.dataset.onscrollEnd ? oElement.dataset.onscrollEnd : iBottom,
              invalidateOnRefresh: true,
              scrub: true,
              markers: oElement.hasAttribute('data-onscroll-debug') ? true : false
            }
          }));

          /* Store the ScrollTrigger instance */
          _this.scrollTriggers.push(aAnimation.scrollTrigger);

          /* Debug */
          if (oElement.hasAttribute('data-onscroll-debug')) {
            console.group("uOnscrollDetection() debug instance (" + (iIndex + 1) + ")");
            console.log({
              element: oElement,
              auto: oElement.hasAttribute('data-onscroll-auto') ? true : false,
              offset: iOffset,
              distance: iDistance,
              speed: oElement.hasAttribute('data-onscroll-speed') ? oElement.dataset.onscrollSpeed + ' calculated at ' + (1 - parseFloat(oElement.dataset.onscrollSpeed)) * (ScrollTrigger.maxScroll(window) - (_this.scrollTrigger ? _this.scrollTrigger.start : 0)) : null,
              direction: oElement.hasAttribute('data-onscroll-direction') ? oElement.dataset.onscrollDirection : 'y',
              reverse: oElement.hasAttribute('data-onscroll-reverse') ? true : false,
              trigger: oTrigger,
              triggerStart: iStart,
              triggerEnd: iBottom,
              animateFrom: oElement.hasAttribute('data-onscroll-to') ? JSON.parse(oElement.dataset.onscrollFrom) : null,
              animateTo: oElement.hasAttribute('data-onscroll-to') ? JSON.parse(oElement.dataset.onscrollTo) : null
            });
            console.groupEnd();
          }
        });
      };
      this.elements = options.elements || '[data-onscroll]';
      this.scrollTriggers = [];
      this.init();
    }
    var _proto = OnscrollDetection.prototype;
    _proto.refresh = function refresh() {
      ScrollTrigger.refresh();
    };
    _proto.stop = function stop(target) {
      if (target === void 0) {
        target = null;
      }
      if (target) {
        var index = this.scrollTriggers.indexOf(target);
        if (index !== -1) {
          this.scrollTriggers[index].kill();
          this.scrollTriggers.splice(index, 1);
        }
      } else {
        this.scrollTriggers.forEach(function (st) {
          st.kill();
        });
        this.scrollTriggers = []; // Clear the ScrollTrigger instances array
      }
    };
    return OnscrollDetection;
  }();

  return OnscrollDetection;

}));
