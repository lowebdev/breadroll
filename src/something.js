let ticking = false
let isScrollingBot = null
let lastScrollPos = 0
let contentOffset = 0
let windowCenterPoint = 0
const registeredActions = {}
const enterViewportActions = {}

document.addEventListener('DOMContentLoaded', function () {
  // From MDN https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
  window.addEventListener('scroll', (ev) => {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        isScrollingBot = window.scrollY > lastScrollPos
        lastScrollPos = window.scrollY

        runRegisteredActions()
        executeEnterViewportActions()

        ticking = false
      })
      ticking = true
    }
  })
})

let isRunning = false
const runRegisteredActions = debounce(function () {
  if (!isRunning) {
    isRunning = true
    const actionKeys = Object.keys(registeredActions)

    for (let i = 0; i < actionKeys.length; i++) {
      const actionKey = actionKeys[i]
      registeredActions[actionKey]()
    }
    
    isRunning = false
  }
}, 20)

function setOffset (newOffset) {
  contentOffset = newOffset
  windowCenterPoint = windowCenter()
}

function addScrollListener (identifier, func) {
  if (typeof func !== 'function' || typeof identifier !== 'string') { return }

  registeredActions[identifier] = func
}

function removeScrollListener (identifier) {
  if (typeof identifier !== 'string') { return }

  delete registeredActions[identifier]
}

// When the element enters bottom quarter of the viewport, fire function
function addOnEnterViewportListener (el, fct) {
  const enterActionAt = el.getBoundingClientRect().top

  if (el.getBoundingClientRect().top < window.innerHeight) {
    fct()
    return
  }

  const vpAction = enterViewportActions[enterActionAt]
  if (vpAction) {
    enterViewportActions[enterActionAt].push(fct)
    el.style.transitionDelay = `${(enterViewportActions[enterActionAt].length - 1) * 50}ms`
  } else {
    enterViewportActions[enterActionAt] = [fct]
  }
}

// Executes actions when elements enter viewport
function executeEnterViewportActions () {
  const actionKeys = Object.keys(enterViewportActions)

  if (actionKeys.length < 1) { return }

  for (let i = 0; i < actionKeys.length; i++) {
    const key = actionKeys[i]
    const action = enterViewportActions[key]

    if ((windowThirdQuarter() + window.scrollY - key) > 0) {
      for (let j = 0; j < action.length; j++) {
        const element = action[j]
        element()
      }

      // Removes action as soon as it has completed
      delete enterViewportActions[key]
    }
  }
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce (func, wait, immediate) {
  let timeout
  return function () {
    const context = this
    const args = arguments
    const later = function () {
      timeout = null
      if (!immediate) { func.apply(context, args) }
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) { func.apply(context, args) }
  }
}

function isCenterPointInsideElement (el) {
  const rect = el.getBoundingClientRect()
  return (windowCenterPoint > rect.top && windowCenterPoint < rect.bottom)
}

function windowCenter () {
  return (window.innerHeight + contentOffset) / 2
}

function windowThirdQuarter () {
  return (window.innerHeight / 4) * 3
}

function isElementInViewport (el) {
  const rect = el.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

function hasScrolledPastElement (el, offset) {
  return el.getBoundingClientRect().top - (offset || 0) <= 0
}

function getMediaQuery () {
  const width = window.innerWidth

  switch (true) {
    case width >= 1200: return 'desktop'
    case width < 1200 && width >= 768: return 'tablet'
    case width < 768: return 'mobile'
  }
}

function windowCenterOffset (el) {
  const height = (window.innerHeight + (contentOffset || 0)) / 2
  const rect = el.getBoundingClientRect()
  return height - (rect.top + (rect.height / 2))
}

function isScrollingDown () {
  return isScrollingBot
}

function setScrollDisabled (isDisabled) {
  if (isDisabled) {
    const scrollbarWidth = `${window.innerWidth - document.body.clientWidth}px`
    // When the modal is shown, we want a fixed body
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = `calc(100% - ${scrollbarWidth})`
  } else {
    // When the modal is hidden...
    const scrollY = document.body.style.top
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = `calc(100%)`
    window.scrollTo()
    window.scrollTo(0, parseInt(scrollY || '0') * -1)
  }
}

export {
  debounce,
  hasScrolledPastElement,
  getMediaQuery,
  isElementInViewport,
  windowCenterOffset,
  isScrollingDown,
  addScrollListener,
  removeScrollListener,
  setOffset,
  windowCenter,
  isCenterPointInsideElement,
  addOnEnterViewportListener,
  setScrollDisabled
}