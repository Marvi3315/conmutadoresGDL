import React, { useState, useMemo } from 'react';
import { 
  Lock, 
  Unlock, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Package, 
  Search, 
  Download, 
  Upload, 
  RefreshCw, 
  ShieldCheck, 
  Sparkles, 
  Tag, 
  Layers, 
  AlertCircle,
  KeyRound,
  Eye,
  EyeOff,
  Mail,
  Image as ImageIcon
} from 'lucide-react';
import { useCatalog } from '../../context/CatalogContext';
import { EquipmentItem } from '../../types';

export const AdminCatalogModal: React.FC = () => {
  const {
    items,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    resetToDefaults,
    exportCatalog,
    importCatalog,
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    isAuthReady,
    adminEmail,
    isBackendConfigured,
    loginAdmin,
    logoutAdmin,
    changePassword,
    sendPasswordReset
  } = useCatalog();

  // Login form state
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetMsg, setResetMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('todos');

  // Change password form state
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordChangeMsg, setPasswordChangeMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Product Editor Modal State
  const [editingItem, setEditingItem] = useState<EquipmentItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState<Partial<EquipmentItem>>({
    name: '',
    model: '',
    brand: 'Panduit',
    category: 'panduit-material',
    description: '',
    specs: [''],
    inStock: true,
    stockQuantity: 'Stock Disponible',
    warranty: '1 Año de Fábrica',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    tag: 'Artículo de Línea',
    sku: '',
    syscomCode: ''
  });

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Quick Preset Images
  const presetImages = [
    { label: 'Cableado / Bobina', url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80' },
    { label: 'Conmutador / PBX', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80' },
    { label: 'Teléfono IP / Ejecutivo', url: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=600&q=80' },
    { label: 'Cámara CCTV 4K', url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80' },
    { label: 'Rack / Servidores', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80' },
    { label: 'Switch / Redes', url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80' },
    { label: 'Seguridad / Grabador', url: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=600&q=80' }
  ];

  const brandOptions: EquipmentItem['brand'][] = [
    'Panduit',
    'Panasonic',
    'Grandstream',
    'Hikvision',
    'Dahua',
    'Ubiquiti',
    'Cisco',
    'Belden',
    'ZKTeco',
    'Charofil',
    'Yeastar',
    'Yealink',
    'Ajax Systems',
    'Otras Marcas'
  ];

  const categoryOptions: { id: EquipmentItem['category']; label: string }[] = [
    { id: 'panduit-material', label: 'Cables & Conectividad Panduit' },
    { id: 'panasonic-telefonia', label: 'Conmutadores & Teléfonos Panasonic' },
    { id: 'conmutadores', label: 'Conmutadores IP & PBX' },
    { id: 'telefonos-ip', label: 'Teléfonos IP & Diademas' },
    { id: 'cctv', label: 'CCTV 4K & Cámaras' },
    { id: 'redes', label: 'Switches & Access Points' },
    { id: 'control-acceso', label: 'Control de Acceso & Biometría' },
    { id: 'alarmas', label: 'Alarmas & Sensores' },
    { id: 'cableado-canalizacion', label: 'Canalización & Charolas' },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchBrand = selectedBrand === 'todos' || item.brand === selectedBrand;
      const query = searchQuery.trim().toLowerCase();
      const matchQuery = !query || 
        item.name.toLowerCase().includes(query) ||
        item.model.toLowerCase().includes(query) ||
        (item.sku && item.sku.toLowerCase().includes(query)) ||
        (item.syscomCode && item.syscomCode.toLowerCase().includes(query));
      return matchBrand && matchQuery;
    });
  }, [items, selectedBrand, searchQuery]);

  if (!isAdminOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      setLoginError('Ingresa tu correo y contraseña.');
      return;
    }
    const result = await loginAdmin(emailInput, passwordInput);
    if (result.success) {
      setLoginError('');
      setPasswordInput('');
    } else {
      setLoginError(result.error || 'Correo o contraseña incorrectos.');
    }
  };

  const handleForgotPassword = async () => {
    if (!emailInput) {
      setResetMsg({ type: 'error', text: 'Escribe tu correo arriba para poder enviarte el enlace de recuperación.' });
      return;
    }
    const result = await sendPasswordReset(emailInput);
    if (result.success) {
      setResetMsg({ type: 'success', text: 'Te enviamos un correo con un enlace para restablecer tu contraseña.' });
    } else {
      setResetMsg({ type: 'error', text: result.error || 'No se pudo enviar el correo de recuperación.' });
    }
  };

  const handleOpenCreate = () => {
    setFormData({
      name: '',
      model: '',
      brand: 'Panduit',
      category: 'panduit-material',
      description: '',
      specs: ['100% Original con garantía de fábrica', 'Disponibilidad para entrega inmediata'],
      inStock: true,
      stockQuantity: 'Stock Disponible',
      warranty: '1 Año de Fábrica',
      imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
      tag: 'Artículo Nuevo',
      sku: '',
      syscomCode: ''
    });
    setEditingItem(null);
    setIsCreatingNew(true);
  };

  const handleOpenEdit = (item: EquipmentItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      model: item.model,
      brand: item.brand,
      category: item.category,
      description: item.description,
      specs: item.specs && item.specs.length > 0 ? item.specs : [''],
      inStock: item.inStock,
      stockQuantity: item.stockQuantity || 'Stock Disponible',
      warranty: item.warranty,
      imageUrl: item.imageUrl,
      tag: item.tag,
      sku: item.sku || '',
      syscomCode: item.syscomCode || ''
    });
    setIsCreatingNew(false);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.model) {
      alert('Por favor ingrese el Nombre y Modelo del producto.');
      return;
    }

    const cleanedSpecs = (formData.specs || []).filter((s) => s.trim().length > 0);

    const productPayload: Omit<EquipmentItem, 'id'> = {
      name: formData.name || '',
      model: formData.model || '',
      brand: formData.brand as EquipmentItem['brand'] || 'Panduit',
      category: formData.category as EquipmentItem['category'] || 'panduit-material',
      description: formData.description || '',
      specs: cleanedSpecs.length > 0 ? cleanedSpecs : ['Garantía de fábrica'],
      inStock: formData.inStock ?? true,
      stockQuantity: formData.stockQuantity || 'Stock Disponible',
      warranty: formData.warranty || '1 Año',
      imageUrl: formData.imageUrl || presetImages[0].url,
      tag: formData.tag || 'Línea',
      sku: formData.sku || undefined,
      syscomCode: formData.syscomCode || undefined
    };

    if (editingItem) {
      updateProduct(editingItem.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    setEditingItem(null);
    setIsCreatingNew(false);
  };

  const handleSpecChange = (index: number, val: string) => {
    const updated = [...(formData.specs || [])];
    updated[index] = val;
    setFormData({ ...formData, specs: updated });
  };

  const handleAddSpec = () => {
    setFormData({ ...formData, specs: [...(formData.specs || []), ''] });
  };

  const handleRemoveSpec = (index: number) => {
    const updated = (formData.specs || []).filter((_, i) => i !== index);
    setFormData({ ...formData, specs: updated });
  };

  const handleExport = () => {
    const dataStr = exportCatalog();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `catalogo_conmutadores_gdl_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = await importCatalog(content);
        if (res.success) {
          setImportStatus('¡Catálogo importado exitosamente!');
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          setImportStatus(`Error: ${res.error}`);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await changePassword(oldPassword, newPassword);
    if (result.success) {
      setPasswordChangeMsg({ type: 'success', text: '¡Contraseña actualizada correctamente!' });
      setTimeout(() => {
        setIsChangingPassword(false);
        setPasswordChangeMsg(null);
        setOldPassword('');
        setNewPassword('');
      }, 2000);
    } else {
      setPasswordChangeMsg({ type: 'error', text: result.error || 'No se pudo actualizar la contraseña.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      
      {/* Container Card */}
      <div className="relative w-full max-w-5xl bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-neutral-100 my-auto">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#111215] border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">Panel de Administración</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Licenciado Felipe Romo González
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Gestión total y en tiempo real del catálogo de artículos y materiales
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-bold text-neutral-300 transition-colors"
                title="Cerrar sesión de administrador"
              >
                Cerrar Sesión
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isBackendConfigured ? (
          /* ==============================================================
             BACKEND NOT CONFIGURED YET
             ============================================================== */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white tracking-tight">
              Panel de Administración no configurado
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Falta conectar el backend de Firebase. Sigue las instrucciones del archivo <code className="text-blue-400">README.md</code> del proyecto para crear el proyecto en Firebase y configurar las variables de entorno.
            </p>
          </div>
        ) : !isAuthReady ? (
          <div className="p-12 flex items-center justify-center text-neutral-400 text-sm">Verificando sesión…</div>
        ) : !isAuthenticated ? (
          /* ==============================================================
             LOGIN SCREEN (SECURE ACCESS ONLY FOR LIC. FELIPE)
             ============================================================== */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-lg">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white tracking-tight">
                Acceso Exclusivo de Administración
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Este panel permite al <strong>Licenciado Felipe Romo González</strong> gestionar el catálogo de productos, existencias en almacén y materiales de telecomunicaciones de forma segura.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  placeholder="Correo del administrador"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  autoFocus
                  autoComplete="username"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {loginError && (
                <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-800/80 text-red-300 text-xs font-semibold flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {resetMsg && (
                <div
                  className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 ${
                    resetMsg.type === 'success'
                      ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300'
                      : 'bg-red-950/60 border-red-800/80 text-red-300'
                  }`}
                >
                  <span>{resetMsg.text}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Entrar al Panel de Control</span>
              </button>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-neutral-500 hover:text-blue-400 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </form>

            <div className="pt-2 text-xs text-neutral-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Autenticación segura con Firebase</span>
            </div>
          </div>
        ) : (
          /* ==============================================================
             DASHBOARD SCREEN (WHEN AUTHENTICATED)
             ============================================================== */
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            
            {/* Top Stat Counters & Actions Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#141519] border border-neutral-800 space-y-1">
                <div className="text-xs text-neutral-400 font-medium">Total Artículos</div>
                <div className="text-2xl font-black text-white">{items.length}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#141519] border border-neutral-800 space-y-1">
                <div className="text-xs text-emerald-400 font-medium">En Stock Inmediato</div>
                <div className="text-2xl font-black text-emerald-400">
                  {items.filter((i) => i.inStock).length}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#141519] border border-neutral-800 space-y-1">
                <div className="text-xs text-blue-400 font-medium">Marcas Activas</div>
                <div className="text-2xl font-black text-blue-400">
                  {new Set(items.map((i) => i.brand)).size}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#141519] border border-neutral-800 space-y-1">
                <div className="text-xs text-amber-400 font-medium">Categorías</div>
                <div className="text-2xl font-black text-amber-400">
                  {new Set(items.map((i) => i.category)).size}
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#141519] p-3.5 rounded-2xl border border-neutral-800">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleOpenCreate}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Agregar Nuevo Artículo</span>
                </button>

                <button
                  type="button"
                  onClick={handleExport}
                  className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-semibold text-xs transition-colors flex items-center gap-1.5"
                  title="Descargar copia de seguridad en JSON"
                >
                  <Download className="w-3.5 h-3.5 text-blue-400" />
                  <span>Exportar Copia</span>
                </button>

                <label className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Importar JSON</span>
                  <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                </label>

                <button
                  type="button"
                  onClick={() => setIsChangingPassword(!isChangingPassword)}
                  className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>Cambiar Contraseña</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('¿Deseas restablecer el catálogo a los artículos y fotos originales de fábrica?')) {
                    resetToDefaults();
                  }
                }}
                className="px-3 py-1.5 rounded-lg text-[11px] text-neutral-400 hover:text-red-400 transition-colors flex items-center gap-1"
                title="Restablecer a valores iniciales"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Restablecer Originales</span>
              </button>
            </div>

            {/* Change Password Dropdown Form */}
            {isChangingPassword && (
              <form onSubmit={handleChangePasswordSubmit} className="p-4 rounded-2xl bg-neutral-900 border border-amber-500/30 space-y-3">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4" />
                  <span>Cambiar Contraseña de Administrador ({adminEmail})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="password"
                    placeholder="Contraseña Actual"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                    autoComplete="current-password"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Nueva Contraseña (mínimo 6 caracteres)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                    autoComplete="new-password"
                    required
                  />
                </div>
                {passwordChangeMsg && (
                  <div className={`text-xs font-bold ${passwordChangeMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {passwordChangeMsg.text}
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsChangingPassword(false)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 text-xs text-neutral-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs"
                  >
                    Guardar Nueva Contraseña
                  </button>
                </div>
              </form>
            )}

            {importStatus && (
              <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800 text-blue-300 text-xs font-bold">
                {importStatus}
              </div>
            )}

            {/* Filter and Search Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar en el panel por nombre, modelo, SKU o código SYSCOM..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#141519] border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedBrand('todos')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedBrand === 'todos'
                      ? 'bg-blue-600 text-white'
                      : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
                  }`}
                >
                  Todas ({items.length})
                </button>
                {brandOptions.slice(0, 6).map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSelectedBrand(b)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedBrand === b
                        ? 'bg-blue-600 text-white'
                        : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Products List */}
            <div className="space-y-3">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center bg-[#141519] rounded-2xl border border-neutral-800 text-neutral-400 text-xs">
                  No hay artículos que coincidan con la búsqueda.
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#141519] border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    {/* Item Thumbnail and Details */}
                    <div className="flex items-start gap-3.5 min-w-0 flex-1">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover bg-neutral-900 shrink-0 border border-neutral-800"
                      />
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-black text-[10px] uppercase">
                            {item.brand}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px]">
                            {item.model}
                          </span>
                          {item.syscomCode && (
                            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-[10px]">
                              SYSCOM: {item.syscomCode}
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 text-[10px]">
                            {item.tag}
                          </span>
                        </div>

                        <h4 className="font-bold text-sm text-white truncate">
                          {item.name}
                        </h4>

                        <div className="text-xs text-neutral-400 line-clamp-1">
                          {item.description}
                        </div>
                      </div>
                    </div>

                    {/* Stock switch & Action buttons */}
                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      
                      {/* In Stock Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleStock(item.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          item.inStock
                            ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                            : 'bg-red-950/60 border border-red-800 text-red-300'
                        }`}
                        title="Clic para cambiar estado de stock"
                      >
                        <span className={`w-2 h-2 rounded-full ${item.inStock ? 'bg-emerald-400' : 'bg-red-400'}`} />
                        <span>{item.inStock ? (item.stockQuantity || 'En Stock') : 'Sin Stock'}</span>
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-blue-400 border border-neutral-700 transition-colors"
                        title="Editar detalles del producto"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Delete Button */}
                      {deleteConfirmId === item.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              deleteProduct(item.id);
                              setDeleteConfirmId(null);
                            }}
                            className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded-lg"
                          >
                            Confirmar
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-2 py-1 bg-neutral-800 text-neutral-300 text-[10px] font-bold rounded-lg"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-red-400 border border-neutral-700 transition-colors"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

      </div>

      {/* ==============================================================
          ADD / EDIT PRODUCT MODAL FORM
          ============================================================== */}
      {(isCreatingNew || editingItem) && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-neutral-100 max-h-[94vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {editingItem ? 'Editar Artículo' : 'Agregar Nuevo Artículo al Catálogo'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setIsCreatingNew(false);
                }}
                className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              
              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">Nombre Completo del Producto *</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej. Bobina Panduit Cat6 TX6000 100% Cobre Azul 305m"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141519] border border-neutral-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Brand & Category Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Marca *</label>
                  <select
                    value={formData.brand || 'Panduit'}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value as EquipmentItem['brand'] })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141519] border border-neutral-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {brandOptions.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Categoría del Catálogo *</label>
                  <select
                    value={formData.category || 'panduit-material'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as EquipmentItem['category'] })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141519] border border-neutral-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Model, SKU & Syscom Code Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Modelo *</label>
                  <input
                    type="text"
                    value={formData.model || ''}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="Ej. PANDUIT PUC6004BU-FE"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#141519] border border-neutral-700 text-xs text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Código SKU</label>
                  <input
                    type="text"
                    value={formData.sku || ''}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="Ej. PAN-PUC6004BUFE"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#141519] border border-neutral-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Código SYSCOM</label>
                  <input
                    type="text"
                    value={formData.syscomCode || ''}
                    onChange={(e) => setFormData({ ...formData, syscomCode: e.target.value })}
                    placeholder="Ej. PUC6004BU-FE"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#141519] border border-neutral-700 text-xs text-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">Descripción del Producto</label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descripción de características, compatibilidad y aplicaciones recomendadas..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#141519] border border-neutral-700 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Tag, Warranty, Stock Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Etiqueta Destacada (Badge)</label>
                  <input
                    type="text"
                    value={formData.tag || ''}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="Ej. 100% Cobre Puro / Más Vendido"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#141519] border border-neutral-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Garantía</label>
                  <input
                    type="text"
                    value={formData.warranty || ''}
                    onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                    placeholder="Ej. 1 Año / 2 Años de Fábrica"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#141519] border border-neutral-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Existencias / Stock</label>
                  <input
                    type="text"
                    value={formData.stockQuantity || ''}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                    placeholder="Ej. 45 bobinas en bodega"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#141519] border border-neutral-700 text-xs text-white"
                  />
                </div>
              </div>

              {/* In Stock Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={formData.inStock ?? true}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 bg-neutral-900 border-neutral-700"
                />
                <label htmlFor="inStockCheck" className="text-xs font-bold text-neutral-200 cursor-pointer">
                  Marcar producto como "En Stock Disponible" en la tienda
                </label>
              </div>

              {/* Image URL & Presets */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-neutral-300">URL de Imagen del Producto</label>
                <input
                  type="text"
                  value={formData.imageUrl || ''}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#141519] border border-neutral-700 text-xs text-white font-mono"
                />
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" />
                    Fotos sugeridas:
                  </span>
                  {presetImages.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                      className="px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-[10px] text-neutral-400 hover:text-white border border-neutral-800"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technical Specs List */}
              <div className="space-y-2 pt-2 border-t border-neutral-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-300">Especificaciones Técnicas (Viñetas)</label>
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="text-[11px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>+ Agregar Viñeta</span>
                  </button>
                </div>

                {(formData.specs || []).map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={spec}
                      onChange={(e) => handleSpecChange(sIdx, e.target.value)}
                      placeholder={`Característica técnica #${sIdx + 1}`}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-[#141519] border border-neutral-700 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(sIdx)}
                      className="p-1.5 rounded-lg bg-neutral-900 text-neutral-500 hover:text-red-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setIsCreatingNew(false);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Guardar Producto</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
