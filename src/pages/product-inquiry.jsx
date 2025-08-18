// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ArrowLeft, Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, ShoppingCart, Star, Leaf, Home, ChevronRight } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, Input, Textarea, Badge } from '@/components/ui';

// @ts-ignore;
import { useTranslation } from '@/hooks/useTranslation';

// 模拟产品数据
const mockProducts = {
  1: {
    id: 1,
    name: '长白山野山参',
    latin: 'Panax ginseng C.A. Mey',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=600&fit=crop',
    efficacy: ['补气', '养血', '安神'],
    part: '根',
    origin: '中国',
    moq: 1,
    priceRange: '¥288-580/kg',
    grade: '特级',
    rating: 4.8,
    reviews: 156,
    description: '长白山野山参是东北三宝之首，生长在长白山海拔1000-2000米的原始森林中，经过15-20年的自然生长，具有极高的药用价值。其有效成分人参皂苷含量丰富，是滋补强身的珍贵药材。',
    specifications: {
      size: '10-15g/支',
      moisture: '≤13%',
      ash: '≤5%',
      extract: '≥25%'
    }
  },
  2: {
    id: 2,
    name: '岷县当归',
    latin: 'Angelica sinensis (Oliv.) Diels',
    image: 'https://images.unsplash.com/photo-1595242000808-2b0d9b22931e?w=600&h=600&fit=crop',
    efficacy: ['养血', '活血', '调经'],
    part: '根',
    origin: '中国',
    moq: 5,
    priceRange: '¥89-168/kg',
    grade: '一级',
    rating: 4.7,
    reviews: 234,
    description: '岷县当归产自甘肃岷县，是中国国家地理标志产品。岷县地处黄土高原与青藏高原过渡带，海拔高、气候冷凉、昼夜温差大，非常适合当归生长。岷县当归具有头大、身长、枝粗、肉质厚等特点。',
    specifications: {
      size: '15-20cm',
      moisture: '≤14%',
      ash: '≤6%',
      extract: '≥20%'
    }
  },
  3: {
    id: 3,
    productName: '宁夏枸杞',
    latin: 'Lycium barbarum L.',
    image: 'https://images.unsplash.com/photo-1586810160470-2d3cd0f7934b?w=600&h=600&fit=crop',
    efficacy: ['滋阴', '补肾', '明目'],
    part: '果实',
    origin: '中国',
    moq: 2,
    priceRange: '¥68-128/kg',
    grade: '特级',
    rating: 4.9,
    reviews: 312,
    description: '宁夏枸杞产自宁夏中宁，是中国国家地理标志产品。宁夏地处黄土高原与内蒙古高原过渡带，光照充足，昼夜温差大，土壤富含矿物质，造就了宁夏枸杞粒大、肉厚、籽少、味甜的特点。',
    specifications: {
      size: '280-380粒/50g',
      moisture: '≤13%',
      sugar: '≥13%',
      polysaccharide: '≥3%'
    }
  }
};

// 导航组件
function Navigation({
  $w
}) {
  const {
    t
  } = useTranslation();
  return <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <button onClick={() => $w.utils.navigateTo({
            pageId: 'index',
            params: {}
          })} className="flex items-center space-x-2 text-green-700 hover:text-green-900">
              <Leaf className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold">HerbalTrade</h1>
                <p className="text-xs text-green-600">中药材贸易</p>
              </div>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => $w.utils.navigateTo({
            pageId: 'tcm-products',
            params: {}
          })} className="text-green-700 hover:text-green-900 font-medium">
              产品中心
            </button>
            <button onClick={() => $w.utils.navigateTo({
            pageId: 'tcm-about-us',
            params: {}
          })} className="text-green-700 hover:text-green-900 font-medium">
              关于我们
            </button>
          </div>
        </div>
      </div>
    </nav>;
}

// 面包屑导航
function Breadcrumb({
  $w,
  productName
}) {
  return <nav className="bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <button onClick={() => $w.utils.navigateTo({
            pageId: 'index',
            params: {}
          })} className="text-green-600 hover:text-green-800 flex items-center">
              <Home className="h-4 w-4 mr-1" />
              首页
            </button>
          </li>
          <li>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </li>
          <li>
            <button onClick={() => $w.utils.navigateTo({
            pageId: 'tcm-products',
            params: {}
          })} className="text-green-600 hover:text-green-800">
              产品中心
            </button>
          </li>
          <li>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </li>
          <li className="text-gray-500">{productName}</li>
        </ol>
      </div>
    </nav>;
}
export default function ProductInquiryPage(props) {
  const {
    t
  } = useTranslation();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    const productId = props.$w.page.dataset.params?.id || '1';
    const foundProduct = mockProducts[productId] || mockProducts[1];
    setProduct(foundProduct);
  }, [props.$w.page.dataset.params]);
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 这里可以调用实际的API
      console.log('提交询盘:', {
        product: product,
        inquiry: formData
      });
      setSubmitStatus('success');
      setShowSuccess(true);

      // 重置表单
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        quantity: '',
        message: ''
      });

      // 3秒后隐藏成功提示
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleBack = () => {
    props.$w.utils.navigateBack();
  };
  if (!product) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gray-50">
      <Navigation $w={props.$w} />
      
      <Breadcrumb $w={props.$w} productName={product.name} />

      <main className="pt-0">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-green-800">{product.name} - 询盘详情</h1>
                <p className="text-sm text-gray-600 mt-1">填写表单获取详细报价信息</p>
              </div>
              <Button variant="outline" onClick={() => props.$w.utils.navigateTo({
              pageId: 'tcm-products',
              params: {}
            })} className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回产品列表
              </Button>
            </div>
          </div>
        </div>

        {/* Product Inquiry Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Info */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Image */}
                    <div>
                      <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded-lg" />
                    </div>

                    {/* Product Details */}
                    <div>
                      <h1 className="text-2xl font-bold text-green-800 mb-2">{product.name}</h1>
                      <p className="text-sm text-gray-600 italic mb-4">{product.latin}</p>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">({product.reviews} 条评价)</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {product.efficacy.map(eff => <Badge key={eff} variant="secondary" className="bg-green-100 text-green-800">
                              {eff}
                            </Badge>)}
                        </div>

                        <div className="space-y-2 text-sm">
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

                        <div className="pt-4 border-t">
                          <span className="text-2xl font-bold text-green-800">{product.priceRange}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">产品描述</h3>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  </div>

                  {/* Specifications */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">产品规格</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => <div key={key} className="bg-gray-50 p-3 rounded-lg">
                          <span className="text-sm text-gray-600 capitalize">{key}:</span>
                          <span className="block font-medium">{value}</span>
                        </div>)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-green-800 mb-4">发送询盘</h2>
                  
                  {showSuccess && <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span>询盘发送成功！我们会尽快与您联系。</span>
                      </div>
                    </div>}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
                      <Input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="请输入您的姓名" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">邮箱 *</label>
                      <Input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="请输入您的邮箱" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">电话 *</label>
                      <Input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="请输入您的电话" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">公司名称</label>
                      <Input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="请输入公司名称" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">需求数量</label>
                      <Input type="text" name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder="例如：100kg" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">留言内容 *</label>
                      <Textarea name="message" value={formData.message} onChange={handleInputChange} required rows={4} placeholder="请详细描述您的需求..." />
                    </div>

                    <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={isSubmitting}>
                      {isSubmitting ? '发送中...' : '发送询盘'}
                    </Button>
                  </form>

                  <div className="mt-4 text-xs text-gray-500 text-center">
                    我们承诺保护您的隐私信息
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="mt-6">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-green-800 mb-3">联系我们</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-green-600 mr-2" />
                      <span>400-123-4567</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-green-600 mr-2" />
                      <span>info@herbaltrade.com</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                      <span>安徽省亳州市中药材交易中心</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-green-200">&copy; 2024 HerbalTrade. 传承千年中医药文化，服务全球健康事业</p>
          </div>
        </div>
      </footer>
    </div>;
}