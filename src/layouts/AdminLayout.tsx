import React from 'react';
import { useUIStore } from '../store/useUIStore';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ClipboardList,
  BarChart3,
  Moon,
  Sun,
  Languages
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

const AdminLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar, theme, toggleTheme, currentUser, language, setLanguage } = useUIStore();
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems = [
    { icon: LayoutDashboard, label: t('dashboard'), path: '/admin' },
    { icon: BarChart3, label: t('analytics'), path: '/admin/analytics' },
    { icon: ClipboardList, label: t('orders'), path: '/admin/orders' },
    { icon: Package, label: t('products'), path: '/admin/products' },
    { icon: Users, label: t('employees'), path: '/admin/employees' },
    { icon: Settings, label: t('settings'), path: '/admin/settings' },
  ];

  return (
    <div className={cn("min-h-screen flex transition-colors duration-300", theme === 'dark' ? 'dark' : '')}>
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 z-50 w-64 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          language === 'ar' ? "right-0 border-l" : "left-0 border-r",
          !sidebarOpen && (language === 'ar' ? "translate-x-full" : "-translate-x-full")
        )}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
              <span className="text-xl font-bold tracking-tight dark:text-white">Lumina POS</span>
            </Link>
            <button onClick={toggleSidebar} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  location.pathname === item.path
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                <item.icon size={20} className={cn(
                  "transition-colors",
                  location.pathname === item.path ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                )} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <Link 
              to="/pos" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
            >
              <ShoppingBag size={20} />
              <span className="font-semibold">{t('open_pos')}</span>
            </Link>
          </div>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-3 px-2">
              <img src={currentUser?.avatar} alt={currentUser?.name} className="w-10 h-10 rounded-full border-2 border-slate-100 dark:border-slate-800" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{currentUser?.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{currentUser?.role}</p>
              </div>
            </div>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
              <LogOut size={18} />
              <span className="text-sm font-medium">{t('logout')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8">
          <button onClick={toggleSidebar} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden">
            <Menu size={20} />
          </button>
          
          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-sm font-bold"
            >
              <Languages size={18} />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <div className="h-8 w-px bg-slate-200 dark:border-slate-800" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 hidden sm:inline">{t('status')}:</span>
              <span className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                {t('online')}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
