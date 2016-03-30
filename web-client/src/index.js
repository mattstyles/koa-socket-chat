
import React from 'react'
import { render } from 'react-dom'
import { State } from 'raid'
import el from './core/element'

import { setup, add } from './actions/messages'

import List from './components/messageList.jsx'

const state = new State()

window.state = state

// Create initial application state
setup( state )

function main( appstate ) {
  render( (
    <div>
      <h1>List</h1>
      <List list={ appstate.get([ 'messages', 'list' ]) } />
    </div>
  ), el )
}

state
  .on( 'update', main )
  .start()


// @TODO fake event stream
var fakeList = [
  'messages',
  'are',
  'these',
  'world',
  'hello'
]

setTimeout( function tick() {
  if ( !fakeList.length ) {
    return
  }

  add( state.cursor([ 'messages', 'list' ]), fakeList.pop() )

  setTimeout( tick, 1000 )
}, 1000 )
