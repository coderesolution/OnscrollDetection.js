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
      // Initialise class properties with default values or provided options
      this.elements = options.elements || '[data-onscroll]';
      this.screen = options.screen || '(min-width: 768px)';
      this.triggers = new Map();

      // Initialise the class
      this.init();
    }

    // Initialisation function
    var _proto = OnscrollDetection.prototype;
    _proto.init = function init() {
      var _this = this;
      // Convert elements to an array and loop through each
      gsap.utils.toArray(this.elements).forEach(function (element, index) {
        // Get the trigger element
        var trigger = _this.getTrigger(element);

        // Get the screen media query
        var screen = _this.getScreen(element);

        // Create a matchMedia instance
        var matchMedia = gsap.matchMedia();

        // Get the animation properties for 'from' state
        var fromProperties = _this.getFromProperties(element, index);

        // Get the animation properties for 'to' state
        var toProperties = _this.getToProperties(element, index, trigger);

        // Add the animation to the matchMedia instance and store the ScrollTrigger instance
        matchMedia.add(screen, function () {
          var gsapAnimation = gsap.fromTo(element, fromProperties, toProperties);
          _this.triggers.set(gsapAnimation.scrollTrigger, {
            element: element,
            fromProperties: fromProperties,
            toProperties: toProperties,
            gsapAnimation: gsapAnimation
          });
        });

        // Enable debug mode for logging
        _this.debugMode(element, index);
      });
    }

    // Helper methods

    // Get the trigger element for ScrollTrigger
    ;
    _proto.getTrigger = function getTrigger(element) {
      return element.hasAttribute('data-onscroll-auto') ? element.parentElement : element;
    }

    // Get the screen media query
    ;
    _proto.getScreen = function getScreen(element) {
      return element.hasAttribute('data-onscroll-screen') ? element.dataset.onscrollScreen : this.screen;
    }

    // Get the animation properties for 'from' state
    ;
    _proto.getFromProperties = function getFromProperties(element, index) {
      var animateFrom = this.getAnimateFrom(element);
      var offset = this.getOffset(element);
      return _extends({}, animateFrom, {
        bottom: this.hasAttributes(element, ['data-onscroll-auto', 'data-onscroll-reverse']) ? 'auto' : null,
        top: this.hasAttributes(element, ['data-onscroll-auto']) && !this.hasAttributes(element, ['data-onscroll-reverse']) ? 'auto' : null,
        x: this.hasAttributes(element, ['data-onscroll-direction']) && (this.getDirection(element) === 'x' || this.getDirection(element) === 'xy') ? offset : null,
        y: !this.hasAttributes(element, ['data-onscroll-direction']) || this.hasAttributes(element, ['data-onscroll-direction']) && (this.getDirection(element) === 'y' || this.getDirection(element) === 'xy') ? offset : null
      });
    }

    // Get the animation properties for 'to' state
    ;
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
    }

    // Check if an element has all the specified attributes
    ;
    _proto.hasAttributes = function hasAttributes(element, attrs) {
      return attrs.every(function (attr) {
        return element.hasAttribute(attr);
      });
    }

    // Get the animation properties for 'from' state
    ;
    _proto.getAnimateFrom = function getAnimateFrom(element) {
      return element.hasAttribute('data-onscroll-from') ? JSON.parse(element.dataset.onscrollFrom) : [];
    }

    // Get the animation properties for 'to' state
    ;
    _proto.getAnimateTo = function getAnimateTo(element) {
      return element.hasAttribute('data-onscroll-to') ? JSON.parse(element.dataset.onscrollTo) : [];
    }

    // Get the offset value
    ;
    _proto.getOffset = function getOffset(element) {
      if (element.hasAttribute('data-onscroll-offset')) {
        var offsetValue = element.dataset.onscrollOffset;
        if (offsetValue.endsWith('%')) {
          // Assuming the offset is relative to the height of the element
          var percentage = parseInt(offsetValue.slice(0, -1));
          return element.offsetHeight * (percentage / 100);
        } else if (offsetValue.endsWith('px')) {
          return parseInt(offsetValue.slice(0, -2));
        } else {
          return parseInt(offsetValue);
        }
      } else {
        return 0;
      }
    }

    // Get the scroll direction
    ;
    _proto.getDirection = function getDirection(element) {
      return element.dataset.onscrollDirection;
    }

    // Get the 'x' value for ScrollTrigger animation
    ;
    _proto.getX = function getX(element) {
      if (this.hasAttributes(element, ['data-onscroll-direction']) && (this.getDirection(element) === 'x' || this.getDirection(element) === 'xy')) {
        return this.getDistanceOrSpeed(element);
      }
    }

    // Get the 'y' value for ScrollTrigger animation
    ;
    _proto.getY = function getY(element) {
      if (!this.hasAttributes(element, ['data-onscroll-direction']) || this.hasAttributes(element, ['data-onscroll-direction']) && (this.getDirection(element) === 'y' || this.getDirection(element) === 'xy')) {
        return this.getDistanceOrSpeed(element);
      }
    }

    // Get the distance or speed value for ScrollTrigger animation
    ;
    _proto.getDistanceOrSpeed = function getDistanceOrSpeed(element) {
      if (this.hasAttributes(element, ['data-onscroll-speed'])) {
        return (1 - parseFloat(element.dataset.onscrollSpeed)) * (ScrollTrigger.maxScroll(window) - (this.scrollTrigger ? this.scrollTrigger.start : 0));
      } else {
        if (element.hasAttribute('data-onscroll-distance')) {
          var distanceValue = element.dataset.onscrollDistance;
          var distance;
          if (distanceValue.endsWith('%')) {
            // Assuming the distance is relative to the height of the element
            var percentage = parseInt(distanceValue.slice(0, -1));
            distance = element.offsetHeight * (percentage / 100);
          } else if (distanceValue.endsWith('px')) {
            distance = parseInt(distanceValue.slice(0, -2));
          } else {
            distance = parseInt(distanceValue);
          }
          if (this.hasAttributes(element, ['data-onscroll-auto'])) {
            distance = element.offsetHeight - element.parentElement.offsetHeight;
          }
          if (this.hasAttributes(element, ['data-onscroll-reverse'])) {
            return -distance;
          }
          return distance;
        }
      }
    }

    // Get the start value for ScrollTrigger animation
    ;
    _proto.getStart = function getStart(element) {
      if (element.hasAttribute('data-onscroll-start')) {
        return element.dataset.onscrollStart;
      } else {
        var offset = this.getOffset(element);
        var reverse = this.hasAttributes(element, ['data-onscroll-reverse']);

        // If reverse is true, deduct the offset, otherwise add it
        var adjustedOffset = reverse ? -offset : offset;

        // Assuming the default start is 'top bottom'
        // We'll add the offset to both 'top' and 'bottom' values
        var _map = ['top', 'bottom'].map(function (value) {
            return value + "+=" + adjustedOffset;
          }),
          top = _map[0],
          bottom = _map[1];
        return top + " " + bottom;
      }
    }

    // Get the end value for ScrollTrigger animation
    ;
    _proto.getEnd = function getEnd(element) {
      if (element.hasAttribute('data-onscroll-end')) {
        return element.dataset.onscrollEnd;
      } else {
        var offset = this.getOffset(element);
        var reverse = this.hasAttributes(element, ['data-onscroll-reverse']);

        // If reverse is true, add the offset, otherwise deduct it
        var adjustedOffset = reverse ? offset : -offset;

        // Assuming the default end is 'bottom top'
        // We'll add the offset to both 'bottom' and 'top' values
        var _map2 = ['bottom', 'top'].map(function (value) {
            return value + "+=" + adjustedOffset;
          }),
          bottom = _map2[0],
          top = _map2[1];
        return bottom + " " + top;
      }
    }

    // Enable debug mode for logging
    ;
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
    }

    // Refresh ScrollTrigger instances
    ;
    _proto.refresh = function refresh() {
      ScrollTrigger.refresh();
    }

    // Restart the animations and reinitialize the ScrollTrigger instances
    ;
    _proto.restart = function restart() {
      // Stop the current animations and remove ScrollTriggers
      this.stop();

      // Kill all existing ScrollTrigger instances
      ScrollTrigger.getAll().forEach(function (trigger) {
        return trigger.kill();
      });

      // Refresh ScrollTrigger
      ScrollTrigger.refresh();

      // Reapply animations and initialize ScrollTrigger
      this.init();
    }

    // Stop animations and ScrollTriggers
    ;
    _proto.stop = function stop(target) {
      if (target === void 0) {
        target = null;
      }
      if (target) {
        // Stop animation and remove the ScrollTrigger for a specific target
        var animationData = this.triggers.get(target);
        if (animationData) {
          animationData.gsapAnimation.kill();
          this.triggers["delete"](target);
        }
      } else {
        // Stop all animations and clear the ScrollTrigger instances
        this.triggers.forEach(function (_ref) {
          var gsapAnimation = _ref.gsapAnimation;
          gsapAnimation.kill();
        });
        this.triggers.clear();
      }
    }

    // Update animation for a specific target with new fromProperties and toProperties
    ;
    _proto.update = function update(target, fromProperties, toProperties) {
      var animationData = this.triggers.get(target);
      if (animationData) {
        // Stop the existing animation
        animationData.gsapAnimation.kill();

        // Reinitialize the animation with updated properties
        var gsapAnimation = gsap.fromTo(animationData.element, fromProperties, toProperties);
        this.triggers.set(gsapAnimation.scrollTrigger, _extends({}, animationData, {
          fromProperties: fromProperties,
          toProperties: toProperties,
          gsapAnimation: gsapAnimation
        }));
      }
    }

    // Destroy the OnscrollDetection instance
    ;
    _proto.destroy = function destroy() {
      // Stop all animations and clear the ScrollTrigger instances
      this.stop();
      this.triggers = null;
    };
    return OnscrollDetection;
  }();

  return OnscrollDetection;

}));
