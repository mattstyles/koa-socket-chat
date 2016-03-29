
import EventEmitter from 'eventemitter3'
import Rx from 'rx-lite'

const emitter = new EventEmitter()
const source = Rx.Observable.fromEvent( emitter, 'data' )

/**
 * Passes the source to the callback so that the consumer can optionally
 * filter, reduce etc the source stream
 */
export function register( callback ) {
  let subscriber = callback( source )

  if ( subscriber ) {
    return subscriber.dispose.bind( subscriber )
  }
}

/**
 * Pass through for emitting events
 */
export function dispatch( event ) {
  emitter.emit( 'data', event )
}
