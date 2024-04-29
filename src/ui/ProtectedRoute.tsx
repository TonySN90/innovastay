import { useNavigate } from "react-router";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();

  if (!isAuthenticated && !isLoading) {
    navigate("/login");
  }

  if (isLoading) return <Spinner />;
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
