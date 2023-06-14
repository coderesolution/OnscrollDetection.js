# OnscrollDetection.js

OnscrollDetection.js is a powerful JavaScript library that provides robust features to create parallax animations based on scroll detection. Powered by GSAP, it offers various customizable options for creating dynamic and interactive user experiences.

## Features

- Bind animations to any trigger element.
- Manipulate classes based on scroll events.
- Trigger callbacks on specific events.
- Supports both vertical and horizontal directions with the ability to reverse.
- Control animation through specific px values, from and to attributes, modify scroll speed, or automatically calculate parallax based on parent.
- Create custom animations such as rotation, skewing, color changes, and more.
- Target specific screen sizes for adaptive animations.
- Built-in debugging mode.
- Lightweight, even with dependencies (~2.19Kb gzipped).

## Dependencies

Please ensure the following dependencies are installed and properly configured:

- [GSAP v3](https://greensock.com/gsap/)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)

## Quick start

### Installation

OnscrollDetection.js requires the GSAP library and ScrollTrigger for operation. Make sure to include them before OnscrollDetection.js.

#### Boilerplate

Our [Boilerplate](https://github.com/coderesolution/boilerplate) includes the OnscrollDetection.js file.

#### Use from CDN

```html
<!-- Include GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js"></script>

<!-- Include OnscrollDetection -->
<script src="https://cdn.jsdelivr.net/gh/coderesolution/OnscrollDetection.js/bundled/OnscrollDetection.min.js"></script>

<script>
	// Register GSAP
	gsap.registerPlugin(ScrollTrigger)

	// Initialise OnscrollDetection
	const onscroll = new OnscrollDetection(/*options*/)
</script>
```

#### Install NPM module

```js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import OnscrollDetection from './path-to/OnscrollDetection'

// Register GSAP
gsap.registerPlugin(ScrollTrigger)

// Initialise OnscrollDetection
const onscroll = new OnscrollDetection(/*options*/)
```

## Defaults

You can configure OnscrollDetection.js via options:

```js
const onscroll = new OnscrollDetection({
	elements: '[data-onscroll]',
	screen: '(min-width: 1025px)',
})
```

| Name       |   Type   | Description                                                                                                     |
| :--------- | :------: | :-------------------------------------------------------------------------------------------------------------- |
| `elements` | `string` | Trigger elements, defaults to `data-onscroll`                                                                   |
| `screen`   | `string` | Set media query conditions via matchMedia to target specific screen sizes (defaults to `'(min-width: 1025px)'`) |

## Instructions

| Name            | Type | Description                                              |
| :-------------- | :--: | :------------------------------------------------------- |
| `data-onscroll` |      | Apply attribute to trigger elements to animate on scroll |

### Usage

Apply any of the following to `[data-onscroll]` element to apply custom settings:

| Name                      |      Type       | Description                                                                                                                                                                                                                                                                                        |
| :------------------------ | :-------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-onscroll-debug`     |                 | Enables debug mode (enables GSAP markers and outputs helpful console information)                                                                                                                                                                                                                  |
| `data-onscroll-auto`      |                 | Automatically apply offset/distance if element exceeds the height of the parent container                                                                                                                                                                                                          |
| `data-onscroll-offset`    | `number/string` | Expects two values, like `0,0`. The first is a before animation offset and the second is an after animation offset. They can integers for px value or `%`. Percentages are based on the element height. Can be used to add top/bottom padding when used in conjuction with the sticky attribute. |
| `data-onscroll-delay`     |    `number`     | Add "lag" so the element has to catch up with scroll, for example `5`. No lag is applied by default.                                                                                                                                                                                               |
| `data-onscroll-speed`     |    `string`     | Expects two values, like `1,0`. Multiply the height of the element to determine a scroll speed and then add the percentage of the viewport. Note, `data-onscroll-speed="1,0"` would be the same as writing `data-onscroll-offset="0,100%"`                                                       |
| `data-onscroll-reverse`   |                 | Combine with offset/distance to scroll upward instead of down (no effect on speed)                                                                                                                                                                                                                 |
| `data-onscroll-direction` |    `string`     | Animate vertically (`y`), horizontally (`x`), or both (`xy`) (defaults to 'y')                                                                                                                                                                                                                     |
| `data-onscroll-trigger`   |    `string`     | Attach ScrollTrigger to another DOM element                                                                                                                                                                                                                                                        |
| `data-onscroll-sticky`    |                 | When applied, the element will stick to the trigger. The offset attribute is then used to apply top/bottom padding.                                                                                                                                                                                |
| `data-onscroll-start`     |    `string`     | When animation begins (defaults to 'top bottom')                                                                                                                                                                                                                                                   |
| `data-onscroll-end`       |    `string`     | When animation ends (defaults to 'bottom top'). You can use `window.innerHeight` to get the viewport height.                                                                                                                                                                                       |
| `data-onscroll-screen`    |    `string`     | Add media query conditions, such as `(min-width: 500px)` or `(max-width: 1000px)` etc. Use 'all' for every size.                                                                                                                                                                                   |
| `data-onscroll-from`      |     `json`      | Custom gsap.from() properties. add JSON format to `data-onscroll-from` attribute, i.e. {"backgroundColor": "#fff", "rotation": "0"}                                                                                                                                                                |
| `data-onscroll-to`        |     `json`      | Custom gsap.to() properties. add JSON format to `data-onscroll-to` attribute, i.e. {"backgroundColor": "red", "rotation": "5"}                                                                                                                                                                     |

### Methods

#### Refresh

Update ScrollTrigger calculations.

```js
onscroll.refresh()
```

#### Fetch

Return the ScrollTrigger instance based on a particular DOM element.

```js
// Fetch by DOM element
const element = document.querySelector("#myElement"); // change #myElement to appropriate element
const trigger = onscroll.fetch(element);
onscroll.fetch(element)

// Fetch by index
const trigger = onscroll.fetch(0); // change 0 with the element index
onscroll.fetch(trigger)
```


#### Stop

This function stops all ongoing animations and removes ScrollTrigger instances. If a specific target is passed, it will only stop the animation and remove the ScrollTrigger for that target.

```js
/* Stop all animations */
onscroll.stop()

/* Stop a specific animation */
onscroll.stop(trigger) // Use onscroll.fetch() to get a trigger
```

#### Restart

Stop and restart animations.

```js
onscroll.restart()
```

### Classes

-   'is-scrolling' is applied to every element temporarily when it is in view.
-   'has-scrolled' is applied to every element permanently when it has been in view.
-   'is-sticky' is applied to every sticky element ([data-onscroll-sticky]) temporarily when it is in view.
-   'has-stuck' is applied to every sticky element ([data-onscroll-sticky]) permanently when it has been in view.

These can be overwritten if desired, like so:

```js
/* Initialise OnscrollDetection with custom classes */
const onscroll = new OnscrollDetection({
	classDefaults: {
		scrollingClass: 'custom-scrolling', // defaults to 'is-scrolling'
		scrolledClass: 'custom-scrolled', // defaults to 'has-scrolled'
		stickyClass: 'custom-sticky', // defaults to 'has-sticky'
		stuckClass: 'custom-stuck', // defaults to 'has-stuck'
	},
})
```

### Events

#### Element enter/leave the viewport

```js
onscroll.on('onEnter', (element) => {
	console.log('Entering top of view:', element)
})
onscroll.on('onLeave', (element) => {
	console.log('Leaving bottom of view:', element)
})
onscroll.on('onEnterBack', (element) => {
	console.log('Entering bottom of view:', element)
})
onscroll.on('onLeaveBack', (element) => {
	console.log('Leaving top of view:', element)
})
```

#### Refresh

```js
onscroll.on('refresh', () => {
	console.log('Refreshed')
})
```

#### Stop

```js
onscroll.on('stop', (target) => {
	console.log('Stopped', target)
})
```

#### Restart

```js
onscroll.on('restart', () => {
	console.log('Restarted')
})
```

### Custom Callbacks

Fire custom events when elements enter or leave the viewport.

```html
<div data-onscroll data-onscroll-call="scrollEvent">Trigger</div>
```

```js
window.addEventListener('scrollEvent', (e) => {
	const { target, direction, when } = e.detail;
	console.log(`target: ${target}`, `direction: ${direction}`, `when: ${when}`);
});
```

## Examples of use

-   [Code Resolution](https://coderesolution.com/): Digital agency partner.

## License

[The MIT License (MIT)](LICENSE)
