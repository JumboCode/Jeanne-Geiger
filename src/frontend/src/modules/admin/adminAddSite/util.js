import React from 'react'

const TextInputObj = (props) => {
  return (
    <div class="form-group">
      <label for={props.id}>{props.title}</label>
      <input type="text" class="form-control" id={props.id} placeholder={'Enter ' + props.title}></input>
    </div>
  )
}

export { TextInputObj }
