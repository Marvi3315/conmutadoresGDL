import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageSquare, 
  Menu, 
  X, 
  ChevronDown, 
  Cpu, 
  Camera, 
  Network, 
  Lock, 
  ShieldCheck, 
  Wrench, 
  FileText,
  Sun,
  Moon,
  ArrowRight,
  Radio,
  Layers
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/telecomData';
import { PhoneHandsetLogo } from '../ui/PhoneHandsetLogo';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  onOpenCalculator: () => void;
  onSelectService: (serviceId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCalculator, onSelectService }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;
      
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setIsScrolled(currentScrollY > 35);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceNavItems = [
    { 
      id: 'conmutadores-ip', 
      name: 'Conmutadores IP & Telefonía', 
      icon: Cpu, 
      desc: 'Centrales IP Grandstream/Panasonic, Troncales SIP y IVR', 
      badge: 'Telefonía IP',
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' 
    },
    { 
      id: 'cctv-videovigilancia', 
      name: 'CCTV & Cámaras IP 4K', 
      icon: Camera, 
      desc: 'Hikvision, Dahua y Uniarch con IA y ColorVu', 
      badge: 'Vigilancia 4K',
      color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' 
    },
    { 
      id: 'cableado-redes-fibra', 
      name: 'Cableado Estructurado & Fibra', 
      icon: Network, 
      desc: 'Panduit Cat6/6A y enlaces de fibra óptica certificados', 
      badge: 'Panduit Certified',
      color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20' 
    },
    { 
      id: 'control-acceso-asistencia', 
      name: 'Control de Acceso & Biometría', 
      icon: Lock, 
      desc: 'ZKTeco y Hikvision: facial, huella, torniquetes y chapas', 
      badge: 'Biométrico',
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
    },
    { 
      id: 'alarmas-cercas-electricas', 
      name: 'Alarmas & Cercas Eléctricas', 
      icon: ShieldCheck, 
      desc: 'Protección perimetral inteligente y monitoreo 24/7', 
      badge: 'Seguridad',
      color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' 
    },
    { 
      id: 'reparacion-soporte-tecnico', 
      name: 'Reparación & Soporte Técnico', 
      icon: Wrench, 
      desc: 'Laboratorio electrónico y técnicos certificados en sitio', 
      badge: 'Soporte GDL',
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' 
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      
      {/* 1. Ultra-precise Reading & Scroll Progress Neon Line */}
      <div className="w-full h-[2.5px] bg-slate-900/10 dark:bg-black/40 relative pointer-events-auto overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]"
          style={{ width: `${scrollProgress}%` }}
          transition={{ ease: "easeOut", duration: 0.1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-3">
        <AnimatePresence mode="wait">
          
          {/* ========================================================= */}
          {/* STATE A: INITIAL MINIMALIST COMMAND CAPSULE (Scroll <= 35) */}
          {/* ========================================================= */}
          {!isScrolled ? (
            <motion.div
              key="capsule-nav"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="pointer-events-auto flex items-center justify-between mx-auto max-w-4xl bg-slate-950/90 dark:bg-[#0a0b0e]/90 backdrop-blur-2xl border border-white/15 dark:border-cyan-500/20 rounded-full py-1.5 px-3 sm:px-4 shadow-xl ring-1 ring-white/10 dark:ring-white/5 text-white"
            >
              {/* Left: Brand Monogram & Live Status */}
              <a href="#" className="flex items-center gap-2.5 group shrink-0">
                <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-blue-400/30 bg-black flex items-center justify-center group-hover:scale-105 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                  <PhoneHandsetLogo className="w-full h-full" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-black tracking-tight text-white flex items-center gap-1">
                    <span>CONMUTADORES</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">GDL</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-medium tracking-wide text-neutral-300 bg-white/5 border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Jalisco & Nacional</span>
                  </span>
                </div>
              </a>

              {/* Center: Clean Navigation Links */}
              <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-neutral-300">
                <a 
                  href="#servicios" 
                  className="px-3 py-1 rounded-full hover:text-white hover:bg-white/10 transition-colors"
                >
                  Servicios
                </a>
                <a 
                  href="#materiales" 
                  className="px-3 py-1 rounded-full hover:text-white hover:bg-white/10 transition-colors"
                >
                  Materiales
                </a>
                <a 
                  href="#syscom" 
                  className="px-3 py-1 rounded-full hover:text-white hover:bg-white/10 transition-colors"
                >
                  SYSCOM
                </a>
                <a 
                  href="#calculadora-red" 
                  className="px-3 py-1 rounded-full hover:text-white hover:bg-white/10 transition-colors"
                >
                  Calculadora
                </a>
                <a 
                  href="#contacto" 
                  className="px-3 py-1 rounded-full hover:text-white hover:bg-white/10 transition-colors"
                >
                  Contacto
                </a>
              </nav>

              {/* Right: Quick Action Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                
                {/* Theme Toggle Button */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  type="button"
                  onClick={toggleTheme}
                  aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-200 border border-white/10 transition-colors cursor-pointer"
                  title={isDark ? 'Modo Claro' : 'Modo Oscuro'}
                >
                  {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-blue-200" />}
                </motion.button>

                {/* Primary Fast Quote CTA */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={onOpenCalculator}
                  className="px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1 cursor-pointer border border-blue-400/30"
                >
                  <FileText className="w-3 h-3 text-cyan-200" />
                  <span>Cotizar</span>
                </motion.button>

                {/* WhatsApp Direct Action */}
                <motion.a
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hola%20Licenciado%20Felipe%20Romo,%20solicito%20información%20o%20cotización.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 transition-all flex items-center justify-center cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                  title="WhatsApp Directo"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </motion.div>
          ) : (
            
            /* ========================================================= */
            /* STATE B: FULL EXPANDED EXECUTIVE AEROSPACE BAR (Scroll > 35) */
            /* ========================================================= */
            <motion.nav
              key="expanded-nav"
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="pointer-events-auto w-full bg-white/90 dark:bg-[#0c0d10]/90 backdrop-blur-xl border border-slate-200/90 dark:border-neutral-800/90 rounded-2xl py-1.5 px-3 sm:px-4 lg:px-5 shadow-lg shadow-black/5 dark:shadow-black/40 ring-1 ring-slate-900/5 dark:ring-white/5 transition-all"
            >
              <div className="flex items-center justify-between gap-2 min-w-0">
                
                {/* Logo & Compact Brand Title */}
                <a href="#" className="flex items-center gap-2.5 group shrink-0">
                  <div className="w-8 h-8 rounded-lg overflow-hidden shadow-xs shrink-0 border border-slate-200 dark:border-neutral-800 bg-black flex items-center justify-center group-hover:scale-105 transition-transform">
                    <PhoneHandsetLogo className="w-full h-full" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-black tracking-tight text-slate-950 dark:text-white leading-tight">
                        CONMUTADORES <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-blue-400 dark:via-cyan-300 dark:to-teal-300">GDL</span>
                      </span>
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-medium tracking-wide text-slate-600 dark:text-neutral-300 bg-slate-100 dark:bg-neutral-800/90 border border-slate-200/80 dark:border-neutral-700/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>Jalisco & Nacional</span>
                      </span>
                    </div>
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 dark:text-neutral-500 font-medium hidden xs:block leading-none mt-0.5">
                      Telecomunicaciones & Seguridad
                    </span>
                  </div>
                </a>

                {/* Desktop Navigation Links (Clean, No Icons, No Extra Badges) */}
                <div className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-neutral-300">
                  
                  {/* Servicios Mega Menu Dropdown */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <button 
                      type="button"
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all font-semibold cursor-pointer text-xs ${
                        servicesDropdownOpen 
                          ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/20' 
                          : 'hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-neutral-800/80'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Servicios</span>
                      <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute top-full left-0 w-[580px] mt-1.5 p-3 bg-white/95 dark:bg-[#121317]/95 backdrop-blur-2xl border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-2xl grid grid-cols-2 gap-1.5 z-50 ring-1 ring-black/5 dark:ring-white/10"
                        >
                          {serviceNavItems.map((item) => {
                            const IconComp = item.icon;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  setServicesDropdownOpen(false);
                                  onSelectService(item.id);
                                }}
                                className="flex items-start gap-2.5 p-2 text-left rounded-xl hover:bg-slate-50 dark:hover:bg-neutral-800/70 transition-all group cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-neutral-700/80"
                              >
                                <div className={`p-1.5 rounded-lg ${item.color} border shrink-0 group-hover:scale-105 transition-transform`}>
                                  <IconComp className="w-3.5 h-3.5" />
                                </div>
                                <div className="space-y-0.5">
                                  <div className="text-[11px] font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {item.name}
                                  </div>
                                  <div className="text-[10px] text-slate-500 dark:text-neutral-400 line-clamp-1 leading-tight">
                                    {item.desc}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                          
                          <div className="col-span-2 pt-2 mt-0.5 border-t border-slate-100 dark:border-neutral-800/90 flex items-center justify-between px-2 text-[11px] text-slate-500 dark:text-neutral-400">
                            <span className="flex items-center gap-1">
                              <Radio className="w-3 h-3 text-blue-500 animate-pulse" />
                              <span>¿Requieres levantamiento técnico en sitio?</span>
                            </span>
                            <a href="#contacto" className="text-blue-600 dark:text-blue-400 hover:underline font-bold flex items-center gap-0.5">
                              <span>Agendar</span>
                              <ArrowRight className="w-3 h-3" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Materiales */}
                  <a 
                    href="#materiales" 
                    className="px-3 py-1.5 rounded-lg text-slate-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-neutral-800/80 transition-colors"
                  >
                    Materiales
                  </a>

                  {/* SYSCOM */}
                  <a 
                    href="#syscom" 
                    className="px-3 py-1.5 rounded-lg text-slate-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-neutral-800/80 transition-colors"
                  >
                    SYSCOM
                  </a>

                  {/* Calculadora */}
                  <a 
                    href="#calculadora-red" 
                    className="px-3 py-1.5 rounded-lg text-slate-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-neutral-800/80 transition-colors"
                  >
                    Calculadora
                  </a>

                  {/* Contacto */}
                  <a 
                    href="#contacto" 
                    className="px-3 py-1.5 rounded-lg text-slate-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-neutral-800/80 transition-colors"
                  >
                    Contacto
                  </a>
                </div>

                {/* Tablet Navigation Links (For screens between lg and xl) */}
                <div className="hidden lg:flex xl:hidden items-center gap-1 text-xs font-semibold text-slate-700 dark:text-neutral-300">
                  <a href="#servicios" className="px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800/80">Servicios</a>
                  <a href="#materiales" className="px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800/80">Materiales</a>
                  <a href="#syscom" className="px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800/80">SYSCOM</a>
                  <a href="#contacto" className="px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800/80">Contacto</a>
                </div>

                {/* Desktop Action Trigger & Stylized Executive Direct Line */}
                <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0 min-w-0">
                  
                  {/* Theme Switcher */}
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    type="button"
                    onClick={toggleTheme}
                    aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-neutral-800/90 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700 transition-colors cursor-pointer shrink-0"
                    title={isDark ? 'Modo Claro' : 'Modo Oscuro'}
                  >
                    {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
                  </motion.button>

                  {/* Stylized Executive Phone Capsule — only shown once there's room (xl+) */}
                  <a 
                    href={`tel:${COMPANY_INFO.phoneDirect.replace(/\s/g, '')}`}
                    className="hidden xl:flex group items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-neutral-900/80 hover:bg-blue-50/80 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-neutral-800 transition-all text-left shrink-0"
                    title="Línea de Atención Directa con el Lic. Felipe Romo"
                  >
                    <div className="w-6 h-6 rounded-lg bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-3 h-3" />
                    </div>
                    <div className="leading-tight">
                      <div className="flex items-center gap-1 text-[8px] uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Lic. Felipe Romo</span>
                      </div>
                      <div className="text-[11px] font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {COMPANY_INFO.phoneMain}
                      </div>
                    </div>
                  </a>

                  {/* High-Contrast Compact Quotation Button */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={onOpenCalculator}
                    className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer border border-blue-400/30"
                  >
                    <FileText className="w-3 h-3 text-cyan-200" />
                    <span>Cotizar</span>
                  </motion.button>

                  {/* WhatsApp Executive Shortcut */}
                  <motion.a
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hola%20Licenciado%20Felipe%20Romo,%20deseo%20cotizar%20un%20servicio%20para%20mi%20empresa.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 transition-all flex items-center justify-center shadow-xs"
                    title="Chatear con el Licenciado Felipe Romo González por WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </motion.a>
                </div>

                {/* Mobile Controls (Compact & Touch-Friendly) */}
                <div className="flex lg:hidden items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700"
                  >
                    {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={onOpenCalculator}
                    className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                  >
                    <FileText className="w-2.5 h-2.5" />
                    <span>Cotizar</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-700 dark:text-neutral-300"
                    aria-label="Abrir Menú"
                  >
                    {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
                  </button>
                </div>

              </div>

              {/* Mobile Drawer Accordion */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="lg:hidden pt-3 mt-3 border-t border-slate-200 dark:border-neutral-800 space-y-3 overflow-hidden"
                  >
                    <div className="flex items-center justify-center gap-1.5 py-1 px-3 rounded-lg bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700 text-[10px] font-medium tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>Guadalajara, Jalisco · Cobertura Nacional</span>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-[#121317] rounded-2xl border border-slate-200 dark:border-neutral-800 space-y-2">
                      <div className="text-[11px] font-black text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                        Nuestros Servicios
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {serviceNavItems.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              onSelectService(item.id);
                            }}
                            className="flex items-center gap-2.5 p-2 rounded-xl text-left text-xs text-slate-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 hover:text-blue-600"
                          >
                            <item.icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                            <span className="font-semibold">{item.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1 text-xs font-semibold text-slate-700 dark:text-neutral-300">
                      <a 
                        href="#materiales" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="block p-2 text-slate-800 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-neutral-800/80 rounded-xl"
                      >
                        Materiales
                      </a>
                      <a 
                        href="#syscom" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="block p-2 text-slate-800 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-neutral-800/80 rounded-xl"
                      >
                        SYSCOM
                      </a>
                      <a 
                        href="#calculadora-red" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="block p-2 text-slate-800 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-neutral-800/80 rounded-xl"
                      >
                        Calculadora
                      </a>
                      <a 
                        href="#contacto" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="block p-2 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-neutral-800/80 rounded-xl"
                      >
                        Contacto
                      </a>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-neutral-800 space-y-1.5">
                      <a
                        href={`tel:${COMPANY_INFO.phoneDirect.replace(/\s/g, '')}`}
                        className="w-full py-2 px-3 rounded-xl bg-blue-50 dark:bg-neutral-800/90 border border-blue-200 dark:border-neutral-700 text-blue-800 dark:text-blue-300 font-bold text-xs flex items-center justify-center gap-2"
                      >
                        <Phone className="w-3.5 h-3.5 text-blue-600" />
                        <span>Llamar a Lic. Felipe Romo: {COMPANY_INFO.phoneMain}</span>
                      </a>
                      <a
                        href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hola%20Licenciado%20Felipe%20Romo,%20requiero%20atención%20inmediata.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp Directo</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};


