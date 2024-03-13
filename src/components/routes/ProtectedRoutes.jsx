import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const ProtectedRoutes = ({ children }) => {
	const { user, loading } = useAuth();

	if (loading) {
		return null;
	}

	return <>{user ? children : <Navigate to="/" />}</>;
};

export default ProtectedRoutes;
