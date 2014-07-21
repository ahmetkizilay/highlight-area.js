var createWallFor = function (target) {
    target = document.querySelector(target);

    var _holeSize = 80;
    
    // create cover div covers the entire area
    var coverDiv = document.createElement('div');
    coverDiv.className += 'cover';
    target.parentElement.appendChild(coverDiv);
    
    var parentOffsetTop = target.parentElement.offsetTop;
    var parentOffsetLeft = target.parentElement.offsetLeft;

    // create the window div which will show the selection
    var holeDiv = document.createElement('div');
    holeDiv.className += "hole";
    coverDiv.appendChild(holeDiv);

    var _mouseTrackEvent = function (e) {

        holeDiv.style.left = (e.clientX - parentOffsetLeft - _holeSize) + 'px';
        holeDiv.style.top = (e.clientY - parentOffsetTop - _holeSize) + 'px';
    };

    /***
     * @param element to be highlighted - string or HTMLElement
     * @param extra padding for hole diameter - integer
     */
    var _highlight = function (element) {
        if(typeof(element) === 'string') {
            element = document.querySelector(element);
        }

        var extraHoleSize = 20;
        if(arguments.length > 1) {
            extraHoleSize = arguments[1];
        }

        var holeSize = Math.max(element.offsetWidth, element.offsetHeight) + extraHoleSize;

        holeDiv.style.top = (element.offsetTop + Math.floor(element.offsetHeight / 2) - Math.floor(holeSize / 2) + 2) + 'px';
        holeDiv.style.left = (element.offsetLeft + Math.floor(element.offsetWidth / 2) - Math.floor(holeSize / 2)) + 'px';

        holeDiv.style.width = holeSize + 'px';
        holeDiv.style.height = holeSize + 'px';

    };

    /***
     * @param element to be highlighted - string or HTMLElement
     * @param extra padding for hole diameter - integer
     */
    var _highlightWithTransition = function (element) {
        if(typeof(element) === 'string') {
            element = document.querySelector(element);
        }

        var extraHoleSize = 20;
        if(arguments.length > 1) {
            extraHoleSize = arguments[1];
        }

        var holeSize = Math.max(element.offsetWidth, element.offsetHeight) + extraHoleSize;
        var finalTop = (element.offsetTop + Math.floor(element.offsetHeight / 2) - Math.floor(holeSize / 2) + 2);
        var finalLeft = (element.offsetLeft + Math.floor(element.offsetWidth / 2) - Math.floor(holeSize / 2));

        _interpolator(holeDiv, "top", parseInt(holeDiv.style.top.substr(0, holeDiv.style.top.length - 2), 10), finalTop);
        _interpolator(holeDiv, "left", parseInt(holeDiv.style.left.substr(0, holeDiv.style.left.length - 2), 10), finalLeft);
        _interpolator(holeDiv, "width", parseInt(holeDiv.style.width.substr(0, holeDiv.style.width.length - 2), 10), holeSize);
        _interpolator(holeDiv, "height", parseInt(holeDiv.style.height.substr(0, holeDiv.style.height.length - 2), 10), holeSize);

        console.log('here');
    };

    /***
     * @param diameter of the highligted area
     */
    var _trackMouse = function () {
        if(arguments.length > 0){
            _holeSize = arguments[0];
        }

        holeDiv.style.width = (2 * _holeSize) + 'px';
        holeDiv.style.height = (2 * _holeSize) + 'px';

        coverDiv.addEventListener('mousemove', _mouseTrackEvent, true);
    };

    var _stopMouseTracking = function() {
        holeDiv.style.width = '0px';
        holeDiv.style.height = '0px';

        coverDiv.removeEventListener('mouseMove', _mouseTrackEvent);
    };

    /***
     * linear interpolator for HTMLElement style attributes.
     * to 
     *
     * @param element - HTMLElement
     * @param property to interpolate - string
     * @param initial value - number
     * @param final value - number
     * @param current step of the interpolation - number
     * @param total number of steps to complete the interpolation - number
     * @param milliseconds to wait before the next iteration
     *
     */
    var _interpolator = function (_el, _prop, _src, _dest, _curr, _total, _interval) {
        var curr = _curr !== undefined ? _curr : 0;
        var total = _total !== undefined ? _total : 10;
        var interval = _interval !== undefined ? _interval : 20;

        if(curr > total) return;

        var val = _src + Math.floor(curr * (_dest - _src) / total);
        _el.style[_prop] = val + 'px';


        setTimeout(function () {
            _interpolator(_el, _prop, _src, _dest, curr + 1, total);
        }, interval);
    };

    var _close = function () {
        coverDiv.outerHTML = '';
    };

    return {
        highlight: _highlight,
        highlightWithTransition: _highlightWithTransition,
        trackMouse: _trackMouse,
        stopMouseTracking: _stopMouseTracking,
        close: _close
    };
};