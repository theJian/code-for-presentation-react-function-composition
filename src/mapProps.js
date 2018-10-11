import { createFactory } from "react"
import compose from "./compose.js"

const mapProps = mapper => BaseComponent => {
  const factory = createFactory(BaseComponent)

  const MapProps = compose(
    factory,
    mapper,
  )

  return MapProps
}

export default mapProps
