// src/views/ExternalApi.js

import React, { useState } from "react";
import { useAuth0 } from "./react-auth0-spa";

const ExternalApi = () => {

  console.log("here");
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const { getTokenSilently } = useAuth0();

  const callApi = async () => {
    
    try {
      const token = await getTokenSilently();
      console.log(token)
      const response = await fetch("http://127.0.0.1:8000/api/communities/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const responseData = await response.json();

      setShowResult(true);
      setApiMessage(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>External API</h1>
      <button onClick={callApi}>Ping API</button>
      {showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
    </>
  );
};

export default ExternalApi;