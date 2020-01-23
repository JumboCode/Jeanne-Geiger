import React from "react";

const ObjectTable = (props) => {
  for(var key in props.Myobject){
    console.log(key);
  }
  return(
    <h1>HELLO TABLE</h1>
  );
};
export default ObjectTable
