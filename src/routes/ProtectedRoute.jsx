// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../core/contexts/AuthContext";
// import { ROUTES } from "../core/constants/routes.constant";

// const ProtectedRoute = ({ allowedRoles }) => {
//   const { isLoggedIn, user, isLoading } = useAuth();

//   // Wait until auth finishes loading
//   if (isLoading) return <div></div>;

//   // Not logged in → go to login
//   if (!isLoggedIn || !user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Role mismatch → redirect based on actual role
//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     if (user.role === "admin") return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
//     if (user.role === "detective") return <Navigate to={ROUTES.DETECTIVE_DASHBOARD} replace />;
//     if (user.role === "user") return <Navigate to={ROUTES.USER_DASHBOARD} replace />;

//     // fallback
//     return <Navigate to="/" replace />;
//   }

//   // Authenticated and allowed → render child routes
//   return <Outlet />;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../core/contexts/AuthContext";
import { ROUTES } from "../core/constants/routes.constant";

const DEV_MODE = import.meta.env.DEV;

const DEV_USERS = {
  admin: {
    id: "dev-admin-001",
    name: "Dev Admin",
    role: "admin",
  },
  detective: {
    id: "dev-detective-002",
    name: "Dev Detective",
    role: "detective",
  },
  user: {
    id: "dev-user-003",
    name: "Dev User",
    role: "user",
  },
};

const DEV_DEFAULT_ROLE = "admin"; // admin | detective | user

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, user, isLoading } = useAuth();

  const effectiveUser = DEV_MODE
    ? DEV_USERS[DEV_DEFAULT_ROLE]
    : user;

  const effectiveIsLoggedIn = DEV_MODE ? true : isLoggedIn;

  if (!DEV_MODE && isLoading) return <div></div>;

  if (!effectiveIsLoggedIn || !effectiveUser) {
    return <Navigate to="/login" replace />;
  }

  // 🔒 Role check only in production
  if (!DEV_MODE && allowedRoles && !allowedRoles.includes(effectiveUser.role)) {
    if (effectiveUser.role === "admin")
      return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;

    if (effectiveUser.role === "detective")
      return <Navigate to={ROUTES.DETECTIVE_DASHBOARD} replace />;

    if (effectiveUser.role === "user")
      return <Navigate to={ROUTES.USER_DASHBOARD} replace />;

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
