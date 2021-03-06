
import Koa from 'koa'
import Logger from 'koa-bunyan-log'
import IO from 'koa-socket'
import def from 'env-default'

const app = new Koa()
const io = new IO()
const logger = new Logger({
  name: 'chat'
})

io.attach( app )

io.use( logger.attach({
  as: 'log'
}))


io.on( 'connection', ctx => {
  logger.info( 'Connection', ctx.socket.id )
})

io.on( 'disconnect', ctx => {
  logger.info( 'Disconnect', ctx.socket.id )
})

io.on( 'message', ( ctx, data ) => {
  ctx.log.info( ctx.socket.id, `"${ data }"` )
  ctx.socket.broadcast( 'message', data )
})


const PORT = def( 'PORT', 3000 )
app.server.listen( PORT, () => {
  logger.info( 'Listening on', PORT )
})
