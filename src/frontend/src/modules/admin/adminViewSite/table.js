import React from 'react'
import styled from 'styled-components';
const  TableHead= styled.th`
  width: 250px;
`;
const  Tablerow2= styled.tr`
  background-color: rgb(255, 255, 255);
  font-size: 15px;
  font-weight: normal;
  color: rgb(103, 115, 111);
`;
const Tablerow1 = styled.tr`
  background-color: rgb(227, 229, 228);
  font-size: 15px;
  font-weight: normal;
  color: rgb(103, 115, 111);
`;


const ObjectTable = (props) => {
  const table = []
  let children = []
  let rowNum = 0;
  props.tableRows.map(obj => {
    rowNum = rowNum+1;
    children = []
    children.push(<TableHead>{obj[0]}</TableHead>)
    children.push(<td>{obj[1]}</td>)
    if(rowNum%2 == 1){
      table.push(<thead><Tablerow1>{children}</Tablerow1></thead>)
    }else{
      table.push(<thead><Tablerow2>{children}</Tablerow2></thead>)
    }

  })

  return (
  <div>
    <p>{props.Title}</p>
    <table>
      {table}
    </table>
  </div>)
}
export default ObjectTable
