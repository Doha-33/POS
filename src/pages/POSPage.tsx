import React, { useState, useEffect } from 'react';
import { useCartStore } from '../store/useCartStore';
import { useUIStore } from '../store/useUIStore';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import { Category, Product } from '../types';
import { 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  Banknote, 
  Percent, 
  Receipt, 
  ShoppingBag,
  X,
  Keyboard,
  ArrowLeft,
  Moon,
  Sun,
  Languages
} from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const POSPage: React.FC = () => {
  const { items, addItem, removeItem, updateQuantity, getTotals, clearCart, setDiscount } = useCartStore();
  const { theme, toggleTheme, language, setLanguage } = useUIStore();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [discountValue, setDiscountValue] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');

  const totals = getTotals();

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F1') {
        e.preventDefault();
        document.getElementById('pos-search')?.focus();
      }
      if (e.key === 'F2') {
        e.preventDefault();
        if (items.length > 0) setIsPaymentModalOpen(true);
      }
      if (e.key === 'Escape') {
        if (isPaymentModalOpen) setIsPaymentModalOpen(false);
        else if (isDiscountModalOpen) setIsDiscountModalOpen(false);
        else clearCart();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items.length, clearCart, isPaymentModalOpen, isDiscountModalOpen]);

  const handleApplyDiscount = () => {
    const val = parseFloat(discountValue);
    if (!isNaN(val)) {
      setDiscount({ type: discountType, value: val });
      setIsDiscountModalOpen(false);
      setDiscountValue('');
    }
  };

  return (
    <div className={cn("h-screen flex flex-col bg-slate-100 dark:bg-slate-950 transition-colors duration-300", theme === 'dark' ? 'dark' : '')}>
      {/* POS Header */}
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-6">
          <Link to="/admin" className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
            <h1 className="text-xl font-bold dark:text-white">Lumina POS</h1>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              id="pos-search"
              type="text"
              placeholder={`${t('search_placeholder')} (F1)`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-2 px-3 py-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-sm font-bold"
          >
            <Languages size={18} />
            <span>{language === 'en' ? 'العربية' : 'English'}</span>
          </button>
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs font-medium text-slate-500">Register #01</span>
            <span className="text-sm font-bold dark:text-white">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <button onClick={toggleTheme} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
            AC
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Product Area */}
        <main className="flex-1 flex flex-col overflow-hidden p-6">
          {/* Categories */}
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('All')}
              className={cn(
                "px-6 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all duration-200",
                selectedCategory === 'All'
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              {t('all_items')}
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all duration-200",
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                {t(cat.toLowerCase().replace(' ', '_')) || cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {filteredProducts.map(product => (
                <motion.button
                  layout
                  key={product.id}
                  onClick={() => addItem(product)}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-xl"
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 text-left">
                    <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">{formatCurrency(product.price)}</span>
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                        product.stock < 10 ? "bg-red-100 text-red-600 dark:bg-red-900/20" : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                      )}>
                        {product.stock} {t('stock')}
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors pointer-events-none" />
                </motion.button>
              ))}
            </div>
          </div>
        </main>

        {/* Cart Sidebar */}
        <aside className="w-[400px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-indigo-600" size={24} />
              <h2 className="text-lg font-bold dark:text-white">{t('current_order')}</h2>
            </div>
            <button 
              onClick={clearCart}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence initial={false}>
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                    <ShoppingBag size={32} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Cart is empty</p>
                    <p className="text-sm text-slate-500">Add some items to start an order</p>
                  </div>
                </div>
              ) : (
                items.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800"
                  >
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 dark:text-white truncate">{item.name}</h4>
                      <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-slate-500 hover:text-indigo-600 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-6 text-center font-bold dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-slate-500 hover:text-indigo-600 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>{t('subtotal')}</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <span>{t('discount')}</span>
                  <button onClick={() => setIsDiscountModalOpen(true)} className="text-indigo-600 hover:underline text-xs font-bold">Edit</button>
                </div>
                <span className="font-semibold text-red-500">-{formatCurrency(totals.discountAmount)}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>{t('tax')} (10%)</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(totals.tax)}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>{t('service_charge')} (5%)</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(totals.serviceCharge)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <span className="text-lg font-bold dark:text-white">{t('total')}</span>
              <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{formatCurrency(totals.total)}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                disabled={items.length === 0}
                onClick={() => setIsPaymentModalOpen(true)}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all disabled:opacity-50 group"
              >
                <Banknote className="text-slate-400 group-hover:text-indigo-600" size={24} />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-indigo-600">{t('cash')}</span>
              </button>
              <button 
                disabled={items.length === 0}
                onClick={() => setIsPaymentModalOpen(true)}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none disabled:opacity-50"
              >
                <CreditCard size={24} />
                <span className="text-xs font-bold">{t('card')} (F2)</span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {isPaymentModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black dark:text-white">{t('complete_payment')}</h2>
                  <button onClick={() => setIsPaymentModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                    <X size={24} className="text-slate-400" />
                  </button>
                </div>

                <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl text-center">
                  <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">{t('amount_due')}</p>
                  <p className="text-5xl font-black text-indigo-600 dark:text-indigo-400">{formatCurrency(totals.total)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 p-6 border-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl transition-all">
                    <Banknote className="text-indigo-600" size={24} />
                    <span className="font-bold text-indigo-600">{t('cash')}</span>
                  </button>
                  <button className="flex items-center justify-center gap-3 p-6 border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-600/50 rounded-2xl transition-all">
                    <CreditCard className="text-slate-400" size={24} />
                    <span className="font-bold text-slate-600 dark:text-slate-400">{t('card')}</span>
                  </button>
                </div>

                <button 
                  onClick={() => {
                    alert('Order Completed Successfully!');
                    clearCart();
                    setIsPaymentModalOpen(false);
                  }}
                  className="w-full py-5 bg-indigo-600 text-white text-lg font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 dark:shadow-none"
                >
                  {t('confirm_payment')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Discount Modal */}
      <AnimatePresence>
        {isDiscountModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDiscountModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <h2 className="text-xl font-bold dark:text-white">{t('apply_discount')}</h2>
                
                <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  <button 
                    onClick={() => setDiscountType('percentage')}
                    className={cn(
                      "flex-1 py-2 rounded-lg font-bold text-sm transition-all",
                      discountType === 'percentage' ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600" : "text-slate-500"
                    )}
                  >
                    Percentage (%)
                  </button>
                  <button 
                    onClick={() => setDiscountType('fixed')}
                    className={cn(
                      "flex-1 py-2 rounded-lg font-bold text-sm transition-all",
                      discountType === 'fixed' ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600" : "text-slate-500"
                    )}
                  >
                    Fixed ($)
                  </button>
                </div>

                <div className="relative">
                  {discountType === 'percentage' ? (
                    <Percent className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  ) : (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  )}
                  <input
                    autoFocus
                    type="number"
                    placeholder="Enter value"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-xl font-bold dark:text-white"
                  />
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsDiscountModalOpen(false)}
                    className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
                  >
                    {t('cancel')}
                  </button>
                  <button 
                    onClick={handleApplyDiscount}
                    className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all"
                  >
                    {t('apply')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default POSPage;
