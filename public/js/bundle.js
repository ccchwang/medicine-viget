(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const inViewport = require('in-viewport');

//HELPER FUNCTIONS
const selectElements = function (selector) {
  let nodes = document.querySelectorAll(selector)
  return [].slice.call(nodes)
};

const triggerAnimation = function(bubble) {
  const delay = Number(bubble.dataset.delay);

  setTimeout(function(){
    bubble.className += " typing";
  }, delay)
}

const animateWhenVisible = function (card) {
  //get card's classes so it can be used as a querying string
  const cardSelector = card.className.split(" ").join(".");

  //find all chat bubbles inside card
  const chatList = selectElements(`.${cardSelector} .bubble`);

  //trigger animation for each bubble
  chatList.forEach(bubble => triggerAnimation(bubble))

  //find and animate the header icon associated with each card
  document.querySelector(`.${cardSelector} .conversation__icon`).className += " animate";
};


//FIND ALL CONVO CARDS
const convoCards = selectElements('.conversation');

//FOR EACH CARD, define inViewport callback function
convoCards.forEach(card => inViewport(card, { offset: -200 }, () => animateWhenVisible(card)))










/*
***BELOW IS MY EXPERIMENTATION WITH LODASH DEBOUNCE***

//Animating chat bubbles on conversation cards:

const getElementHeight = function (convo) {
  return (convo.offsetHeight + convo.offsetTop) / 1.03
};

//find all convo cards and map an array of their heights
const convoCards = document.getElementsByClassName('conversation');
const convoCardDimensions = [].slice.call(convoCards).map(convo => [convo, getElementHeight(convo)]);


//scroll listener w/ debounced function
window.addEventListener('scroll', _.debounce(function(){

  //find bottom of window
  const windowBottom = window.innerHeight + window.scrollY;

  //loop through convo cards and check if it has come into view
  [].slice.call(convoCardDimensions).forEach(convo => {
    const card = convo[0];
    const cardBottom = convo[1];

    if (windowBottom > cardBottom && !card.className.includes('finished')) {
      //add 'current' class to card to indicate that this is the convo card currently in motion. add 'finished' class to indicate that animation has been applied.
      card.className += " current finished";

      //find all chat bubbles inside the current convo card
      let chatList = document.querySelectorAll(`.current .bubble`);

      //for each bubble, apply animation delay as indicated by element's data-delay attribute
      [].slice.call(chatList).forEach(text => {
        text.style.animationDelay = `${text.dataset.delay}ms`;
        text.style.animationPlayState = 'running';

        //adding 'finished' class will cause bubble's spinner to hide and bubble's text to appear
        setTimeout(function(){
          text.className += " finished";
        }, `${1000 + Number(text.dataset.delay)}`)
      })

      //find and animate the header icon associated with each card
      document.querySelector(`.current .conversation__icon`).className += " animate";

      //remove 'current' class from convo card because animation was successfully triggered
      card.classList.remove("current");
    }
  })
}, 100))



 */

},{"in-viewport":2}],2:[function(require,module,exports){
(function (global){
module.exports = inViewport;

var instances = [];
var supportsMutationObserver = typeof global.MutationObserver === 'function';

function inViewport(elt, params, cb) {
  var opts = {
    container: global.document.body,
    offset: 0,
    debounce: 15,
    failsafe: true
  };

  if (params === undefined || typeof params === 'function') {
    cb = params;
    params = {};
  }

  var container = opts.container = params.container || opts.container;
  var offset = opts.offset = params.offset || opts.offset;
  var debounceValue = opts.debounce = params.debounce || opts.debounce;
  var failsafe = opts.failsafe = params.failsafe || opts.failsafe;

  for (var i = 0; i < instances.length; i++) {
    if (
      instances[i].container === container &&
      instances[i]._debounce === debounceValue &&
      instances[i]._failsafe === failsafe
    ) {
      return instances[i].isInViewport(elt, offset, cb);
    }
  }

  return instances[
    instances.push(createInViewport(container, debounceValue, failsafe)) - 1
  ].isInViewport(elt, offset, cb);
}

function addEvent(el, type, fn) {
  if (el.attachEvent) {
    el.attachEvent('on' + type, fn);
  } else {
    el.addEventListener(type, fn, false);
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);

    function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }
  };
}

// https://github.com/jquery/sizzle/blob/3136f48b90e3edc84cbaaa6f6f7734ef03775a07/sizzle.js#L708
var contains = function() {
  if (!global.document) {
    return true;
  }
  return global.document.documentElement.compareDocumentPosition ?
    function (a, b) {
      return !!(a.compareDocumentPosition(b) & 16);
    } :
    global.document.documentElement.contains ?
      function (a, b) {
        return a !== b && ( a.contains ? a.contains(b) : false );
      } :
      function (a, b) {
        while (b = b.parentNode) {
          if (b === a) {
            return true;
          }
        }
        return false;
      };
}

function createInViewport(container, debounceValue, failsafe) {
  var watches = createWatches();

  var scrollContainer = container === global.document.body ? global : container;
  var debouncedCheck = debounce(watches.checkAll(watchInViewport), debounceValue);

  addEvent(scrollContainer, 'scroll', debouncedCheck);

  if (scrollContainer === global) {
    addEvent(global, 'resize', debouncedCheck);
  }

  if (supportsMutationObserver) {
    observeDOM(watches, container, debouncedCheck);
  }

  // failsafe check, every 200ms we check for visible images
  // usecase: a hidden parent containing eleements
  // when the parent becomes visible, we have no event that the children
  // became visible
  if (failsafe) {
    setInterval(debouncedCheck, 150);
  }

  function isInViewport(elt, offset, cb) {
    if (!cb) {
      return isVisible(elt, offset);
    }

    var remote = createRemote(elt, offset, cb);
    remote.watch();
    return remote;
  }

  function createRemote(elt, offset, cb) {
    function watch() {
      watches.add(elt, offset, cb);
    }

    function dispose() {
      watches.remove(elt);
    }

    return {
      watch: watch,
      dispose: dispose
    };
  }

  function watchInViewport(elt, offset, cb) {
    if (isVisible(elt, offset)) {
      watches.remove(elt);
      cb(elt);
    }
  }

  function isVisible(elt, offset) {
    if (!elt) {
      return false;
    }

    if (!contains(global.document.documentElement, elt) || !contains(global.document.documentElement, container)) {
      return false;
    }

    // Check if the element is visible
    // https://github.com/jquery/jquery/blob/740e190223d19a114d5373758127285d14d6b71e/src/css/hiddenVisibleSelectors.js
    if (!elt.offsetWidth || !elt.offsetHeight) {
      return false;
    }

    var eltRect = elt.getBoundingClientRect();
    var viewport = {};

    if (container === global.document.body) {
      viewport = {
        top: -offset,
        left: -offset,
        right: global.document.documentElement.clientWidth + offset,
        bottom: global.document.documentElement.clientHeight + offset
      };
    } else {
      var containerRect = container.getBoundingClientRect();
      viewport = {
        top: containerRect.top - offset,
        left: containerRect.left - offset,
        right: containerRect.right + offset,
        bottom: containerRect.bottom + offset
      };
    }

    // The element must overlap with the visible part of the viewport
    var visible =
      (
        eltRect.right >= viewport.left &&
        eltRect.left <= viewport.right &&
        eltRect.bottom >= viewport.top &&
        eltRect.top <= viewport.bottom
      );

    return visible;
  }

  return {
    container: container,
    isInViewport: isInViewport,
    _debounce: debounceValue,
    _failsafe: failsafe
  };
}

function createWatches() {
  var watches = [];

  function add(elt, offset, cb) {
    if (!isWatched(elt)) {
      watches.push([elt, offset, cb]);
    }
  }

  function remove(elt) {
    var pos = indexOf(elt);
    if (pos !== -1) {
      watches.splice(pos, 1);
    }
  }

  function indexOf(elt) {
    for (var i = watches.length - 1; i >= 0; i--) {
      if (watches[i][0] === elt) {
        return i;
      }
    }
    return -1;
  }

  function isWatched(elt) {
    return indexOf(elt) !== -1;
  }

  function checkAll(cb) {
    return function () {
      for (var i = watches.length - 1; i >= 0; i--) {
        cb.apply(this, watches[i]);
      }
    };
  }

  return {
    add: add,
    remove: remove,
    isWatched: isWatched,
    checkAll: checkAll
  };
}

function observeDOM(watches, container, cb) {
  var observer = new MutationObserver(watch);
  var filter = Array.prototype.filter;
  var concat = Array.prototype.concat;

  observer.observe(container, {
    childList: true,
    subtree: true,
    // changes like style/width/height/display will be catched
    attributes: true
  });

  function watch(mutations) {
    // some new DOM nodes where previously watched
    // we should check their positions
    if (mutations.some(knownNodes) === true) {
      setTimeout(cb, 0);
    }
  }

  function knownNodes(mutation) {
    var nodes = concat.call([],
      Array.prototype.slice.call(mutation.addedNodes),
      mutation.target
    );
    return filter.call(nodes, watches.isWatched).length > 0;
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
