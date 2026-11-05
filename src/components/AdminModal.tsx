import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Product, ProductCategory, AffiliateNetwork } from '../types';
import { CATEGORIES_LIST } from '../data/initialProducts';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  BarChart2, 
  Sliders, 
  Download, 
  RotateCcw, 
  Save, 
  Tag,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  LogOut
} from 'lucide-react';

const ADMIN_PASSWORD_KEY = 'commissionpilot_admin_pwd_v1';
const DEFAULT_ADMIN_PASSWORD = 'pilot2026';

export const AdminModal: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetCatalogToDefault,
    clickRecords,
    affiliateConfig,
    updateAffiliateConfig,
    language 
  } = useApp();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('commissionpilot_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Password Management
  const [currentPassword, setCurrentPassword] = useState<string>(() => {
    return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD;
  });
  const [newPassword, setNewPassword] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  // Tabs & Editing State
  const [activeTab, setActiveTab] = useState<'products' | 'analytics' | 'settings'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // File Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

  // Default Form State
  const defaultProductForm: Product = {
    id: '',
    name: '',
    slug: '',
    category: 'Health & Wellness',
    brand: '',
    price: 59.99,
    currency: 'USD',
    priceVerifiedDate: 'November 2026',
    store: 'Official Store',
    affiliateNetwork: 'Direct Partner',
    affiliateUrl: 'https://www.autocustompack.com/5111QJJ/example',
    image: '/src/assets/images/barefoot_shoes_1793908652368.jpg',
    summary: 'Brief overview of verified performance and build quality.',
    description: 'Comprehensive technical review of this item detailing real specifications, testing data, and usage scenarios.',
    features: ['High-grade materials', 'Ergonomic functional response', 'Verified warranty included'],
    pros: ['Excellent build durability', 'Noticeable real-world comfort', 'Current promotional discount'],
    cons: ['Limited stock in official storefront', 'Requires following manufacturer usage guide'],
    specs: {
      'Category': 'Health & Lifestyle',
      'Warranty': 'Official Store Guarantee',
      'Shipping': 'Fast Express Available'
    },
    buyersGuideNote: 'Best suited for users seeking verified quality over mass-market compromises.',
    ratingScore: 9.5
  };

  const [productForm, setProductForm] = useState<Product>(defaultProductForm);
  const [tagsForm, setTagsForm] = useState(affiliateConfig);

  if (!isAdminOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === currentPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('commissionpilot_auth', 'true');
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError(language === 'es' ? 'Contraseña incorrecta. Inténtalo de nuevo.' : 'Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('commissionpilot_auth');
    setPasswordInput('');
  };

  // Change Admin Password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim() || newPassword.length < 4) {
      alert(language === 'es' ? 'La contraseña debe tener al menos 4 caracteres.' : 'Password must be at least 4 characters long.');
      return;
    }
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
    setCurrentPassword(newPassword);
    setNewPassword('');
    setPasswordChangeSuccess(true);
    setTimeout(() => setPasswordChangeSuccess(false), 3000);
  };

  // Handle Desktop File Upload & Compression
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(language === 'es' ? 'Por favor selecciona un archivo de imagen válido (JPG, PNG, WebP).' : 'Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    setIsUploading(true);
    setUploadFeedback(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress onto canvas so it's optimized for localStorage (< 300KB)
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDimension = 1000;

        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setProductForm((prev) => ({ ...prev, image: dataUrl }));
          setUploadFeedback(
            language === 'es' 
              ? `Foto "${file.name}" cargada y optimizada con éxito (${width}x${height}px).` 
              : `Photo "${file.name}" uploaded & optimized successfully (${width}x${height}px).`
          );
        }
        setIsUploading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      setIsUploading(false);
      alert(language === 'es' ? 'Error al leer el archivo del ordenador.' : 'Error reading file from desktop.');
    };
    reader.readAsDataURL(file);
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingProduct(null);
    setUploadFeedback(null);
    setProductForm({
      ...defaultProductForm,
      id: 'prod-' + Date.now().toString(36),
      slug: 'product-' + Date.now().toString(36)
    });
  };

  const handleStartEdit = (prod: Product) => {
    setEditingProduct(prod);
    setIsCreating(false);
    setUploadFeedback(null);
    setProductForm({ ...prod });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      addProduct(productForm);
      setIsCreating(false);
    } else if (editingProduct) {
      updateProduct(productForm);
      setEditingProduct(null);
    }
  };

  const handleSaveTags = (e: React.FormEvent) => {
    e.preventDefault();
    updateAffiliateConfig(tagsForm);
    alert(language === 'es' ? 'Configuración guardada correctamente.' : 'Settings saved successfully.');
  };

  const exportCatalogJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `commissionpilot_catalog_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs">
      <div 
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ============================================================== */}
        {/* 1. PASSWORD AUTHENTICATION SCREEN (WHEN NOT LOGGED IN)        */}
        {/* ============================================================== */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center shadow-xs">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {language === 'es' ? 'Acceso Privado al Panel de Gestión' : 'Staff CMS Authentication'}
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {language === 'es' 
                  ? 'Este panel es exclusivo para el titular (Amin Ajrif). Introduce la contraseña de administración para gestionar productos y fotos.' 
                  : 'Restricted area for the site administrator. Enter the master password to access product and media controls.'}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  {language === 'es' ? 'Contraseña de Administración' : 'Admin Password'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {authError && (
                  <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{authError}</span>
                  </p>
                )}
                <p className="text-[11px] text-slate-400 pt-0.5">
                  {language === 'es' ? 'Contraseña inicial por defecto: ' : 'Default initial password: '}
                  <code className="text-blue-600 font-mono font-bold bg-blue-50 px-1 py-0.5 rounded">pilot2026</code>
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdminOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  {language === 'es' ? 'Volver a la Web' : 'Return to Site'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                >
                  {language === 'es' ? 'Entrar al Panel' : 'Unlock CMS'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ============================================================== */
          /* 2. AUTHENTICATED CMS DASHBOARD                                */
          /* ============================================================== */
          <>
            {/* Top Bar */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-3">
                <span className="p-1.5 rounded-lg bg-blue-600 text-white">
                  <Sliders className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-sm font-bold flex items-center gap-2">
                    <span>CommissionPilot Admin</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                      {language === 'es' ? 'Sesión Verificada' : 'Authenticated'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Titular: Amin Ajrif · Barcelona
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-3 h-3" />
                  <span>{language === 'es' ? 'Salir' : 'Logout'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsAdminOpen(false);
                    setIsCreating(false);
                    setEditingProduct(null);
                  }}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-4 text-xs font-semibold">
                <button
                  onClick={() => { setActiveTab('products'); setIsCreating(false); setEditingProduct(null); }}
                  className={`py-3.5 border-b-2 transition-colors ${
                    activeTab === 'products' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {language === 'es' ? `Gestión de Productos (${products.length})` : `Products (${products.length})`}
                </button>

                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'analytics' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? `Clics de Enlaces (${clickRecords.length})` : `Outbound Clicks (${clickRecords.length})`}</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'settings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Seguridad y Contraseña' : 'Security & Tags'}</span>
                </button>
              </div>

              <button
                onClick={exportCatalogJson}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md"
                title="Descargar copia del catálogo"
              >
                <Download className="w-3 h-3" />
                <span>Exportar JSON</span>
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-y-auto flex-1 text-xs">
              
              {/* TAB 1: PRODUCT LIST & CREATOR/EDITOR */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  {!isCreating && !editingProduct ? (
                    <>
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-slate-600">
                          {language === 'es'
                            ? 'Añade productos, sube fotos desde tu ordenador o actualiza precios y enlaces oficiales.'
                            : 'Add products, upload photos directly from desktop, or adjust verified pricing.'}
                        </p>

                        <button
                          onClick={handleStartCreate}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-2xs whitespace-nowrap"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{language === 'es' ? 'Añadir Producto' : 'New Product'}</span>
                        </button>
                      </div>

                      {/* Product items list */}
                      <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200 bg-white">
                        {products.map((p) => (
                          <div key={p.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-3 min-w-0">
                              <img src={p.image} alt={p.name} className="w-14 h-14 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0" />
                              <div className="min-w-0">
                                <div className="font-bold text-slate-900 truncate text-sm">{p.name}</div>
                                <div className="text-slate-500 flex flex-wrap items-center gap-2 mt-0.5">
                                  <span className="font-semibold text-slate-700">{p.brand}</span>
                                  <span>·</span>
                                  <span>{p.category}</span>
                                  <span>·</span>
                                  <span className="font-mono tabular-nums font-bold text-slate-800">${p.price.toFixed(2)}</span>
                                  <span>·</span>
                                  <span className="text-blue-600">{p.store}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => handleStartEdit(p)}
                                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Editar"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(language === 'es' ? '¿Eliminar este producto del catálogo?' : 'Delete this product?')) {
                                    deleteProduct(p.id);
                                  }
                                }}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button
                          onClick={() => {
                            if (confirm(language === 'es' ? '¿Restablecer el catálogo por defecto?' : 'Reset to default catalog?')) {
                              resetCatalogToDefault();
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg text-xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{language === 'es' ? 'Restablecer Catálogo por Defecto' : 'Reset to Default'}</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    /* PRODUCT FORM WITH DESKTOP PHOTO UPLOADER */
                    <form onSubmit={handleSaveProduct} className="space-y-5">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <h3 className="font-bold text-slate-900 text-sm">
                          {isCreating 
                            ? (language === 'es' ? 'Añadir Nuevo Producto' : 'Create New Product')
                            : (language === 'es' ? `Editar: ${editingProduct?.name}` : `Edit: ${editingProduct?.name}`)}
                        </h3>
                        <button
                          type="button"
                          onClick={() => { setIsCreating(false); setEditingProduct(null); }}
                          className="text-xs text-slate-500 hover:text-slate-800 underline"
                        >
                          {language === 'es' ? 'Cancelar' : 'Cancel'}
                        </button>
                      </div>

                      {/* --- PHOTO UPLOAD MODULE FROM DESKTOP --- */}
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                            <ImageIcon className="w-4 h-4 text-blue-600" />
                            <span>{language === 'es' ? 'Fotografía del Producto (Desde tu ordenador)' : 'Product Photo (From Desktop)'}</span>
                          </label>
                          <span className="text-[11px] text-slate-500 font-medium">JPG, PNG o WebP</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                          {/* Photo preview */}
                          <div className="sm:col-span-4 aspect-4/3 bg-white border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center relative group">
                            {productForm.image ? (
                              <img src={productForm.image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <div className="text-slate-400 text-center p-3 text-[11px]">
                                {language === 'es' ? 'Sin imagen seleccionada' : 'No image selected'}
                              </div>
                            )}
                          </div>

                          {/* Desktop file picker controls */}
                          <div className="sm:col-span-8 space-y-2">
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileUpload}
                              accept="image/png, image/jpeg, image/webp"
                              className="hidden"
                            />

                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              disabled={isUploading}
                              className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 transition-colors inline-flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                            >
                              <Upload className="w-4 h-4 text-blue-600" />
                              <span>{isUploading ? (language === 'es' ? 'Procesando foto...' : 'Processing...') : (language === 'es' ? 'Seleccionar foto desde tu ordenador' : 'Choose photo from desktop')}</span>
                            </button>

                            {uploadFeedback && (
                              <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                <span>{uploadFeedback}</span>
                              </p>
                            )}

                            <div>
                              <span className="text-[11px] text-slate-500 block mb-1">
                                {language === 'es' ? 'O introduce una URL de imagen externa:' : 'Or enter an external image URL:'}
                              </span>
                              <input
                                type="text"
                                value={productForm.image}
                                onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                                placeholder="https://..."
                                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Regular form fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Product Name</label>
                          <input
                            type="text"
                            required
                            value={productForm.name}
                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Brand</label>
                          <input
                            type="text"
                            required
                            value={productForm.brand}
                            onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Category</label>
                          <select
                            value={productForm.category}
                            onChange={(e) => setProductForm({ ...productForm, category: e.target.value as ProductCategory })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          >
                            {CATEGORIES_LIST.map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Verified Price (USD)</label>
                          <input
                            type="number"
                            step="0.01"
                            required
                            value={productForm.price}
                            onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 font-mono"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Store / Merchant</label>
                          <input
                            type="text"
                            required
                            value={productForm.store}
                            onChange={(e) => setProductForm({ ...productForm, store: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Affiliate Network</label>
                          <select
                            value={productForm.affiliateNetwork}
                            onChange={(e) => setProductForm({ ...productForm, affiliateNetwork: e.target.value as AffiliateNetwork })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          >
                            <option value="Direct Partner">Direct Partner / Custom Offer</option>
                            <option value="Amazon Associates">Amazon Associates</option>
                            <option value="Awin">Awin</option>
                            <option value="CJ Affiliate">CJ Affiliate</option>
                            <option value="ClickBank">ClickBank</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="font-semibold text-slate-700 block mb-1">Affiliate Destination Link (Tracking URL)</label>
                          <input
                            type="url"
                            required
                            value={productForm.affiliateUrl}
                            onChange={(e) => setProductForm({ ...productForm, affiliateUrl: e.target.value })}
                            placeholder="https://..."
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 font-mono text-[11px]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="font-semibold text-slate-700 block mb-1">Summary (1-2 lines)</label>
                          <input
                            type="text"
                            required
                            value={productForm.summary}
                            onChange={(e) => setProductForm({ ...productForm, summary: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="font-semibold text-slate-700 block mb-1">Full Editorial Description</label>
                          <textarea
                            rows={3}
                            required
                            value={productForm.description}
                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                        <button
                          type="button"
                          onClick={() => { setIsCreating(false); setEditingProduct(null); }}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
                        >
                          {language === 'es' ? 'Cancelar' : 'Cancel'}
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{language === 'es' ? 'Guardar Producto' : 'Save Product'}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 2: CLICK ANALYTICS */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {language === 'es' ? 'Métricas de Clics Salientes a Tiendas Oficiales' : 'Outbound Referral Clicks to Official Merchant Stores'}
                    </h3>
                    <p className="text-slate-500 mt-1">
                      {language === 'es'
                        ? 'Registra las redirecciones a ofertas de Grounded Barefoot Shoes y Glacier Breeze.'
                        : 'Tracks user clicks heading to verified offers and partner landing pages.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="text-slate-500 text-[11px] uppercase font-semibold">Total Clics Salientes</div>
                      <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">{clickRecords.length}</div>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="text-slate-500 text-[11px] uppercase font-semibold">Grounded Shoes</div>
                      <div className="text-2xl font-bold font-mono tabular-nums text-emerald-600 mt-1">
                        {clickRecords.filter(r => r.productName.toLowerCase().includes('grounded') || r.productName.toLowerCase().includes('barefoot')).length}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="text-slate-500 text-[11px] uppercase font-semibold">Glacier Breeze</div>
                      <div className="text-2xl font-bold font-mono tabular-nums text-blue-600 mt-1">
                        {clickRecords.filter(r => r.productName.toLowerCase().includes('glacier') || r.productName.toLowerCase().includes('breeze')).length}
                      </div>
                    </div>
                  </div>

                  {clickRecords.length > 0 ? (
                    <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200">
                      <div className="bg-slate-50 px-4 py-2 font-bold text-slate-700 grid grid-cols-12">
                        <span className="col-span-6">Producto</span>
                        <span className="col-span-3">Tienda / Oferta</span>
                        <span className="col-span-3 text-right">Fecha y Hora</span>
                      </div>
                      {clickRecords.map((r) => (
                        <div key={r.id} className="px-4 py-3 bg-white grid grid-cols-12 items-center hover:bg-slate-50">
                          <div className="col-span-6 font-semibold text-slate-900 truncate">
                            {r.productName}
                          </div>
                          <div className="col-span-3 text-slate-600">
                            {r.store}
                          </div>
                          <div className="col-span-3 text-right text-slate-500 font-mono text-[11px]">
                            {new Date(r.timestamp).toLocaleTimeString()} · {new Date(r.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-xl text-slate-500">
                      {language === 'es' ? 'Aún no se han registrado clics salientes en esta sesión.' : 'No outbound referral clicks registered in this session yet.'}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: SECURITY & PASSWORD CHANGE */}
              {activeTab === 'settings' && (
                <div className="space-y-8 max-w-xl">
                  {/* Password Change Form */}
                  <form onSubmit={handleChangePassword} className="space-y-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <KeyRound className="w-4 h-4 text-blue-600" />
                        <span>{language === 'es' ? 'Cambiar Contraseña de Administración' : 'Change Master Password'}</span>
                      </h4>
                      <p className="text-slate-500 text-xs mt-1">
                        {language === 'es'
                          ? 'Personaliza la clave requerida para acceder al panel privado de CommissionPilot.'
                          : 'Update the private master key required to authenticate into this CMS.'}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">
                        {language === 'es' ? 'Nueva Contraseña' : 'New Password'}
                      </label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono"
                      />
                    </div>

                    {passwordChangeSuccess && (
                      <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{language === 'es' ? 'Contraseña actualizada correctamente.' : 'Password updated successfully.'}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs shadow-xs"
                    >
                      {language === 'es' ? 'Actualizar Contraseña' : 'Save New Password'}
                    </button>
                  </form>

                  {/* Affiliate network tags */}
                  <form onSubmit={handleSaveTags} className="space-y-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <h4 className="font-bold text-slate-900 text-sm">
                      {language === 'es' ? 'Identificadores de Redes y Tracking' : 'Affiliate Tracking Tags'}
                    </h4>

                    <div className="space-y-3">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Amazon Tag</label>
                        <input
                          type="text"
                          value={tagsForm.amazonTag}
                          onChange={(e) => setTagsForm({ ...tagsForm, amazonTag: e.target.value })}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Awin ID</label>
                        <input
                          type="text"
                          value={tagsForm.awinId}
                          onChange={(e) => setTagsForm({ ...tagsForm, awinId: e.target.value })}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-xs"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-xs"
                    >
                      {language === 'es' ? 'Guardar Tags' : 'Save Tags'}
                    </button>
                  </form>
                </div>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
};
