<h1 align="center">OnscrollDetection.js</h1>

A powerful javascript library to create parallax animations based on scroll detection. Powered by GSAP.

## TO-DO
 - [Feature] Allow an element to be sticky/fixed to another element.
 - [Feature] Custom Events: Bind custom events that are triggered at various points in the animation process.
 - [Feature] Callback Functions: Call custom functions on specific triggers, for instance when the animation starts, completes, or when it loops. Pass data
 - [Feature] JS Apply: Instantiate specific elements via JS by passing objects and arguments, like inview.apply(parent,{})
 - [Feature] Create a `data-onscroll-preset` option not to be used in conjunction with start/end. It should automatically adjust the start/end values based on the offset.

 - [Test] Test scroll speed combined with x/xy direction
 - [Test] Test compatibility with SmoothScroller and native (alternative to Lenis)
 - [Docs] Add code examples of every attribute, with a description
 - [Docs] Add explanation as to what it is (streamlined animations via DOM) and what it is not (not replacing GSAP / JS animations)
 - [Consideration] Option to disable repeat (set `once: true`)

## Features
 - Bind animation to any trigger element
 - Vertical/horizontal directions with reverse
 - Specific px value, control from and to, modify scroll speed, or automatically calculate parallax based on parent
 - Custom animations (rotate, skew, colours and more)
 - Target specific screen sizes
 - Debugging mode
 - Lightweight before dependencies (~1.81Kb gzipped)

## Dependencies
The following <u>must</u> be instantiated before:
 - GSAP v3 (https://greensock.com/gsap/)
 - GSAP ScrollTrigger (https://greensock.com/scrolltrigger/)

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
	gsap.registerPlugin(ScrollTrigger);

	// Initialise OnscrollDetection
	const onscroll = new OnscrollDetection(/*options*/);
</script>
```

#### Install NPM module
```js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OnscrollDetection from './path-to/OnscrollDetection';

// Register GSAP
gsap.registerPlugin(ScrollTrigger);

// Initialise OnscrollDetection
const onscroll = new OnscrollDetection(/*options*/);
```

## Defaults

You can configure OnscrollDetection.js via options:

```js
const onscroll = new OnscrollDetection({
	elements: '[data-onscroll]',
	screen: '(min-width: 1025px)'
});
```

| Name | Type | Description |
| :--- | :---: | :--- |
| `elements` | `string` | Trigger elements, defaults to `data-onscroll` |
| `screen` | `string` | Set media query conditions via matchMedia to target specific screen sizes (defaults to `'(min-width: 1025px)'`) |

## Instructions

| Name | Type | Description |
| :--- | :---: | :--- |
| `data-onscroll` | | Apply attribute to trigger elements to animate on scroll |

### Usage

Apply any of the following to `[data-onscroll]` element to apply custom settings:

| Name | Type | Description |
| :--- | :---: | :--- |
| `data-onscroll-debug` | | Enables debug mode (enables GSAP markers and outputs helpful console information) |
| `data-onscroll-auto` | | Automatically apply offset/distance if element exceeds the height of the parent container |
| `data-onscroll-offset` | `number/string` | Expects two values, like `[0,0]`. The first is a before animation offset and the second is an after animation offset. They can integers for px value or `%`. Percentages are based on the element height. |
| `data-onscroll-distance` | `number/string` | Distance moved in pixel value. Set to `0` to reset any offset applied by `data-onscroll-offset`. You can use a single integer, or string with `px` or `%` |
| `data-onscroll-delay` | `number` | Add "lag" so the element has to catch up with scroll, for example `5`. No lag is applied by default. |
| `data-onscroll-speed` | `string` | Expects two values, like `[1,0]`. Multiply the height of the element to determine a scroll speed and then add the percentage of the viewport. Note, `data-onscroll-speed="1,0"` would be the same as writing `data-onscroll-offset="0,100%"` |
| `data-onscroll-reverse` | | Combine with offset/distance to scroll upward instead of down (no effect on speed) |
| `data-onscroll-direction` | `string` | Animate vertically (`y`), horizontally (`x`), or both (`xy`) (defaults to 'y') |
| `data-onscroll-trigger` | `string` | Attach ScrollTrigger to another DOM element |
| `data-onscroll-start` | `string` | When animation begins (defaults to 'top bottom') |
| `data-onscroll-end` | `string` | When animation ends (defaults to 'bottom top'). You can use `window.innerHeight` to get the viewport height. |
| `data-onscroll-screen` | `string` | Add media query conditions, such as `(min-width: 500px)` or `(max-width: 1000px)` etc. Use 'all' for every size. |
| `data-onscroll-from` | `json` | Custom gsap.from() properties. add JSON format to `data-onscroll-from` attribute, i.e. {"backgroundColor": "#fff", "rotation": "0"} |
| `data-onscroll-to` | `json` | Custom gsap.to() properties. add JSON format to `data-onscroll-to` attribute, i.e. {"backgroundColor": "red", "rotation": "5"} |

### Methods

#### Refresh

Update ScrollTrigger calculations.

```js
onscroll.refresh();
```

#### Stop

Stop animations where they are. Not advised as this may have negative impact on performance.

```js
/* Stop all animations */
onscroll.stop();

/* Stop specific animation */
const specificScrollTrigger = onscroll.scrollTriggers[0]; // Replace this with the actual ScrollTrigger instance you want to remove
onscroll.stop(specificScrollTrigger); // This will remove only the specified ScrollTrigger animation
```

#### Restart

Stop and restart all animations.

```js
onscroll.restart();
```

## Examples of use

- [Code Resolution](https://coderesolution.com/): Digital agency partner.

## License

[The MIT License (MIT)](LICENSE)