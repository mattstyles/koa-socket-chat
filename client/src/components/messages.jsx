
import React, { Component } from 'react'
import { register } from '../stores/connect'
import ACTIONS from '../actions'


export default class Messages extends Component {
  constructor( props ) {
    super( props )
  }

  componentDidMount() {
    register( source => {
      return source
        .filter( event => event.type === ACTIONS.BROADCAST )
        .subscribe( event => {
          this.refs.messages.log( event.payload )
        })
    })
  }

  render() {
    let props = {
      ref: 'messages',
      label: ' Chat ',
      top: 0,
      left: 0,
      width: '100%',
      height: '80%',
      scrollable: true,
      mouse: true,
      border: {
        type: 'line'
      },
      scrollbar: {
        bg: 'grey'
      },
      style: {
        border: {
          fg: 'white'
        }
      }
    }

    return <log { ...props }/ >
  }
}
