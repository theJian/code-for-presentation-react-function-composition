export default (initialValue, { facePropName = 'face', rollPropName = 'roll' } = {}) => ({
  init: {
    [facePropName]: initialValue,
  },
  updaters: {
    [rollPropName]: () => value => ({ [facePropName]: value })
  }
});
