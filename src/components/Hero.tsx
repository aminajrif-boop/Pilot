import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    setCurrentPage, 
    setSelectedCategory,
    language 
  } = useApp();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage('categories');
    }
  };

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-10 pb-16 lg:pt-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Editorial Headline & Search */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editorial Kicker (Unboxed text with subtle separator, no pill) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-blue-600">
              <span>CommissionPilot</span>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <span className="text-slate-500 font-medium tracking-normal capitalize">
                {language === 'es' ? 'Descubrimiento y Selección de Productos' : 'Product Discovery & Editorial Selection'}
              </span>
            </div>

            {/* Main Title (Prompt specified exact title) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              {language === 'es' 
                ? 'Descubre los productos que marcan la diferencia.' 
                : 'Discover the products that make a difference.'}
            </h1>

            {/* Subtitle (Prompt specified exact subtitle) */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {language === 'es'
                ? 'Explora productos cuidadosamente seleccionados, descubre recomendaciones útiles y encuentra las opciones adecuadas para tus necesidades.'
                : 'Explore carefully selected products, discover useful recommendations and find the right options for your needs.'}
            </p>

            {/* Live Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    language === 'es'
                      ? 'Buscar por producto, marca o especificación (ej. Sony, Notion, M3)...'
                      : 'Search by product, brand, or feature (e.g. Sony, Notion, M3)...'
                  }
                  className="w-full pl-12 pr-28 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                >
                  {language === 'es' ? 'Buscar' : 'Search'}
                </button>
              </div>
            </form>

            {/* CTAs (Prompt specified exact buttons: Explore Products / Discover Categories) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setCurrentPage('categories');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-xl transition-colors shadow-sm"
              >
                <span>{language === 'es' ? 'Explorar Productos' : 'Explore Products'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setCurrentPage('categories');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors"
              >
                <span>{language === 'es' ? 'Descubrir Categorías' : 'Discover Categories'}</span>
              </button>
            </div>

            {/* Trust Markers (Unboxed quiet text) */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{language === 'es' ? 'Especificaciones 100% verificadas' : '100% verified specifications'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{language === 'es' ? 'Enlaces directos a tiendas oficiales' : 'Direct links to official stores'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700">0%</span>
                <span>{language === 'es' ? 'Sin sobrecoste al comprar' : 'No surcharge to consumers'}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xl group">
              <img
                src="/src/assets/images/barefoot_shoes_1793908652368.jpg"
                alt="Grounded Barefoot Shoes and Lifestyle Gear"
                className="w-full h-auto aspect-16/10 object-cover group-hover:scale-[1.02] transition-transform duration-500"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Card Details */}
              <div className="p-4 sm:p-5 bg-white border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-500">
                    <span>{language === 'es' ? 'Selección Editorial' : "Editor's Choice"}</span>
                    <span className="mx-1.5">·</span>
                    <span>Health & Lifestyle</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {language === 'es' ? 'Grounded Shoes & Glacier Breeze' : 'Grounded Shoes & Glacier Breeze'}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setCurrentPage('categories');
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  {language === 'es' ? 'Ver Selección' : 'View Picks'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
