// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ChevronLeft, Menu, X, Leaf } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

// @ts-ignore;
import { LanguageSelector } from './LanguageSelector';
// @ts-ignore;
import { useTranslation } from '@/hooks/useTranslation';
export function Navigation({
  $w,
  currentPage = 'index'
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    t,
    changeLanguage
  } = useTranslation();
  const handleNavigation = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
    setIsMenuOpen(false);
  };
  const navItems = [{
    id: 'index',
    name: t('nav.home')
  }, {
    id: 'tcm-products',
    name: t('nav.products')
  }, {
    id: 'tcm-about-us',
    name: t('nav.about')
  }, {
    id: 'tcm-contact-us',
    name: t('nav.contact')
  }];
  return <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigation('index')}>
            <Leaf className="h-8 w-8 text-green-700" />
            <div>
              <h1 className="text-xl font-bold text-green-800">HerbalTrade</h1>
              <p className="text-xs text-green-600">{t('nav.home')}</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => <button key={item.id} onClick={() => handleNavigation(item.id)} className={`px-3 py-2 text-sm font-medium transition-colors ${currentPage === item.id ? 'text-green-800 border-b-2 border-green-700' : 'text-green-700 hover:text-green-900'}`}>
                {item.name}
              </button>)}
            <LanguageSelector currentLang={t('nav.language')} onLanguageChange={changeLanguage} />
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden md:block">
              <LanguageSelector currentLang={t('nav.language')} onLanguageChange={changeLanguage} />
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {isMenuOpen && <div className="md:hidden border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(item => <button key={item.id} onClick={() => handleNavigation(item.id)} className={`block px-3 py-2 text-base font-medium w-full text-left ${currentPage === item.id ? 'text-green-800 bg-green-50' : 'text-green-700 hover:text-green-900'}`}>
                  {item.name}
                </button>)}
              <div className="px-3 py-2">
                <LanguageSelector currentLang={t('nav.language')} onLanguageChange={changeLanguage} />
              </div>
            </div>
          </div>}
      </div>
    </nav>;
}