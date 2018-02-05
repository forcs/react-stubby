import React from 'react'
import PropTypes from 'prop-types'
import {
  DEFAULT_STUB_NAME,
  ADD_ON_DN,
  ADD_ON_HOC_DN
} from './constant'

function getDisplayName (component) {
  return component.displayName || component.name || 'component'
}

export default (WrappedComponent) => {
  return class StubWrapper extends React.Component {
    static displayName = `StubProvider(${getDisplayName(WrappedComponent)})`

    static childContextTypes = {
      requestAddOnRenderer: PropTypes.func
    }

    addOnRenderers = {}

    getChildContext () {
      return {
        requestAddOnRenderer: this.addOnRendererRegister.bind(this)
      }
    }

    addOnRendererRegister (name) {
      return () => {
        return this.addOnRenderers[name]
      }
    }

    render () {
      const {
        children,
        ...restProps
      } = this.props

      if (children) {
        const arr = React.Children.toArray(children)
        const nameChecked = []
        this.addOnRenderers = {}
        arr.forEach(item => {
          const itemType = item.type
          if (itemType.displayName === ADD_ON_HOC_DN) {
            item = itemType(children.props)
          }
          if (item.type.displayName === ADD_ON_DN) {
            const stubName = item.props.stub || DEFAULT_STUB_NAME
            // checking, ensure the uniqueness of the consumer
            if (nameChecked.findIndex(item => item === stubName) !== -1) {
              throw new Error(`Stub(${stubName}) has been occupied`)
            }

            this.addOnRenderers[stubName] = item.props.children
            // cache for next checking
            nameChecked.push(stubName)
          }
        })
      }
      return (<WrappedComponent {...restProps} />)
    }
  }
}
