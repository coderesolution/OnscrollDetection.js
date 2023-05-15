export default class OnscrollDetection {
	constructor(options = {}) {
		this.elements = options.elements || '[data-onscroll]'
		this.screen = options.screen || '(min-width: 768px)'
		this.scrollTriggers = []
		this.animationsData = []
		this.init()
	}

	init = () => {
		/**
		 * Loop each element
		 */
		gsap.utils.toArray(this.elements).forEach((oElement, iIndex) => {
			/* Defaults */
			let oTrigger,
				gsapAnimation = null,
				aAnimateFrom = [],
				aAnimateTo = [],
				iOffset = null,
				iDistance = null,
				iStart = 'top bottom',
				iBottom = 'bottom top',
				sScreen = this.screen,
				matchMedia = gsap.matchMedia()

			/* Assign scroll trigger to element */
			oTrigger = oElement

			/* Update media query conditions if they exist */
			if (oElement.hasAttribute('data-onscroll-screen')) {
				sScreen = oElement.dataset.onscrollScreen
			}

			/* Determine custom from->to properties */
			if (oElement.hasAttribute('data-onscroll-from')) {
				aAnimateFrom = JSON.parse(oElement.dataset.onscrollFrom)
			}

			if (oElement.hasAttribute('data-onscroll-to')) {
				aAnimateTo = JSON.parse(oElement.dataset.onscrollTo)
			}

			/* Set offset */
			if (oElement.hasAttribute('data-onscroll-offset')) {
				iOffset = parseInt(oElement.dataset.onscrollOffset)
			}

			/* Set distance */
			if (oElement.hasAttribute('data-onscroll-distance')) {
				iDistance = parseInt(oElement.dataset.onscrollDistance)
			}

			/* Get speed */
			const fnGetSpeed = () => {
				return (
					(1 - parseFloat(oElement.dataset.onscrollSpeed)) *
					(ScrollTrigger.maxScroll(window) - (this.scrollTrigger ? this.scrollTrigger.start : 0))
				)
			}

			/* Determine auto */
			if (oElement.hasAttribute('data-onscroll-auto')) {
				oTrigger = oElement.parentElement
				iDistance = oElement.offsetHeight - oElement.parentElement.offsetHeight
			}

			/* Get offset */
			function fnGetOffset() {
				if (oElement.hasAttribute('data-onscroll-reverse')) {
					return iOffset ? +iOffset : null
				} else {
					return iOffset ? -iOffset : null
				}
			}

			/* Get distance */
			function fnGetDistance() {
				if (oElement.hasAttribute('data-onscroll-auto')) {
					return oElement.hasAttribute('data-onscroll-reverse') ? -iDistance : iDistance
				} else {
					return oElement.hasAttribute('data-onscroll-reverse') ? -iDistance : iDistance
				}
			}

			/* Apply animations */
			const fromProperties = {
				...aAnimateFrom,
				bottom:
					oElement.hasAttribute('data-onscroll-auto') && oElement.hasAttribute('data-onscroll-reverse')
						? 'auto'
						: null,
				top:
					oElement.hasAttribute('data-onscroll-auto') && !oElement.hasAttribute('data-onscroll-reverse')
						? 'auto'
						: null,
				x:
					oElement.hasAttribute('data-onscroll-direction') &&
					(oElement.dataset.onscrollDirection === 'x' || oElement.dataset.onscrollDirection === 'xy')
						? fnGetOffset()
						: null,
				y:
					!oElement.hasAttribute('data-onscroll-direction') ||
					(oElement.hasAttribute('data-onscroll-direction') &&
						(oElement.dataset.onscrollDirection === 'y' || oElement.dataset.onscrollDirection === 'xy'))
						? fnGetOffset()
						: null,
			}

			const toProperties = {
				...aAnimateTo,
				x: () => {
					if (
						oElement.hasAttribute('data-onscroll-direction') &&
						(oElement.dataset.onscrollDirection === 'x' || oElement.dataset.onscrollDirection === 'xy')
					) {
						if (oElement.hasAttribute('data-onscroll-speed')) {
							return fnGetSpeed()
						} else {
							return fnGetDistance()
						}
					}
				},
				y: () => {
					if (
						!oElement.hasAttribute('data-onscroll-direction') ||
						(oElement.hasAttribute('data-onscroll-direction') &&
							(oElement.dataset.onscrollDirection === 'y' || oElement.dataset.onscrollDirection === 'xy'))
					) {
						if (oElement.hasAttribute('data-onscroll-speed')) {
							return fnGetSpeed()
						} else {
							return fnGetDistance()
						}
					}
				},
				ease: 'none',
				scrollTrigger: {
					trigger: oElement.dataset.onscrollTrigger
						? document.querySelector(oElement.dataset.onscrollTrigger)
						: oTrigger,
					start: oElement.dataset.onscrollStart ? oElement.dataset.onscrollStart : iStart,
					end: oElement.dataset.onscrollEnd ? oElement.dataset.onscrollEnd : iBottom,
					invalidateOnRefresh: true,
					scrub: true,
					markers: oElement.hasAttribute('data-onscroll-debug') ? true : false,
				},
			}

			const animation = matchMedia.add(sScreen, () => {
				gsapAnimation = gsap.fromTo(oElement, fromProperties, toProperties)

				/* Store the ScrollTrigger instance and animation */
				this.scrollTriggers.push(gsapAnimation.scrollTrigger)
				this.animationsData.push({ oElement, fromProperties, toProperties, gsapAnimation })
			})

			/* Debug mode */
			if (oElement.hasAttribute('data-onscroll-debug')) {
				console.group(`OnscrollDetection() debug instance (${iIndex + 1})`)
				console.log({
					element: oElement,
					auto: oElement.hasAttribute('data-onscroll-auto') ? true : false,
					offset: iOffset,
					distance: iDistance,
					screen: sScreen,
					speed: oElement.hasAttribute('data-onscroll-speed')
						? oElement.dataset.onscrollSpeed +
						  ' calculated at ' +
						  (1 - parseFloat(oElement.dataset.onscrollSpeed)) *
								(ScrollTrigger.maxScroll(window) - (this.scrollTrigger ? this.scrollTrigger.start : 0))
						: null,
					direction: oElement.hasAttribute('data-onscroll-direction')
						? oElement.dataset.onscrollDirection
						: 'y',
					reverse: oElement.hasAttribute('data-onscroll-reverse') ? true : false,
					trigger: oTrigger,
					triggerStart: iStart,
					triggerEnd: iBottom,
					animateFrom: oElement.hasAttribute('data-onscroll-to')
						? JSON.parse(oElement.dataset.onscrollFrom)
						: null,
					animateTo: oElement.hasAttribute('data-onscroll-to')
						? JSON.parse(oElement.dataset.onscrollTo)
						: null,
				})
				console.groupEnd()
			}
		})
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
			const index = this.scrollTriggers.indexOf(target)
			if (index !== -1) {
				this.animationsData[index].gsapAnimation.kill()
				this.scrollTriggers.splice(index, 1)
				this.animationsData.splice(index, 1)
			}
		} else {
			this.animationsData.forEach(({ gsapAnimation }) => {
				gsapAnimation.kill()
			})
			this.scrollTriggers = [] // Clear the ScrollTrigger instances array
			this.animationsData = [] // Clear the animations data array
		}
	}
}
