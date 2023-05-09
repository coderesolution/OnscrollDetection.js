export default class OnscrollDetection {
	constructor(options = {}) {
		this.elements = options.elements || '[data-onscroll]'
		this.scrollTriggers = []
		this.animationsData = [];
		this.init()
	}

	init = () => {
		/**
		 * Loop each element
		 */
		gsap.utils.toArray(this.elements).forEach((oElement, iIndex) => {
			/* Defaults */
			let oTrigger,
				iOffset = null,
				iDistance = null,
				iStart = 'top bottom',
				iBottom = 'bottom top'

			/* Assign scroll trigger to element */
			oTrigger = oElement

			/* Determine custom from->to properties */
			let aAnimateFrom = [],
				aAnimateTo = []

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
			};

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
							(oElement.dataset.onscrollDirection === 'y' ||
								oElement.dataset.onscrollDirection === 'xy'))
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
			};

			const animation = gsap.fromTo( oElement, fromProperties, toProperties )

			/* Store the ScrollTrigger instance and animation */
			this.scrollTriggers.push(animation.scrollTrigger);
			this.animationsData.push({ oElement, fromProperties, toProperties });

			/* Debug */
			if (oElement.hasAttribute('data-onscroll-debug')) {
				console.group(`OnscrollDetection() debug instance (${iIndex + 1})`)
				console.log({
					element: oElement,
					auto: oElement.hasAttribute('data-onscroll-auto') ? true : false,
					offset: iOffset,
					distance: iDistance,
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

	stop(target = null) {
		if (target) {
			const index = this.scrollTriggers.indexOf(target)
			if (index !== -1) {
				this.scrollTriggers[index].kill()
				this.scrollTriggers.splice(index, 1)
			}
		} else {
			this.scrollTriggers.forEach((st) => {
				st.kill()
			})
			this.scrollTriggers = [] // Clear the ScrollTrigger instances array
		}
	}

	restart() {
		// Remove existing ScrollTriggers
		this.stop();

		// Reapply animations using the stored animation properties
		this.animationsData.forEach(({ oElement, fromProperties, toProperties }) => {
			const animation = gsap.fromTo(oElement, fromProperties, toProperties);
			this.scrollTriggers.push(animation.scrollTrigger);
		});
	}
}
