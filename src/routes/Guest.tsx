import { FC } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";

interface Props {}

const Guest: FC<Props> = () => {
  const { status } = useAuth();
  const isLoggedIn = status === "authenticated";

  const loading = status === "busy";
  if (loading) return <LoadingSpinner />;

  return isLoggedIn ? <Navigate to="/profile" /> : <Outlet />;
};

export default Guest;
