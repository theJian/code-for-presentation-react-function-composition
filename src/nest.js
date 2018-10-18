import { createFactory } from "react"

const nest = (...Components) => BaseComponent => {
  const baseFactories = createFactory(BaseComponent)
  const wrapperFactories = Components.map(createFactory)

  const Nest = props =>
    baseFactories(props, ...(
      wrapperFactories.map(factory => factory(props))
    ))

  return Nest;
}

export default nest
