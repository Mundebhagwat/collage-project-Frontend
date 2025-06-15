// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const AuthWrapper = ({ children }) => {
//     const navigate = useNavigate();
//     const { currentUser, loading } = useAuth();

//     useEffect(() => {
//         const checkAuth = () => {
//             setTimeout(() => {  // ⏳ Add delay before checking auth
//                 const token = localStorage.getItem("authToken");
//                 const expiry = Number(localStorage.getItem("authTokenExpiry"));

//                 if (!token || Date.now() > expiry) {
//                     localStorage.removeItem("authToken");
//                     localStorage.removeItem("authTokenExpiry");
//                     navigate("/Login");
//                 }
//             }, 500);  // ⏳ Delay for 500ms before checking auth

//             // 🚨 Role-based redirect
//             if (currentUser?.role === "Admin" && window.location.pathname === "/dashboard") {
//                 navigate("/adminDashboard");
//             }

//             // 👇🏽 Handle blocked user logic
//         if (!loading && currentUser?.blocked) {
//              navigate("/blocked");
//           }

//         };

//         checkAuth();
//         const interval = setInterval(checkAuth, 60 * 1000); // Check every 1 minute

//         return () => clearInterval(interval); // Cleanup on unmount
//     }, [navigate, currentUser, loading]);

//     return children;
// };

// export default AuthWrapper;


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthWrapper = ({ children }) => {
    const navigate = useNavigate();
    const { currentUser, loading } = useAuth();

    useEffect(() => {
        const checkAuth = () => {
            setTimeout(() => {
                const token = localStorage.getItem("authToken");
                const expiry = Number(localStorage.getItem("authTokenExpiry"));

                // 🔐 Expired or missing token
                if (!token || Date.now() > expiry) {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("authTokenExpiry");
                    navigate("/Login");
                    return;
                }

                // 👑 Admin trying to access user dashboard
                if (currentUser?.role === "Admin" && window.location.pathname === "/dashboard") {
                    navigate("/adminDashboard");
                    return;
                }

                // 🚫 Blocked user trying to access anything except /blocked
                if (!loading && currentUser?.blocked && window.location.pathname !== "/blocked") {
                    navigate("/blocked");
                }
            }, 500); // ⏳ Small delay
        };

        checkAuth();
        const interval = setInterval(checkAuth, 8000); // 🔄 Check every 8 seconds

        return () => clearInterval(interval);
    }, [navigate, currentUser, loading]);

    return children;
};

export default AuthWrapper;

