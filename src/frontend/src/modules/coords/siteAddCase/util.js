import React from "react";

const DropdownObj = (props) => {
  let elems = []
  if (props.choices != undefined)
    props.choices.map(elem => elems.push(<option value={elem[1]}>{elem[0]}</option>));

  return(
    <p>{props.title}: 
      <select id={props.id} name={props.title} required>
        <option></option>
        {elems}
      </select>
    </p>
  );
};
export default DropdownObj;

const SubmitButton = (props) => {
  console.log("in SubmitButton");
  return(<button type="submit" onclick={props.callbackFunc} value="Submit">Submit</button>);
};