import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "../core/constants/routes.constant";

/* ======================= LAYOUTS ======================= */
const PublicLayout = lazy(() => import("../components/layout/PublicLayout"));
const UserLayout = lazy(() => import("../components/layout/UserLayout"));
const AdminLayout = lazy(() => import("../components/layout/AuthLayout"));

/* ======================= AUTH PAGES ======================= */
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const HomeHero = lazy(() => import("../pages/nonuserpages/HomePage"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomeHero />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Route>

        {/* ================= USER ROUTES ================= */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route element={<UserLayout />}>
            {/* user routes go here */}
          </Route>
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            {/* admin routes go here */}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
