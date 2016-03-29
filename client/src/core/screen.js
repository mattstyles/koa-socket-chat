
import path from 'path'
import blessed from 'blessed'
import pkg from '../../package.json'

const screen = blessed.screen({
  smartCSR: true,
  dockBorders: true,
  ignoreDockContrast: true,
  title: pkg.title
})

export default screen
