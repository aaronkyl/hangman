import React from 'react'
import classes from './SmallBubble.css'

const smallBubble = (props) => (
  <div className={[classes.SmallBubble, classes[props.bubble]].join(' ')}></div>)

export default smallBubble