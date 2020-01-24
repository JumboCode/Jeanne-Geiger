import React from "react";

const ObjectTable = (props) => {

  console.log(props.tableRows)

  let table = []
  let children = []
  props.tableRows.map(obj => (
    console.log(obj),
    children = [],
    children.push(<th>{obj[0]}</th>),
    children.push(<td>{obj[1]}</td>),
    table.push(<thead><tr>{children}</tr></thead>))
  );

  return(
    <table>
      {table}
    </table>
  );

};
export default ObjectTable
