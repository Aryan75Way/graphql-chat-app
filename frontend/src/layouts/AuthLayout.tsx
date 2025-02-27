import { useEffect } from 'react';
import {Outlet, useNavigate} from 'react-router-dom';

const AuthLayout = () => {
    const isAuthenticated = false;
    const navigation = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
          navigation("/");
        }
      }, [isAuthenticated]);


  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Outlet/>
    </div>
  )
}

export default AuthLayout
