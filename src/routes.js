import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './pages/Navigation';
import Footer from './pages/Footer';
import Loading from './pages/Loading';
import NotFound from './pages/NotFound';

// Lazy load components for authenticated routes
const Notes = lazy(() => import('./pages/components/Notes'));
const Documentation = lazy(() => import('./pages/Documentation'));
const Users = lazy(() => import('./pages/Users'));
const Settings = lazy(() => import('./pages/Settings'));
const Payments = lazy(() => import('./pages/Payments'));

// Lazy load components for unauthenticated routes
const Login = lazy(() => import('./pages/Login'));
const CreateAccount = lazy(() => import('./pages/CreateAccount'));
const Verification = lazy(() => import('./pages/Verification'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

const useRoutes = isAuthenticated => {
    const AuthenticatedRoutes = (
        <Router>
            <Navigation />
            <Notes />
            <Suspense fallback={<Loading/>}>
                <Routes>
                    <Route path="/" element={<Users />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/payments" element={<Payments />} />
                    <Route path="/documentation" element={<Documentation />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
            <Footer />
        </Router>
    );

  const UnauthenticatedRoutes = (
    <Suspense fallback={<Loading/>}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </Suspense>
  );

  return isAuthenticated ? AuthenticatedRoutes : UnauthenticatedRoutes;
};

export default useRoutes;
