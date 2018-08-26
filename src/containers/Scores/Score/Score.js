import React from 'react'
import classes from './Score.css'

const score = (props) => (
  <tr className={classes.Score}>
    <td className={classes.User}>{props.user}</td>
    <td className={classes.UserScore}>{props.score}</td>
  </tr>
)

export default score