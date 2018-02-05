import React from 'react'
import AddOn from './AddOn'

import {
  ADD_ON_HOC_DN
} from './constant'

export default (stub) => (WrappedComponent) => {
  const wrapper = (props) => (
    <AddOn stub={stub}>
      <WrappedComponent {...props} />
    </AddOn>
  )

  wrapper.displayName = ADD_ON_HOC_DN

  return wrapper
}
