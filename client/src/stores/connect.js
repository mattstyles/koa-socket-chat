
import url from 'url'
import EventEmitter from 'eventemitter3'
import Rx from 'rx-lite'
import IOC from 'socket.io-client'
import chalk from 'chalk'
import { register as appRegister } from '../dispatchers/appDispatcher'
import ACTIONS from '../actions'


const emitter = new EventEmitter()
const source = Rx.Observable.fromEvent( emitter, 'data' )

const CONNECTION_MAX_ATTEMPTS = 5
const CONNECTION_TIMEOUT = 5000
const HOST = '0.0.0.0'
const PORT = 3000
const defaultURL = {
  protocol: 'ws',
  hostname: HOST,
  port: PORT,
  slashes: true
}

// @TODO this stinks, refactor
var client = null


/**
 * Connection handler
 * For now whack server events in here to
 */
function onConnected( ioc ) {
  return function() {
    client = ioc    // yuck
    dispatch({
      type: ACTIONS.CONNECTED,
      client: ioc
    })

    /**
     * Message received to room
     */
    ioc.on( 'message', event => {
      dispatch({
        type: ACTIONS.BROADCAST,
        payload: event
      })
    })
  }
}


/**
 * Attempts connection when the appropriate action is called for
 */
const connectRelease = appRegister( source => {
  return source
    .filter( event => event.type === ACTIONS.CONNECT )
    .subscribe( event => {
      if ( !event.url || event.url === 'default' ) {
        event.url = defaultURL
      } else {
        event.url = Object.assign( defaultURL, event.url )
      }

      const ioc = new IOC( url.format( event.url ), {
        transports: [ 'websocket' ]
      })

      ioc.on( 'connect', onConnected( ioc ) )
    })
})

/**
 * Emits messages to the server
 */
const messageRelease = appRegister( source => {
  return source
    .filter( event => event.type === ACTIONS.EMIT )
    .subscribe( event => {
      if ( !client ) {
        return
      }

      dispatch({
        type: ACTIONS.BROADCAST,
        payload: '  ' + chalk.grey( event.payload )
      })

      client.emit( 'message', event.payload )
    })
})



/**
 * Emit wrapper
 */
function dispatch( event ) {
  emitter.emit( 'data', event )
}

/**
 * Register connect store listeners
 */
export function register( callback ) {
  let subscriber = callback( source )

  if ( subscriber ) {
    return subscriber.dispose.bind( subscriber )
  }
}
