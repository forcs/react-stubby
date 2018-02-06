import React from 'react'
import StubProvider from './StubProvider'

export default class StubContextProvider extends React.Component {
  componentWillUnmount () {
    this.Wrapped = null
  }

  componentWillUpdate () {
    this.Wrapped = null
  }

  render () {
    if (!this.Wrapped) {
      this.Wrapped = StubProvider(() => React.Children.only(this.props.children))
    }
    return <this.Wrapped />
  }
}
