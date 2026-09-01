Object.defineProperty(window, 'visualViewport', {
  value: {
    width: window.innerWidth,
    height: window.innerHeight,
    addEventListener: () => {},
    removeEventListener: () => {},
  },
})