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

/* Buttons */
// const oButtons = document.querySelectorAll( '.js-button' );

// oButtons.forEach( oButton => {

// 	oButton.addEventListener( 'click', ( e ) => {

// 		e.preventDefault()

// 		switch( oButton.dataset.method ) {
// 			case 'refresh':
// 			inview.refresh()
// 			break;

// 			case 'stop':
// 			inview.stop()
// 			break;

// 			case 'restart':
// 			inview.restart()
// 			break;

// 			default:
// 			console.log( 'No method' )

// 		}

// 	})

// });