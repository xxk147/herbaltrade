// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Plus, Edit, Trash2, Eye, EyeOff, Search, CheckSquare, Square, Package, AlertCircle } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Switch, Badge, Alert, AlertDescription, Input } from '@/components/ui';

import { ProductEditDialog } from '@/components/ProductEditDialog';

// 主页面组件
export default function AdminProductsPage(props) {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  // 初始化产品数据
  useEffect(() => {
    const savedProducts = localStorage.getItem('tcm-products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // 初始化示例数据
      const initialProducts = [{
        id: 1,
        name: '长白山野山参',
        latin: 'Panax ginseng C.A. Mey',
        efficacy: ['补气', '养血', '安神'],
        part: '根',
        origin: '中国',
        moq: 1,
        priceRange: '¥288-580/kg',
        grade: '特级',
        stock: 100,
        description: '精选长白山五年以上野山参，有效成分含量≥5%',
        images: ['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop'],
        certificates: [{
          name: '有机认证.pdf',
          url: '#'
        }],
        isActive: true,
        createdAt: '2024-01-15'
      }, {
        id: 2,
        name: '岷县当归',
        latin: 'Angelica sinensis (Oliv.) Diels',
        efficacy: ['养血', '活血', '调经'],
        part: '根',
        origin: '中国',
        moq: 5,
        priceRange: '¥89-168/kg',
        grade: '一级',
        stock: 200,
        description: '甘肃岷县道地当归，阿魏酸含量≥0.05%',
        images: ['https://images.unsplash.com/photo-1595242000808-2b0d9b22931e?w=300&h=300&fit=crop'],
        certificates: [{
          name: 'GAP认证.pdf',
          url: '#'
        }],
        isActive: true,
        createdAt: '2024-01-14'
      }, {
        id: 3,
        name: '内蒙古黄芪',
        latin: 'Astragalus membranaceus (Fisch.) Bge',
        efficacy: ['补气', '固表', '利水'],
        part: '根',
        origin: '中国',
        moq: 10,
        priceRange: '¥45-89/kg',
        grade: '特级',
        stock: 150,
        description: '内蒙古赤峰道地黄芪，黄芪甲苷含量≥0.04%',
        images: ['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=300&fit=crop'],
        certificates: [{
          name: '有机认证.pdf',
          url: '#'
        }],
        isActive: true,
        createdAt: '2024-01-13'
      }, {
        id: 4,
        name: '宁夏枸杞',
        latin: 'Lycium barbarum L.',
        efficacy: ['滋阴', '补肾', '明目'],
        part: '果实',
        origin: '中国',
        moq: 2,
        priceRange: '¥68-128/kg',
        grade: '特级',
        stock: 300,
        description: '宁夏中宁道地枸杞，枸杞多糖含量≥3%',
        images: ['https://images.unsplash.com/photo-1586810160470-2d3cd0f7934b?w=300&h=300&fit=crop'],
        certificates: [{
          name: '有机认证.pdf',
          url: '#'
        }],
        isActive: true,
        createdAt: '2024-01-12'
      }, {
        id: 5,
        name: '韩国高丽参',
        latin: 'Panax ginseng C.A. Mey',
        efficacy: ['补气', '养血', '安神'],
        part: '根',
        origin: '韩国',
        moq: 0.5,
        priceRange: '¥580-1200/kg',
        grade: '天字级',
        stock: 50,
        description: '韩国六年根高丽参，人参皂苷含量≥20mg/g',
        images: ['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop'],
        certificates: [{
          name: '韩国认证.pdf',
          url: '#'
        }],
        isActive: false,
        createdAt: '2024-01-11'
      }];
      setProducts(initialProducts);
      localStorage.setItem('tcm-products', JSON.stringify(initialProducts));
    }
  }, []);

  // 保存到本地存储
  const saveProducts = newProducts => {
    setProducts(newProducts);
    localStorage.setItem('tcm-products', JSON.stringify(newProducts));
    setSaveStatus('产品数据已更新');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  // 处理产品保存
  const handleSaveProduct = product => {
    let newProducts;
    if (product.id) {
      // 编辑现有产品
      newProducts = products.map(p => p.id === product.id ? product : p);
    } else {
      // 添加新产品
      const newProduct = {
        ...product,
        id: Math.max(...products.map(p => p.id), 0) + 1,
        createdAt: new Date().toISOString().split('T')[0]
      };
      newProducts = [...products, newProduct];
    }
    saveProducts(newProducts);
    setEditingProduct(null);
  };

  // 处理产品删除
  const handleDeleteProduct = productId => {
    if (window.confirm('确定要删除这个产品吗？')) {
      const newProducts = products.filter(p => p.id !== productId);
      saveProducts(newProducts);
    }
  };

  // 处理批量操作
  const handleBatchAction = action => {
    if (selectedProducts.length === 0) {
      alert('请先选择产品');
      return;
    }
    let newProducts = [...products];
    if (action === 'activate') {
      newProducts = newProducts.map(p => selectedProducts.includes(p.id) ? {
        ...p,
        isActive: true
      } : p);
    } else if (action === 'deactivate') {
      newProducts = newProducts.map(p => selectedProducts.includes(p.id) ? {
        ...p,
        isActive: false
      } : p);
    } else if (action === 'delete') {
      if (window.confirm(`确定要删除选中的 ${selectedProducts.length} 个产品吗？`)) {
        newProducts = newProducts.filter(p => !selectedProducts.includes(p.id));
      }
    }
    saveProducts(newProducts);
    setSelectedProducts([]);
  };

  // 处理状态切换
  const handleStatusToggle = (productId, isActive) => {
    const newProducts = products.map(p => p.id === productId ? {
      ...p,
      isActive
    } : p);
    saveProducts(newProducts);
  };

  // 处理全选
  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  // 处理单个选择
  const handleSelectProduct = productId => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // 过滤产品
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.latin.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  return <div style={props.style} className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-green-800">产品管理</h1>
            <div className="flex items-center space-x-4">
              <Button onClick={() => setEditingProduct({})}>
                <Plus className="h-4 w-4 mr-1" />
                添加产品
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Save Status */}
      {saveStatus && <Alert className="mx-auto max-w-7xl mt-4">
          <AlertDescription>{saveStatus}</AlertDescription>
        </Alert>}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Batch Actions */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="搜索产品名称或拉丁学名..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              {selectedProducts.length > 0 && <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleBatchAction('activate')}>
                    <Eye className="h-4 w-4 mr-1" />
                    批量上架
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleBatchAction('deactivate')}>
                    <EyeOff className="h-4 w-4 mr-1" />
                    批量下架
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleBatchAction('delete')} className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-1" />
                    批量删除
                  </Button>
                </div>}
            </div>
            {selectedProducts.length > 0 && <p className="text-sm text-gray-600 mt-2">
                已选择 {selectedProducts.length} 个产品
              </p>}
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              产品列表 ({filteredProducts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Button variant="ghost" size="sm" onClick={handleSelectAll}>
                        {selectedProducts.length === filteredProducts.length ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                      </Button>
                    </TableHead>
                    <TableHead>产品信息</TableHead>
                    <TableHead>产地/部位</TableHead>
                    <TableHead>价格/库存</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map(product => <TableRow key={product.id}>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleSelectProduct(product.id)}>
                          {selectedProducts.includes(product.id) ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded object-cover" />
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-600 italic">{product.latin}</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {product.efficacy.map(eff => <Badge key={eff} variant="secondary" className="text-xs">
                                  {eff}
                                </Badge>)}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{product.origin}</div>
                          <div className="text-gray-600">{product.part}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{product.priceRange}</div>
                          <div className="text-gray-600">库存: {product.stock}kg</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch checked={product.isActive} onCheckedChange={checked => handleStatusToggle(product.id, checked)} />
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => setEditingProduct(product)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product.id)} className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </div>
            {filteredProducts.length === 0 && <div className="text-center py-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>暂无产品数据</p>
              </div>}
          </CardContent>
        </Card>
      </main>

      {/* Edit Dialog */}
      {editingProduct !== null && <ProductEditDialog product={editingProduct} onSave={handleSaveProduct} onClose={() => setEditingProduct(null)} />}
    </div>;
}