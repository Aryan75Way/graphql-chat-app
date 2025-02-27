import { useEffect } from 'react';
import {Outlet, useNavigate} from 'react-router-dom';

const AuthLayout = () => {
    const isAuthenticated = true;
    const navigation = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
          navigation("/");
        }
      }, [isAuthenticated]);


  return (
      <Outlet/>
  )
}

export default AuthLayout
