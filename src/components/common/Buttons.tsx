import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  fullWidth = true,
  className = '',
  icon,
  disabled,
  onClick,
  type = 'button',
}) => {
  return (
    <motion.button
      type={type}
      whileTap={disabled ? {} : { scale: 0.98 }}
      whileHover={disabled ? {} : { scale: 1.01 }}
      disabled={disabled}
      onClick={onClick}
      className={`h-12 px-6 rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2 transition-all shadow-sm ${
        fullWidth ? 'w-full' : 'w-auto'
      } ${
        disabled
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
          : 'bg-[#1B3A8C] hover:bg-[#2748A8] active:bg-[#152e70] text-white shadow-[#1B3A8C]/15'
      } ${className}`}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  fullWidth = true,
  className = '',
  icon,
  disabled,
  onClick,
  type = 'button',
}) => {
  return (
    <motion.button
      type={type}
      whileTap={disabled ? {} : { scale: 0.98 }}
      whileHover={disabled ? {} : { scale: 1.01 }}
      disabled={disabled}
      onClick={onClick}
      className={`h-12 px-6 rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2 transition-all border border-[#1B3A8C] bg-white text-[#1B3A8C] hover:bg-[#1B3A8C]/5 active:bg-[#1B3A8C]/10 ${
        fullWidth ? 'w-full' : 'w-auto'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};

export const CTAButton: React.FC<ButtonProps> = ({
  children,
  fullWidth = true,
  className = '',
  icon,
  disabled,
  onClick,
  type = 'button',
}) => {
  return (
    <motion.button
      type={type}
      whileTap={disabled ? {} : { scale: 0.98 }}
      whileHover={disabled ? {} : { scale: 1.01 }}
      disabled={disabled}
      onClick={onClick}
      className={`h-12 px-6 rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2 transition-all shadow-md shadow-[#F5821F]/25 ${
        fullWidth ? 'w-full' : 'w-auto'
      } ${
        disabled
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
          : 'bg-[#F5821F] hover:bg-[#e07214] text-white'
      } ${className}`}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};

export const CircularBackButton: React.FC<{
  onClick: () => void;
  floating?: boolean;
  className?: string;
}> = ({ onClick, floating = false, className = '' }) => {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
        floating
          ? 'bg-white/95 backdrop-blur-sm text-[#1A1A1A] shadow-md hover:bg-white'
          : 'bg-transparent text-[#1A1A1A] hover:bg-gray-100'
      } ${className}`}
      aria-label="Volver"
    >
      <ChevronLeft className="w-5 h-5 stroke-[2.4]" />
    </motion.button>
  );
};

export const ScreenHeader: React.FC<{
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
  subtitle?: string;
  className?: string;
}> = ({ title, onBack, rightElement, subtitle, className = '' }) => {
  return (
    <div className={`px-5 py-3 flex items-center justify-between border-b border-[#E5E7EB]/60 bg-white sticky top-0 z-20 ${className}`}>
      <div className="flex items-center gap-2 min-w-0">
        {onBack && <CircularBackButton onClick={onBack} />}
        <div className="min-w-0">
          <h1 className="text-[18px] font-bold text-[#1A1A1A] truncate tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-[#8A8F98] truncate">{subtitle}</p>
          )}
        </div>
      </div>
      {rightElement && <div className="flex items-center">{rightElement}</div>}
    </div>
  );
};
