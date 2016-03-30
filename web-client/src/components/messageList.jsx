
import React from 'react'


export default props => {
  let items = props.list.map( ( item, index ) => {
    return (
      <li key={ 'item' + index }>{ item }</li>
    )
  })
  return (
    <ul>
      { items }
    </ul>
  )
}
