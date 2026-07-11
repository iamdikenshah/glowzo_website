// =============================================================================
// ADMIN APP — lazy-loaded surface mounted at /admin/*
// =============================================================================
// This is the ONLY module tree that imports firebase/auth, so all of that ships
// in the code-split admin chunk and is never downloaded by public visitors
// (router.jsx lazy-imports this file behind a /admin/* guard). It reuses the
// single app-wide BrowserRouter, so its <Routes> use absolute /admin/* paths.
//
// Single-admin by design: there is no signup/registration UI.
// =============================================================================

import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "./AdminLayout";
import AdminLogin from "./AdminLogin";
import Dashboard from "./pages/Dashboard";
import ServicesManager from "./pages/ServicesManager";
import TestimonialsManager from "./pages/TestimonialsManager";
import EnquiriesInbox from "./pages/EnquiriesInbox";
import Settings from "./pages/Settings";
import "./admin.css";

export default function AdminApp() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/services" element={<ServicesManager />} />
        <Route path="/admin/testimonials" element={<TestimonialsManager />} />
        <Route path="/admin/enquiries" element={<EnquiriesInbox />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>
      {/* Unknown admin path → dashboard (which bounces to login if needed). */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
