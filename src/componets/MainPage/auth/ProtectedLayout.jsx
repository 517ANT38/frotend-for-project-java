import { Navigate, Outlet } from "react-router-dom";

export const ProtectedLayout = (userArg) => {
  
  if (!userArg) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className='boxPanel'> 
      <Outlet />
    </div>
    

  )
};