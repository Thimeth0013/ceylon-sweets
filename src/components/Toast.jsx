import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

const Toast = ({ message, show, onClose, type = 'success' }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed top-6 right-6 z-200 max-w-sm"
        >
          <div className={`${
            type === 'success' 
              ? 'bg-[#D4AF37]' 
              : type === 'error' 
              ? 'bg-red-600' 
              : 'bg-blue-600'
          } text-[#3E2723] font-serif font-bold text-left px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3`}>
            {type === 'success' ? (
              <CheckCircle size={18} className="shrink-0" />
            ) : (
              <XCircle size={18} className="shrink-0" />
            )}
            <p className="font-medium">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;