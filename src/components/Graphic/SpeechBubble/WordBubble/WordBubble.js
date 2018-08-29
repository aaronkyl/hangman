import React from 'react'
import classes from './WordBubble.css'

const wordBubble = (props) => {
  return (
    <div className={classes.WordBubble}>
      {props.children}
    </div>
  )
}

export default wordBubble