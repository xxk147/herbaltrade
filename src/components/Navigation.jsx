// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Leaf, Menu, X } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

export function Navigation({
  $w,
  currentPage = 'index'
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleNavigation = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
    setIsMenuOpen(false);
  };
  const navItems = [{
    id: 'index',
    name: '首页'
  }, {
    id: 'tcm-products',
    name: '产品中心'
  }, {
    id: 'tcm-about-us',
    name: '关于我们'
  }, {
    id: 'tcm-contact-us',
    name: '联系我们'
  }];
  return <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigation('index')}>
            <Leaf className="h-8 w-8 text-green-700" />
            <div>
              <h1 className="text-xl font-bold text-green-800">HerbalTrade</h1>
              <p className="text-xs text-green-600">中药材外贸专家</p>
            </div>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map(item => <button key={item.id} onClick={() => handleNavigation(item.id)} className={`px-3 py-2 text-sm font-medium transition-colors ${currentPage === item.id ? 'text-green-800 border-b-2 border-green-700' : 'text-green-700 hover:text-green-900'}`}>
                {item.name}
              </button>)}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && <div className="md:hidden border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(item => <button key={item.id} onClick={() => handleNavigation(item.id)} className={`block px-3 py-2 text-base font-medium w-full text-left ${currentPage === item.id ? 'text-green-800 bg-green-50' : 'text-green-700 hover:text-green-900'}`}>
                  {item.name}
                </button>)}
            </div>
          </div>}
      </div>
    </nav>;
}