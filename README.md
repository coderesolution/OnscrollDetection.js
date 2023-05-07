<h1 align="center">OnscrollDetection.js</h1>

A powerful javascript library to create parallax animations based on scroll detection. Powered by GSAP.

## Features
 - Bind animation to any trigger element
 - Vertical/horizontal directions with reverse
 - Specific px value, control from and to, modify scroll speed, or automatically calculate parallax based on parent
 - Custom animations (rotate, skew, colours and more)
 - Debugging mode
 - 4kb in size

## Dependencies
The following <u>must</u> be instantiated before:
 - GSAP v3 (https://greensock.com/gsap/)
 - GSAP ScrollTrigger (https://greensock.com/scrolltrigger/)

## Quick start

### Install from NPM

We have currently documented use exclusively by CDN or via our [Boilerplate](https://github.com/coderesolution/boilerplate):

```html
<script src="https://cdn.jsdelivr.net/gh/coderesolution/OnscrollDetection.js@v0.0.1/dist/OnscrollDetection.umd.js"></script>
```

OnscrollDetection.js requires the GSAP library to work. You need to import it before OnscrollDetection.js.
Afterwards, instantiate OnscrollDetection.js with the following:

```js
const onscroll = new OnscrollDetection(/*options*/);
```

## Defaults

You can configure OnscrollDetection.js via options:

```js
const onscroll = new OnscrollDetection({
	elements: '[data-onscroll]'
});
```

| Name | Type | Description |
| :--- | :---: | :--- |
| `elements` | `string` | Trigger elements, defaults to `data-onscroll` |

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
| `data-onscroll-offset` | `number` | Apply on load offset by pixel value |
| `data-onscroll-distance` | `number` | Distance moved in pixel value |
| `data-onscroll-speed` | `number` | Adjust the scroll speed, use only free-flowing elements (defaults to 1, lower the number the slower) |
| `data-onscroll-reverse` | | Combine with offset/distance to scroll upward instead of down (no effect on speed) |
| `data-onscroll-direction` | `string` | Animate vertically (`y`), horizontally (`x`), or both (`xy`) (defaults to 'y') |
| `data-onscroll-trigger` | `string` | Attach ScrollTrigger to another DOM element |
| `data-onscroll-start` | `string` | When animation begins (defaults to 'top bottom') |
| `data-onscroll-end` | `string` | When animation ends (defaults to 'bottom top') |
| `data-onscroll-from` | `json` | Custom gsap.from() properties. add JSON format to `data-onscroll-from` attribute, i.e. {"backgroundColor": "#fff", "rotation": "0"} |
| `data-onscroll-to` | `json` | Custom gsap.to() properties. add JSON format to `data-onscroll-to` attribute, i.e. {"backgroundColor": "red", "rotation": "5"} |

## Examples of use

- [Code Resolution](https://coderesolution.com/): Digital agency partner.

## License

[The MIT License (MIT)](LICENSE)