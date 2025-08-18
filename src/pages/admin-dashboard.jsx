// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { Mail, Settings, Users, ShoppingCart, TrendingUp, Package, Bell, Shield, Badge as BadgeIcon, FileText, MessageSquare, UserCheck, Phone, Settings2 } from 'lucide-react';

// 模拟数据
const mockStats = {
  totalProducts: 156,
  totalOrders: 2341,
  totalUsers: 892,
  monthlyRevenue: 156800,
  pendingOrders: 23,
  lowStockAlerts: 8
};

// 模拟图表数据
const chartData = [{
  month: '1月',
  revenue: 45000,
  orders: 120
}, {
  month: '2月',
  revenue: 52000,
  orders: 145
}, {
  month: '3月',
  revenue: 48000,
  orders: 132
}, {
  month: '4月',
  revenue: 61000,
  orders: 168
}, {
  month: '5月',
  revenue: 58000,
  orders: 155
}, {
  month: '6月',
  revenue: 72000,
  orders: 189
}];
export default function AdminDashboardPage(props) {
  const {
    toast
  } = useToast();
  const [stats, setStats] = useState(mockStats);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // 加载已保存的邮箱
  useEffect(() => {
    loadEmailConfig();
  }, []);

  // 从数据模型加载邮箱配置
  const loadEmailConfig = async () => {
    setLoading(true);
    try {
      const result = await props.$w.cloud.callDataSource({
        dataSourceName: 'inquiry_email_config',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          pageSize: 1,
          pageNumber: 1
        }
      });
      if (result.records && result.records.length > 0) {
        setEmail(result.records[0].email || '');
      } else {
        // 如果没有记录，使用默认值
        setEmail('sales@herbaltrade.com');
      }
    } catch (error) {
      console.error('加载邮箱配置失败:', error);
      toast({
        title: "加载失败",
        description: "无法加载邮箱配置，请稍后重试",
        variant: "destructive"
      });
      setEmail('sales@herbaltrade.com');
    } finally {
      setLoading(false);
    }
  };

  // 保存邮箱配置到数据模型
  const handleSaveEmail = async () => {
    if (!email) {
      toast({
        title: "错误",
        description: "请输入邮箱地址",
        variant: "destructive"
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "错误",
        description: "请输入有效的邮箱地址",
        variant: "destructive"
      });
      return;
    }
    setSaving(true);
    try {
      // 先查询是否已存在记录
      const existing = await props.$w.cloud.callDataSource({
        dataSourceName: 'inquiry_email_config',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          pageSize: 1,
          pageNumber: 1
        }
      });
      if (existing.records && existing.records.length > 0) {
        // 更新现有记录
        await props.$w.cloud.callDataSource({
          dataSourceName: 'inquiry_email_config',
          methodName: 'wedaUpdateV2',
          params: {
            data: {
              email: email
            },
            filter: {
              where: {
                _id: {
                  $eq: existing.records[0]._id
                }
              }
            }
          }
        });
      } else {
        // 创建新记录
        await props.$w.cloud.callDataSource({
          dataSourceName: 'inquiry_email_config',
          methodName: 'wedaCreateV2',
          params: {
            data: {
              email: email
            }
          }
        });
      }
      toast({
        title: "保存成功",
        description: "询盘转发邮箱已更新",
        variant: "default"
      });
    } catch (error) {
      console.error('保存邮箱配置失败:', error);
      toast({
        title: "保存失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  // 导航到对应管理页面
  const navigateToPage = pageId => {
    props.$w.utils.navigateTo({
      pageId: pageId,
      params: {}
    });
  };
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-green-800">管理后台</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">欢迎，管理员</span>
              <Button variant="outline" size="sm" onClick={() => navigateToPage('index')}>
                返回前台
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">产品总数</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">订单总数</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">用户总数</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">本月营收</p>
                  <p className="text-2xl font-bold text-gray-900">¥{stats.monthlyRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">快捷操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline" onClick={() => navigateToPage('admin-products')}>
                <Package className="h-4 w-4 mr-2" />
                产品管理
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigateToPage('admin-orders')}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                订单管理
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigateToPage('admin-users')}>
                <UserCheck className="h-4 w-4 mr-2" />
                用户管理
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigateToPage('admin-inquiries')}>
                <MessageSquare className="h-4 w-4 mr-2" />
                询盘管理
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigateToPage('admin-settings')}>
                <Settings2 className="h-4 w-4 mr-2" />
                系统设置
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigateToPage('admin-content')}>
                <FileText className="h-4 w-4 mr-2" />
                内容管理
              </Button>
            </CardContent>
          </Card>

          {/* 询盘转发邮箱绑定模块 - 已接入数据模型 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Mail className="h-5 w-5 mr-2 text-green-600" />
                询盘转发邮箱绑定
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  接收询盘邮箱
                </label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="请输入邮箱地址" className="w-full" disabled={loading} />
                <p className="text-xs text-gray-500 mt-1">
                  填写后将把前台询盘信息自动转发至此邮箱
                </p>
              </div>
              
              <Button onClick={handleSaveEmail} disabled={saving || loading} className="w-full bg-green-700 hover:bg-green-800">
                {saving ? '保存中...' : '保存'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">系统状态</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">待处理订单</span>
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  {stats.pendingOrders}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">库存预警</span>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  {stats.lowStockAlerts}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">系统状态</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  正常运行
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>最近活动</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">新订单 #20240115001 - 长白山野山参 50kg</span>
                <span className="text-xs text-gray-400 ml-auto">2分钟前</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">新用户注册 - 张三</span>
                <span className="text-xs text-gray-400 ml-auto">15分钟前</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">产品更新 - 岷县当归库存补充</span>
                <span className="text-xs text-gray-400 ml-auto">1小时前</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>;
}