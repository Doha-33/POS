import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "pos": "POS",
      "dashboard": "Dashboard",
      "analytics": "Analytics",
      "orders": "Orders",
      "products": "Products",
      "employees": "Employees",
      "settings": "Settings",
      "logout": "Logout",
      "open_pos": "Open POS",
      "search_placeholder": "Search products...",
      "all_items": "All Items",
      "current_order": "Current Order",
      "subtotal": "Subtotal",
      "discount": "Discount",
      "tax": "Tax",
      "service_charge": "Service Charge",
      "total": "Total",
      "cash": "Cash",
      "card": "Card",
      "complete_payment": "Complete Payment",
      "amount_due": "Amount Due",
      "confirm_payment": "Confirm Payment",
      "apply_discount": "Apply Discount",
      "cancel": "Cancel",
      "apply": "Apply",
      "revenue": "Revenue",
      "growth": "Growth",
      "recent_orders": "Recent Orders",
      "view_all": "View All",
      "stock": "Stock",
      "price": "Price",
      "status": "Status",
      "actions": "Actions",
      "add_product": "Add Product",
      "active": "Active",
      "out_of_stock": "Out of Stock",
      "online": "Online",
      "on_break": "On Break",
      "inactive": "Inactive",
      "shift_ends": "Shift ends in",
      "total_revenue": "Total Revenue",
      "total_orders": "Total Orders",
      "new_customers": "New Customers",
      "avg_order_value": "Avg. Order Value",
      "language": "Language",
      "arabic": "Arabic",
      "english": "English",
      "theme": "Theme",
      "light": "Light",
      "dark": "Dark"
    }
  },
  ar: {
    translation: {
      "pos": "نقطة البيع",
      "dashboard": "لوحة التحكم",
      "analytics": "التحليلات",
      "orders": "الطلبات",
      "products": "المنتجات",
      "employees": "الموظفين",
      "settings": "الإعدادات",
      "logout": "تسجيل الخروج",
      "open_pos": "فتح نقطة البيع",
      "search_placeholder": "بحث عن منتجات...",
      "all_items": "كل الأصناف",
      "current_order": "الطلب الحالي",
      "subtotal": "المجموع الفرعي",
      "discount": "الخصم",
      "tax": "الضريبة",
      "service_charge": "رسوم الخدمة",
      "total": "الإجمالي",
      "cash": "نقداً",
      "card": "بطاقة",
      "complete_payment": "إتمام الدفع",
      "amount_due": "المبلغ المستحق",
      "confirm_payment": "تأكيد الدفع",
      "apply_discount": "تطبيق الخصم",
      "cancel": "إلغاء",
      "apply": "تطبيق",
      "revenue": "الإيرادات",
      "growth": "النمو",
      "recent_orders": "أحدث الطلبات",
      "view_all": "عرض الكل",
      "stock": "المخزون",
      "price": "السعر",
      "status": "الحالة",
      "actions": "الإجراءات",
      "add_product": "إضافة منتج",
      "active": "نشط",
      "out_of_stock": "نفذ المخزون",
      "online": "متصل",
      "on_break": "في استراحة",
      "inactive": "غير نشط",
      "shift_ends": "ينتهي الوردية في",
      "total_revenue": "إجمالي الإيرادات",
      "total_orders": "إجمالي الطلبات",
      "new_customers": "عملاء جدد",
      "avg_order_value": "متوسط قيمة الطلب",
      "language": "اللغة",
      "arabic": "العربية",
      "english": "الإنجليزية",
      "theme": "المظهر",
      "light": "فاتح",
      "dark": "داكن"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
