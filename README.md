
### Slider

A simple mouse and touch based slider built with `javascript`. 

##### Usage

A parent container element's id is fed into a `buildSlider` function and all children of the parent container are automatically converted into slides.
Page indicators are automatically added below the parent container. 

```html
<div id='viewport'></div>
<script src='slider.js'></script?>
```
```javascript
  buildSlider('viewport')
```

##### Features

When a slide moves past 10% of its width it will automatically move to the next slide depending on the direction it was moved. 
The slide will snap or "spring" back to it's center most point when it has been released. The movement is calculated using [Hooke's Law](https://en.wikipedia.org/wiki/Hooke%27s_law)
for spring forces.
