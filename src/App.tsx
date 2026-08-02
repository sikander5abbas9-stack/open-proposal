import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import { MarketingLayout } from './layouts/MarketingLayout';
import { AppWorkspaceLayout } from './layouts/AppWorkspaceLayout';
import { LegalLayout } from './layouts/LegalLayout';
import { DemoLayout } from './layouts/DemoLayout';

import { HomePage } from './pages/HomePage';
import { JobAnalyzerPage } from './pages/JobAnalyzerPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { DemoPage } from './pages/DemoPage';
import { VideoDemoPage } from './pages/VideoDemoPage';
import { LegalPage } from './pages/LegalPage';
import { ContactPage } from './pages/ContactPage';
import { SignInPage } from './pages/SignInPage';

// Helper component to scroll window to top on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          
          {/* Public Marketing / Landing Page Layout */}
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/video" element={<VideoDemoPage />} />
          </Route>

          {/* Public Auth & Access Request Pages */}
          <Route path="/login" element={<SignInPage />} />
          <Route path="/signin" element={<SignInPage />} />

          <Route element={<DemoLayout />}>
            <Route path="/request-access" element={<DemoPage />} />
            <Route path="/request-demo" element={<DemoPage />} />
            <Route path="/demo" element={<DemoPage />} />
          </Route>

          {/* Protected Dashboard & App Workspace Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppWorkspaceLayout />}>
              <Route path="/dashboard" element={<JobAnalyzerPage />} />
              <Route path="/proposals/new" element={<JobAnalyzerPage />} />
              <Route path="/proposal/new" element={<JobAnalyzerPage />} />
              <Route path="/analyzer" element={<JobAnalyzerPage />} />
              <Route path="/analyzer/:jobId" element={<JobAnalyzerPage />} />
              <Route path="/proposals" element={<JobAnalyzerPage />} />
              <Route path="/deal-center" element={<JobAnalyzerPage />} />
              <Route path="/profiles" element={<JobAnalyzerPage />} />
              <Route path="/atoms" element={<JobAnalyzerPage />} />
              <Route path="/proposal-library" element={<JobAnalyzerPage />} />
              <Route path="/account" element={<JobAnalyzerPage />} />
              <Route path="/portfolio" element={<Navigate to="/profiles" replace />} />
              <Route path="/profile" element={<Navigate to="/profiles" replace />} />
            </Route>
          </Route>

          {/* Dedicated Legal & Contact Portal Layout */}
          <Route element={<LegalLayout />}>
            <Route path="/terms" element={<LegalPage />} />
            <Route path="/privacy" element={<LegalPage />} />
            <Route path="/refund" element={<LegalPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/legal/terms" element={<LegalPage />} />
            <Route path="/legal/privacy" element={<LegalPage />} />
            <Route path="/legal/refund" element={<LegalPage />} />
          </Route>

          {/* Fallback to marketing home layout */}
          <Route element={<MarketingLayout />}>
            <Route path="*" element={<HomePage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
