/* Lib */
import OnscrollDetection from '../src/index'

/* Demo CSS */
import './index.css'

/* Register GSAP and plugins */
gsap.registerPlugin(ScrollTrigger)

/* Lenis smooth scroll */
const lenis = new Lenis()
//lenis.on('scroll', (e) => { console.log(e) })

function raf(time) {
	lenis.raf(time)
	requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

/* Initialise OnscrollDetection.js */
const onscroll = new OnscrollDetection({
	classDefaults: {
		scrollingClass: 'custom-scrolling',
		scrolledClass: 'custom-scrolled',
		stickyClass: 'custom-sticky',
		stuckClass: 'custom-stuck',
	},
})

/* Buttons */
const oButtons = document.querySelectorAll('.js-button')

const elementToStop = document.querySelector("#myElement");
const triggerToStop = onscroll.fetch(elementToStop);

oButtons.forEach((oButton) => {
	oButton.addEventListener('click', (e) => {
		e.preventDefault()

		switch (oButton.dataset.method) {
			case 'refresh':
				onscroll.refresh()
				break

			case 'stop':
				onscroll.stop(triggerToStop)
				break

			case 'restart':
				onscroll.restart()
				break

			default:
				console.log('No method')
		}
	})
})

/* Event listeners */
// onscroll.on('enter', (element) => {
// 	console.log('Entering view:', element)
// })
// onscroll.on('leave', (element) => {
// 	console.log('Leaving view:', element)
// })
onscroll.on('refresh', () => {
	console.log('Refreshed')
})
onscroll.on('restart', () => {
	console.log('Restarted')
})
onscroll.on('stop', (target) => {
	console.log('Stopped', target)
})
