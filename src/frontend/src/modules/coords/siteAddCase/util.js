import React from 'react'

const DropdownObj = (props) => {
  const elems = []
  if (props.choices !== undefined) { props.choices.map(elem => elems.push(<option value={elem[1]}>{elem[0]}</option>)) }

  return (
    <div class="form-group">
      <label for={props.id}>{props.title}</label>
      <select class="form-control" id={props.id} name={props.title} required>
        <option></option>
        {elems}
      </select>
    </div>
  )
}

const TextInputObj = (props) => {
  return (
    <div class="form-group">
      <label for={props.id}>{props.title}</label>
      <input type="text" class={'form-control ' + props.class} id={props.id} placeholder={'Enter ' + props.title}></input>
    </div>
  )
}

const DateInputObj = (props) => {
  return (
    <div class="form-group">
      <label for={props.id}>{props.title}</label>
      <input type="date" class="form-control" id={props.id} placeholder={'Enter ' + props.title}></input>
    </div>
  )
}

const MultSelectionObj = (props) => {
  const elems = []
  if (props.choices !== undefined) { props.choices.map(elem => elems.push(<option value={elem[1]}>{elem[0]}</option>)) }

  return (
    <div class="form-group">
      <label class="mdb-main-label">{props.title}</label>
      <select class="form-control" id={props.id} name={props.title} size={props.size} multiple required>
        {elems}
      </select>
    </div>
  )
}

export { DropdownObj, TextInputObj, DateInputObj, MultSelectionObj }
