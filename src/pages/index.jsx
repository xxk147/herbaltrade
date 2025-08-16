// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ChevronLeft, ChevronRight, ShoppingCart, Leaf, MapPin, Star, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';

// @ts-ignore;
import { Navigation } from '@/components/Navigation';
// @ts-ignore;
import { Footer } from '@/components/Footer';

// 轮播图组件
function HeroCarousel({
  images
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % images.length);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + images.length) % images.length);
  };
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [images.length]);
  if (!images || images.length === 0) return null;
  return <div className="relative h-96 md:h-[500px] overflow-hidden">
      {images.map((image, index) => <div key={index} className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
          <img src={image.url} alt={image.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{image.title}</h1>
              <p className="text-xl md:text-2xl mb-8">传承千年中医药文化，服务全球健康事业</p>
              <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white" onClick={() => props.$w.utils.navigateTo({
            pageId: 'tcm-products',
            params: {}
          })}>
                立即探索
              </Button>
            </div>
          </div>
        </div>)}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full">
        <ChevronRight className="h-6 w-6" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`} />)}
      </div>
    </div>;
}

// 分类卡片组件
function CategoryCard({
  category
}) {
  return <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-6 text-center">
        <img src={category.image} alt={category.name} className="w-24 h-24 mx-auto mb-4 rounded-full object-cover" />
        <h3 className="text-lg font-semibold text-green-800 mb-2">{category.name}</h3>
        <p className="text-sm text-gray-600">精选道地药材</p>
      </CardContent>
    </Card>;
}

// 产品卡片组件
function ProductCard({
  product
}) {
  return <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="relative">
          <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
          <Badge variant="secondary" className="absolute top-2 left-2 bg-green-100 text-green-800">
            {product.grade}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 italic mb-2">{product.latin}</p>
        <div className="flex items-center mb-2">
          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
          <span className="text-sm text-gray-600">{product.origin}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {product.efficacy.slice(0, 3).map(eff => <Badge key={eff} variant="outline" className="text-xs">
              {eff}
            </Badge>)}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-800">{product.priceRange}</span>
          <Button size="sm" className="bg-green-700 hover:bg-green-800" onClick={() => props.$w.utils.navigateTo({
          pageId: 'tcm-product-detail',
          params: {
            id: product.id
          }
        })}>
            <ShoppingCart className="h-4 w-4 mr-1" />
            询盘
          </Button>
        </div>
      </CardContent>
    </Card>;
}

// 主页面组件
export default function HomePage(props) {
  const [config, setConfig] = useState({
    carousel: [],
    categories: [],
    products: []
  });

  // 从本地存储加载配置
  useEffect(() => {
    const loadConfig = () => {
      const savedConfig = localStorage.getItem('tcm-homepage-config');
      if (savedConfig) {
        const modules = JSON.parse(savedConfig);
        const carousel = modules.find(m => m.type === 'carousel')?.images || [];
        const categories = modules.find(m => m.type === 'categories')?.categories || [];
        const products = modules.find(m => m.type === 'products')?.products || [];
        setConfig({
          carousel,
          categories,
          products
        });
      } else {
        // 默认配置
        setConfig({
          carousel: [{
            url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=1920&h=600&fit=crop',
            title: '千年传承 道地药材'
          }, {
            url: 'https://images.unsplash.com/photo-1595242000808-2b0d9b22931e?w=1920&h=600&fit=crop',
            title: '岷县当归 出口级品质'
          }, {
            url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1920&h=600&fit=crop',
            title: '黄芪精品 补气之王'
          }],
          categories: [{
            name: '人参系列',
            image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop'
          }, {
            name: '当归系列',
            image: 'https://images.unsplash.com/photo-1595242000808-2b0d9b22931e?w=300&h=300&fit=crop'
          }, {
            name: '黄芪系列',
            image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=300&fit=crop'
          }, {
            name: '枸杞系列',
            image: 'https://images.unsplash.com/photo-1586810160470-2d3cd0f7934b?w=300&h=300&fit=crop'
          }],
          products: [{
            id: 1,
            name: '长白山野山参',
            latin: 'Panax ginseng C.A. Mey',
            efficacy: ['补气', '养血', '安神'],
            part: '根',
            origin: '中国',
            priceRange: '¥288-580/kg',
            grade: '特级',
            images: ['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop']
          }, {
            id: 2,
            name: '岷县当归',
            latin: 'Angelica sinensis (Oliv.) Diels',
            efficacy: ['养血', '活血', '调经'],
            part: '根',
            origin: '中国',
            priceRange: '¥89-168/kg',
            grade: '一级',
            images: ['https://images.unsplash.com/photo-1595242000808-2b0d9b22931e?w=300&h=300&fit=crop']
          }, {
            id: 3,
            name: '内蒙古黄芪',
            latin: 'Astragalus membranaceus (Fisch.) Bge',
            efficacy: ['补气', '固表', '利水'],
            part: '根',
            origin: '中国',
            priceRange: '¥45-89/kg',
            grade: '特级',
            images: ['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=300&fit=crop']
          }, {
            id: 4,
            name: '宁夏枸杞',
            latin: 'Lycium barbarum L.',
            efficacy: ['滋阴', '补肾', '明目'],
            part: '果实',
            origin: '中国',
            priceRange: '¥68-128/kg',
            grade: '特级',
            images: ['https://images.unsplash.com/photo-1586810160470-2d3cd0f7934b?w=300&h=300&fit=crop']
          }, {
            id: 5,
            name: '韩国高丽参',
            latin: 'Panax ginseng C.A. Mey',
            efficacy: ['补气', '养血', '安神'],
            part: '根',
            origin: '韩国',
            priceRange: '¥580-1200/kg',
            grade: '天字级',
            images: ['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop']
          }, {
            id: 6,
            name: '印度藏红花',
            latin: 'Crocus sativus L.',
            efficacy: ['活血', '养血', '安神'],
            part: '花',
            origin: '印度',
            priceRange: '¥2800-4500/kg',
            grade: '特级',
            images: ['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=300&fit=crop']
          }]
        });
      }
    };
    loadConfig();
    // 监听存储变化
    window.addEventListener('storage', loadConfig);
    return () => window.removeEventListener('storage', loadConfig);
  }, []);
  const handleProductClick = productId => {
    props.$w.utils.navigateTo({
      pageId: 'tcm-product-detail',
      params: {
        id: productId
      }
    });
  };
  return <div style={props.style} className="min-h-screen bg-gray-50">
      <Navigation $w={props.$w} currentPage="index" />
      
      {/* Hero Section */}
      {config.carousel.length > 0 && <HeroCarousel images={config.carousel} />}
      
      {/* Categories Section */}
      {config.categories.length > 0 && <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">推荐分类</h2>
              <p className="text-lg text-green-600">精选道地药材，传承千年智慧</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {config.categories.map((category, index) => <CategoryCard key={index} category={category} />)}
            </div>
          </div>
        </section>}
      
      {/* Featured Products Section */}
      {config.products.length > 0 && <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">热门产品</h2>
              <p className="text-lg text-green-600">精选优质中药材，出口级品质保证</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {config.products.slice(0, 6).map(product => <div key={product.id} onClick={() => handleProductClick(product.id)} className="cursor-pointer">
                  <ProductCard product={product} />
                </div>)}
            </div>
            <div className="text-center mt-8">
              <Button size="lg" className="bg-green-700 hover:bg-green-800" onClick={() => props.$w.utils.navigateTo({
            pageId: 'tcm-products',
            params: {}
          })}>
                查看全部产品
              </Button>
            </div>
          </div>
        </section>}
      
      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-6">关于华草国际</h2>
              <p className="text-gray-600 mb-4">
                华草国际专注于中药材种植、加工与出口贸易二十余年，为全球客户提供优质道地药材。
                我们秉承"质量第一，诚信为本"的经营理念，致力于传承和发扬中医药文化。
              </p>
              <p className="text-gray-600 mb-6">
                我们的产品涵盖人参、当归、黄芪、枸杞等数百个品种，所有产品均通过严格的质量检测，
                符合国际出口标准，远销欧美、日韩、东南亚等国家和地区。
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-gray-700">有机认证产品</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-gray-700">GAP认证基地</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-gray-700">出口资质齐全</span>
                </div>
              </div>
              <div className="mt-6 space-x-4">
                <Button className="bg-green-700 hover:bg-green-800" onClick={() => props.$w.utils.navigateTo({
                pageId: 'tcm-about-us',
                params: {}
              })}>
                  了解更多
                </Button>
                <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50" onClick={() => props.$w.utils.navigateTo({
                pageId: 'tcm-contact-us',
                params: {}
              })}>
                  联系我们
                </Button>
              </div>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=400&fit=crop" alt="中药材基地" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>
      
      <Footer $w={props.$w} />
    </div>;
}