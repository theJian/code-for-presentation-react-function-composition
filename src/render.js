import { createFactory } from 'react'

const render = Component => _ => {
  const factory = createFactory(Component)
  const Render = props => factory(props)
  return Render
}

export default render
