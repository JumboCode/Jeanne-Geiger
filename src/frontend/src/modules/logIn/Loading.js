import React from 'react'
import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
 
class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
 
  render() {
    return (
      <div className="loading">
        <FadeLoader
          css={override}
          size={40}
          margin={2}
          color={"#73296e"}
          loading={this.state.loading}
        />
      </div>
    );
  }
} export default Loading