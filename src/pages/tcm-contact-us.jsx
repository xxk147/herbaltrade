// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, User, Building, Tag, CheckCircle, Map, Globe, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea, Badge } from '@/components/ui';

// 联系信息卡片组件
function ContactInfoCard({
  icon,
  title,
  content,
  subtitle,
  action
}) {
  return <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-green-800 mb-1">{title}</h3>
            <p className="text-gray-600 mb-1">{content}</p>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            {action && <Button variant="link" className="text-green-700 p-0 h-auto mt-2">
                {action}
              </Button>}
          </div>
        </div>
      </CardContent>
    </Card>;
}

// 地图组件
function MapComponent() {
  return <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-96 bg-gray-100">
          {/* 地图占位符 - 实际项目中可集成真实地图API */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">安徽省亳州市谯城区中药材交易中心</p>
              <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
                <MapPin className="h-4 w-4 mr-2" />
                查看地图导航
              </Button>
            </div>
          </div>
          {/* 地图标记 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-700" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
}

// 联系表单组件
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    // 模拟表单提交
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return <Card>
      <CardHeader>
        <CardTitle className="text-green-800">在线留言</CardTitle>
        <p className="text-sm text-gray-600">我们会在24小时内回复您的咨询</p>
      </CardHeader>
      <CardContent>
        {submitStatus === 'success' && <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800">感谢您的留言，我们会尽快回复！</span>
            </div>
          </div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <User className="h-4 w-4 inline mr-1" />
                姓名 *
              </label>
              <Input value={formData.name} onChange={e => handleInputChange('name', e.target.value)} required placeholder="请输入您的姓名" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Mail className="h-4 w-4 inline mr-1" />
                邮箱 *
              </label>
              <Input type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} required placeholder="请输入您的邮箱" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Building className="h-4 w-4 inline mr-1" />
              公司名称
            </label>
            <Input value={formData.company} onChange={e => handleInputChange('company', e.target.value)} placeholder="请输入您的公司名称" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Tag className="h-4 w-4 inline mr-1" />
              咨询主题 *
            </label>
            <Input value={formData.subject} onChange={e => handleInputChange('subject', e.target.value)} required placeholder="请输入咨询主题" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MessageCircle className="h-4 w-4 inline mr-1" />
              留言内容 *
            </label>
            <Textarea rows={5} value={formData.message} onChange={e => handleInputChange('message', e.target.value)} required placeholder="请详细描述您的需求，我们会尽快回复..." />
          </div>
          <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={isSubmitting}>
            {isSubmitting ? '发送中...' : <><Send className="h-4 w-4 mr-2" />发送留言</>}
          </Button>
        </form>
      </CardContent>
    </Card>;
}

// 工作时间组件
function BusinessHours() {
  const hours = [{
    day: '周一至周五',
    time: '8:30 - 17:30'
  }, {
    day: '周六',
    time: '9:00 - 16:00'
  }, {
    day: '周日',
    time: '休息'
  }];
  return <Card>
      <CardHeader>
        <CardTitle className="text-green-800">工作时间</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {hours.map((item, index) => <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <span className="text-gray-700">{item.day}</span>
              <Badge variant={item.time === '休息' ? 'secondary' : 'outline'} className={item.time === '休息' ? 'bg-gray-100' : ''}>
                {item.time}
              </Badge>
            </div>)}
        </div>
      </CardContent>
    </Card>;
}

// 社交媒体组件
function SocialMedia() {
  const socialLinks = [{
    icon: <Facebook className="h-5 w-5" />,
    name: 'Facebook',
    url: '#'
  }, {
    icon: <Twitter className="h-5 w-5" />,
    name: 'Twitter',
    url: '#'
  }, {
    icon: <Instagram className="h-5 w-5" />,
    name: 'Instagram',
    url: '#'
  }, {
    icon: <Linkedin className="h-5 w-5" />,
    name: 'LinkedIn',
    url: '#'
  }];
  return <Card>
      <CardHeader>
        <CardTitle className="text-green-800">关注我们</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => <Button key={index} variant="outline" size="icon" className="border-green-200 text-green-700 hover:bg-green-50">
              {social.icon}
            </Button>)}
        </div>
      </CardContent>
    </Card>;
}

// 主页面组件
export default function ContactUsPage(props) {
  const contactInfo = [{
    icon: <MapPin className="h-6 w-6 text-green-700" />,
    title: '公司地址',
    content: '安徽省亳州市谯城区中药材交易中心A座18层',
    subtitle: '邮编：236800',
    action: '查看地图'
  }, {
    icon: <Phone className="h-6 w-6 text-green-700" />,
    title: '联系电话',
    content: '+86 558 5555 8888',
    subtitle: '24小时客服热线',
    action: '立即拨打'
  }, {
    icon: <Mail className="h-6 w-6 text-green-700" />,
    title: '邮箱地址',
    content: 'info@herbaltrade.com',
    subtitle: '商务合作咨询',
    action: '发送邮件'
  }, {
    icon: <Globe className="h-6 w-6 text-green-700" />,
    title: '官方网站',
    content: 'www.herbaltrade.com',
    subtitle: '了解更多产品信息',
    action: '访问网站'
  }];
  return <div style={props.style} className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">联系我们</h1>
          <p className="text-xl md:text-2xl text-green-200 mb-8">期待与您建立长期合作关系</p>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">
            无论您有任何关于中药材采购、合作或咨询的需求，我们的专业团队都将为您提供最优质的服务。
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">联系方式</h2>
            <p className="text-lg text-green-600">多种方式，随时为您服务</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => <ContactInfoCard key={index} {...info} />)}
          </div>
        </div>
      </section>

      {/* Map and Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map Section */}
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-6">公司位置</h2>
              <MapComponent />
              <div className="mt-6 space-y-4">
                <BusinessHours />
                <SocialMedia />
              </div>
            </div>

            {/* Contact Form Section */}
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-6">在线留言</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-8">为什么选择华草国际</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-green-700" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">快速响应</h3>
                <p className="text-gray-600">24小时内回复您的咨询</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-green-700" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">专业服务</h3>
                <p className="text-gray-600">20年中药材外贸经验</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-700" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">品质保证</h3>
                <p className="text-gray-600">国际认证，出口级品质</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-green-200">© 2024 华草国际. 传承千年中医药文化，服务全球健康事业</p>
          </div>
        </div>
      </footer>
    </div>;
}