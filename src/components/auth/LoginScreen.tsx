import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { StatusBar } from '../common/StatusBar';
import { BrandLogo } from '../common/BrandLogo';
import { DiagonalStripes } from '../common/DiagonalStripes';
import { PrimaryButton, SecondaryButton } from '../common/Buttons';
import { UserRole } from '../../types';

interface LoginScreenProps {
  onLogin: (role: UserRole, userName: string) => void;
  onRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState('carlos.mendoza@email.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>('owner');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (selectedRole === 'owner') {
      onLogin('owner', 'Carlos');
    } else {
      onLogin('shop', 'Taller AutoSoluciones');
    }
  };

  return (
    <div className="relative w-full h-full min-h-[640px] bg-white flex flex-col justify-between overflow-y-auto">
      {/* Decorative corner stripes */}
      <DiagonalStripes position="bottom-right" />

      {/* Status bar */}
      <StatusBar />

      <div className="px-6 pt-4 pb-6 z-10 flex-1 flex flex-col justify-center">
        {/* RODA Logo */}
        <div className="flex justify-center mb-6">
          <BrandLogo size="lg" />
        </div>

        {/* Title & Subtitle */}
        <div className="mb-6">
          <h2 className="text-[22px] font-bold text-[#1A1A1A] tracking-tight">
            Iniciar sesión
          </h2>
          <p className="text-[13px] text-[#8A8F98] mt-1">
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Email field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="w-full h-12 pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#1B3A8C] transition-all"
            />
          </div>

          {/* Password field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full h-12 pl-10 pr-11 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#1B3A8C] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between pt-0.5 text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none text-gray-800">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#1B3A8C] rounded border-gray-300 focus:ring-[#1B3A8C]"
              />
              <span>Recordarme</span>
            </label>
            <button
              type="button"
              onClick={() => alert('Se ha enviado un enlace de recuperación a tu correo.')}
              className="font-medium text-[#1B3A8C] hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Role switcher chip */}
          <div className="pt-1">
            <div className="flex p-1 bg-[#F5F6FA] rounded-xl border border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('owner');
                  setEmail('carlos.mendoza@email.com');
                }}
                className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
                  selectedRole === 'owner'
                    ? 'bg-white text-[#1B3A8C] shadow-xs'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Dueño (Carlos)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('shop');
                  setEmail('autosoluciones@gmail.com');
                }}
                className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
                  selectedRole === 'shop'
                    ? 'bg-white text-[#1B3A8C] shadow-xs'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Taller (AutoSoluciones)
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 space-y-2.5">
            <PrimaryButton type="submit">
              Iniciar sesión
            </PrimaryButton>

            <SecondaryButton onClick={onRegister}>
              Crear cuenta
            </SecondaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};
