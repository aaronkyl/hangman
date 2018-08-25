import React from 'react'
import classes from './PlayArea.css'

const playArea = (props) => (
  <div className={classes.PlayArea}>
    {props.children}
  </div>
)

export default playArea