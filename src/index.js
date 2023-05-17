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
		return element.hasAttribute('data-onscroll-auto') ? element.parentElement : element
	}

	// Get the screen media query
	getScreen(element) {
		return element.hasAttribute('data-onscroll-screen') ? element.dataset.onscrollScreen : this.screen
	}

	// Get the animation properties for 'from' state
	getFromProperties(element, index) {
		const animateFrom = this.getAnimateFrom(element)
		const offset = this.getOffset(element)

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
		const animateTo = this.getAnimateTo(element)

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
				scrub: this.getScrub(element), // Use the getScrub function here
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
		if (element.hasAttribute('data-onscroll-offset')) {
			const offsetValue = element.dataset.onscrollOffset;
			if (offsetValue.endsWith('%')) {
				// Assuming the offset is relative to the height of the element
				const percentage = parseInt(offsetValue.slice(0, -1));
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

	// Get the distance or speed value for ScrollTrigger animation
	getDistanceOrSpeed(element) {
		if (this.hasAttributes(element, ['data-onscroll-speed'])) {
			return (
				(1 - parseFloat(element.dataset.onscrollSpeed)) *
				(ScrollTrigger.maxScroll(window) - (this.scrollTrigger ? this.scrollTrigger.start : 0))
			)
		} else {
			if (element.hasAttribute('data-onscroll-distance')) {
				const distanceValue = element.dataset.onscrollDistance;
				let distance;
				if (distanceValue.endsWith('%')) {
					// Assuming the distance is relative to the height of the element
					const percentage = parseInt(distanceValue.slice(0, -1));
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

	// Get the delay value which controls the scrub setting
	getScrub(element) {
		if (element.hasAttribute('data-onscroll-delay')) {
			let delayValue = element.dataset.onscrollDelay;
			// Assuming the delayValue can be either an integer or a boolean
			if (delayValue === 'true') {
				return true;
			} else if (delayValue === 'false') {
				return false;
			} else {
				// Assuming the delayValue is an integer.
				// Parse it to int and return.
				return parseInt(delayValue);
			}
		} else {
			return true;  // Default scrub value if no 'data-onscroll-delay' attribute is present
		}
	}

	// Get the start value for ScrollTrigger animation
	getStart(element) {
		if (element.hasAttribute('data-onscroll-start')) {
			return element.dataset.onscrollStart;
		} else {
			const offset = this.getOffset(element);
			const reverse = this.hasAttributes(element, ['data-onscroll-reverse']);

			// If reverse is true, deduct the offset, otherwise add it
			const adjustedOffset = reverse ? -offset : offset;

			// Assuming the default start is 'top bottom'
			// We'll add the offset to both 'top' and 'bottom' values
			const [top, bottom] = ['top', 'bottom'].map(value => `${value}+=${adjustedOffset}`);
			return `${top} ${bottom}`;
		}
	}

	// Get the end value for ScrollTrigger animation
	getEnd(element) {
		if (element.hasAttribute('data-onscroll-end')) {
			return element.dataset.onscrollEnd;
		} else {
			const offset = this.getOffset(element);
			const reverse = this.hasAttributes(element, ['data-onscroll-reverse']);

			// If reverse is true, add the offset, otherwise deduct it
			const adjustedOffset = reverse ? offset : -offset;

			// Assuming the default end is 'bottom top'
			// We'll add the offset to both 'bottom' and 'top' values
			const [bottom, top] = ['bottom', 'top'].map(value => `${value}+=${adjustedOffset}`);
			return `${bottom} ${top}`;
		}
	}

	// Enable debug mode for logging
	debugMode(element, index) {
		if (this.hasAttributes(element, ['data-onscroll-debug'])) {
			console.group(`OnscrollDetection() debug instance (${index + 1})`)
			console.log({
				element: element,
				trigger: this.getTrigger(element),
				triggerStart: this.getStart(element),
				triggerEnd: this.getEnd(element),
				auto: this.hasAttributes(element, ['data-onscroll-auto']),
				offset: this.getOffset(element),
				distance: this.getDistanceOrSpeed(element),
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
