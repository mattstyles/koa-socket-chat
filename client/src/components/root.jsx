
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
    let style = {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: {
        type: 'line'
      },
      style: {
        fg: 'white',
        border: {
          fg: 'white'
        }
      }
    }

    return (
      <element>
        <Messages />
        <Input />
      </element>
    )
  }
}
