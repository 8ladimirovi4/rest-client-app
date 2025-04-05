import React from 'react'
import { VariableProps } from './types'
import './styles.css'

const Variable = ({variable}: VariableProps) => {
  return (
    <>
    <td>{variable.key}</td>
    <td>{variable.value}</td>
    </>
  )
}

export default Variable
