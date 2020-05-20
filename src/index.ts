import Dictionary from './types/Dictionary'

export class Breadroll {
  // private static _instance: Breadroll
  state = {
    isTicking: false,
    scrollDirection: 0, // 1 = down, -1 = up
    lastScrollPos: 0,
    isRunningScrollListeners: false
  }

  private ON_ENTER_VIEWPORT_EVENT_NAME = 'enterviewport'
  private onEnterViewportEvent = new CustomEvent(this.ON_ENTER_VIEWPORT_EVENT_NAME)
  private onEnterViewportListeners: Dictionary<HTMLElement[]> = {}

  private interval: number
  onScrollListeners: Dictionary<(e: Event) => void> = {}
  scrollDirection: number // down == < 0, up == > 0
  public scrollY: number = 0

  constructor (interval?: number) {

    this.interval = interval ?? 50
    // From MDN https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
    window.addEventListener('scroll', (ev) => {
      if (!this.state.isTicking) {
        window.requestAnimationFrame(() => {
          this.scrollDirection = window.scrollY - scrollY
          this.scrollY = window.scrollY
          this.triggerOnScrollListeners()
          this.emitEnterViewportEvent()
  
          this.state.isTicking = false
        })
        this.state.isTicking = true
      }
    })
  }

  // TODO: put in core utils
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  debounce (func: Function, wait: number, immediate: boolean = false) {
    let timeout: NodeJS.Timeout
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

  // TODO: put in core utils
  // Returns a function, that will be invoked at a certain rate at most.
  // If the function was executed before the timeout limit (in milliseconds),
  // it will not be invoked.
  throttle (func: Function, limit: number) {
      let wait = false
      return function () {
        const context = this
        const args = arguments
        if (!wait) {
          func.apply(context, args)
          wait = true
          setTimeout(function () {
              wait = false
          }, limit)
        }
      }
  }

  public addScrollListener (identifier: string, func: (e: Event) => void) {
    if (typeof func !== 'function' || typeof identifier !== 'string') { return }
  
    this.onScrollListeners[identifier] = func
    console.log(this.onScrollListeners)
  }

  // When the element enters bottom quarter of the viewport, add style
  public addStyleOnEnterViewport (el: HTMLElement, styleObj: any, baseTransitionDelayMS: number = 50) {
    const enterActionAt = el.getBoundingClientRect().top

    const enterViewportAction = () => {
      for (const propName in styleObj) {
        el.style.setProperty(propName, styleObj[propName])
      }

      el.removeEventListener(this.ON_ENTER_VIEWPORT_EVENT_NAME, enterViewportAction)
    }

    // Handle with custom event listeners!
    if (el.getBoundingClientRect().top < window.innerHeight) {
      enterViewportAction()
      return
    }

    if (this.onEnterViewportListeners[enterActionAt]) {
      this.onEnterViewportListeners[enterActionAt].push(el)
      el.style.transitionDelay = `${(this.onEnterViewportListeners[enterActionAt].length - 1) * baseTransitionDelayMS}ms`
    } else {
      this.onEnterViewportListeners[enterActionAt] = [el]
    }

    el.addEventListener(this.ON_ENTER_VIEWPORT_EVENT_NAME, enterViewportAction)
  }

  private triggerOnScrollListeners = this.throttle(function (e: Event) {
    if (!this.state.isRunningScrollListeners) {
      this.state.isRunningScrollListeners = true
      console.log('running listeners')
      for (const key in this.onScrollListeners) {
        this.onScrollListeners[key](e)
      }

      this.state.isRunningScrollListeners = false
    }
  }, this.interval)

  // Need to check performances vs class obj
  private emitEnterViewportEvent = this.throttle(function () {

    const nextKey = +Object.keys(this.onEnterViewportListeners).find((enterViewportKey) => {
      return (window.innerHeight * 0.75) + window.scrollY - +enterViewportKey > 0
    })

    if (!nextKey) { return }

    const nextEnterViewportListeners: HTMLElement[] = this.onEnterViewportListeners[nextKey]
    for (let i = 0; i < nextEnterViewportListeners.length; i++) {
      nextEnterViewportListeners[i].dispatchEvent(this.onEnterViewportEvent)
    }

    delete this.onEnterViewportListeners[nextKey]
  }, this.interval)

  // Need to check performances vs class obj
  public styleOnImageLoaded(styleObj: any) {
    const imgs = document.querySelectorAll('img')
    const onLoad = (img: HTMLImageElement) => {
      for (const key in styleObj) {
        img.style.setProperty(key, styleObj[key])
      }
    }

    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i];

      if (img.complete) {
        onLoad(img)
      } else {
        img.addEventListener('load', () => {
          onLoad(img)
        })
      }
    }
  }
}
