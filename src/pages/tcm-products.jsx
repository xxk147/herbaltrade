// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Search, Filter, ShoppingCart, Star, ChevronLeft, ChevronRight, Package, MapPin, Leaf } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Select, Pagination } from '@/components/ui';

// @ts-ignore;
import { useTranslation } from '@/hooks/useTranslation';

// 模拟产品数据
const mockProducts = [{
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
  reviews: 156,
  category: 'ginseng',
  description: '长白山野山参是东北三宝之首，生长在长白山海拔1000-2000米的原始森林中，经过15-20年的自然生长，具有极高的药用价值。'
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
  reviews: 234,
  category: 'angelica',
  description: '岷县当归产自甘肃岷县，是中国国家地理标志产品，具有头大、身长、枝粗、肉质厚等特点。'
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
  reviews: 312,
  category: 'goji',
  description: '宁夏枸杞产自宁夏中宁，是中国国家地理标志产品，粒大、肉厚、籽少、味甜。'
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
  reviews: 189,
  category: 'astragalus',
  description: '内蒙古黄芪产自内蒙古高原，生长环境独特，有效成分含量高，是补气良药。'
}, {
  id: 5,
  name: '韩国高丽参',
  latin: 'Panax ginseng C.A. Meyer',
  image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop',
  efficacy: ['大补元气', '复脉固脱', '益智安神'],
  part: '根',
  origin: '韩国',
  priceRange: '¥580-1280/kg',
  grade: '天字级',
  rating: 4.9,
  reviews: 98,
  category: 'ginseng',
  description: '韩国高丽参采用传统蒸制工艺，经过严格的质量控制，品质上乘。'
}, {
  id: 6,
  name: '云南三七',
  latin: 'Panax notoginseng (Burk.) F.H. Chen',
  image: 'https://images.unsplash.com/photo-1595242000808-2b0d9b22931e?w=300&h=300&fit=crop',
  efficacy: ['散瘀止血', '消肿定痛'],
  part: '根',
  origin: '中国',
  priceRange: '¥380-680/kg',
  grade: '20头',
  rating: 4.8,
  reviews: 267,
  category: 'sanqi',
  description: '云南三七产自文山，是中国名贵中药材，具有"金不换"的美誉。'
}, {
  id: 7,
  name: '四川川芎',
  latin: 'Ligusticum chuanxiong Hort.',
  image: 'https://images.unsplash.com/photo-1586810160470-2d3cd0f7934b?w=300&h=300&fit=crop',
  efficacy: ['活血行气', '祛风止痛'],
  part: '根茎',
  origin: '中国',
  priceRange: '¥35-68/kg',
  grade: '统货',
  rating: 4.5,
  reviews: 145,
  category: 'chuanxiong',
  description: '四川川芎是四川道地药材，具有浓郁的香气，是妇科常用药材。'
}, {
  id: 8,
  name: '甘肃甘草',
  latin: 'Glycyrrhiza uralensis Fisch.',
  image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=300&fit=crop',
  efficacy: ['补脾益气', '清热解毒', '调和诸药'],
  part: '根',
  origin: '中国',
  priceRange: '¥25-45/kg',
  grade: '统货',
  rating: 4.7,
  reviews: 423,
  category: 'licorice',
  description: '甘肃甘草是"十方九草"的常用药材，具有调和诸药的作用。'
}];

// 功效分类
const efficacyCategories = [{
  value: 'all',
  label: '所有功效'
}, {
  value: '补气',
  label: '补气类'
}, {
  value: '养血',
  label: '养血类'
}, {
  value: '滋阴',
  label: '滋阴类'
}, {
  value: '活血',
  label: '活血类'
}, {
  value: '安神',
  label: '安神类'
}];

// 药材部位
const herbParts = [{
  value: 'all',
  label: '所有部位'
}, {
  value: '根',
  label: '根'
}, {
  value: '根茎',
  label: '根茎'
}, {
  value: '果实',
  label: '果实'
}, {
  value: '花',
  label: '花'
}, {
  value: '叶',
  label: '叶'
}];

// 产地
const origins = [{
  value: 'all',
  label: '所有产地'
}, {
  value: '中国',
  label: '中国'
}, {
  value: '韩国',
  label: '韩国'
}, {
  value: '日本',
  label: '日本'
}, {
  value: '美国',
  label: '美国'
}];

// 导航组件
function Navigation({
  $w,
  currentPage
}) {
  const {
    t,
    changeLanguage
  } = useTranslation();
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
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden md:block">
              <select className="text-sm border border-gray-300 rounded px-2 py-1" onChange={e => changeLanguage(e.target.value)} defaultValue="zh">
                <option value="zh">🇨🇳 中文</option>
                <option value="en">🇺🇸 English</option>
                <option value="ja">🇯🇵 日本語</option>
                <option value="ko">🇰🇷 한국어</option>
              </select>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? '✕' : '☰'}
              </Button>
            </div>
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

// 页脚组件
function Footer({
  $w
}) {
  const {
    t
  } = useTranslation();
  return <footer className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">HerbalTrade</h3>
            <p className="text-green-200">传承千年中医药文化，服务全球健康事业</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <div className="space-y-2">
              <button onClick={() => $w.utils.navigateTo({
              pageId: 'index',
              params: {}
            })} className="block text-green-200 hover:text-white">
                首页
              </button>
              <button onClick={() => $w.utils.navigateTo({
              pageId: 'tcm-products',
              params: {}
            })} className="block text-green-200 hover:text-white">
                产品中心
              </button>
              <button onClick={() => $w.utils.navigateTo({
              pageId: 'tcm-about-us',
              params: {}
            })} className="block text-green-200 hover:text-white">
                关于我们
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">联系我们</h4>
            <div className="space-y-2 text-green-200">
              <p>电话: +86-400-123-4567</p>
              <p>邮箱: info@herbaltrade.com</p>
              <p>地址: 中国安徽省亳州市中药材交易中心</p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">关注我们</h4>
            <div className="flex space-x-4">
              <button className="text-green-200 hover:text-white">微信</button>
              <button className="text-green-200 hover:text-white">微博</button>
              <button className="text-green-200 hover:text-white">LinkedIn</button>
            </div>
          </div>
        </div>
        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
          <p>&copy; 2024 HerbalTrade. All rights reserved.</p>
        </div>
      </div>
    </footer>;
}
export default function TCMProductsPage(props) {
  const {
    t
  } = useTranslation();
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEfficacy, setSelectedEfficacy] = useState('all');
  const [selectedPart, setSelectedPart] = useState('all');
  const [selectedOrigin, setSelectedOrigin] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 12;

  // 筛选逻辑
  useEffect(() => {
    let filtered = [...mockProducts];

    // 搜索筛选
    if (searchTerm) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.latin.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // 功效筛选
    if (selectedEfficacy !== 'all') {
      filtered = filtered.filter(product => product.efficacy.includes(selectedEfficacy));
    }

    // 部位筛选
    if (selectedPart !== 'all') {
      filtered = filtered.filter(product => product.part === selectedPart);
    }

    // 产地筛选
    if (selectedOrigin !== 'all') {
      filtered = filtered.filter(product => product.origin === selectedOrigin);
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedEfficacy, selectedPart, selectedOrigin]);

  // 分页逻辑
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  const handleProductClick = productId => {
    props.$w.utils.navigateTo({
      pageId: 'product-inquiry',
      params: {
        id: productId
      }
    });
  };
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedEfficacy('all');
    setSelectedPart('all');
    setSelectedOrigin('all');
  };
  return <div className="min-h-screen bg-gray-50">
      <Navigation $w={props.$w} currentPage="tcm-products" />

      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('products.title')}</h1>
            <p className="text-xl md:text-2xl text-green-100">{t('products.subtitle')}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input placeholder={t('products.searchPlaceholder')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
                  </div>
                </div>

                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  {t('products.filterBtn')}
                </Button>

                {(searchTerm || selectedEfficacy !== 'all' || selectedPart !== 'all' || selectedOrigin !== 'all') && <Button variant="ghost" onClick={clearFilters} className="text-red-600 hover:text-red-700">
                    {t('products.clearFilters')}
                  </Button>}
              </div>

              {showFilters && <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Select value={selectedEfficacy} onChange={e => setSelectedEfficacy(e.target.value)}>
                    {efficacyCategories.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                  </Select>

                  <Select value={selectedPart} onChange={e => setSelectedPart(e.target.value)}>
                    {herbParts.map(part => <option key={part.value} value={part.value}>{part.label}</option>)}
                  </Select>

                  <Select value={selectedOrigin} onChange={e => setSelectedOrigin(e.target.value)}>
                    {origins.map(origin => <option key={origin.value} value={origin.value}>{origin.label}</option>)}
                  </Select>
                </div>}
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              {t('products.results').replace('{count}', filteredProducts.length.toString())}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map(product => <Card key={product.id} className="group hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleProductClick(product.id)}>
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="absolute top-2 left-2 flex gap-1">
                    {product.efficacy.slice(0, 2).map(eff => <Badge key={eff} variant="secondary" className="bg-green-100 text-green-800 text-xs">
                        {eff}
                      </Badge>)}
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      {product.grade}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-bold text-green-800 text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 italic mb-2">{product.latin}</p>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('products.origin')}:</span>
                      <span className="font-medium">{product.origin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('products.part')}:</span>
                      <span className="font-medium">{product.part}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className="text-xl font-bold text-green-800">{product.priceRange}</span>
                  </div>

                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>

                  <Button className="w-full mt-4 bg-green-700 hover:bg-green-800">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {t('products.inquiryBtn')}
                  </Button>
                </CardContent>
              </Card>)}
          </div>

          {/* Pagination */}
          {totalPages > 1 && <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  {t('products.prevPage')}
                </Button>

                {[...Array(totalPages)].map((_, i) => <Button key={i + 1} variant={currentPage === i + 1 ? "default" : "outline"} onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </Button>)}

                <Button variant="outline" onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages}>
                  {t('products.nextPage')}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>}
        </div>
      </main>

      <Footer />
    </div>;
}