// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, Calendar, Mail, Phone, User, Package, Clock, CheckCircle, Circle, Filter, Eye, MessageSquare, Building, Hash } from 'lucide-react';

// 模拟询盘数据
const mockInquiries = [{
  id: '1',
  customerName: '张三',
  customerEmail: 'zhangsan@example.com',
  customerPhone: '13800138001',
  customerCompany: '北京医药有限公司',
  productName: '长白山野山参',
  quantity: '50kg',
  message: '需要特级品质，请提供详细报价和质检报告。长期合作，月需求量200kg。',
  status: 'pending',
  createdAt: '2024-01-20 10:30:00',
  updatedAt: '2024-01-20 10:30:00'
}, {
  id: '2',
  customerName: '李四',
  customerEmail: 'lisi@example.com',
  customerPhone: '13900139002',
  customerCompany: '上海药材贸易公司',
  productName: '岷县当归',
  quantity: '100kg',
  message: '需要一级品质，要求无硫熏，请提供样品和相关证书。',
  status: 'processed',
  createdAt: '2024-01-19 15:45:00',
  updatedAt: '2024-01-19 16:30:00'
}, {
  id: '3',
  customerName: '王五',
  customerEmail: 'wangwu@example.com',
  customerPhone: '13700137003',
  customerCompany: '广州健康药业',
  productName: '宁夏枸杞',
  quantity: '200kg',
  message: '需要特级宁夏枸杞，要求颗粒饱满，色泽红润，请提供质检报告。',
  status: 'pending',
  createdAt: '2024-01-18 09:20:00',
  updatedAt: '2024-01-18 09:20:00'
}, {
  id: '4',
  customerName: '赵六',
  customerEmail: 'zhaoliu@example.com',
  customerPhone: '13600136004',
  customerCompany: '深圳医药集团',
  productName: '长白山野山参',
  quantity: '30kg',
  message: '急需30kg长白山野山参，要求15年以上参龄，请尽快联系。',
  status: 'processed',
  createdAt: '2024-01-17 14:15:00',
  updatedAt: '2024-01-17 15:00:00'
}, {
  id: '5',
  customerName: '钱七',
  customerEmail: 'qianqi@example.com',
  customerPhone: '13500135005',
  customerCompany: '杭州中药材公司',
  productName: '岷县当归',
  quantity: '80kg',
  message: '需要岷县当归一级品，要求无杂质，请提供产地证明。',
  status: 'pending',
  createdAt: '2024-01-16 11:30:00',
  updatedAt: '2024-01-16 11:30:00'
}, {
  id: '6',
  customerName: '孙八',
  customerEmail: 'sunba@example.com',
  customerPhone: '13400134006',
  customerCompany: '成都医药连锁',
  productName: '宁夏枸杞',
  quantity: '150kg',
  message: '长期采购宁夏枸杞，每月需求150kg，请提供优惠价格。',
  status: 'processed',
  createdAt: '2024-01-15 16:45:00',
  updatedAt: '2024-01-15 17:20:00'
}];

// 询盘状态组件
function InquiryStatusBadge({
  status
}) {
  const statusConfig = {
    pending: {
      label: '待处理',
      color: 'bg-yellow-100 text-yellow-800',
      icon: Circle
    },
    processed: {
      label: '已处理',
      color: 'bg-green-100 text-green-800',
      icon: CheckCircle
    }
  };
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;
  return <Badge className={`${config.color} font-medium flex items-center`}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>;
}

// 询盘卡片组件
function InquiryCard({
  inquiry,
  onStatusChange,
  onViewDetails
}) {
  return <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{inquiry.customerName}</h3>
            <p className="text-sm text-gray-600">{inquiry.customerCompany}</p>
          </div>
          <InquiryStatusBadge status={inquiry.status} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-2" />
            {inquiry.customerEmail}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            {inquiry.customerPhone}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Package className="h-4 w-4 mr-2" />
            {inquiry.productName} - {inquiry.quantity}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {inquiry.createdAt}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-700 line-clamp-2">{inquiry.message}</p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={() => onViewDetails(inquiry)}>
            <Eye className="h-4 w-4 mr-1" />
            查看详情
          </Button>
          <Button size="sm" onClick={() => onStatusChange(inquiry.id)} className={inquiry.status === 'pending' ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'}>
            {inquiry.status === 'pending' ? '标记已处理' : '标记未处理'}
          </Button>
        </div>
      </CardContent>
    </Card>;
}

// 详情弹窗组件
function InquiryDetailsDialog({
  inquiry,
  open,
  onOpenChange
}) {
  if (!inquiry) return null;
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>询盘详情</DialogTitle>
          <DialogDescription>客户询盘的完整信息</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">客户姓名</label>
              <p className="text-sm text-gray-900">{inquiry.customerName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">公司名称</label>
              <p className="text-sm text-gray-900">{inquiry.customerCompany}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">邮箱</label>
              <p className="text-sm text-gray-900">{inquiry.customerEmail}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">电话</label>
              <p className="text-sm text-gray-900">{inquiry.customerPhone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">产品名称</label>
              <p className="text-sm text-gray-900">{inquiry.productName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">需求数量</label>
              <p className="text-sm text-gray-900">{inquiry.quantity}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">留言内容</label>
            <div className="mt-1 p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-900">{inquiry.message}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">提交时间</label>
              <p className="text-sm text-gray-900">{inquiry.createdAt}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">更新时间</label>
              <p className="text-sm text-gray-900">{inquiry.updatedAt}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">处理状态</label>
            <div className="mt-1">
              <InquiryStatusBadge status={inquiry.status} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
}
export default function AdminInquiriesPage(props) {
  const {
    toast
  } = useToast();
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 筛选状态
  const [filters, setFilters] = useState({
    status: 'all',
    product: 'all',
    dateRange: 'all'
  });

  // 加载询盘数据
  useEffect(() => {
    loadInquiries();
  }, []);

  // 筛选逻辑
  useEffect(() => {
    let filtered = [...inquiries];

    // 状态筛选
    if (filters.status !== 'all') {
      filtered = filtered.filter(inquiry => inquiry.status === filters.status);
    }

    // 产品筛选
    if (filters.product !== 'all') {
      filtered = filtered.filter(inquiry => inquiry.productName === filters.product);
    }

    // 时间范围筛选
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      switch (filters.dateRange) {
        case 'today':
          filterDate.setDate(now.getDate() - 1);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3);
          break;
      }
      filtered = filtered.filter(inquiry => new Date(inquiry.createdAt) >= filterDate);
    }
    setFilteredInquiries(filtered);
  }, [filters, inquiries]);

  // 模拟加载询盘数据
  const loadInquiries = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      setInquiries(mockInquiries);
    } catch (error) {
      toast({
        title: "加载失败",
        description: "无法加载询盘数据",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // 处理状态变更
  const handleStatusChange = async inquiryId => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      setInquiries(prevInquiries => prevInquiries.map(inquiry => inquiry.id === inquiryId ? {
        ...inquiry,
        status: inquiry.status === 'pending' ? 'processed' : 'pending',
        updatedAt: new Date().toLocaleString('zh-CN')
      } : inquiry));
      toast({
        title: "操作成功",
        description: `询盘已${inquiries.find(i => i.id === inquiryId)?.status === 'pending' ? '标记为已处理' : '标记为未处理'}`,
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "操作失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    }
  };

  // 查看详情
  const handleViewDetails = inquiry => {
    setSelectedInquiry(inquiry);
    setDialogOpen(true);
  };

  // 获取唯一的产品列表
  const uniqueProducts = [...new Set(inquiries.map(inquiry => inquiry.productName))];

  // 统计信息
  const stats = {
    total: filteredInquiries.length,
    pending: filteredInquiries.filter(i => i.status === 'pending').length,
    processed: filteredInquiries.filter(i => i.status === 'processed').length
  };
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-green-800">询盘管理</h1>
              <p className="text-sm text-gray-600">管理所有客户询盘</p>
            </div>
            <Button variant="outline" onClick={() => props.$w.utils.navigateTo({
            pageId: 'admin-dashboard',
            params: {}
          })}>
            返回仪表板
          </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">处理状态</label>
                <Select value={filters.status} onValueChange={value => setFilters(prev => ({
                ...prev,
                status: value
              }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="pending">待处理</SelectItem>
                    <SelectItem value="processed">已处理</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">产品名称</label>
                <Select value={filters.product} onValueChange={value => setFilters(prev => ({
                ...prev,
                product: value
              }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择产品" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部产品</SelectItem>
                    {uniqueProducts.map(product => <SelectItem key={product} value={product}>
                        {product}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">时间范围</label>
                <Select value={filters.dateRange} onValueChange={value => setFilters(prev => ({
                ...prev,
                dateRange: value
              }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择时间" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部时间</SelectItem>
                    <SelectItem value="today">今天</SelectItem>
                    <SelectItem value="week">最近7天</SelectItem>
                    <SelectItem value="month">最近30天</SelectItem>
                    <SelectItem value="quarter">最近3个月</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" onClick={() => setFilters({
                status: 'all',
                product: 'all',
                dateRange: 'all'
              })} className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  重置筛选
                </Button>
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-6 text-sm">
              <span className="text-gray-600">总计: <span className="font-semibold">{stats.total}</span></span>
              <span className="text-yellow-600">待处理: <span className="font-semibold">{stats.pending}</span></span>
              <span className="text-green-600">已处理: <span className="font-semibold">{stats.processed}</span></span>
            </div>
          </CardContent>
        </Card>

        {/* Inquiries List */}
        {loading ? <Card>
            <CardContent className="p-12">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
                <span className="ml-2 text-gray-600">加载中...</span>
              </div>
            </CardContent>
          </Card> : <div className="space-y-4">
            {filteredInquiries.length === 0 ? <Card>
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">没有找到匹配的询盘</p>
                </CardContent>
              </Card> : filteredInquiries.map(inquiry => <InquiryCard key={inquiry.id} inquiry={inquiry} onStatusChange={handleStatusChange} onViewDetails={handleViewDetails} />)}
          </div>}

        {/* Pagination */}
        {filteredInquiries.length > 0 && <Card className="mt-6">
            <CardContent className="p-4">
              <div className="flex justify-center">
                <p className="text-sm text-gray-600">
                  共 {filteredInquiries.length} 条询盘
                </p>
              </div>
            </CardContent>
          </Card>}
      </main>

      <InquiryDetailsDialog inquiry={selectedInquiry} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>;
}