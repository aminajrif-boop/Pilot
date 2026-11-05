import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Menu, X, Globe, ArrowRight } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    setSelectedCategory, 
    setSelectedProduct, 
    comparisonProductIds,
    language,
    setLanguage
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (page: typeof currentPage, category: string = 'All') => {
    setSelectedCategory(category);
    setSelectedProduct(null);
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={() => navigateTo('home')} 
          className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900 hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
        >
          <span className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-blue-500 shadow-sm">
            <Compass className="w-5 h-5 text-blue-400 stroke-[2.25]" />
          </span>
          <span>Commission<span className="text-blue-600">Pilot</span></span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button 
            onClick={() => navigateTo('home')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              currentPage === 'home' 
                ? 'text-blue-600 border-blue-600 font-semibold' 
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            {language === 'es' ? 'Productos' : 'Products'}
          </button>

          <button 
            onClick={() => navigateTo('categories')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              currentPage === 'categories' 
                ? 'text-blue-600 border-blue-600 font-semibold' 
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            {language === 'es' ? 'Categorías' : 'Categories'}
          </button>

          <button 
            onClick={() => navigateTo('comparisons')}
            className={`relative transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              currentPage === 'comparisons' 
                ? 'text-blue-600 border-blue-600 font-semibold' 
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <span>{language === 'es' ? 'Comparativas' : 'Comparisons'}</span>
            {comparisonProductIds.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-blue-100 text-blue-700">
                {comparisonProductIds.length}
              </span>
            )}
          </button>

          <button 
            onClick={() => navigateTo('reviews')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              currentPage === 'reviews' 
                ? 'text-blue-600 border-blue-600 font-semibold' 
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            {language === 'es' ? 'Análisis' : 'Reviews'}
          </button>

          <button 
            onClick={() => navigateTo('about')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              currentPage === 'about' 
                ? 'text-blue-600 border-blue-600 font-semibold' 
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            {language === 'es' ? 'Nosotros' : 'About'}
          </button>

          <button 
            onClick={() => navigateTo('contact')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              currentPage === 'contact' 
                ? 'text-blue-600 border-blue-600 font-semibold' 
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            {language === 'es' ? 'Contacto' : 'Contact'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action (+ clean utility switch) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 text-slate-600 hover:text-slate-900 rounded-md border border-slate-200 hover:border-slate-300 transition-colors"
            title="Switch Language / Cambiar Idioma"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span className="uppercase">{language}</span>
          </button>

          {/* Primary CTA */}
          <button 
            onClick={() => navigateTo('categories')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <span>{language === 'es' ? 'Ver Ofertas' : 'Explore Picks'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            <button 
              onClick={() => navigateTo('home')}
              className="text-left py-2 px-3 text-sm font-medium text-slate-800 rounded-md hover:bg-slate-50"
            >
              {language === 'es' ? 'Productos Destacados' : 'Products & Catalog'}
            </button>
            <button 
              onClick={() => navigateTo('categories')}
              className="text-left py-2 px-3 text-sm font-medium text-slate-800 rounded-md hover:bg-slate-50"
            >
              {language === 'es' ? 'Explorar Categorías' : 'Explore Categories'}
            </button>
            <button 
              onClick={() => navigateTo('comparisons')}
              className="text-left py-2 px-3 text-sm font-medium text-slate-800 rounded-md hover:bg-slate-50 flex items-center justify-between"
            >
              <span>{language === 'es' ? 'Comparativas de Productos' : 'Product Comparisons'}</span>
              {comparisonProductIds.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-blue-100 text-blue-700">
                  {comparisonProductIds.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => navigateTo('reviews')}
              className="text-left py-2 px-3 text-sm font-medium text-slate-800 rounded-md hover:bg-slate-50"
            >
              {language === 'es' ? 'Análisis y Recomendaciones' : 'Reviews & Analysis'}
            </button>
            <button 
              onClick={() => navigateTo('about')}
              className="text-left py-2 px-3 text-sm font-medium text-slate-800 rounded-md hover:bg-slate-50"
            >
              {language === 'es' ? 'Sobre Nosotros' : 'About CommissionPilot'}
            </button>
            <button 
              onClick={() => navigateTo('contact')}
              className="text-left py-2 px-3 text-sm font-medium text-slate-800 rounded-md hover:bg-slate-50"
            >
              {language === 'es' ? 'Contacto' : 'Contact Us'}
            </button>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="text-xs font-semibold px-3 py-2 text-slate-600 rounded-md border border-slate-200"
            >
              {language === 'en' ? 'Español' : 'English'}
            </button>

            <button 
              onClick={() => navigateTo('categories')}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg"
            >
              {language === 'es' ? 'Ver Ofertas' : 'Explore Picks'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
