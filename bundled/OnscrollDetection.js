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
      if (options === void 0) {
        options = {};
      }
      this.elements = options.elements || '[data-onscroll]';
      this.screen = options.screen || '(min-width: 768px)';
      this.scrollTriggers = new Map();
      this.init();
    }
    var _proto = OnscrollDetection.prototype;
    _proto.init = function init() {
      var _this = this;
      gsap.utils.toArray(this.elements).forEach(function (element, index) {
        var trigger = _this.getTrigger(element);
        var screen = _this.getScreen(element);
        var matchMedia = gsap.matchMedia();
        var fromProperties = _this.getFromProperties(element, index);
        var toProperties = _this.getToProperties(element, index, trigger);
        matchMedia.add(screen, function () {
          var gsapAnimation = gsap.fromTo(element, fromProperties, toProperties);
          _this.scrollTriggers.set(gsapAnimation.scrollTrigger, {
            element: element,
            fromProperties: fromProperties,
            toProperties: toProperties,
            gsapAnimation: gsapAnimation
          });
        });
        _this.debugMode(element, index);
      });
    }

    // Helper methods
    ;
    _proto.getTrigger = function getTrigger(element) {
      return element.hasAttribute('data-onscroll-auto') ? element.parentElement : element;
    };
    _proto.getScreen = function getScreen(element) {
      return element.hasAttribute('data-onscroll-screen') ? element.dataset.onscrollScreen : this.screen;
    };
    _proto.getFromProperties = function getFromProperties(element, index) {
      var animateFrom = this.getAnimateFrom(element);
      var offset = this.getOffset(element);
      return _extends({}, animateFrom, {
        bottom: this.hasAttributes(element, ['data-onscroll-auto', 'data-onscroll-reverse']) ? 'auto' : null,
        top: this.hasAttributes(element, ['data-onscroll-auto']) && !this.hasAttributes(element, ['data-onscroll-reverse']) ? 'auto' : null,
        x: this.hasAttributes(element, ['data-onscroll-direction']) && (this.getDirection(element) === 'x' || this.getDirection(element) === 'xy') ? offset : null,
        y: !this.hasAttributes(element, ['data-onscroll-direction']) || this.hasAttributes(element, ['data-onscroll-direction']) && (this.getDirection(element) === 'y' || this.getDirection(element) === 'xy') ? offset : null
      });
    };
    _proto.getToProperties = function getToProperties(element, index, trigger) {
      var animateTo = this.getAnimateTo(element);
      return _extends({}, animateTo, {
        x: this.getX(element),
        y: this.getY(element),
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: this.getStart(element),
          end: this.getEnd(element),
          invalidateOnRefresh: true,
          scrub: true,
          markers: this.hasAttributes(element, ['data-onscroll-debug'])
        }
      });
    };
    _proto.hasAttributes = function hasAttributes(element, attrs) {
      return attrs.every(function (attr) {
        return element.hasAttribute(attr);
      });
    };
    _proto.getAnimateFrom = function getAnimateFrom(element) {
      return element.hasAttribute('data-onscroll-from') ? JSON.parse(element.dataset.onscrollFrom) : [];
    };
    _proto.getAnimateTo = function getAnimateTo(element) {
      return element.hasAttribute('data-onscroll-to') ? JSON.parse(element.dataset.onscrollTo) : [];
    };
    _proto.getOffset = function getOffset(element) {
      return element.hasAttribute('data-onscroll-offset') ? parseInt(element.dataset.onscrollOffset) : null;
    };
    _proto.getDirection = function getDirection(element) {
      return element.dataset.onscrollDirection;
    };
    _proto.getX = function getX(element) {
      if (this.hasAttributes(element, ['data-onscroll-direction']) && (this.getDirection(element) === 'x' || this.getDirection(element) === 'xy')) {
        return this.getDistanceOrSpeed(element);
      }
    };
    _proto.getY = function getY(element) {
      if (!this.hasAttributes(element, ['data-onscroll-direction']) || this.hasAttributes(element, ['data-onscroll-direction']) && (this.getDirection(element) === 'y' || this.getDirection(element) === 'xy')) {
        return this.getDistanceOrSpeed(element);
      }
    };
    _proto.getDistanceOrSpeed = function getDistanceOrSpeed(element) {
      if (this.hasAttributes(element, ['data-onscroll-speed'])) {
        return (1 - parseFloat(element.dataset.onscrollSpeed)) * (ScrollTrigger.maxScroll(window) - (this.scrollTrigger ? this.scrollTrigger.start : 0));
      } else {
        var distance = parseInt(element.dataset.onscrollDistance);
        if (this.hasAttributes(element, ['data-onscroll-auto'])) {
          distance = element.offsetHeight - element.parentElement.offsetHeight;
        }
        if (this.hasAttributes(element, ['data-onscroll-reverse'])) {
          return -distance;
        }
        return distance;
      }
    };
    _proto.getStart = function getStart(element) {
      return element.dataset.onscrollStart ? element.dataset.onscrollStart : 'top bottom';
    };
    _proto.getEnd = function getEnd(element) {
      return element.dataset.onscrollEnd ? element.dataset.onscrollEnd : 'bottom top';
    };
    _proto.debugMode = function debugMode(element, index) {
      if (this.hasAttributes(element, ['data-onscroll-debug'])) {
        console.group("OnscrollDetection() debug instance (" + (index + 1) + ")");
        console.log({
          element: element,
          trigger: this.getTrigger(element),
          triggerStart: this.getStart(element),
          triggerEnd: this.getEnd(element),
          auto: this.hasAttributes(element, ['data-onscroll-auto']),
          offset: this.getOffset(element),
          distance: this.getDistanceOrSpeed(element),
          screen: this.getScreen(element),
          speed: this.hasAttributes(element, ['data-onscroll-speed']) ? element.dataset.onscrollSpeed + ' calculated at ' + (1 - parseFloat(element.dataset.onscrollSpeed)) * (ScrollTrigger.maxScroll(window) - (this.scrollTrigger ? this.scrollTrigger.start : 0)) : null,
          direction: this.hasAttributes(element, ['data-onscroll-direction']) ? element.dataset.onscrollDirection : 'y',
          reverse: this.hasAttributes(element, ['data-onscroll-reverse']),
          animateFrom: this.getAnimateFrom(element),
          animateTo: this.getAnimateTo(element)
        });
        console.groupEnd();
      }
    };
    _proto.refresh = function refresh() {
      ScrollTrigger.refresh();
    };
    _proto.restart = function restart() {
      // Remove existing ScrollTriggers
      this.stop();

      // Reinitialize the ScrollTrigger instances
      ScrollTrigger.getAll().forEach(function (trigger) {
        return trigger.kill();
      });

      // Refresh ScrollTrigger
      ScrollTrigger.refresh();

      // Reapply animations using the stored animation properties
      this.init();
    };
    _proto.stop = function stop(target) {
      if (target === void 0) {
        target = null;
      }
      if (target) {
        var animationData = this.scrollTriggers.get(target);
        if (animationData) {
          animationData.gsapAnimation.kill();
          this.scrollTriggers["delete"](target);
        }
      } else {
        this.scrollTriggers.forEach(function (_ref) {
          var gsapAnimation = _ref.gsapAnimation;
          gsapAnimation.kill();
        });
        this.scrollTriggers.clear(); // Clear the ScrollTrigger instances map
      }
    };
    _proto.update = function update(target, fromProperties, toProperties) {
      var animationData = this.scrollTriggers.get(target);
      if (animationData) {
        animationData.gsapAnimation.kill();

        // Reinitialize the animation
        var gsapAnimation = gsap.fromTo(animationData.element, fromProperties, toProperties);
        this.scrollTriggers.set(gsapAnimation.scrollTrigger, _extends({}, animationData, {
          fromProperties: fromProperties,
          toProperties: toProperties,
          gsapAnimation: gsapAnimation
        }));
      }
    };
    _proto.destroy = function destroy() {
      this.stop();
      this.scrollTriggers = null;
    };
    return OnscrollDetection;
  }();

  return OnscrollDetection;

}));
