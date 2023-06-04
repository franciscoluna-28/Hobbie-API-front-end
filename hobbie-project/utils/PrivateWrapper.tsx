import { Navigate, Outlet } from 'react-router-dom';

export function PrivateWrapper(currentUser: any) {
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
  }
  