import React from "react";

const DropdownObj = (props) => {
  let elems = []
  if (props.choices != undefined)
    props.choices.map(elem => elems.push(<option value={elem}>{elem}</option>));

  return(
    <p>{props.title}: 
      <select id={props.id} name={props.title}>
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