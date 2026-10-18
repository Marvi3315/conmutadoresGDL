import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { ServicesSection } from './components/services/ServicesSection';
import { ProductsPreviewSection } from './components/catalog/ProductsPreviewSection';
import { ProductsPage } from './components/catalog/ProductsPage';
import { useRoute } from './lib/router';
import { SyscomIntegratorSection } from './components/brand/SyscomIntegratorSection';
import { BandwidthVoIPCalculator } from './components/tools/BandwidthVoIPCalculator';
import { ContactSection } from './components/contact/ContactSection';
import { FloatingWhatsApp } from './components/ui/FloatingWhatsApp';
import { TopProgressBar } from './components/ui/TopProgressBar';
import { ScrollToTopButton } from './components/ui/ScrollToTopButton';
import { ThemeProvider } from './context/ThemeContext';
import { CatalogProvider } from './context/CatalogContext';

// Cargados bajo demanda: no son necesarios en la primera pintura de la página,
// así el paquete inicial que descarga el visitante es más pequeño.
const InteractiveQuoteCalculator = lazy(() =>
  import('./components/calculator/InteractiveQuoteCalculator').then((m) => ({ default: m.InteractiveQuoteCalculator }))
);
const AdminCatalogModal = lazy(() =>
  import('./components/admin/AdminCatalogModal').then((m) => ({ default: m.AdminCatalogModal }))
);

export default function App() {
  const route = useRoute();
  const isProductsPage = route.path === '/productos';
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [calculatorInitialService, setCalculatorInitialService] = useState<string>('conmutadores-ip');
  const [selectedServiceModalId, setSelectedServiceModalId] = useState<string | null>(null);

  // Tras navegar: ir al ancla (#seccion) o al inicio de la página.
  useEffect(() => {
    if (route.hash) {
      const id = route.hash.slice(1);
      let tries = 0;
      const t = window.setInterval(() => {
        const el = document.getElementById(id);
        if (el || ++tries > 20) {
          window.clearInterval(t);
          el?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return () => window.clearInterval(t);
    }
    window.scrollTo(0, 0);
  }, [route.path, route.hash]);

  const handleOpenCalculator = (serviceId?: string) => {
    if (serviceId) {
      setCalculatorInitialService(serviceId);
    }
    setIsCalculatorOpen(true);
  };

  const handleSelectServiceFromNav = (serviceId: string) => {
    setSelectedServiceModalId(serviceId);
  };

  return (
    <ThemeProvider>
      <CatalogProvider>
        <div className="min-h-screen bg-white dark:bg-[#0b0c0e] text-slate-800 dark:text-neutral-200 flex flex-col selection:bg-blue-600 selection:text-white transition-colors duration-300">
          
          {/* Subtle Top Loading & Scroll Progress Bar */}
          <TopProgressBar />

          {/* Navigation Bar */}
          <Navbar
            onOpenCalculator={() => handleOpenCalculator()}
            onSelectService={handleSelectServiceFromNav}
          />

          {/* Main Content Sections */}
          <main className="flex-grow">
            
            {isProductsPage ? (
              <ProductsPage key={route.search} />
            ) : (
              <>
            {/* 1. Hero Section */}
            <Hero
              onOpenCalculator={handleOpenCalculator}
              onSelectService={(id) => setSelectedServiceModalId(id)}
            />

            {/* 2. Core Telecom & Security Services */}
            <ServicesSection
              onOpenCalculator={handleOpenCalculator}
              selectedServiceModalId={selectedServiceModalId}
              onCloseModal={() => setSelectedServiceModalId(null)}
              onSelectServiceModal={(id) => setSelectedServiceModalId(id)}
            />

            {/* 3. Vista corta de productos → página /productos */}
            <ProductsPreviewSection />

            {/* 4. Integrador Autorizado SYSCOM & Banner / Carrusel de Marcas */}
            <SyscomIntegratorSection
              onOpenQuote={() => handleOpenCalculator('cableado-redes-fibra')}
            />

            {/* 5. Technical Bandwidth & Storage Calculator */}
            <BandwidthVoIPCalculator
              onOpenQuote={handleOpenCalculator}
            />

            {/* 6. Free Site Survey Booking & Contact Info */}
            <ContactSection />
              </>
            )}

          </main>

          {/* Footer */}
          <Footer
            onSelectService={(id) => setSelectedServiceModalId(id)}
            onOpenCalculator={() => handleOpenCalculator()}
          />

          {/* Interactive Floating WhatsApp Widget */}
          <FloatingWhatsApp />

          {/* Floating Scroll To Top Button */}
          <ScrollToTopButton />

          {/* Full-screen Interactive Quote Calculator Modal */}
          <Suspense fallback={null}>
            {isCalculatorOpen && (
              <InteractiveQuoteCalculator
                isOpen={isCalculatorOpen}
                onClose={() => setIsCalculatorOpen(false)}
                initialService={calculatorInitialService}
              />
            )}
          </Suspense>

          {/* Admin Panel for Lic. Felipe Romo to Manage Catalog */}
          <Suspense fallback={null}>
            <AdminCatalogModal />
          </Suspense>

        </div>
      </CatalogProvider>
    </ThemeProvider>
  );
}
