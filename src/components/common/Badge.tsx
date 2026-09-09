import React from 'react';
import { MaintenanceStatus } from '../../types';

interface BadgeProps {
  status: MaintenanceStatus | string;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, size = 'sm', className = '' }) => {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs';

  let bgClass = 'bg-orange-50 text-[#F5821F]';

  switch (status.toLowerCase()) {
    case 'pendiente':
      bgClass = 'bg-[#FFF3E8] text-[#F5821F] font-semibold';
      break;
    case 'programado':
    case 'confirmada':
      bgClass = 'bg-[#EAF7EE] text-[#2E9E5B] font-semibold';
      break;
    case 'en proceso':
      bgClass = 'bg-[#FFF3E8] text-[#F5821F] font-semibold';
      break;
    case 'realizado':
      bgClass = 'bg-[#EBF1FC] text-[#1B3A8C] font-semibold';
      break;
    case 'cancelado':
      bgClass = 'bg-red-50 text-red-600 font-semibold';
      break;
    default:
      bgClass = 'bg-gray-100 text-gray-700 font-medium';
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-md tracking-tight transition-colors ${sizeClasses} ${bgClass} ${className}`}
    >
      {status}
    </span>
  );
};
