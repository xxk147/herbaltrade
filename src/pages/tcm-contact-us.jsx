// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { MapPin, Phone, Mail, Clock, Globe, Send, Leaf, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, Input, Textarea } from '@/components/ui';

// @ts-ignore;
import { Navigation } from '@/components/Navigation';
// @ts-ignore;
import { Footer } from '@/components/Footer';
export default function TCMContactUsPage(props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
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
      // 模拟表单提交
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        inquiryType: 'general'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  const contactInfo = [{
    icon: MapPin,
    title: '公司地址',
    content: '安徽省亳州市谯城区中药材交易中心A区88号',
    subContent: '华草国际大厦'
  }, {
    icon: Phone,
    title: '联系电话',
    content: '+86 558 5555 8888',
    subContent: '周一至周五 8:00-18:00'
  }, {
    icon: Mail,
    title: '邮箱地址',
    content: 'info@herbaltrade.com',
    subContent: '24小时接收邮件'
  }, {
    icon: Clock,
    title: '工作时间',
    content: '周一至周五 8:00-18:00',
    subContent: '周六 9:00-17:00'
  }];
  return <div style={props.style} className="min-h-screen bg-gray-50">
      <Navigation $w={props.$w} currentPage="tcm-contact-us" />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">联系我们</h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              期待与您合作，共同传承和发扬中医药文化
            </p>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-green-700" />
                      </div>
                      <h3 className="text-lg font-semibold text-green-800 mb-2">{item.title}</h3>
                      <p className="text-gray-700 font-medium">{item.content}</p>
                      <p className="text-sm text-gray-500">{item.subContent}</p>
                    </CardContent>
                  </Card>;
            })}
            </div>
          </div>
        </section>

        {/* Map and Form Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-green-800 mb-6">发送询盘</h2>
                <p className="text-gray-600 mb-6">
                  请填写以下表单，我们的专业团队将在24小时内与您联系
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        姓名 *
                      </label>
                      <Input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full" placeholder="请输入您的姓名" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        邮箱 *
                      </label>
                      <Input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full" placeholder="请输入您的邮箱" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        公司名称
                      </label>
                      <Input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full" placeholder="请输入公司名称" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        联系电话 *
                      </label>
                      <Input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full" placeholder="请输入联系电话" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      询盘类型
                    </label>
                    <select name="inquiryType" value={formData.inquiryType} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="general">一般咨询</option>
                      <option value="product">产品询盘</option>
                      <option value="partnership">合作洽谈</option>
                      <option value="technical">技术支持</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      详细需求 *
                    </label>
                    <Textarea name="message" value={formData.message} onChange={handleInputChange} required rows={5} className="w-full" placeholder="请详细描述您的需求..." />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full bg-green-700 hover:bg-green-800">
                    {isSubmitting ? '发送中...' : <><Send className="h-4 w-4 mr-2" />发送询盘</>}
                  </Button>

                  {submitStatus === 'success' && <div className="p-4 bg-green-100 text-green-700 rounded-md">
                      询盘发送成功！我们将在24小时内与您联系。
                    </div>}
                  {submitStatus === 'error' && <div className="p-4 bg-red-100 text-red-700 rounded-md">
                      发送失败，请稍后重试。
                    </div>}
                </form>
              </div>

              {/* Map */}
              <div>
                <h2 className="text-3xl font-bold text-green-800 mb-6">公司位置</h2>
                <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <p className="text-gray-600">地图加载中...</p>
                    <p className="text-sm text-gray-500 mt-2">
                      安徽省亳州市谯城区中药材交易中心A区88号
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start">
                    <Leaf className="h-5 w-5 text-green-700 mt-1 mr-3" />
                    <div>
                      <h4 className="font-semibold text-green-800">华草国际大厦</h4>
                      <p className="text-gray-600 text-sm">安徽省亳州市谯城区中药材交易中心A区88号</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-green-700 mt-1 mr-3" />
                    <div>
                      <h4 className="font-semibold text-green-800">联系电话</h4>
                      <p className="text-gray-600 text-sm">+86 558 5555 8888</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-green-700 mt-1 mr-3" />
                    <div>
                      <h4 className="font-semibold text-green-800">邮箱地址</h4>
                      <p className="text-gray-600 text-sm">info@herbaltrade.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Contact Section */}
        <section className="py-16 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-4">快速联系</h2>
            <p className="text-lg text-green-600 mb-8">选择最适合您的方式联系我们</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Phone className="h-12 w-12 text-green-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">电话咨询</h3>
                <p className="text-gray-600 mb-4">工作时间：周一至周五 8:00-18:00</p>
                <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
                  立即拨打
                </Button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Mail className="h-12 w-12 text-green-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">邮件咨询</h3>
                <p className="text-gray-600 mb-4">24小时接收邮件，快速回复</p>
                <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
                  发送邮件
                </Button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Globe className="h-12 w-12 text-green-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">在线客服</h3>
                <p className="text-gray-600 mb-4">实时在线，即时解答</p>
                <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
                  开始咨询
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer $w={props.$w} />
    </div>;
}