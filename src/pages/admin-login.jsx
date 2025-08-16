// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Lock, User, Eye, EyeOff } from 'lucide-react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export default function AdminLoginPage(props) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);

    // 模拟登录验证
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        props.$w.utils.navigateTo({
          pageId: 'admin-dashboard',
          params: {}
        });
      } else {
        alert('用户名或密码错误');
      }
      setLoading(false);
    }, 1000);
  };
  const handleInputChange = (field, value) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return <div style={props.style} className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-800">管理员登录</CardTitle>
          <p className="text-green-600 mt-2">中药材外贸独立站后台管理</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input type="text" placeholder="请输入用户名" className="pl-10" value={credentials.username} onChange={e => handleInputChange('username', e.target.value)} required />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input type={showPassword ? 'text' : 'password'} placeholder="请输入密码" className="pl-10 pr-10" value={credentials.password} onChange={e => handleInputChange('password', e.target.value)} required />
                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={loading}>
              {loading ? '登录中...' : '登录'}
            </Button>
            
            <div className="text-center text-sm text-gray-600">
              <p>测试账号: admin / admin123</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>;
}