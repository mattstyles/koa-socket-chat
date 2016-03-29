
import React, { Component } from 'react'

export default class Root extends Component {
  constructor( props ) {
    super( props )
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

      </element>
    )
  }
}
