// @ts-ignore;
import React, { useState, useMemo } from 'react';
// @ts-ignore;
import { Search, Filter as FilterIcon, ChevronLeft, ChevronRight, ShoppingCart, Heart, Star, Leaf, Menu, X, Globe, Phone, Mail, MapPin } from 'lucide-react';
// @ts-ignore;
import { Input, Button, Card, CardContent, CardFooter, Badge } from '@/components/ui';

// @ts-ignore;
import { Navigation } from '@/components/Navigation';
// @ts-ignore;
import { Footer } from '@/components/Footer';

// Filter Sidebar Component
function TCMFilterSidebar({
  filters,
  onFilterChange,
  onClearFilters
}) {
  const efficacyOptions = ['补气', '养血', '清热', '解毒', '活血', '安神', '滋阴', '壮阳'];
  const partOptions = ['根', '茎', '叶', '花', '果实', '种子', '皮', '全草'];
  const originOptions = ['中国', '韩国', '日本', '印度', '越南', '泰国', '美国', '加拿大'];
  const toggleFilter = (type, value) => {
    const current = filters[type] || [];
    const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    onFilterChange(type, updated);
  };
  const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0);
  return <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-green-800 flex items-center">
          <FilterIcon className="h-5 w-5 mr-2" />
          筛选条件
        </h3>
        {hasActiveFilters && <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-green-600">
            清除全部
          </Button>}
      </div>

      <div className="space-y-6">
        {/* 功效筛选 */}
        <div>
          <h4 className="font-medium text-green-800 mb-3">功效分类</h4>
          <div className="flex flex-wrap gap-2">
            {efficacyOptions.map(option => <Badge key={option} variant={filters.efficacy?.includes(option) ? 'default' : 'outline'} className={`cursor-pointer transition-colors ${filters.efficacy?.includes(option) ? 'bg-green-700 text-white' : 'border-green-300 text-green-700 hover:bg-green-50'}`} onClick={() => toggleFilter('efficacy', option)}>
                {option}
              </Badge>)}
          </div>
        </div>

        {/* 药材部位筛选 */}
        <div>
          <h4 className="font-medium text-green-800 mb-3">药材部位</h4>
          <div className="flex flex-wrap gap-2">
            {partOptions.map(option => <Badge key={option} variant={filters.part?.includes(option) ? 'default' : 'outline'} className={`cursor-pointer transition-colors ${filters.part?.includes(option) ? 'bg-green-700 text-white' : 'border-green-300 text-green-700 hover:bg-green-50'}`} onClick={() => toggleFilter('part', option)}>
                {option}
              </Badge>)}
          </div>
        </div>

        {/* 产地筛选 */}
        <div>
          <h4 className="font-medium text-green-800 mb-3">产地</h4>
          <div className="flex flex-wrap gap-2">
            {originOptions.map(option => <Badge key={option} variant={filters.origin?.includes(option) ? 'default' : 'outline'} className={`cursor-pointer transition-colors ${filters.origin?.includes(option) ? 'bg-green-700 text-white' : 'border-green-300 text-green-700 hover:bg-green-50'}`} onClick={() => toggleFilter('origin', option)}>
                {option}
              </Badge>)}
          </div>
        </div>
      </div>
    </div>;
}

// Product Grid Component
function TCMProductGrid({
  products,
  onProductClick
}) {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => <Card key={product.id} className="group hover:shadow-lg transition-shadow bg-white overflow-hidden">
          <div className="relative">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="absolute top-2 left-2 flex gap-1">
              {product.efficacy.slice(0, 2).map(eff => <Badge key={eff} variant="secondary" className="bg-green-100 text-green-800 text-xs">
                  {eff}
                </Badge>)}
            </div>
            <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart className="h-4 w-4 text-green-700" />
            </button>
          </div>

          <CardContent className="p-4">
            <h3 className="font-bold text-green-800 text-lg mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 italic mb-2">{product.latin}</p>
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">产地:</span>
                <span className="font-medium">{product.origin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">部位:</span>
                <span className="font-medium">{product.part}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">等级:</span>
                <span className="font-medium">{product.grade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">起订量:</span>
                <span className="font-medium">{product.moq}kg</span>
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
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button className="w-full bg-green-700 hover:bg-green-800" onClick={() => onProductClick(product.id)}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              立即询盘
            </Button>
          </CardFooter>
        </Card>)}
    </div>;
}

// Pagination Component
function TCMPagination({
  currentPage,
  totalPages,
  onPageChange
}) {
  const pageNumbers = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  return <div className="flex justify-center items-center space-x-2 mt-8">
      <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="border-green-300 text-green-700 hover:bg-green-50">
        <ChevronLeft className="h-4 w-4" />
        上一页
      </Button>

      {startPage > 1 && <Button variant="ghost" size="sm" onClick={() => onPageChange(1)} className="text-green-700">
          1
        </Button>}
      
      {startPage > 2 && <span className="text-green-600">...</span>}

      {pageNumbers.map(number => <Button key={number} variant={currentPage === number ? 'default' : 'ghost'} size="sm" onClick={() => onPageChange(number)} className={currentPage === number ? 'bg-green-700 text-white' : 'text-green-700 hover:bg-green-50'}>
          {number}
        </Button>)}

      {endPage < totalPages && <Button variant="ghost" size="sm" onClick={() => onPageChange(totalPages)} className="text-green-700">
          {totalPages}
        </Button>}
      
      <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="border-green-300 text-green-700 hover:bg-green-50">
        下一页
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>;
}

// 模拟产品数据
const allProducts = [{
  id: 1,
  name: '长白山野山参',
  latin: 'Panax ginseng C.A. Mey',
  image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop',
  efficacy: ['补气', '养血', '安神'],
  part: '根',
  origin: '中国',
  moq: 1,
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
  moq: 5,
  priceRange: '¥89-168/kg',
  grade: '一级',
  rating: 4.7,
  reviews: 234
}, {
  id: 3,
  name: '内蒙古黄芪',
  latin: 'Astragalus membranaceus (Fisch.) Bge',
  image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=300&fit=crop',
  efficacy: ['补气', '固表', '利水'],
  part: '根',
  origin: '中国',
  moq: 10,
  priceRange: '¥45-89/kg',
  grade: '特级',
  rating: 4.6,
  reviews: 189
}, {
  id: 4,
  name: '宁夏枸杞',
  latin: 'Lycium barbarum L.',
  image: 'https://images.unsplash.com/photo-1586810160470-2d3cd0f7934b?w=300&h=300&fit=crop',
  efficacy: ['滋阴', '补肾', '明目'],
  part: '果实',
  origin: '中国',
  moq: 2,
  priceRange: '¥68-128/kg',
  grade: '特级',
  rating: 4.9,
  reviews: 312
}, {
  id: 5,
  name: '韩国高丽参',
  latin: 'Panax ginseng C.A. Mey',
  image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop',
  efficacy: ['补气', '养血', '安神'],
  part: '根',
  origin: '韩国',
  moq: 0.5,
  priceRange: '¥580-1200/kg',
  grade: '天字级',
  rating: 4.9,
  reviews: 98
}, {
  id: 6,
  name: '日本红参',
  latin: 'Panax ginseng C.A. Mey',
  image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop',
  efficacy: ['补气', '养血', '安神'],
  part: '根',
  origin: '日本',
  moq: 0.3,
  priceRange: '¥680-1500/kg',
  grade: '特选级',
  rating: 5.0,
  reviews: 67
}, {
  id: 7,
  name: '印度藏红花',
  latin: 'Crocus sativus L.',
  image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=300&fit=crop',
  efficacy: ['活血', '养血', '安神'],
  part: '花',
  origin: '印度',
  moq: 0.1,
  priceRange: '¥2800-4500/kg',
  grade: '特级',
  rating: 4.8,
  reviews: 45
}, {
  id: 8,
  name: '越南肉桂',
  latin: 'Cinnamomum cassia Presl',
  image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=300&fit=crop',
  efficacy: ['温阳', '散寒', '止痛'],
  part: '皮',
  origin: '越南',
  moq: 5,
  priceRange: '¥45-89/kg',
  grade: '一级',
  rating: 4.5,
  reviews: 123
}, {
  id: 9,
  name: '泰国柠檬草',
  latin: 'Cymbopogon citratus (DC.) Stapf',
  image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=300&fit=crop',
  efficacy: ['清热', '解暑', '利湿'],
  part: '全草',
  origin: '泰国',
  moq: 10,
  priceRange: '¥25-45/kg',
  grade: '一级',
  rating: 4.4,
  reviews: 89
}, {
  id: 10,
  name: '日本紫苏叶',
  latin: 'Perilla frutescens (L.) Britt.',
  image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=300&fit=crop',
  efficacy: ['解表', '散寒', '行气'],
  part: '叶',
  origin: '日本',
  moq: 2,
  priceRange: '¥35-65/kg',
  grade: '特级',
  rating: 4.7,
  reviews: 156
}, {
  id: 11,
  name: '韩国五味子',
  latin: 'Schisandra chinensis (Turcz.) Baill.',
  image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=300&fit=crop',
  efficacy: ['收敛', '益气', '生津'],
  part: '果实',
  origin: '韩国',
  moq: 3,
  priceRange: '¥85-165/kg',
  grade: '一级',
  rating: 4.6,
  reviews: 78
}, {
  id: 12,
  name: '中国金银花',
  latin: 'Lonicera japonica Thunb.',
  image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=300&fit=crop',
  efficacy: ['清热', '解毒', '凉血'],
  part: '花',
  origin: '中国',
  moq: 5,
  priceRange: '¥55-95/kg',
  grade: '特级',
  rating: 4.8,
  reviews: 267
}];
export default function TCMProductsPage(props) {
  const [filters, setFilters] = useState({
    efficacy: [],
    part: [],
    origin: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const itemsPerPage = 12;
  const handleFilterChange = (type, values) => {
    setFilters(prev => ({
      ...prev,
      [type]: values
    }));
    setCurrentPage(1);
  };
  const clearFilters = () => {
    setFilters({
      efficacy: [],
      part: [],
      origin: []
    });
    setCurrentPage(1);
  };
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.latin.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesEfficacy = filters.efficacy.length === 0 || filters.efficacy.some(eff => product.efficacy.includes(eff));
      const matchesPart = filters.part.length === 0 || filters.part.includes(product.part);
      const matchesOrigin = filters.origin.length === 0 || filters.origin.includes(product.origin);
      return matchesSearch && matchesEfficacy && matchesPart && matchesOrigin;
    });
  }, [filters, searchTerm]);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  const handleProductClick = productId => {
    props.$w.utils.navigateTo({
      pageId: 'tcm-product-detail',
      params: {
        id: productId
      }
    });
  };
  const activeFilterCount = Object.values(filters).flat().length;
  return <div style={props.style} className="min-h-screen bg-gray-50">
      <Navigation $w={props.$w} currentPage="tcm-products" />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-green-800 mb-2">中药材产品中心</h1>
            <p className="text-green-600">精选道地药材，传承千年中医药文化</p>
          </div>

          {/* Search and Mobile Filter Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="搜索药材名称或拉丁学名..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <Button variant="outline" className="sm:hidden border-green-300 text-green-700" onClick={() => setShowMobileFilters(!showMobileFilters)}>
              <FilterIcon className="h-4 w-4 mr-2" />
              筛选 {activeFilterCount > 0 && `(${activeFilterCount})`}
            </Button>
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && <div className="sm:hidden mb-6">
              <TCMFilterSidebar filters={filters} onFilterChange={handleFilterChange} onClearFilters={clearFilters} />
            </div>}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden sm:block lg:col-span-1">
              <TCMFilterSidebar filters={filters} onFilterChange={handleFilterChange} onClearFilters={clearFilters} />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-green-700">
                  共找到 <span className="font-bold">{filteredProducts.length}</span> 个产品
                </p>
              </div>

              {/* Product Grid */}
              <TCMProductGrid products={paginatedProducts} onProductClick={handleProductClick} />

              {/* Pagination */}
              {totalPages > 1 && <TCMPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
            </div>
          </div>
        </div>
      </main>

      <Footer $w={props.$w} />
    </div>;
}