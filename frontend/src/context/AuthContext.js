// import { createContext, useContext, useEffect, useState } from "react";
// import authService from "../services/authService";

// const AuthContext = createContext();

// export const authProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = async () => {
//     try {
//       const userData = await authService.currentUser();
//       setUser(userData);
//     } catch (error) {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

// const loginUser = (userData) => {
//     setUser(userData)
// }

// const logoutUser = () => {
//     setUser(null)
// }

// const value = {
//     user, 
//     loginUser,
//     logoutUser,
//     isAuthenticated: !!user
// }

// return (
//     <AuthContext.Provider>
//         {children}
//     </AuthContext.Provider>
// )
// };
