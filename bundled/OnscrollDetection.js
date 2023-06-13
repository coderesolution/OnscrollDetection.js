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
      this.screen = options.screen || '(min-width: 1025px)';
      this.triggers = new Map();

      // Set class names to defaults or provided options
      this.classDefaults = _extends({
        scrollingClass: 'is-scrolling',
        scrolledClass: 'has-scrolled',
        stickyClass: 'is-sticky',
        stuckClass: 'has-stuck'
      }, options.classDefaults);

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
      if (this.hasAttributes(element, ['data-onscroll-auto']) && !element.hasAttribute('data-onscroll-trigger')) {
        // If data-onscroll-auto is present and data-onscroll-trigger is not, use the parent element as the trigger
        return element.parentElement;
      } else if (element.hasAttribute('data-onscroll-trigger')) {
        // If data-onscroll-trigger is present, try to find the DOM element specified by the attribute
        var triggerElement = document.querySelector(element.dataset.onscrollTrigger);
        if (triggerElement) {
          return triggerElement;
        } else {
          console.error("Element specified by data-onscroll-trigger not found: " + element.dataset.onscrollTrigger);
          return element;
        }
      } else {
        // Otherwise, use the element itself as the trigger
        return element;
      }
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
      var _this$getOffsetAndDis = this.getOffsetAndDistance(element),
        offset = _this$getOffsetAndDis.offset;
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
      var _this2 = this;
      var animateTo = this.getAnimateTo(element);
      var stickyProperties = this.getStickyProperties(element);
      var isSticky = this.hasAttributes(element, ['data-onscroll-sticky']);
      return _extends({}, animateTo, {
        x: this.getX(element),
        y: this.getY(element),
        ease: 'none',
        scrollTrigger: {
          trigger: isSticky ? element : trigger,
          start: this.getStart(element),
          end: this.getEnd(element),
          invalidateOnRefresh: true,
          pin: stickyProperties.pin,
          pinSpacing: stickyProperties.pinSpacing,
          scrub: this.getScrub(element),
          markers: this.hasAttributes(element, ['data-onscroll-debug']),
          onEnter: function onEnter() {
            element.classList.add(_this2.classDefaults.scrollingClass, _this2.classDefaults.scrolledClass);
            if (isSticky) {
              element.classList.add(_this2.classDefaults.stickyClass, _this2.classDefaults.stuckClass);
            }
          },
          onLeave: function onLeave() {
            element.classList.remove(_this2.classDefaults.scrollingClass);
            if (isSticky) {
              element.classList.remove(_this2.classDefaults.stickyClass);
            }
          },
          onEnterBack: function onEnterBack() {
            element.classList.add(_this2.classDefaults.scrollingClass);
            if (isSticky) {
              element.classList.add(_this2.classDefaults.stickyClass);
            }
          },
          onLeaveBack: function onLeaveBack() {
            element.classList.remove(_this2.classDefaults.scrollingClass);
            if (isSticky) {
              element.classList.remove(_this2.classDefaults.stickyClass);
            }
          }
        }
      });
    }

    // Get the sticky properties for ScrollTrigger animation
    ;
    _proto.getStickyProperties = function getStickyProperties(element) {
      if (element.hasAttribute('data-onscroll-sticky')) {
        return {
          pin: true,
          pinSpacing: false
        };
      } else {
        return {
          pin: false,
          pinSpacing: true
        };
      }
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
      return element.hasAttribute('data-onscroll-offset') ? parseInt(element.dataset.onscrollOffset) : null;
    }

    // Get the scroll direction
    ;
    _proto.getDirection = function getDirection(element) {
      return element.dataset.onscrollDirection;
    }

    // Get the 'x' value for ScrollTrigger animation
    ;
    _proto.getX = function getX(element) {
      if (element.hasAttribute('data-onscroll-sticky')) {
        return null;
      }
      if (this.hasAttributes(element, ['data-onscroll-direction']) && (this.getDirection(element) === 'x' || this.getDirection(element) === 'xy')) {
        return this.getDistanceOrSpeed(element);
      }
    }

    // Get the 'y' value for ScrollTrigger animation
    ;
    _proto.getY = function getY(element) {
      if (element.hasAttribute('data-onscroll-sticky')) {
        return null;
      }
      if (!this.hasAttributes(element, ['data-onscroll-direction']) || this.hasAttributes(element, ['data-onscroll-direction']) && (this.getDirection(element) === 'y' || this.getDirection(element) === 'xy')) {
        return this.getDistanceOrSpeed(element);
      }
    }

    // Get the offset and distance values
    ;
    _proto.getOffsetAndDistance = function getOffsetAndDistance(element) {
      // Check if the element has the data-onscroll-sticky attribute
      if (element.hasAttribute('data-onscroll-sticky')) {
        return {
          offset: null,
          distance: null
        };
      }
      var offset = null;
      var distance = null;
      var triggerElement = this.getTrigger(element);
      var triggerHeight = triggerElement.offsetHeight;
      if (element.hasAttribute('data-onscroll-offset')) {
        var _element$dataset$onsc = element.dataset.onscrollOffset.split(','),
          offsetValue = _element$dataset$onsc[0],
          distanceValue = _element$dataset$onsc[1];

        // If the offset value ends with a '%', calculate it as a percentage of the trigger height
        if (offsetValue.trim().endsWith('%')) {
          var offsetPercentage = parseFloat(offsetValue) / 100;
          offset = offsetPercentage * triggerHeight;
        } else {
          offset = parseFloat(offsetValue);
        }

        // If the distance value ends with a '%', calculate it as a percentage of the trigger height
        if (distanceValue.trim().endsWith('%')) {
          var distancePercentage = parseFloat(distanceValue) / 100;
          distance = distancePercentage * triggerHeight;
        } else {
          distance = parseFloat(distanceValue);
        }
      }
      return {
        offset: offset,
        distance: distance
      };
    }

    // Get the distance or speed value for ScrollTrigger animation
    ;
    _proto.getDistanceOrSpeed = function getDistanceOrSpeed(element) {
      var _this$getOffsetAndDis2 = this.getOffsetAndDistance(element),
        distance = _this$getOffsetAndDis2.distance;
      var viewportHeight = window.innerHeight;
      var scrollSpeed = element.dataset.onscrollSpeed;
      var additionalDistance = 0;

      // Check if there are two values
      if (scrollSpeed && scrollSpeed.includes(',')) {
        var _scrollSpeed$split$ma = scrollSpeed.split(',').map(parseFloat),
          speed = _scrollSpeed$split$ma[0],
          percentage = _scrollSpeed$split$ma[1];

        // Update the scrollSpeed and calculate the additional distance
        scrollSpeed = speed;
        additionalDistance = percentage / 100 * viewportHeight;

        // If scrollSpeed is negative, subtract the additional distance
        if (scrollSpeed < 0) {
          additionalDistance *= -1;
        }
      } else {
        scrollSpeed = parseFloat(scrollSpeed || '0');
      }
      if (this.hasAttributes(element, ['data-onscroll-auto'])) {
        var triggerElement = this.getTrigger(element);
        var autoDistance = Math.abs(triggerElement.offsetHeight - element.offsetHeight);
        return this.hasAttributes(element, ['data-onscroll-reverse']) ? -autoDistance : autoDistance;
      } else if (this.hasAttributes(element, ['data-onscroll-speed'])) {
        var elementHeight = element.offsetHeight;
        var scrollDistance = scrollSpeed * elementHeight + additionalDistance;
        return this.hasAttributes(element, ['data-onscroll-reverse']) ? -scrollDistance : scrollDistance;
      } else if (distance !== null) {
        return this.hasAttributes(element, ['data-onscroll-reverse']) ? -distance : distance;
      }
    }

    // Get the delay value which controls the scrub setting
    ;
    _proto.getScrub = function getScrub(element) {
      if (this.hasAttributes(element, ['data-onscroll-delay'])) {
        return parseInt(element.dataset.onscrollDelay);
      } else {
        return true; // Default scrub value if no 'data-onscroll-delay' attribute is present
      }
    }

    // Get the start value for ScrollTrigger animation
    ;
    _proto.getStart = function getStart(element) {
      if (element.hasAttribute('data-onscroll-sticky')) {
        var stickyOffset = 0;
        if (element.hasAttribute('data-onscroll-offset')) {
          var _element$dataset$onsc2 = element.dataset.onscrollOffset.split(','),
            offsetValue = _element$dataset$onsc2[0];
          stickyOffset = parseFloat(offsetValue);
        }
        return (element.dataset.onscrollStart ? element.dataset.onscrollStart : 'top top') + '+=' + stickyOffset;
      }
      return element.dataset.onscrollStart ? element.dataset.onscrollStart : 'top bottom';
    }

    // Get the end value for ScrollTrigger animation
    ;
    _proto.getEnd = function getEnd(element) {
      if (element.hasAttribute('data-onscroll-sticky')) {
        var trigger = this.getTrigger(element);
        var stickyOffset = 0;
        if (element.hasAttribute('data-onscroll-offset')) {
          var _element$dataset$onsc3 = element.dataset.onscrollOffset.split(','),
            distanceValue = _element$dataset$onsc3[1];
          stickyOffset = parseFloat(distanceValue);
        }
        var stickyDistance = trigger.clientHeight - element.clientHeight - stickyOffset;
        return '+=' + stickyDistance;
      } else if (this.hasAttributes(element, ['data-onscroll-speed']) && !element.hasAttribute('data-onscroll-end')) {
        var scrollDistance = this.getDistanceOrSpeed(element);
        this.getOffsetAndDistance(element);
        return "bottom" + (scrollDistance >= 0 ? '+=' : '-=') + Math.abs(scrollDistance) + " top";
      } else {
        return element.dataset.onscrollEnd ? element.dataset.onscrollEnd : 'bottom top';
      }
    }

    // Enable debug mode for logging
    ;
    _proto.debugMode = function debugMode(element, index) {
      if (this.hasAttributes(element, ['data-onscroll-debug'])) {
        var _this$getOffsetAndDis4 = this.getOffsetAndDistance(element),
          offset = _this$getOffsetAndDis4.offset;
        var speedMultiplier;
        var speedViewportPercentage;
        if (this.hasAttributes(element, ['data-onscroll-speed'])) {
          var _element$dataset$onsc4 = element.dataset.onscrollSpeed.split(',');
          speedMultiplier = _element$dataset$onsc4[0];
          speedViewportPercentage = _element$dataset$onsc4[1];
        }
        console.group("OnscrollDetection() debug instance (#" + (index + 1) + ")");
        console.log({
          element: element,
          trigger: this.getTrigger(element),
          triggerStart: this.getStart(element),
          triggerEnd: this.getEnd(element),
          auto: this.hasAttributes(element, ['data-onscroll-auto']),
          offsetBefore: offset,
          offsetAfter: this.getDistanceOrSpeed(element),
          delay: this.getScrub(element),
          screen: this.getScreen(element),
          speed: this.hasAttributes(element, ['data-onscroll-speed']) ? parseFloat(speedMultiplier * element.clientHeight + speedViewportPercentage / 100 * window.innerHeight) + ' (' + parseFloat(speedMultiplier) + 'x element height + ' + parseFloat(speedViewportPercentage) + '% of the viewport height)' : null,
          direction: this.hasAttributes(element, ['data-onscroll-direction']) ? element.dataset.onscrollDirection : 'y',
          reverse: this.hasAttributes(element, ['data-onscroll-reverse']),
          sticky: this.hasAttributes(element, ['data-onscroll-sticky']) ? true : false,
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
