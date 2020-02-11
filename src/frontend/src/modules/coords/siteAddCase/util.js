import React from 'react'

const DropdownObj = (props) => {
  const elems = []
  if (props.choices !== undefined) { props.choices.map(elem => elems.push(<option value={elem[1]}>{elem[0]}</option>)) }

  return (
    <p>{props.title}:
      <select id={props.id} name={props.title} required>
        <option></option>
        {elems}
      </select>
    </p>
  )
}

const TextInputObj = (props) => {
  return (<p>{props.title}: <input type='text' id={props.id} name={props.id}></input></p>)
}

const DateInputObj = (props) => {
  return (<p>{props.title}: <input type="date" id={props.id} name={props.id} min="1900-01-01"></input></p>)
}

const MultSelectionObj = (props) => {
  const elems = []
  if (props.choices !== undefined) { props.choices.map(elem => elems.push(<option value={elem[1]}>{elem[0]}</option>)) }

  return (
    <p>{props.title}: <br/>
      <select id={props.id} name={props.title} size={props.size} multiple="multiple" required>
        {elems}
      </select>
    </p>
  )
}

export { DropdownObj, TextInputObj, DateInputObj, MultSelectionObj }
