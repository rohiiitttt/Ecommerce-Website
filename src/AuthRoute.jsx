import {Navigate } from 'react-router-dom';
import WithUser from './WithUser';

function AuthRoute({user,children}){


  if(user)
    return <Navigate to="/" />
  else
    return children; 
    
}

export default WithUser(AuthRoute);