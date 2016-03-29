
import path from 'path'
import blessed from 'blessed'
import pkg from '../../package.json'
import Rx from 'rx-lite'

const screen = blessed.screen({
  smartCSR: true,
  dockBorders: true,
  ignoreDockContrast: true,
  title: pkg.title
})

// Quick kill switch
Rx.Observable.fromEvent( screen, 'keypress', ( ch, key ) => {
  return { ch, key }
})
  .filter( event => event.key.full === 'C-c' )
  .subscribe( event => {
    process.exit( 0 )
  })


export default screen
