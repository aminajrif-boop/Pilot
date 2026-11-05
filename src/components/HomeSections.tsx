import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES_LIST } from '../data/initialProducts';
import { 
  ArrowRight, 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  TrendingUp, 
  ArrowUpRight,
  BookOpen
} from 'lucide-react';

export const HomeSections: React.FC = () => {
  const { 
    products, 
    reviews, 
    setCurrentPage, 
    setSelectedCategory, 
    setSelectedProduct,
    toggleComparisonProduct,
    language 
  } = useApp();

  const featuredProducts = products;

  // Category visual icons/accent colors
  const categoryMetadata: Record<string, { label: string; count: number; desc: string }> = {
    'Health & Wellness': {
      label: 'Health & Wellness',
      count: products.filter(p => p.category === 'Health & Wellness').length,
      desc: 'Anatomical barefoot footwear, joint comfort & foot health'
    },
    'Home & Lifestyle': {
      label: 'Home & Lifestyle',
      count: products.filter(p => p.category === 'Home & Lifestyle').length,
      desc: 'Targeted cordless evaporative air cooling & personal climate comfort'
    }
  };

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 lg:space-y-24 py-12">
      
      {/* 1. Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {language === 'es' ? 'Selección Destacada' : 'Curated Highlights'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              {language === 'es' ? 'Productos Verificados en Promoción' : 'Verified Products on Special Promotion'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {language === 'es'
                ? 'Ofertas vigentes con descuentos directos del 50% al 60% verificados en las tiendas oficiales.'
                : 'Current verified offers featuring direct 50% to 60% promotional discounts on official platforms.'}
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('All');
              setCurrentPage('categories');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap"
          >
            <span>{language === 'es' ? 'Ver catálogo' : 'View catalog'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 2. Popular Categories Directory */}
      <section className="bg-slate-50 border-y border-slate-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {language === 'es' ? 'Estructura por Categorías' : 'Browse by Category'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {language === 'es' ? 'Categorías Verificadas' : 'Verified Categories'}
            </h2>
            <p className="text-sm text-slate-600">
              {language === 'es'
                ? 'Explora productos con condiciones comerciales y promociones auditadas.'
                : 'Explore products with audited commercial terms and verified promotions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto gap-6">
            {CATEGORIES_LIST.map((cat) => {
              const meta = categoryMetadata[cat];
              return (
                <div
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className="group bg-white border border-slate-200 hover:border-blue-500 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-md flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400">
                        {meta?.count || 1} {language === 'es' ? 'verificado' : 'verified'}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {cat}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {meta?.desc || 'Verified products and technical reviews.'}
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    {language === 'es' ? 'Ver Productos' : 'Browse Products'} →
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. Product Comparisons Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl overflow-hidden relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-semibold">
                <Scale className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'Herramienta de Comparación' : 'Side-by-Side Comparison Engine'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                {language === 'es'
                  ? 'Compara especificaciones técnicas y promociones en paralelo.'
                  : 'Compare technical specs and verified offers side-by-side.'}
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                {language === 'es'
                  ? 'Contrasta especificaciones detalladas, ventajas principales, posibles inconvenientes, garantías y enlaces directos a las tiendas.'
                  : 'Compare detailed technical specifications, key advantages, considerations, guarantees, and verified merchant links.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    if (products.length >= 2) {
                      toggleComparisonProduct(products[0].id);
                      toggleComparisonProduct(products[1].id);
                    }
                    setCurrentPage('comparisons');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <span>{language === 'es' ? 'Comparar Grounded vs Glacier Breeze' : 'Compare Grounded vs Glacier Breeze'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual comparison mockup badge */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {language === 'es' ? 'Comparativa Activa' : 'Current Active Comparison'}
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">Grounded Barefoot Shoes</div>
                    <div className="text-[11px] text-slate-400 font-mono">Wide Toe Box · Zero-Drop · 60% Off</div>
                  </div>
                  <span className="font-mono font-bold text-emerald-400 text-sm">$69.95</span>
                </div>

                <div className="text-center text-xs font-bold text-slate-500">VS</div>

                <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">Glacier Breeze Portable AC</div>
                    <div className="text-[11px] text-slate-400 font-mono">10h Cordless · 500ml · 50% Off</div>
                  </div>
                  <span className="font-mono font-bold text-blue-400 text-sm">$54.99</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 text-center pt-1">
                {language === 'es' ? 'Fichas verificadas en Noviembre 2026' : 'Audited promotions as of November 2026'}
              </div>
            </div>
          </div>

        </div>
      </section>



      {/* 5. Verified Deals & Transparency Strip (Prompt: "Ofertas y promociones, únicamente cuando estén verificadas") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{language === 'es' ? 'Política de Precios y Ofertas Verificadas' : 'Verified Pricing & Promotion Standard'}</span>
            </div>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              {language === 'es'
                ? 'No publicamos falsos descuentos ni promociones manipuladas. Todos los precios exhibidos en CommissionPilot son verificados en las tiendas oficiales (Amazon, Awin, direct partners) y reflejan la tarifa vigente.'
                : 'We prohibit fabricated discounts and fake countdowns. Every listed price on CommissionPilot is verified against official merchant API feeds and authorized retailer inventories.'}
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-500 whitespace-nowrap bg-white px-3.5 py-2 rounded-lg border border-slate-200 shrink-0">
            {language === 'es' ? 'Última verificación: Noviembre 2026' : 'Last verified: November 2026'}
          </div>
        </div>
      </section>

      {/* 6. Latest Recommendations / Reviews (Prompt: "Últimas recomendaciones") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between border-b border-slate-200 pb-5">
          <div>
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {language === 'es' ? 'Investigación Técnica' : 'Research & Guides'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              {language === 'es' ? 'Últimas Recomendaciones y Análisis' : 'Latest Recommendations & Reviews'}
            </h2>
          </div>

          <button
            onClick={() => {
              setCurrentPage('reviews');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            <span>{language === 'es' ? 'Ver todos los análisis' : 'Read all reviews'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <article 
              key={rev.id}
              onClick={() => {
                setCurrentPage('reviews');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-6 bg-white border border-slate-200 hover:border-slate-300 rounded-2xl cursor-pointer hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-blue-600">{rev.category}</span>
                <span>·</span>
                <span>{rev.publishDate}</span>
                <span>·</span>
                <span>{rev.readingTime}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors leading-snug">
                {rev.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {rev.summary}
              </p>

              <div className="pt-2 text-xs font-semibold text-blue-600 inline-flex items-center gap-1">
                <span>{language === 'es' ? 'Leer análisis completo' : 'Read full analysis'}</span>
                <span>→</span>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
};
