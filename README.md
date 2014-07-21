# highligh-area.js

This is a small Javascript module to highlight a specific area on a div.

Once initialized, a semi-transparent ```<div>``` is created on top of the target element and a fully-transparent white circle is repositioned according to the position of the mouse or a certain html element.

#### Usage
Use ```createWallFor``` method passing the target ```<div>``` on top of which the semi-transparent wall will be added as the argument. See below for the available methods to invoke on the return value.

#### Available methods
* __highlight__: highlights the element passed as the argument.
* __highlightWithTransition__: highlights the element passed as the argument. animates from the original location to the new location.
* __trackMouse__: draws the highlight circle around the location of the mouse. 
* __stopMouseTracking__: stops tracking the mouse.
* __close__: clears the semi-transparent ```<div>```

#### Sample Code
```javascript
var btnPrev = document.getElementById('btnPrev');
var btnNext = document.getElementById('btnNext');
var wall = createWallFor("#main");
var numElements = 7, currentElement = 0;

wall.highlight("#el0");

btnPrev.addEventListener('click', function() {
    currentElement = (--currentElement + numElements) % numElements;
    wall.highlight("#el" + currentElement);
});

btnNext.addEventListener('click', function() {
    currentElement = (++currentElement % numElements);
    wall.highlightWithTransition("#el" + currentElement);
});
```

#### See also
Live examples are available [here](https://artsince.github.io/highlight-area/index.html) and [here](https://artsince.github.io/highlight-area/highlight-tracking.html).

Also checkout my other [repository](https://github.com/artsince/select-area.js) for selecting regions with the mouse.
