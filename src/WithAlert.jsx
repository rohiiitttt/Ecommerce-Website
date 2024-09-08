import React, {useContext} from "react";
import {AlertContext} from "./Providers/AlertProvider";

function WithAlert(IncomingComponent){
  function OutgoingComponent(props){
    const {alert, setAlert , removeAlert} = useContext(AlertContext);
    return <IncomingComponent alert={alert} setAlert={setAlert} removeAlert={removeAlert} {...props} />
  }
  return OutgoingComponent;
}

export default WithAlert;