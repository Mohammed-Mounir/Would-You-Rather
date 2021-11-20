import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthed = useSelector((state) => state.authedUser);
  return isAuthed ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
