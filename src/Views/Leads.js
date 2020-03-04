import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import ListContainer from "../Components/ListContainer";

function Leads() {
  useFirestoreConnect("leads"); // sync todos collection from Firestore into redux
  const leads = useSelector(state => state.firestore.ordered.leads);
  /*let leads = [];
  for (var key in data) {
    if (data[key].first_name && data[key].last_name) {
      let newObj = { id: key, ...data[key] };
      leads.push(newObj);
    }
  }
  console.log(leads);*/

  return <>{!leads ? "no leads" : <ListContainer list={leads} />}</>;
}

export default Leads;

// firebase pagination: https://stackoverflow.com/questions/53044791/how-to-paginate-cloud-firestore-data-with-reactjs
// https://firebase.google.com/docs/firestore/query-data/query-cursors
