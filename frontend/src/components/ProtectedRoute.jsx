import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

function ProtectedRoute({ children }) {

 const [isAuth, setIsAuth] = useState(null);

 useEffect(() => {

  const checkAuth = async () => {
   try {

    await api.get("/tasks"); 
    setIsAuth(true);

   } catch (err) {
    setIsAuth(false);
   }
  };

  checkAuth();

 }, []);

 if (isAuth === null) {
  return <div>Loading...</div>;
 }

 if (!isAuth) {
  return <Navigate to="/" />;
 }

 return children;
}

export default ProtectedRoute;