

export function setup( state ) {
  state.create( 'messages', {
    list: []
  })
}

export function add( cursor, msg ) {
  cursor.update( c => c.concat( msg ) )
}
