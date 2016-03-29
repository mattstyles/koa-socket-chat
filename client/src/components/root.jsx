
import React, { Component } from 'react'
import { dispatch } from '../dispatchers/appDispatcher'
import ACTIONS from '../actions'

import Messages from './messages'
import Input from './input'

export default class Root extends Component {
  constructor( props ) {
    super( props )
  }

  componentDidMount() {
    dispatch({
      type: ACTIONS.CONNECT,
      url: 'default'
    })
  }

  render() {
    return (
      <element>
        <Messages />
        <Input />
      </element>
    )
  }
}
