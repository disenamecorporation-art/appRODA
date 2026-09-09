import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import { NotificationItem, ScreenId } from '../../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onNavigate: (screen: ScreenId) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onNavigate,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-2xl shadow-xl overflow-hidden max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1B3A8C]/10 flex items-center justify-center text-[#1B3A8C]">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Notificaciones</h3>
                  <p className="text-xs text-gray-500">Recordatorios de tus vehículos</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="p-4 space-y-3 overflow-y-auto divide-y divide-gray-50">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.actionScreen) {
                      onNavigate(item.actionScreen as ScreenId);
                      onClose();
                    }
                  }}
                  className="pt-3 first:pt-0 cursor-pointer group flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="mt-0.5 shrink-0">
                    {item.type === 'reminder' && (
                      <div className="w-8 h-8 rounded-full bg-orange-100 text-[#F5821F] flex items-center justify-center">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                    )}
                    {item.type === 'confirmation' && (
                      <div className="w-8 h-8 rounded-full bg-green-100 text-[#2E9E5B] flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                    {item.type === 'alert' && (
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-[#1B3A8C] flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-semibold text-gray-900 group-hover:text-[#1B3A8C]">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap">{item.date}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed line-clamp-2">
                      {item.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-100 bg-gray-50 text-center">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-[#1B3A8C] hover:underline"
              >
                Cerrar notificaciones
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
