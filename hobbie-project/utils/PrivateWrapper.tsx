import { User } from 'firebase/auth';
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateWrapper(currentUser: User) {
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
  }
  