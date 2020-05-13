// src/views/ExternalApi.js

import React, { useState } from 'react'
// import { useAuth0 } from "./react-auth0-spa";

async function callExternalApi (url = '', token) {
  // const { getTokenSilently } = useAuth0();

  try {
    // const token = await getTokenSilently();
    console.log(token)
    console.log(url)
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const responseData = await response.json()

    return responseData
  } catch (error) {
    console.error(error)
  }
};

// function ExternalApi({ url, data }) {
//     let response = useExternalApi(url, data)
//     return response
// }

export default callExternalApi
