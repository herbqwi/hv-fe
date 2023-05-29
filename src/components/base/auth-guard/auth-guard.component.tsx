import { ReactElement, useContext } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../../../contexts/user.context";

interface IProps {
  children: ReactElement,
}

const AuthGuard = ({ children }: IProps) => {
  const { user } = useContext(UserContext);
  if (user != null) {
    return children
  } else {
    return <Navigate to="/login" replace />
  }
}

export default AuthGuard;