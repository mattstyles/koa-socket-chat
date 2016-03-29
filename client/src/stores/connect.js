
import url from 'url'
import EventEmitter from 'eventemitter3'
import Rx from 'rx-lite'
import IOC from 'socket.io-client'
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


const connectRelease = appRegister( source => {
  return source
    .filter( event => event.type === ACTIONS.CONNECT )
    .subscribe( event => {
      if ( !event.url || event.url === 'default' ) {
        event.url = defaultURL
      } else {
        event.url = Object.assign( defaultURL, event.url )
      }

      const client = new IOC( url.format( event.url ), {
        transports: [ 'websocket' ]
      })

      client.on( 'connect', () => {
        dispatch({
          type: ACTIONS.CONNECTED,
          client: client
        })
      })
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
