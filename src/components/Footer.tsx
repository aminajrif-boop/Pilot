import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, ShieldCheck, Cookie, ArrowUpRight, Scale } from 'lucide-react';
import { CATEGORIES_LIST } from '../data/initialProducts';

export const Footer: React.FC = () => {
  const { 
    setCurrentPage, 
    setSelectedCategory, 
    openLegalDoc, 
    setIsCookieModalOpen,
    setIsAdminOpen,
    language 
  } = useApp();

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageClick = (page: any) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs">
      
      {/* Top Affiliate Disclosure Strip */}
      <div className="bg-slate-900 border-b border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-slate-200">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="font-semibold text-xs">
                {language === 'es' ? 'Transparencia de Afiliación Oficial' : 'Official Affiliate Transparency'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 max-w-4xl leading-relaxed">
              {language === 'es' ? (
                <>
                  CommissionPilot (<strong>https://commissionpilot.org</strong>) participa en el programa de afiliados de Amazon Services LLC, Awin, CJ Affiliate y partners de software. Cuando realizas compras a través de nuestros enlaces, podemos obtener una comisión de afiliación sin ningún coste añadido para ti.{' '}
                  <button 
                    onClick={() => handlePageClick('affiliate-disclosure')}
                    className="text-blue-400 hover:text-blue-300 underline font-medium"
                  >
                    Leer divulgación completa
                  </button>.
                </>
              ) : (
                <>
                  CommissionPilot (<strong>https://commissionpilot.org</strong>) is an independent product discovery portal participating in the Amazon Services LLC Associates Program, Awin, and CJ Affiliate networks. We may earn qualifying commissions on referral purchases at 0% additional cost to you.{' '}
                  <button 
                    onClick={() => handlePageClick('affiliate-disclosure')}
                    className="text-blue-400 hover:text-blue-300 underline font-medium"
                  >
                    Read full disclosure
                  </button>.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-lg font-bold text-white tracking-tight">
              <span className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Compass className="w-4 h-4 stroke-[2.25]" />
              </span>
              <span>Commission<span className="text-blue-400">Pilot</span></span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {language === 'es'
                ? 'Plataforma digital especializada en descubrir, analizar y recomendar productos verificados de terceros mediante marketing de resultados y afiliación ética.'
                : 'Independent digital platform specializing in curated product discovery, verified technical benchmarks, and transparent affiliate recommendations.'}
            </p>

            <div className="text-[11px] text-slate-400 pt-1">
              <span>{language === 'es' ? 'Dominio Oficial' : 'Official Domain'}: </span>
              <a href="https://commissionpilot.org" className="text-white hover:text-blue-400 font-mono">
                https://commissionpilot.org
              </a>
            </div>
          </div>

          {/* Product Categories */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              {language === 'es' ? 'Categorías de Productos' : 'Product Categories'}
            </div>
            <ul className="space-y-2 text-xs">
              {CATEGORIES_LIST.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="text-slate-400 hover:text-white transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Editorial & Discovery */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              {language === 'es' ? 'Editorial y Herramientas' : 'Editorial & Tools'}
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handlePageClick('comparisons')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Comparativas Técnicas' : 'Product Comparisons'}
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('reviews')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Análisis Editoriales' : 'Technical Reviews'}
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('about')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Sobre CommissionPilot' : 'About CommissionPilot'}
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('contact')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Contacto y Soporte' : 'Contact Us'}
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('affiliate-disclosure')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Declaración de Afiliados' : 'Affiliate Notice'}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Compliance */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              {language === 'es' ? 'Marco Legal (RGPD & LSSI)' : 'Legal & Compliance (EU)'}
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => openLegalDoc('aviso-legal')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Aviso Legal (LSSI-CE)' : 'Legal Notice (LSSI-CE)'}
                </button>
              </li>
              <li>
                <button onClick={() => openLegalDoc('privacidad')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Política de Privacidad (RGPD)' : 'Privacy Policy (GDPR)'}
                </button>
              </li>
              <li>
                <button onClick={() => openLegalDoc('cookies')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Política de Cookies' : 'Cookie Policy'}
                </button>
              </li>
              <li>
                <button onClick={() => openLegalDoc('afiliacion')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Política de Afiliación' : 'Affiliate Terms'}
                </button>
              </li>
              <li>
                <button onClick={() => openLegalDoc('condiciones')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Condiciones Generales de Uso' : 'Terms of Service'}
                </button>
              </li>
              <li className="pt-1">
                <button 
                  onClick={() => setIsCookieModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium"
                >
                  <Cookie className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Configurar Cookies' : 'Cookie Settings'}</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} CommissionPilot · Titular: <strong>Amin Ajrif</strong> (N.I.E. Z3277056K). Provenza 148, Local, 08036 Barcelona.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="https://www.linkedin.com/in/amin-ajrif-9464a2106" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              LinkedIn: Amin Ajrif
            </a>
            <span>·</span>
            <span>{language === 'es' ? 'Afiliación Ética y Verificada' : 'Ethical Affiliate Discovery'}</span>
            <span>·</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
              title="Acceso Privado a Panel de Gestión"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>{language === 'es' ? 'Acceso Privado' : 'Staff Login'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
