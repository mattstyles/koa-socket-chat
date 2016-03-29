
import React, { Component } from 'react'
import Rx from 'rx-lite'
import { register } from '../stores/connect'
import { dispatch } from '../dispatchers/appDispatcher'
import ACTIONS from '../actions'
import screen from '../core/screen'

export default class Input extends Component {
  constructor( props ) {
    super( props )
  }

  state = {
    value: ''
  }

  componentDidMount() {
    const source = Rx.Observable.fromEvent( screen, 'keypress', ( ch, key ) => {
      return { ch, key }
    })

    this.keypress = source
      .subscribe( event => {
        if ( event.key.name === 'enter' ) {
          if ( !this.state.value.length ) {
            return
          }

          dispatch({
            type: ACTIONS.EMIT,
            payload: this.state.value
          })

          this.setState({
            value: ''
          })
          return
        }

        if ( event.key.name === 'backspace' ) {
          this.setState( prev => {
            prev.value = prev.value.replace( /.$/, '' )
            return prev
          })
          return
        }

        if ( event.key.ctrl || event.key.meta || !/^[A-Z]$|^[a-z]$|^[0-9]$|^space$/.test( event.key.name ) ) {
          return
        }

        this.setState( prev => {
          prev.value += event.key.sequence
          return prev
        })
      })
  }

  componentWillUnmount() {
    if ( this.keypress ) {
      this.keypress.dispose()
    }
  }

  render() {
    let props = {
      ref: 'input',
      label: ' Input ',
      top: '80%',
      left: 0,
      width: '100%',
      height: '20%',
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

    let { value } = this.state

    return <text { ...props }>{ value }</text>
  }
}
