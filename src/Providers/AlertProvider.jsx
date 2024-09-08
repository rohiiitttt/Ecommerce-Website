import { createContext, useState } from "react";

// Create the AlertContext
export const AlertContext = createContext();

function AlertProvider({ children }) {
  const [alert, setAlert] = useState(undefined);

  // Function to remove the alert
  function removeAlert() {
    setAlert(undefined);
  }

  return (
    <AlertContext.Provider value={{ alert, setAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export default AlertProvider;
