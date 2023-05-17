<h1 align="center">OnscrollDetection.js</h1>

A powerful javascript library to create parallax animations based on scroll detection. Powered by GSAP.

## Features
 - Bind animation to any trigger element
 - Vertical/horizontal directions with reverse
 - Specific px value, control from and to, modify scroll speed, or automatically calculate parallax based on parent
 - Custom animations (rotate, skew, colours and more)
 - Debugging mode
 - Lightweight (~2.4Kb gzipped)

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
	screen: '(min-width: 768px)'
});
```

| Name | Type | Description |
| :--- | :---: | :--- |
| `elements` | `string` | Trigger elements, defaults to `data-onscroll` |
| `screen` | `string` | Set media query conditions via matchMedia to target specific screen sizes (defaults to `'(min-width: 768px)'`) |

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
| `data-onscroll-offset` | `number/string` | Apply on load offset by pixel value. You can use a single integer, or string with `px` or `%`. |
| `data-onscroll-distance` | `number/string` | Distance moved in pixel value. You can use a single integer, or string with `px` or `%` |
| `data-onscroll-speed` | `number` | Adjust the scroll speed, use only free-flowing elements (defaults to 1, lower the number the slower) |
| `data-onscroll-reverse` | | Combine with offset/distance to scroll upward instead of down (no effect on speed) |
| `data-onscroll-direction` | `string` | Animate vertically (`y`), horizontally (`x`), or both (`xy`) (defaults to 'y') |
| `data-onscroll-trigger` | `string` | Attach ScrollTrigger to another DOM element |
| `data-onscroll-start` | `string` | When animation begins (defaults to 'top bottom') |
| `data-onscroll-end` | `string` | When animation ends (defaults to 'bottom top'). You can use `window.innerHeight` to get the viewport height. |
| `data-onscroll-screen` | `string` | Add media query conditions, such as `(min-width: 500px)` or `(max-width: 1000px)` etc. |
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