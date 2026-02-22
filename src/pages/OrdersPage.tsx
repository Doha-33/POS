import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Printer, 
  MoreHorizontal,
  Calendar,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { useTranslation } from 'react-i18next';

const OrdersPage: React.FC = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const orders = [
    { id: 'ORD-8291', customer: 'Sarah Jenkins', items: 3, total: 45.50, status: 'Completed', method: 'Card', date: '10:45 AM' },
    { id: 'ORD-8290', customer: 'Michael Chen', items: 1, total: 12.00, status: 'Pending', method: 'Cash', date: '10:30 AM' },
    { id: 'ORD-8289', customer: 'Emma Wilson', items: 5, total: 124.80, status: 'Completed', method: 'Card', date: '10:15 AM' },
    { id: 'ORD-8288', customer: 'David Miller', items: 2, total: 32.00, status: 'Cancelled', method: 'Cash', date: '09:50 AM' },
    { id: 'ORD-8287', customer: 'James Taylor', items: 4, total: 88.20, status: 'Completed', method: 'Card', date: '09:30 AM' },
    { id: 'ORD-8286', customer: 'Linda Smith', items: 2, total: 25.00, status: 'Completed', method: 'Cash', date: '09:15 AM' },
    { id: 'ORD-8285', customer: 'Robert Brown', items: 1, total: 15.50, status: 'Completed', method: 'Card', date: '09:00 AM' },
  ];

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginatedOrders = orders.slice(
    ((currentPage - 1) * itemsPerPage),
    (currentPage * itemsPerPage)
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">{t('orders')}</h1>
          <p className="text-slate-500 dark:text-slate-400">Track and manage all restaurant transactions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors">
            <Download size={18} />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
            <Printer size={20} />
            Print Report
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Orders Today</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white">142</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Completed</p>
          <p className="text-3xl font-black text-emerald-600">128</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Revenue</p>
          <p className="text-3xl font-black text-indigo-600">$3,450.00</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by Order ID or Customer..."
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
          />
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-600 dark:text-slate-400">
            <Calendar size={18} />
            Today
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-600 dark:text-slate-400">
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Order ID</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Items</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Total</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('status')}</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Method</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Time</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-8 py-4 font-bold text-slate-900 dark:text-white">{order.id}</td>
                  <td className="px-8 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">{order.customer}</td>
                  <td className="px-8 py-4 text-sm text-slate-500">{order.items} items</td>
                  <td className="px-8 py-4 font-bold text-slate-900 dark:text-white">{formatCurrency(order.total)}</td>
                  <td className="px-8 py-4">
                    <span className={cn(
                      "px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full",
                      order.status === 'Completed' ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" :
                      order.status === 'Pending' ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400" :
                      "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-500">{order.method}</td>
                  <td className="px-8 py-4 text-sm text-slate-500">{order.date}</td>
                  <td className="px-8 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold text-slate-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-slate-900 dark:text-white">{Math.min(currentPage * itemsPerPage, orders.length)}</span> of <span className="font-bold text-slate-900 dark:text-white">{orders.length}</span> orders
          </p>
          <div className="flex items-center gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl disabled:opacity-50 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={cn(
                    "w-10 h-10 rounded-xl font-bold text-sm transition-all",
                    currentPage === i + 1 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none" 
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl disabled:opacity-50 hover:bg-slate-50 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
