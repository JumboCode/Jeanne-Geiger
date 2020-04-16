import callExternalApi from "../../ExternalApi";
import adminViewSite from "./adminViewSite/";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../react-auth0-spa";

const COMMUNITY_LIST_URL = 'http://127.0.0.1:8000/api/communities/'

export default function AdminViewSiteFn(props) {
    const { getTokenSilently } = useAuth0();
    const [communityList, setCommunityList] = useState([]);
    // const communityList = useExternalApi(COMMUNITY_LIST_URL);
    useEffect(() => {
        const callApi = async () => {
            const token = await getTokenSilently();
            const result = await callExternalApi(COMMUNITY_LIST_URL, token);
            setCommunityList(result);
        };
        callApi();
    }, []);

    // return useExternalApi({ url: COMMUNITY_LIST_URL }).then((community_list) =>
    //     <adminViewSite {...props} community_list={community_list} />);
    console.log("GREETINGS from AdminViewSiteFn with " + JSON.stringify(communityList))
    return (<adminViewSite {...props} community_list={communityList} />);
    // return (<p> Hello World </p>)
}

// export function higherOrderWithHook() {
//     return function WrappedComponent(props) {
//       const community_list = ExternalApi(url);
//       return <adminViewSite {...props} community_list={community_list} />;
//     }
// }