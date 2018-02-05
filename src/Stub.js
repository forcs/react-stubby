import React from 'react'
import PropTypes from 'prop-types'
import {
  DEFAULT_STUB_NAME
} from './constant'

export default class Stub extends React.Component {
  static contextTypes = {
    requestAddOnRenderer: PropTypes.func
  }

  static propTypes = {
    name: PropTypes.string
  }

  static defaultProps = {
    name: DEFAULT_STUB_NAME
  }

  constructor (props, context) {
    super(props, context)
    this.addOnRenderer = context.requestAddOnRenderer(props.name)
  }

  render () {
    return (this.addOnRenderer && this.addOnRenderer()) ||
      this.props.children ||
      null
  }
}
