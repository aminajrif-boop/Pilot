import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductCategory, ReviewArticle, ClickRecord, CookiePreferences } from '../types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from '../data/initialProducts';

export type PageView = 
  | 'home'
  | 'categories'
  | 'comparisons'
  | 'reviews'
  | 'about'
  | 'contact'
  | 'affiliate-disclosure'
  | 'legal';

export type LegalDocType = 
  | 'aviso-legal'
  | 'privacidad'
  | 'cookies'
  | 'afiliacion'
  | 'condiciones';

interface AffiliateConfig {
  amazonTag: string;
  awinId: string;
  cjId: string;
  clickBankUser: string;
}

interface AppContextType {
  products: Product[];
  reviews: ReviewArticle[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  comparisonProductIds: string[];
  toggleComparisonProduct: (productId: string) => void;
  clearComparison: () => void;
  activeLegalDoc: LegalDocType;
  setActiveLegalDoc: (doc: LegalDocType) => void;
  openLegalDoc: (doc: LegalDocType) => void;
  // Affiliate management
  affiliateConfig: AffiliateConfig;
  updateAffiliateConfig: (config: AffiliateConfig) => void;
  clickRecords: ClickRecord[];
  recordClick: (productId: string, productName: string, store: string, network: Product['affiliateNetwork'], targetUrl: string) => void;
  // Redirect modal
  pendingRedirect: { product: Product; store: string; url: string } | null;
  setPendingRedirect: (redirect: { product: Product; store: string; url: string } | null) => void;
  // Admin CMS
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  addProduct: (newProduct: Product) => void;
  updateProduct: (updated: Product) => void;
  deleteProduct: (id: string) => void;
  resetCatalogToDefault: () => void;
  // Cookie Preferences
  cookiePreferences: CookiePreferences;
  saveCookiePreferences: (prefs: Partial<CookiePreferences>) => void;
  isCookieModalOpen: boolean;
  setIsCookieModalOpen: (open: boolean) => void;
  // Language
  language: 'en' | 'es';
  setLanguage: (lang: 'en' | 'es') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_PRODUCTS_KEY = 'commissionpilot_products_v2';
const LOCAL_CLICKS_KEY = 'commissionpilot_clicks_v2';
const LOCAL_AFFILIATE_CONFIG_KEY = 'commissionpilot_affiliate_config_v2';
const LOCAL_COOKIES_KEY = 'commissionpilot_cookies_consent_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_PRODUCTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [reviews] = useState<ReviewArticle[]>(INITIAL_REVIEWS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [comparisonProductIds, setComparisonProductIds] = useState<string[]>([]);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>('aviso-legal');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  const [pendingRedirect, setPendingRedirect] = useState<{ product: Product; store: string; url: string } | null>(null);

  const [affiliateConfig, setAffiliateConfig] = useState<AffiliateConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_AFFILIATE_CONFIG_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {
      amazonTag: 'commissionpilot-20',
      awinId: '11000',
      cjId: '9999',
      clickBankUser: 'commpilot'
    };
  });

  const [clickRecords, setClickRecords] = useState<ClickRecord[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_CLICKS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [];
  });

  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_COOKIES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {
      essential: true,
      analytics: false,
      affiliateTracking: false,
      hasConsented: false
    };
  });

  // Sync products to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {
      console.warn('Could not save products to localStorage', e);
    }
  }, [products]);

  // Sync click records
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_CLICKS_KEY, JSON.stringify(clickRecords));
    } catch (e) {
      // ignore
    }
  }, [clickRecords]);

  // Sync affiliate config
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_AFFILIATE_CONFIG_KEY, JSON.stringify(affiliateConfig));
    } catch (e) {
      // ignore
    }
  }, [affiliateConfig]);

  // Sync cookies
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_COOKIES_KEY, JSON.stringify(cookiePreferences));
    } catch (e) {
      // ignore
    }
  }, [cookiePreferences]);

  const toggleComparisonProduct = (productId: string) => {
    setComparisonProductIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 3) {
        // limit to 3 for clean side-by-side view
        return [...prev.slice(1), productId];
      }
      return [...prev, productId];
    });
  };

  const clearComparison = () => {
    setComparisonProductIds([]);
  };

  const openLegalDoc = (doc: LegalDocType) => {
    setActiveLegalDoc(doc);
    setCurrentPage('legal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateAffiliateConfig = (config: AffiliateConfig) => {
    setAffiliateConfig(config);
  };

  const recordClick = (
    productId: string,
    productName: string,
    store: string,
    network: Product['affiliateNetwork'],
    targetUrl: string
  ) => {
    const newRecord: ClickRecord = {
      id: 'clk-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      productId,
      productName,
      store,
      network,
      timestamp: new Date().toISOString(),
      targetUrl
    };
    setClickRecords((prev) => [newRecord, ...prev.slice(0, 199)]);
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedProduct?.id === updated.id) {
      setSelectedProduct(updated);
    }
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setComparisonProductIds((prev) => prev.filter((item) => item !== id));
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
    }
  };

  const resetCatalogToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem(LOCAL_PRODUCTS_KEY);
  };

  const saveCookiePreferences = (prefs: Partial<CookiePreferences>) => {
    setCookiePreferences((prev) => ({
      ...prev,
      ...prefs,
      essential: true, // always required
      hasConsented: true,
      consentDate: new Date().toISOString()
    }));
  };

  return (
    <AppContext.Provider
      value={{
        products,
        reviews,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        selectedProduct,
        setSelectedProduct,
        comparisonProductIds,
        toggleComparisonProduct,
        clearComparison,
        activeLegalDoc,
        setActiveLegalDoc,
        openLegalDoc,
        affiliateConfig,
        updateAffiliateConfig,
        clickRecords,
        recordClick,
        pendingRedirect,
        setPendingRedirect,
        isAdminOpen,
        setIsAdminOpen,
        addProduct,
        updateProduct,
        deleteProduct,
        resetCatalogToDefault,
        cookiePreferences,
        saveCookiePreferences,
        isCookieModalOpen,
        setIsCookieModalOpen,
        language,
        setLanguage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
