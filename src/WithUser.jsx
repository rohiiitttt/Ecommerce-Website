import { useContext } from "react";
import { userContext } from "./Providers/UserProvider";

function WithUser(Component) {
  return function WrappedComponent(props) {
    const { user, setUser } = useContext(userContext);
    return <Component {...props} user={user} setUser={setUser} />;
  };
}

export default WithUser;
