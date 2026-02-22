import React from 'react';
import { 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  Shield, 
  MoreVertical,
  Star,
  Clock
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

const EmployeesPage: React.FC = () => {
  const { t } = useTranslation();
  const employees = [
    { id: '1', name: 'Alex Cashier', role: 'Admin', email: 'alex@lumina.com', phone: '+1 234 567 890', status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
    { id: '2', name: 'Maria Garcia', role: 'Cashier', email: 'maria@lumina.com', phone: '+1 234 567 891', status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' },
    { id: '3', name: 'James Wilson', role: 'Waiter', email: 'james@lumina.com', phone: '+1 234 567 892', status: 'On Break', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
    { id: '4', name: 'Elena Rodriguez', role: 'Waiter', email: 'elena@lumina.com', phone: '+1 234 567 893', status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
    { id: '5', name: 'Robert Brown', role: 'Manager', email: 'robert@lumina.com', phone: '+1 234 567 894', status: 'Inactive', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">{t('employees')}</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your team and access permissions.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
          <Plus size={20} />
          {t('add_employee') || 'Add Employee'}
        </button>
      </div>

      {/* Search & Stats */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder={t('search_placeholder')}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
          />
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-sm font-bold dark:text-white">12 {t('online')}</span>
          </div>
          <div className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-3">
            <div className="w-2 h-2 bg-amber-500 rounded-full" />
            <span className="text-sm font-bold dark:text-white">3 {t('on_break')}</span>
          </div>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <div key={emp.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img src={emp.avatar} alt={emp.name} className="w-16 h-16 rounded-2xl border-2 border-slate-100 dark:border-slate-800" />
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900",
                  emp.status === 'Active' ? "bg-emerald-500" : 
                  emp.status === 'On Break' ? "bg-amber-500" : "bg-slate-300"
                )} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{emp.name}</h3>
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-indigo-600" />
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{emp.role}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                <Mail size={16} />
                <span className="text-sm">{emp.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                <Phone size={16} />
                <span className="text-sm">{emp.phone}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-sm font-bold dark:text-white">4.8</span>
                <span className="text-xs text-slate-500">(124 orders)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <Clock size={14} />
                <span className="text-xs font-medium">{t('shift_ends')} 2h</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesPage;
