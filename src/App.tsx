import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import POSPage from './pages/POSPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import EmployeesPage from './pages/EmployeesPage';
import { useUIStore } from './store/useUIStore';
import { cn } from './lib/utils';
import './lib/i18n';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { theme, language } = useUIStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Sync theme
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    // Sync language
    i18n.changeLanguage(language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, i18n]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <BrowserRouter>
        <Routes>
          {/* POS Route */}
          <Route path="/pos" element={<POSPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="analytics" element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="settings" element={<div className="p-8"><h1 className="text-2xl font-bold dark:text-white">Settings Page</h1><p className="text-slate-500">System configuration options will appear here.</p></div>} />
          </Route>

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/pos" replace />} />
          <Route path="*" element={<Navigate to="/pos" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
