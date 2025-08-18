// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, Pagination, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, User, Mail, Calendar, Shield, ShieldOff, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';

// 模拟用户数据
const mockUsers = [{
  id: '1',
  name: '张三',
  email: 'zhangsan@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop',
  createdAt: '2024-01-15 10:30:00',
  status: 'active',
  lastLogin: '2024-01-20 14:30:00'
}, {
  id: '2',
  name: '李四',
  email: 'lisi@example.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
  createdAt: '2024-01-14 09:15:00',
  status: 'active',
  lastLogin: '2024-01-19 16:45:00'
}, {
  id: '3',
  name: '王五',
  email: 'wangwu@example.com',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
  createdAt: '2024-01-13 14:20:00',
  status: 'inactive',
  lastLogin: '2024-01-10 11:20:00'
}, {
  id: '4',
  name: '赵六',
  email: 'zhaoliu@example.com',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop',
  createdAt: '2024-01-12 11:45:00',
  status: 'active',
  lastLogin: '2024-01-20 09:30:00'
}, {
  id: '5',
  name: '钱七',
  email: 'qianqi@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop',
  createdAt: '2024-01-11 16:30:00',
  status: 'active',
  lastLogin: '2024-01-19 20:15:00'
}, {
  id: '6',
  name: '孙八',
  email: 'sunba@example.com',
  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop',
  createdAt: '2024-01-10 13:25:00',
  status: 'inactive',
  lastLogin: '2024-01-08 15:40:00'
}, {
  id: '7',
  name: '周九',
  email: 'zhoujiu@example.com',
  avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop',
  createdAt: '2024-01-09 10:10:00',
  status: 'active',
  lastLogin: '2024-01-20 08:20:00'
}, {
  id: '8',
  name: '吴十',
  email: 'wushi@example.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
  createdAt: '2024-01-08 15:45:00',
  status: 'active',
  lastLogin: '2024-01-19 22:10:00'
}];

// 用户状态组件
function UserStatusBadge({
  status
}) {
  const statusConfig = {
    active: {
      label: '启用',
      color: 'bg-green-100 text-green-800'
    },
    inactive: {
      label: '禁用',
      color: 'bg-red-100 text-red-800'
    }
  };
  const config = statusConfig[status] || statusConfig.active;
  return <Badge className={`${config.color} font-medium`}>{config.label}</Badge>;
}

// 用户头像组件
function UserAvatar({
  src,
  name
}) {
  if (src) {
    return <img src={src} alt={name} className="h-10 w-10 rounded-full object-cover" />;
  }
  return <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
      <User className="h-5 w-5 text-green-600" />
    </div>;
}

// 操作按钮组件
function UserActions({
  user,
  onStatusChange
}) {
  const isActive = user.status === 'active';
  return <div className="flex items-center space-x-2">
      <Button variant="ghost" size="sm" onClick={() => onStatusChange(user.id, !isActive)} className={`${isActive ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}`}>
        {isActive ? <ShieldOff className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
        <span className="ml-1">{isActive ? '禁用' : '启用'}</span>
      </Button>
    </div>;
}

// 分页组件
function PaginationControls({
  currentPage,
  totalPages,
  onPageChange
}) {
  const pageNumbers = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  return <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
      <div className="flex items-center">
        <span className="text-sm text-gray-700">
          第 <span className="font-medium">{currentPage}</span> 页，共 <span className="font-medium">{totalPages}</span> 页
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4" />
          上一页
        </Button>
        {pageNumbers.map(number => <Button key={number} variant={currentPage === number ? "default" : "outline"} size="sm" onClick={() => onPageChange(number)}>
            {number}
          </Button>)}
        <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          下一页
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>;
}
export default function AdminUsersPage(props) {
  const {
    toast
  } = useToast();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const usersPerPage = 10;

  // 加载用户数据
  useEffect(() => {
    loadUsers();
  }, []);

  // 搜索过滤
  useEffect(() => {
    const filtered = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  // 模拟加载用户数据
  const loadUsers = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(mockUsers);
    } catch (error) {
      toast({
        title: "加载失败",
        description: "无法加载用户数据",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // 处理用户状态变更
  const handleStatusChange = async (userId, newStatus) => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsers(prevUsers => prevUsers.map(user => user.id === userId ? {
        ...user,
        status: newStatus ? 'active' : 'inactive'
      } : user));
      toast({
        title: "操作成功",
        description: `用户已${newStatus ? '启用' : '禁用'}`,
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

  // 分页计算
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  // 格式化日期
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-green-800">用户管理</h1>
              <p className="text-sm text-gray-600">管理所有注册用户</p>
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
        {/* Search and Stats */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">用户列表</h2>
                <p className="text-sm text-gray-600">共 {filteredUsers.length} 位用户</p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input type="text" placeholder="搜索姓名或邮箱..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardContent className="p-0">
            {loading ? <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
                <span className="ml-2 text-gray-600">加载中...</span>
              </div> : <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邮箱</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">注册时间</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最后登录</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedUsers.map(user => <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <UserAvatar src={user.avatar} name={user.name} />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(user.createdAt)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <UserStatusBadge status={user.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(user.lastLogin)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <UserActions user={user} onStatusChange={handleStatusChange} />
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>}
            {filteredUsers.length === 0 && !loading && <div className="text-center py-12">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">没有找到匹配的用户</p>
              </div>}
          </CardContent>
          {filteredUsers.length > 0 && <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
        </Card>
      </main>
    </div>;
}