const compose = (...fns) =>
  fns.reduce((a, b) => (...args) => a(b(...args)), arg => arg)

export default compose
