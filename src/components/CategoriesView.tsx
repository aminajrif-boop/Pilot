import React, { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES_LIST } from '../data/initialProducts';
import { ProductCategory } from '../types';
import { Filter, Sliders, ArrowUpDown, Search, CheckCircle } from 'lucide-react';

export const CategoriesView: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    language 
  } = useApp();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedNetwork, setSelectedNetwork] = useState<string>('All');

  // Category descriptions
  const categoryDescriptions: Record<string, { en: string; es: string }> = {
    'All': {
      en: 'Discover our complete verified directory of consumer hardware, digital software, and lifestyle gear.',
      es: 'Descubre nuestro directorio verificado completo de dispositivos tecnológicos, software digital y hogar.'
    },
    'Technology & Electronics': {
      en: 'High-fidelity audio, laptops, portable electronics, and computing hardware verified for real-world reliability.',
      es: 'Audio de alta fidelidad, ordenadores portátiles, lectores electrónicos y hardware verificado.'
    },
    'Software & Digital Tools': {
      en: 'Productivity platforms, project workspaces, and utilities designed to accelerate remote teamwork.',
      es: 'Herramientas de productividad, espacios colaborativos y software de gestión de información.'
    },
    'Home & Lifestyle': {
      en: 'Smart environmental climate controllers, cordless cleaning devices, and domestic lifestyle hardware.',
      es: 'Climatización inteligente, aspiración sin cable y dispositivos para un hogar eficiente.'
    },
    'Health & Wellness': {
      en: 'Clinically calibrated oral care, biometric sensors, and precision wellness technology.',
      es: 'Cuidado bucodental sonico, básculas conectadas y tecnología orientada al bienestar personal.'
    },
    'Beauty & Personal Care': {
      en: 'Precision grooming instruments, intelligent hair care, and dermatological tools.',
      es: 'Cuidado personal de precisión, afeitadoras avanzadas y secadores con control térmico.'
    },
    'Business & Productivity': {
      en: 'Ergonomic input devices, commercial monitors, and enterprise-grade ecommerce infrastructure.',
      es: 'Ratones ergonómicos, monitores profesionales y plataformas líderes de comercio digital.'
    },
    'Online Services': {
      en: 'Encrypted virtual networks, cybersecurity suites, and cloud privacy services.',
      es: 'Redes privadas virtuales encriptadas, defensa antimalware y privacidad digital.'
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category match
      if (selectedCategory !== 'All' && prod.category !== selectedCategory) {
        return false;
      }
      // Network match
      if (selectedNetwork !== 'All' && prod.affiliateNetwork !== selectedNetwork) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(q);
        const matchesBrand = prod.brand.toLowerCase().includes(q);
        const matchesSummary = prod.summary.toLowerCase().includes(q);
        const matchesFeatures = prod.features.some(f => f.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesSummary && !matchesFeatures) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.ratingScore - a.ratingScore;
      // Default: featured first
      if (a.isEditorChoice && !b.isEditorChoice) return -1;
      if (!a.isEditorChoice && b.isEditorChoice) return 1;
      return 0;
    });
  }, [products, selectedCategory, selectedNetwork, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Category Banner */}
      <div className="border-b border-slate-200 pb-6">
        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          {language === 'es' ? 'Catálogo Verificado' : 'Verified Catalog'}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {selectedCategory === 'All' 
            ? (language === 'es' ? 'Todos los Productos Recomendados' : 'All Curated Products') 
            : selectedCategory}
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          {categoryDescriptions[selectedCategory] 
            ? (language === 'es' ? categoryDescriptions[selectedCategory].es : categoryDescriptions[selectedCategory].en)
            : categoryDescriptions['All'].en}
        </p>
      </div>

      {/* Filter and Category Controls */}
      <div className="space-y-4">
        
        {/* Category Horizontal Segmented Pills (Functional Interactive Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedCategory === 'All'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {language === 'es' ? 'Todas las Categorías' : 'All Categories'}
          </button>
          {CATEGORIES_LIST.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filter & Sort Bar */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Search within filtered results */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'es' ? 'Filtrar por nombre o modelo...' : 'Filter by name or model...'}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Network filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">{language === 'es' ? 'Red:' : 'Network:'}</span>
              <select
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="All">{language === 'es' ? 'Todas las Redes' : 'All Networks'}</option>
                <option value="Amazon Associates">Amazon Associates</option>
                <option value="Awin">Awin</option>
                <option value="CJ Affiliate">CJ Affiliate</option>
                <option value="Direct Partner">{language === 'es' ? 'Partner Directo' : 'Direct Partner'}</option>
              </select>
            </div>

            {/* Sort order */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">{language === 'es' ? 'Ordenar:' : 'Sort:'}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="featured">{language === 'es' ? 'Recomendados' : 'Editor Picks'}</option>
                <option value="rating">{language === 'es' ? 'Mayor Puntuación' : 'Highest Rating'}</option>
                <option value="price-asc">{language === 'es' ? 'Precio: Menor a Mayor' : 'Price: Low to High'}</option>
                <option value="price-desc">{language === 'es' ? 'Precio: Mayor a Menor' : 'Price: High to Low'}</option>
              </select>
            </div>

            {/* Total count badge */}
            <span className="text-slate-500 font-mono tabular-nums">
              {filteredProducts.length} {language === 'es' ? 'productos' : 'items'}
            </span>
          </div>

        </div>

      </div>

      {/* Product Grid (Responsive: 1 col on mobile, 2 on tablet/desktop when 2 products) */}
      {filteredProducts.length > 0 ? (
        <div className={`grid grid-cols-1 ${filteredProducts.length === 2 ? 'sm:grid-cols-2 max-w-4xl mx-auto' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-6 sm:gap-8`}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <p className="text-sm font-semibold text-slate-800">
            {language === 'es' ? 'No se encontraron productos con estos filtros.' : 'No products found matching these filters.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedNetwork('All');
              setSearchQuery('');
            }}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline"
          >
            {language === 'es' ? 'Restablecer todos los filtros' : 'Reset all filters'}
          </button>
        </div>
      )}

    </div>
  );
};
