export default class OnscrollDetection {
	constructor(options = {}) {
		// Initialise class properties with default values or provided options
		this.elements = options.elements || '[data-onscroll]'
		this.screen = options.screen || '(min-width: 768px)'
		this.triggers = new Map()

		// Initialise the class
		this.init()
	}

	// Initialisation function
	init() {
		// Convert elements to an array and loop through each
		gsap.utils.toArray(this.elements).forEach((element, index) => {
			// Get the trigger element
			const trigger = this.getTrigger(element)

			// Get the screen media query
			const screen = this.getScreen(element)

			// Create a matchMedia instance
			const matchMedia = gsap.matchMedia()

			// Get the animation properties for 'from' state
			const fromProperties = this.getFromProperties(element, index)

			// Get the animation properties for 'to' state
			const toProperties = this.getToProperties(element, index, trigger)

			// Add the animation to the matchMedia instance and store the ScrollTrigger instance
			const animation = matchMedia.add(screen, () => {
				const gsapAnimation = gsap.fromTo(element, fromProperties, toProperties)
				this.triggers.set(gsapAnimation.scrollTrigger, {
					element,
					fromProperties,
					toProperties,
					gsapAnimation,
				})
			})

			// Enable debug mode for logging
			this.debugMode(element, index)
		})
	}

	// Helper methods

	// Get the trigger element for ScrollTrigger
	getTrigger(element) {
	    if (this.hasAttributes(element, ['data-onscroll-auto']) && !element.hasAttribute('data-onscroll-trigger')) {
	        // If data-onscroll-auto is present and data-onscroll-trigger is not, use the parent element as the trigger
	        return element.parentElement;
	    } else if (element.hasAttribute('data-onscroll-trigger')) {
	        // If data-onscroll-trigger is present, use the parent element as the trigger
	        return element.parentElement;
	    } else {
	        // Otherwise, use the element itself as the trigger
	        return element;
	    }
	}

	// Get the screen media query
	getScreen(element) {
		return element.hasAttribute('data-onscroll-screen') ? element.dataset.onscrollScreen : this.screen
	}

	// Get the animation properties for 'from' state
	getFromProperties(element, index) {
		const animateFrom = this.getAnimateFrom(element);
		const { offset } = this.getOffsetAndDistance(element);

		return {
			...animateFrom,
			bottom: this.hasAttributes(element, ['data-onscroll-auto', 'data-onscroll-reverse']) ? 'auto' : null,
			top:
				this.hasAttributes(element, ['data-onscroll-auto']) &&
				!this.hasAttributes(element, ['data-onscroll-reverse'])
					? 'auto'
					: null,
			x:
				this.hasAttributes(element, ['data-onscroll-direction']) &&
				(this.getDirection(element) === 'x' || this.getDirection(element) === 'xy')
					? offset
					: null,
			y:
				!this.hasAttributes(element, ['data-onscroll-direction']) ||
				(this.hasAttributes(element, ['data-onscroll-direction']) &&
					(this.getDirection(element) === 'y' || this.getDirection(element) === 'xy'))
					? offset
					: null,
		}
	}

	// Get the animation properties for 'to' state
	getToProperties(element, index, trigger) {
		const animateTo = this.getAnimateTo(element);
		const { offset } = this.getOffsetAndDistance(element);

	    return {
	        ...animateTo,
	        x: this.getX(element),
	        y: this.getY(element),
	        ease: 'none',
	        scrollTrigger: {
	            trigger: trigger,
	            start: this.getStart(element),
	            end: this.getEnd(element),
	            invalidateOnRefresh: true,
	            scrub: this.getScrub(element),
	            markers: this.hasAttributes(element, ['data-onscroll-debug']),
	        },
	    }
	}

	// Check if an element has all the specified attributes
	hasAttributes(element, attrs) {
		return attrs.every((attr) => element.hasAttribute(attr))
	}

	// Get the animation properties for 'from' state
	getAnimateFrom(element) {
		return element.hasAttribute('data-onscroll-from') ? JSON.parse(element.dataset.onscrollFrom) : []
	}

	// Get the animation properties for 'to' state
	getAnimateTo(element) {
		return element.hasAttribute('data-onscroll-to') ? JSON.parse(element.dataset.onscrollTo) : []
	}

	// Get the offset value
	getOffset(element) {
		return element.hasAttribute('data-onscroll-offset') ? parseInt(element.dataset.onscrollOffset) : null
	}

	// Get the scroll direction
	getDirection(element) {
		return element.dataset.onscrollDirection
	}

	// Get the 'x' value for ScrollTrigger animation
	getX(element) {
		if (
			this.hasAttributes(element, ['data-onscroll-direction']) &&
			(this.getDirection(element) === 'x' || this.getDirection(element) === 'xy')
		) {
			return this.getDistanceOrSpeed(element)
		}
	}

	// Get the 'y' value for ScrollTrigger animation
	getY(element) {
		if (
			!this.hasAttributes(element, ['data-onscroll-direction']) ||
			(this.hasAttributes(element, ['data-onscroll-direction']) &&
				(this.getDirection(element) === 'y' || this.getDirection(element) === 'xy'))
		) {
			return this.getDistanceOrSpeed(element)
		}
	}

	// Get the offset and distance values
	getOffsetAndDistance(element) {
	    let offset = null;
	    let distance = null;
	    const triggerElement = this.getTrigger(element);
	    const triggerHeight = triggerElement.offsetHeight;

	    if (element.hasAttribute('data-onscroll-offset')) {
	        const [offsetValue, distanceValue] = element.dataset.onscrollOffset.split(',');

	        // If the offset value ends with a '%', calculate it as a percentage of the trigger height
	        if (offsetValue.trim().endsWith('%')) {
	            const offsetPercentage = parseFloat(offsetValue) / 100;
	            offset = offsetPercentage * triggerHeight;
	        } else {
	            offset = parseFloat(offsetValue);
	        }

	        // If the distance value ends with a '%', calculate it as a percentage of the trigger height
	        if (distanceValue.trim().endsWith('%')) {
	            const distancePercentage = parseFloat(distanceValue) / 100;
	            distance = distancePercentage * triggerHeight;
	        } else {
	            distance = parseFloat(distanceValue);
	        }
	    }

	    return { offset, distance };
	}

	// Get the distance or speed value for ScrollTrigger animation
	getDistanceOrSpeed(element) {
	    const { distance } = this.getOffsetAndDistance(element);
	    const viewportHeight = window.innerHeight;
	    let scrollSpeed = element.dataset.onscrollSpeed;
	    let additionalDistance = 0;

	    // Check if there are two values
	    if (scrollSpeed && scrollSpeed.includes(',')) {
	        const [speed, percentage] = scrollSpeed.split(',').map(parseFloat);

	        // Update the scrollSpeed and calculate the additional distance
	        scrollSpeed = speed;
	        additionalDistance = (percentage / 100) * viewportHeight;

	        // If scrollSpeed is negative, subtract the additional distance
	        if (scrollSpeed < 0) {
	            additionalDistance *= -1;
	        }
	    } else {
	        scrollSpeed = parseFloat(scrollSpeed || "0");
	    }

	    if (this.hasAttributes(element, ['data-onscroll-auto'])) {
	        const triggerElement = this.getTrigger(element);
	        const autoDistance = Math.abs(triggerElement.offsetHeight - element.offsetHeight);
	        return this.hasAttributes(element, ['data-onscroll-reverse']) ? -autoDistance : autoDistance;
	    } else if (this.hasAttributes(element, ['data-onscroll-speed'])) {
	        const elementHeight = element.offsetHeight;
	        const scrollDistance = scrollSpeed * elementHeight + additionalDistance;
	        return this.hasAttributes(element, ['data-onscroll-reverse']) ? -scrollDistance : scrollDistance;
	    } else if (distance !== null) {
	        return this.hasAttributes(element, ['data-onscroll-reverse']) ? -distance : distance;
	    }
	}

	// Get the delay value which controls the scrub setting
	getScrub(element) {
		if (this.hasAttributes(element, ['data-onscroll-delay'])) {
			return parseInt(element.dataset.onscrollDelay);
		} else {
			return true;  // Default scrub value if no 'data-onscroll-delay' attribute is present
		}
	}

	// Get the start value for ScrollTrigger animation
	getStart(element) {
		return element.dataset.onscrollStart ? element.dataset.onscrollStart : 'top bottom'
	}

	// Get the end value for ScrollTrigger animation
	getEnd(element) {

		if (this.hasAttributes(element, ['data-onscroll-speed']) && !element.hasAttribute('data-onscroll-end')) {
		    const scrollDistance = this.getDistanceOrSpeed(element);
		    const { distance } = this.getOffsetAndDistance(element);
		    
		    return `bottom${scrollDistance >= 0 ? '+=' : '-='}${Math.abs(scrollDistance)} top`;

		} else {
			return element.dataset.onscrollEnd ? element.dataset.onscrollEnd : 'bottom top';
		}

	}

	// Enable debug mode for logging
	debugMode(element, index) {
		if (this.hasAttributes(element, ['data-onscroll-debug'])) {
        	const { offset, distance } = this.getOffsetAndDistance(element);
			console.group(`OnscrollDetection() debug instance (#${index + 1})`)
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
				speed: this.hasAttributes(element, ['data-onscroll-speed'])
					? element.dataset.onscrollSpeed +
					  ' calculated at ' +
					  (1 - parseFloat(element.dataset.onscrollSpeed)) *
							(ScrollTrigger.maxScroll(window) - (this.scrollTrigger ? this.scrollTrigger.start : 0))
					: null,
				direction: this.hasAttributes(element, ['data-onscroll-direction'])
					? element.dataset.onscrollDirection
					: 'y',
				reverse: this.hasAttributes(element, ['data-onscroll-reverse']),
				animateFrom: this.getAnimateFrom(element),
				animateTo: this.getAnimateTo(element),
			})
			console.groupEnd()
		}
	}

	// Refresh ScrollTrigger instances
	refresh() {
		ScrollTrigger.refresh()
	}

	// Restart the animations and reinitialize the ScrollTrigger instances
	restart() {
		// Stop the current animations and remove ScrollTriggers
		this.stop()

		// Kill all existing ScrollTrigger instances
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

		// Refresh ScrollTrigger
		ScrollTrigger.refresh()

		// Reapply animations and initialize ScrollTrigger
		this.init()
	}

	// Stop animations and ScrollTriggers
	stop(target = null) {
		if (target) {
			// Stop animation and remove the ScrollTrigger for a specific target
			const animationData = this.triggers.get(target)
			if (animationData) {
				animationData.gsapAnimation.kill()
				this.triggers.delete(target)
			}
		} else {
			// Stop all animations and clear the ScrollTrigger instances
			this.triggers.forEach(({ gsapAnimation }) => {
				gsapAnimation.kill()
			})
			this.triggers.clear()
		}
	}

	// Update animation for a specific target with new fromProperties and toProperties
	update(target, fromProperties, toProperties) {
		const animationData = this.triggers.get(target)

		if (animationData) {
			// Stop the existing animation
			animationData.gsapAnimation.kill()

			// Reinitialize the animation with updated properties
			const gsapAnimation = gsap.fromTo(animationData.element, fromProperties, toProperties)
			this.triggers.set(gsapAnimation.scrollTrigger, {
				...animationData,
				fromProperties,
				toProperties,
				gsapAnimation,
			})
		}
	}

	// Destroy the OnscrollDetection instance
	destroy() {
		// Stop all animations and clear the ScrollTrigger instances
		this.stop()
		this.triggers = null
	}
}