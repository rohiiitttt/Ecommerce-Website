import { useState, useEffect, createContext } from "react";
import axios from "axios";

// Create the userContext
export const userContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Initialize as null
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios.get("https://myeasykart.codeyogi.io/me", {
        headers: {
          Authorization: token, // Ensure proper Bearer token usage
        },
      }).then((response) => {
        setUser(response.data);
      }).catch(error => {
        console.error("Failed to fetch user:", error);
        localStorage.removeItem("token"); // Clear token if there's an error
        setUser(null); // Reset user state
      });
    }
  }, [token]); // Runs when the token changes

  return (
    <userContext.Provider value={{isLoggedIn: !!token, user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
