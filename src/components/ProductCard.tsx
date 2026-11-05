import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { ExternalLink, Check, Scale, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    setSelectedProduct, 
    comparisonProductIds, 
    toggleComparisonProduct,
    setPendingRedirect,
    recordClick,
    language 
  } = useApp();

  const isCompared = comparisonProductIds.includes(product.id);

  const handleStoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    recordClick(product.id, product.name, product.store, product.affiliateNetwork, product.affiliateUrl);
    setPendingRedirect({
      product,
      store: product.store,
      url: product.affiliateUrl
    });
  };

  return (
    <article 
      onClick={() => setSelectedProduct(product)}
      className="group relative bg-white border border-slate-200 hover:border-slate-300 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg flex flex-col cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-4/3 w-full bg-slate-50 overflow-hidden border-b border-slate-100 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback gracefully if external host ever stutters
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Fallback styling container if image is hidden */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6 text-center text-xs text-slate-500 font-medium">
          {product.brand} · {product.name}
        </div>

        {/* Quiet Editorial Flag (Unboxed or minimal corner tag) */}
        {product.isEditorChoice && (
          <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md tracking-tight backdrop-blur-xs shadow-xs">
            {language === 'es' ? 'Elección Editorial' : "Editor's Pick"}
          </div>
        )}

        {/* Comparison Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleComparisonProduct(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs ${
            isCompared 
              ? 'bg-blue-600 text-white' 
              : 'bg-white/90 text-slate-700 hover:bg-white hover:text-blue-600 backdrop-blur-xs'
          }`}
          title={isCompared ? 'Remove from comparison' : 'Add to side-by-side comparison'}
        >
          <Scale className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">
            {isCompared ? (language === 'es' ? 'Comparando' : 'Compared') : (language === 'es' ? 'Comparar' : 'Compare')}
          </span>
        </button>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Unboxed Metadata Line (anti-slop zero-pill rule) */}
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
            <span className="font-semibold text-slate-700">{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>

          <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {product.summary}
          </p>
        </div>

        {/* Key Features Bullets (quiet checklist) */}
        <div className="pt-2 border-t border-slate-100 space-y-1.5">
          {product.features.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
              <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{feat}</span>
            </div>
          ))}
        </div>

        {/* Pricing, Store & Affiliate Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1">
              <span>{language === 'es' ? 'Verificado en' : 'Verified at'} {product.store}</span>
              <ShieldCheck className="w-3 h-3 text-slate-400" />
            </div>
            <div className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-0.5">
              ${product.price.toFixed(2)}
            </div>
          </div>

          <button
            onClick={handleStoreClick}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shadow-xs group/btn"
          >
            <span>{language === 'es' ? 'Ver Precio' : 'Check Price'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </article>
  );
};
