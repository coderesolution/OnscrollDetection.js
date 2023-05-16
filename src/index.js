export default class OnscrollDetection {
	constructor(options = {}) {
		this.elements = options.elements || '[data-onscroll]'
		this.screen = options.screen || '(min-width: 768px)'
		this.scrollTriggers = new Map()

		this.init()
	}

	init() {
		gsap.utils.toArray(this.elements).forEach((element, index) => {
			const trigger = this.getTrigger(element)
			const screen = this.getScreen(element)
			const matchMedia = gsap.matchMedia()

			const fromProperties = this.getFromProperties(element, index)
			const toProperties = this.getToProperties(element, index, trigger)

			const animation = matchMedia.add(screen, () => {
				const gsapAnimation = gsap.fromTo(element, fromProperties, toProperties)
				this.scrollTriggers.set(gsapAnimation.scrollTrigger, {
					element,
					fromProperties,
					toProperties,
					gsapAnimation,
				})
			})

			this.debugMode(element, index)
		})
	}

	// Helper methods
	getTrigger(element) {
		return element.hasAttribute('data-onscroll-auto') ? element.parentElement : element
	}

	getScreen(element) {
		return element.hasAttribute('data-onscroll-screen') ? element.dataset.onscrollScreen : this.screen
	}

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
				scrub: true,
				markers: this.hasAttributes(element, ['data-onscroll-debug']),
			},
		}
	}

	hasAttributes(element, attrs) {
		return attrs.every((attr) => element.hasAttribute(attr))
	}

	getAnimateFrom(element) {
		return element.hasAttribute('data-onscroll-from') ? JSON.parse(element.dataset.onscrollFrom) : []
	}

	getAnimateTo(element) {
		return element.hasAttribute('data-onscroll-to') ? JSON.parse(element.dataset.onscrollTo) : []
	}

	getOffset(element) {
		return element.hasAttribute('data-onscroll-offset') ? parseInt(element.dataset.onscrollOffset) : null
	}

	getDirection(element) {
		return element.dataset.onscrollDirection
	}

	getX(element) {
		if (
			this.hasAttributes(element, ['data-onscroll-direction']) &&
			(this.getDirection(element) === 'x' || this.getDirection(element) === 'xy')
		) {
			return this.getDistanceOrSpeed(element)
		}
	}

	getY(element) {
		if (
			!this.hasAttributes(element, ['data-onscroll-direction']) ||
			(this.hasAttributes(element, ['data-onscroll-direction']) &&
				(this.getDirection(element) === 'y' || this.getDirection(element) === 'xy'))
		) {
			return this.getDistanceOrSpeed(element)
		}
	}

	getDistanceOrSpeed(element) {
		if (this.hasAttributes(element, ['data-onscroll-speed'])) {
			return (
				(1 - parseFloat(element.dataset.onscrollSpeed)) *
				(ScrollTrigger.maxScroll(window) - (this.scrollTrigger ? this.scrollTrigger.start : 0))
			)
		} else {
			let distance = parseInt(element.dataset.onscrollDistance)
			if (this.hasAttributes(element, ['data-onscroll-auto'])) {
				distance = element.offsetHeight - element.parentElement.offsetHeight
			}
			if (this.hasAttributes(element, ['data-onscroll-reverse'])) {
				return -distance
			}
			return distance
		}
	}

	getStart(element) {
		return element.dataset.onscrollStart ? element.dataset.onscrollStart : 'top bottom'
	}

	getEnd(element) {
		return element.dataset.onscrollEnd ? element.dataset.onscrollEnd : 'bottom top'
	}

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

	refresh() {
		ScrollTrigger.refresh()
	}

	restart() {
		// Remove existing ScrollTriggers
		this.stop()

		// Reinitialize the ScrollTrigger instances
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

		// Refresh ScrollTrigger
		ScrollTrigger.refresh()

		// Reapply animations using the stored animation properties
		this.init()
	}

	stop(target = null) {
		if (target) {
			const animationData = this.scrollTriggers.get(target)
			if (animationData) {
				animationData.gsapAnimation.kill()
				this.scrollTriggers.delete(target)
			}
		} else {
			this.scrollTriggers.forEach(({ gsapAnimation }) => {
				gsapAnimation.kill()
			})
			this.scrollTriggers.clear() // Clear the ScrollTrigger instances map
		}
	}

	update(target, fromProperties, toProperties) {
		const animationData = this.scrollTriggers.get(target)

		if (animationData) {
			animationData.gsapAnimation.kill()

			// Reinitialize the animation
			const gsapAnimation = gsap.fromTo(animationData.element, fromProperties, toProperties)
			this.scrollTriggers.set(gsapAnimation.scrollTrigger, {
				...animationData,
				fromProperties,
				toProperties,
				gsapAnimation,
			})
		}
	}

	destroy() {
		this.stop()
		this.scrollTriggers = null
	}
}
