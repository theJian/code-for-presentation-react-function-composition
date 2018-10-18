export default (initialValue, { sidePropName = 'side', flipPropName = 'flip' } = {}) => ({
  init: {
    [sidePropName]: initialValue,
  },
  updaters: {
    [flipPropName]: ({ [sidePropName]: side }) => () => ({ [sidePropName]: !side })
  }
});
