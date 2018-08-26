import React from 'react'
import classes from './Button.css'

const button = (props) => {
  const activeClasses = [classes.Button]
  activeClasses.push(props.status ? null : classes.Inactive)
  return (
    <button 
      className={activeClasses.join(' ')} 
      onClick={props.status ? props.clicked : null}>{props.children}</button>
  )
}

export default button