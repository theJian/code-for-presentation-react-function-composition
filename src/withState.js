import { createFactory, Component } from 'react'

const mapValues = (obj, func) => {
  const result = {}
  /* eslint-disable no-restricted-syntax */
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = func(obj[key], key)
    }
  }
  /* eslint-enable no-restricted-syntax */
  return result
}

const withStateHandlers = ({ init, updaters }) => BaseComponent => {
  const factory = createFactory(BaseComponent)

  class WithStateHandlers extends Component {
    state = typeof init === 'function'
      ? init(this.props)
      : init

    updaters = mapValues(
      updaters,
      handler => (mayBeEvent, ...args) => {
        // Having that functional form of setState can be called async
        // we need to persist SyntheticEvent
        if (mayBeEvent && typeof mayBeEvent.persist === 'function') {
          mayBeEvent.persist()
        }

        this.setState((state, props) =>
          handler(state, props)(mayBeEvent, ...args)
        )
      }
    )

    render() {
      return factory({
        ...this.props,
        ...this.state,
        ...this.updaters,
      })
    }
  }

  return WithStateHandlers
}

export default withStateHandlers
