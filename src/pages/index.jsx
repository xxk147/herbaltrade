// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent } from '@/components/ui';

// @ts-ignore;
import { Navigation } from '@/components/Navigation';
// @ts-ignore;
import { Footer } from '@/components/Footer';
// @ts-ignore;
import { HeroCarousel } from '@/components/HeroCarousel';
// @ts-ignore;
import { CategoryCard } from '@/components/CategoryCard';
// @ts-ignore;
import { ProductCard } from '@/components/ProductCard';
// @ts-ignore;

// @ts-ignore;
import { useTranslation } from '@/hooks/useTranslation';
export default function HomePage(props) {
  const {
    t,
    changeLanguage
  } = useTranslation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // 轮播图数据
  const carouselImages = [{
    url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=1200&h=500&fit=crop',
    title: t('home.heroTitle')
  }, {
    url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1200&h=500&fit=crop',
    title: t('home.heroTitle')
  }, {
    url: 'https://images.unsplash.com/photo-1595242000808-2b0d9b22931e?w=1200&h=500&fit=crop',
    title: t('home.heroTitle')
  }];

  // 分类数据
  const categories = [{
    id: 'ginseng',
    name: '人参类',
    description: '补气养血，安神益智',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=100&h=100&fit=crop'
  }, {
    id: 'angelica',
    name: '当归类',
    description: '补血活血，调经止痛',
    image: 'https://images.unsplash.com/photo-1595242000808-2b0d9b22931e?w=100&h=100&fit=crop'
  }, {
    id: 'astragalus',
    name: '黄芪类',
    description: '补气固表，利水消肿',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=100&h=100&fit=crop'
  }, {
    id: 'goji',
    name: '枸杞类',
    description: '滋补肝肾，益精明目',
    image: 'https://images.unsplash.com/photo-1586810160470-2d3cd0f7934b?w=100&h=100&fit=crop'
  }];

  // 热门产品数据
  const hotProducts = [{
    id: 1,
    name: '长白山野山参',
    latin: 'Panax ginseng C.A. Mey',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop',
    efficacy: ['补气', '养血', '安神'],
    part: '根',
    origin: '中国',
    priceRange: '¥288-580/kg',
    grade: '特级',
    rating: 4.8,
    reviews: 156
  }, {
    id: 2,
    name: '岷县当归',
    latin: 'Angelica sinensis (Oliv.) Diels',
    image: 'https://images.unsplash.com/photo-1595242000808-2b0d9b22931e?w=300&h=300&fit=crop',
    efficacy: ['养血', '活血', '调经'],
    part: '根',
    origin: '中国',
    priceRange: '¥89-168/kg',
    grade: '一级',
    rating: 4.7,
    reviews: 234
  }, {
    id: 3,
    name: '宁夏枸杞',
    latin: 'Lycium barbarum L.',
    image: 'https://images.unsplash.com/photo-1586810160470-2d3cd0f7934b?w=300&h=300&fit=crop',
    efficacy: ['滋阴', '补肾', '明目'],
    part: '果实',
    origin: '中国',
    priceRange: '¥68-128/kg',
    grade: '特级',
    rating: 4.9,
    reviews: 312
  }, {
    id: 4,
    name: '内蒙古黄芪',
    latin: 'Astragalus membranaceus (Fisch.) Bge',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=300&fit=crop',
    efficacy: ['补气', '固表', '利水'],
    part: '根',
    origin: '中国',
    priceRange: '¥45-89/kg',
    grade: '特级',
    rating: 4.6,
    reviews: 189
  }];
  const handleNavigation = (pageId, params = {}) => {
    props.$w.utils.navigateTo({
      pageId,
      params
    });
  };
  const handleProductClick = productId => {
    handleNavigation('tcm-product-detail', {
      id: productId
    });
  };
  if (!mounted) return null;
  return <div style={props.style} className="min-h-screen bg-gray-50">
      <Navigation $w={props.$w} currentPage="index" />

      <main>
        {/* Hero Carousel */}
        <HeroCarousel images={carouselImages} t={t} onNavigate={handleNavigation} />

        {/* Categories Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">{t('home.categoriesTitle')}</h2>
              <p className="text-lg text-green-600">{t('home.categoriesSubtitle')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map(category => <CategoryCard key={category.id} category={category} t={t} onNavigate={handleNavigation} />)}
            </div>
          </div>
        </section>

        {/* Hot Products Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">{t('home.productsTitle')}</h2>
              <p className="text-lg text-green-600">{t('home.productsSubtitle')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {hotProducts.map(product => <ProductCard key={product.id} product={product} t={t} onProductClick={handleProductClick} />)}
            </div>
            <div className="text-center mt-12">
              <Button className="bg-green-700 hover:bg-green-800" onClick={() => handleNavigation('tcm-products')}>
                {t('home.viewAllBtn')}
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-green-800 mb-6">{t('home.aboutTitle')}</h2>
                <p className="text-gray-600 mb-4">{t('home.aboutText1')}</p>
                <p className="text-gray-600 mb-6">{t('home.aboutText2')}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-green-700 hover:bg-green-800" onClick={() => handleNavigation('tcm-about-us')}>
                    {t('home.learnMoreBtn')}
                  </Button>
                  <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50" onClick={() => handleNavigation('tcm-contact-us')}>
                    {t('home.contactBtn')}
                  </Button>
                </div>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=400&fit=crop" alt="About Us" className="rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer $w={props.$w} />
    </div>;
}