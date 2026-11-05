import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HomeSections } from './components/HomeSections';
import { CategoriesView } from './components/CategoriesView';
import { ComparisonView } from './components/ComparisonView';
import { ReviewsView } from './components/ReviewsView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { AffiliateDisclosureView } from './components/AffiliateDisclosureView';
import { LegalView } from './components/LegalView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AffiliateRedirectModal } from './components/AffiliateRedirectModal';
import { AdminModal } from './components/AdminModal';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Bar Navigation */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <Hero />
            <HomeSections />
          </>
        )}

        {currentPage === 'categories' && <CategoriesView />}

        {currentPage === 'comparisons' && <ComparisonView />}

        {currentPage === 'reviews' && <ReviewsView />}

        {currentPage === 'about' && <AboutView />}

        {currentPage === 'contact' && <ContactView />}

        {currentPage === 'affiliate-disclosure' && <AffiliateDisclosureView />}

        {currentPage === 'legal' && <LegalView />}
      </main>

      {/* Global Modals & Overlays */}
      <ProductDetailModal />
      <AffiliateRedirectModal />
      <AdminModal />
      <CookieBanner />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
