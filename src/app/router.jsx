import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../auth/useSession';
import { ROLES } from '../lib/roles';

// Placeholder Components (We will build these next)
const LandingPage = () => <div className="text-white p-10">Landing Page (Coming Soon)</div>;
const AdminLogin = () => <div className="text-white p-10">Admin Login (Coming Soon)</div>;
const AdminDashboard = () => <div className="text-white p-10">War Room (Coming Soon)</div>;

// 🛡️ GUARD: Protects Routes based on Role
const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { session } = useSession();
  
  if (session.loading) return <div className="text-white">Loading...</div>;
  if (!session.isAuthenticated) return <Navigate to="/login" replace />;
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(session.role)) {
    return <Navigate to="/" replace />; 
  }
  
  return children ? children : <Outlet />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <AdminLogin /> },
      
      // 🛡️ ADMIN AREA
      {
        path: 'admin',
        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.OWNER]}><AdminDashboard /></ProtectedRoute>
      }
    ]
  }
]);
