import { createFactory } from "react"

const nest = (...Components) => BaseComponent => {
  const baseFactories = createFactory(BaseComponent)
  const wrapperFactories = Components.map(createFactory)

  const Nest = props =>
    wrapperFactories.reduceRight(
      (child, factory) => factory(null, child),
      baseFactories(props),
    )

  return Nest;
}

export default nest
