import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Smartphone,
  Download,
  Share2,
  Copy,
  Check,
  X,
  Layers,
  ArrowRight,
  ShieldCheck,
  Terminal
} from 'lucide-react';

interface NativeAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NativeAppModal: React.FC<NativeAppModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'install' | 'apk' | 'info'>('install');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if running as installed standalone app
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    // Check iOS
    const ua = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(ua));

    const handlePrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handlePrompt);
    return () => window.removeEventListener('beforeinstallprompt', handlePrompt);
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else if (isIOS) {
      alert('En iPhone: Pulsa el botón "Compartir" de Safari y luego selecciona "Agregar al inicio".');
    } else {
      alert('Para instalar en tu teléfono: Abre el menú de tu navegador (los tres puntos) y selecciona "Instalar aplicación" o "Agregar a la pantalla principal".');
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const apkCommands = `# 1. Instala dependencias y compila
npm install
npm run build

# 2. Agrega la plataforma Android nativa
npx cap add android

# 3. Abre el proyecto en Android Studio
npx cap open android

# 4. En Android Studio: Build > Build Bundle(s) / APK(s) > Build APK`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-4 bg-linear-to-r from-[#1B3A8C] to-[#2748A8] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">App Móvil RODA</h3>
                  <p className="text-[10px] text-blue-100">Instalación y compilación nativa</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 bg-gray-50 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('install')}
                className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
                  activeTab === 'install'
                    ? 'border-[#1B3A8C] text-[#1B3A8C] bg-white font-bold'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Instalar en Celular
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('apk')}
                className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
                  activeTab === 'apk'
                    ? 'border-[#1B3A8C] text-[#1B3A8C] bg-white font-bold'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Compilar APK
              </button>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs text-gray-700">
              {activeTab === 'install' && (
                <div className="space-y-3.5">
                  <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-3">
                    <img
                      src="/icon-192.png"
                      alt="Icono RODA"
                      className="w-12 h-12 rounded-2xl shadow-sm border border-white"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">RODA Móvil</h4>
                      <p className="text-[11px] text-gray-600">
                        Instalable como app independiente sin barras de navegador.
                      </p>
                    </div>
                  </div>

                  {isStandalone ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-center font-semibold">
                      ✓ Ya estás ejecutando RODA en modo App Nativa independiente.
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleInstallPWA}
                      className="w-full py-3.5 bg-[#F5821F] hover:bg-[#e07519] text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Instalar en mi teléfono ahora
                    </button>
                  )}

                  <div className="space-y-2 pt-1 border-t border-gray-100">
                    <h5 className="font-bold text-gray-900">¿Cómo funciona?</h5>
                    <ul className="space-y-1.5 text-gray-600 list-disc pl-4 text-[11px]">
                      <li>
                        <strong>Android (Chrome):</strong> Al pulsar el botón se abrirá el diálogo oficial del sistema para agregar el icono de RODA a tu pantalla de inicio.
                      </li>
                      <li>
                        <strong>iPhone (Safari):</strong> Pulsa el botón <strong>Compartir</strong> (icono de cuadrado con flecha hacia arriba) y toca <strong>"Agregar a Inicio"</strong>.
                      </li>
                      <li>
                        La app funcionará en pantalla completa, con caché offline, iconos de RODA e inicio instantáneo sin abrir pestañas web.
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'apk' && (
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Generar APK con Capacitor</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Este proyecto ya incluye <code>capacitor.config.ts</code> configurado para generar una aplicación nativa de Android/iOS con Android Studio o Xcode.
                    </p>
                  </div>

                  <div className="relative bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-[10px] leading-relaxed">
                    <pre className="overflow-x-auto whitespace-pre-wrap">{apkCommands}</pre>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(apkCommands, 'apk')}
                      className="absolute top-2 right-2 p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Copiar comandos"
                    >
                      {copiedCode === 'apk' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900">
                    <strong>Pasos para exportar:</strong> Descarga el código (menú Exportar a ZIP en AI Studio), ejecuta los comandos anteriores en tu computadora con Android Studio instalado y obtendrás el archivo <code>app-release.apk</code> listo para instalar o publicar en Google Play Store.
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl text-xs transition-colors"
              >
                Entendido
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
