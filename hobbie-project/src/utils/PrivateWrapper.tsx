import { User } from "@firebase/auth-types";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateWrapperProps {
  currentUser: User | null;
}

export default function PrivateWrapper(props: PrivateWrapperProps) {
  const { currentUser } = props;

  return currentUser ? <Outlet /> : <Navigate to="/" />;
}
