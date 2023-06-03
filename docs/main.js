/* Lib */
import OnscrollDetection from '../src/index';

/* Demo CSS */
import './index.css'

/* Register GSAP and plugins */
gsap.registerPlugin( ScrollTrigger );

/* Lenis smooth scroll */
const lenis = new Lenis()
//lenis.on('scroll', (e) => { console.log(e) })

function raf(time) {
	lenis.raf(time)
	requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

/* Initialise OnscrollDetection.js */
const onscroll = new OnscrollDetection();

// setTimeout( () => {
//
// 	alert('restart!')
// 	onscroll.restart()
//
// }, 2000 );