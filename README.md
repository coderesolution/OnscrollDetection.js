<h1 align="center">OnscrollDetection.js</h1>

A powerful javascript library to create parallax animations based on scroll detection. Powered by GSAP.

## TO-DO

-   [Feature] Custom Events: Bind custom events that are triggered at various points in the animation process.
-   [Feature] Callback Functions: Call custom functions on specific triggers, for instance when the animation starts, completes, or when it loops. Pass data
-   [Feature] JS Apply: Instantiate specific elements via JS by passing objects and arguments, like inview.apply(parent,{})
-   [Feature] Create a `data-onscroll-preset` option not to be used in conjunction with start/end. It should automatically adjust the start/end values based on the offset. Note, currently doing this automatically on speed attributes.

-   [Test] Test compatibility with SmoothScroller and native (alternative to Lenis)
-   [Docs] Add code examples of every attribute, with a description
-   [Docs] Add explanation as to what it is (streamlined animations via DOM) and what it is not (not replacing GSAP / JS animations)
-   [Consideration] Option to disable repeat (set `once: true`)

## Features

-   Bind animation to any trigger element
-   Classes
-	Event callbacks
-   Vertical/horizontal directions with reverse
-   Specific px value, control from and to, modify scroll speed, or automatically calculate parallax based on parent
-   Custom animations (rotate, skew, colours and more)
-   Target specific screen sizes
-   Debugging mode
-   Lightweight before dependencies (~2.19Kb gzipped)

## Dependencies

The following <u>must</u> be instantiated before:

-   GSAP v3 (https://greensock.com/gsap/)
-   GSAP ScrollTrigger (https://greensock.com/scrolltrigger/)

## Quick start

### Installation

OnscrollDetection.js requires the GSAP library, as well as ScrollTrigger to work. You need to include all of them before OnscrollDetection.js.

#### Boilerplate

We have already included the file in our [Boilerplate](https://github.com/coderesolution/boilerplate).

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
| `data-onscroll-offset`    | `number/string` | Expects two values, like `[0,0]`. The first is a before animation offset and the second is an after animation offset. They can integers for px value or `%`. Percentages are based on the element height. Can be used to add top/bottom padding when used in conjuction with the sticky attribute. |
| `data-onscroll-distance`  | `number/string` | Distance moved in pixel value. Set to `0` to reset any offset applied by `data-onscroll-offset`. You can use a single integer, or string with `px` or `%`                                                                                                                                          |
| `data-onscroll-delay`     |    `number`     | Add "lag" so the element has to catch up with scroll, for example `5`. No lag is applied by default.                                                                                                                                                                                               |
| `data-onscroll-speed`     |    `string`     | Expects two values, like `[1,0]`. Multiply the height of the element to determine a scroll speed and then add the percentage of the viewport. Note, `data-onscroll-speed="1,0"` would be the same as writing `data-onscroll-offset="0,100%"`                                                       |
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

### Methods

#### Element enters viewport

```js
onscroll.on('enter', (element) => {
	console.log('Entering view:', element)
})
```

#### Element leaves viewport

```js
onscroll.on('leave', (element) => {
	console.log('Leaving view:', element)
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

## Examples of use

-   [Code Resolution](https://coderesolution.com/): Digital agency partner.

## License

[The MIT License (MIT)](LICENSE)
