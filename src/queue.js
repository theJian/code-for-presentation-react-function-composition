export default (initialValue, { quePropName = 'que', pushPropName = 'push' } = {}) => ({
  init: {
    [quePropName]: initialValue
  },
  updaters: {
    [pushPropName]: ({ [quePropName]: que }) => value => ({ [quePropName]: que.concat(value) })
  }
})
