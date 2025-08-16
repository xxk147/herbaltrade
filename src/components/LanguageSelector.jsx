// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ChevronDown, Globe } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

// @ts-ignore;
import { languages } from '@/lib/translations';
export function LanguageSelector({
  currentLang,
  onLanguageChange
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const handleLanguageChange = langCode => {
    onLanguageChange(langCode);
    setIsOpen(false);
    // 保存语言偏好
    localStorage.setItem('preferred-language', langCode);
  };
  const currentLanguage = languages.find(lang => lang.code === currentLang);
  if (!mounted) return null;
  return <div className="relative">
      <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-green-700 hover:text-green-900" onClick={() => setIsOpen(!isOpen)}>
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLanguage?.flag} {currentLanguage?.name}</span>
        <span className="sm:hidden">{currentLanguage?.flag}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && <>
          {/* Desktop dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 hidden sm:block z-50">
            <div className="py-1">
              {languages.map(lang => <button key={lang.code} className={`w-full text-left px-4 py-2 text-sm hover:bg-green-50 transition-colors ${currentLang === lang.code ? 'bg-green-50 text-green-800 font-medium' : 'text-gray-700'}`} onClick={() => handleLanguageChange(lang.code)}>
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </button>)}
            </div>
          </div>

          {/* Mobile overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden" onClick={() => setIsOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg shadow-lg z-50 sm:hidden">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">选择语言</h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-500">
                  ✕
                </button>
              </div>
              <div className="space-y-2">
                {languages.map(lang => <button key={lang.code} className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${currentLang === lang.code ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'}`} onClick={() => handleLanguageChange(lang.code)}>
                    <span className="mr-3 text-xl">{lang.flag}</span>
                    {lang.name}
                  </button>)}
              </div>
            </div>
          </div>
        </>}
    </div>;
}