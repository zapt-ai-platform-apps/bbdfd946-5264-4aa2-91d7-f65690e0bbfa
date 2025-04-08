import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './modules/auth/providers/AuthProvider';
import ProtectedRoute from './modules/auth/components/ProtectedRoute';
import Header from './shared/components/Header';
import Footer from './shared/components/Footer';
import HomePage from './app/pages/HomePage';
import LoginPage from './app/pages/LoginPage';
import DashboardPage from './app/pages/DashboardPage';
import BuilderPage from './app/pages/BuilderPage';
import WebsitesPage from './app/pages/WebsitesPage';
import PreviewPage from './app/pages/PreviewPage';
import NotFoundPage from './app/pages/NotFoundPage';
import ZaptBadge from './shared/components/ZaptBadge';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/builder/:id?" 
                element={
                  <ProtectedRoute>
                    <BuilderPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/websites" 
                element={
                  <ProtectedRoute>
                    <WebsitesPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/preview/:id" element={<PreviewPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </main>
          <Footer />
          <ZaptBadge />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;