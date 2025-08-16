// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Calendar, Users, Award, Globe, Shield, Leaf, Mail, Phone, MapPin, Clock, Star, CheckCircle, ChevronRight, Send } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea, Badge } from '@/components/ui';

// 团队成员卡片组件
function TeamMemberCard({
  member
}) {
  return <Card className="group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6 text-center">
        <div className="relative mb-4">
          <img src={member.avatar} alt={member.name} className="w-32 h-32 rounded-full mx-auto object-cover" />
          <div className="absolute inset-0 bg-green-700/0 group-hover:bg-green-700/10 rounded-full transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-semibold text-green-800 mb-1">{member.name}</h3>
        <p className="text-green-600 mb-2">{member.position}</p>
        <p className="text-sm text-gray-600 mb-3">{member.expertise}</p>
        <div className="flex justify-center space-x-2">
          {member.certifications.map((cert, index) => <Badge key={index} variant="outline" className="text-xs">
              {cert}
            </Badge>)}
        </div>
      </CardContent>
    </Card>;
}

// 时间线组件
function TimelineItem({
  item,
  isLast
}) {
  return <div className="relative">
      <div className="flex items-start">
        <div className="flex-shrink-0 w-12 h-12 bg-green-700 rounded-full flex items-center justify-center">
          <Calendar className="h-6 w-6 text-white" />
        </div>
        <div className="ml-6 pb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center mb-2">
              <span className="text-green-700 font-semibold">{item.year}</span>
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
              <span className="text-gray-600">{item.title}</span>
            </div>
            <p className="text-gray-600">{item.description}</p>
          </div>
          {!isLast && <div className="absolute left-6 top-12 w-0.5 h-full bg-green-200" />}
        </div>
      </div>
    </div>;
}

// 优势卡片组件
function AdvantageCard({
  advantage
}) {
  return <Card className="text-center hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {advantage.icon}
        </div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">{advantage.title}</h3>
        <p className="text-sm text-gray-600">{advantage.description}</p>
      </CardContent>
    </Card>;
}

// 认证证书组件
function CertificationCard({
  certification
}) {
  return <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Award className="h-6 w-6 text-green-700" />
          </div>
          <div>
            <h4 className="font-semibold text-green-800">{certification.name}</h4>
            <p className="text-sm text-gray-600">{certification.issuer}</p>
            <p className="text-xs text-gray-500">{certification.date}</p>
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
        message: ''
      });
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1000);
  };
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return <Card>
      <CardHeader>
        <CardTitle>联系我们</CardTitle>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
              <Input value={formData.name} onChange={e => handleInputChange('name', e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">邮箱 *</label>
              <Input type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">公司名称</label>
            <Input value={formData.company} onChange={e => handleInputChange('company', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">留言内容 *</label>
            <Textarea rows={4} value={formData.message} onChange={e => handleInputChange('message', e.target.value)} required placeholder="请描述您的需求..." />
          </div>
          <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={isSubmitting}>
            {isSubmitting ? '发送中...' : <><Send className="h-4 w-4 mr-2" />发送询盘</>}
          </Button>
        </form>
      </CardContent>
    </Card>;
}

// 主页面组件
export default function AboutUsPage(props) {
  const teamMembers = [{
    name: '张明华',
    position: '创始人兼CEO',
    expertise: '中药材种植与贸易专家，20年行业经验',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    certifications: ['中药师', 'GAP认证专家', '出口贸易专家']
  }, {
    name: '李雅琴',
    position: '质量总监',
    expertise: '中药材质量检测专家，15年质量控制经验',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop',
    certifications: ['执业药师', '质量工程师', '有机认证审核员']
  }, {
    name: '王建国',
    position: '外贸总监',
    expertise: '国际贸易专家，精通欧美日韩市场准入',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    certifications: ['国际贸易师', 'FDA注册专家', '欧盟CE认证专家']
  }, {
    name: '陈美玲',
    position: '技术总监',
    expertise: '中药材加工技术专家，现代化工艺研发',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    certifications: ['高级工程师', 'GMP认证专家', '工艺工程师']
  }];
  const timeline = [{
    year: '2005',
    title: '公司成立',
    description: '华草国际在安徽亳州成立，专注于中药材种植与初加工'
  }, {
    year: '2010',
    title: '获得GAP认证',
    description: '建立标准化种植基地，通过中药材GAP认证，产品质量达到国际标准'
  }, {
    year: '2015',
    title: '拓展国际市场',
    description: '产品成功进入欧美、日韩等国际市场，年出口额突破1000万美元'
  }, {
    year: '2018',
    title: '建立检测中心',
    description: '投资建立现代化质量检测中心，配备先进的检测设备和专业团队'
  }, {
    year: '2020',
    title: '数字化转型',
    description: '完成企业数字化转型，建立完善的供应链管理系统和质量追溯体系'
  }, {
    year: '2023',
    title: '品牌升级',
    description: '完成品牌升级，成为中药材外贸行业的标杆企业，服务全球50+国家'
  }];
  const advantages = [{
    icon: <Globe className="h-8 w-8 text-green-700" />,
    title: '全球市场覆盖',
    description: '产品远销欧美、日韩、东南亚等50多个国家和地区'
  }, {
    icon: <Shield className="h-8 w-8 text-green-700" />,
    title: '质量保障体系',
    description: '通过GAP、GMP、有机认证等多项国际认证'
  }, {
    icon: <Leaf className="h-8 w-8 text-green-700" />,
    title: '道地药材',
    description: '精选道地产区，确保药材品质和有效成分含量'
  }, {
    icon: <Award className="h-8 w-8 text-green-700" />,
    title: '专业团队',
    description: '20年行业经验，专业的种植、加工、外贸团队'
  }, {
    icon: <Clock className="h-8 w-8 text-green-700" />,
    title: '快速响应',
    description: '24小时内响应客户需求，提供定制化解决方案'
  }, {
    icon: <Users className="h-8 w-8 text-green-700" />,
    title: '客户至上',
    description: '为每位客户提供个性化服务，建立长期合作关系'
  }];
  const certifications = [{
    name: '中药材GAP认证',
    issuer: '国家药监局',
    date: '2023年更新'
  }, {
    name: '有机产品认证',
    issuer: '中国有机认证中心',
    date: '2023年更新'
  }, {
    name: 'FDA注册',
    issuer: '美国食品药品监督管理局',
    date: '2023年更新'
  }, {
    name: '欧盟CE认证',
    issuer: '欧盟委员会',
    date: '2023年更新'
  }, {
    name: 'ISO9001质量管理体系',
    issuer: '国际标准化组织',
    date: '2023年更新'
  }, {
    name: '出口食品生产企业备案',
    issuer: '海关总署',
    date: '2023年更新'
  }];
  return <div style={props.style} className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">关于华草国际</h1>
          <p className="text-xl md:text-2xl text-green-200 mb-8">传承千年中医药文化，服务全球健康事业</p>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">
            华草国际成立于2005年，是一家专注于中药材种植、加工与出口贸易的现代化企业。
            我们秉承"质量第一，诚信为本"的经营理念，为全球客户提供优质道地药材。
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">发展历程</h2>
            <p className="text-lg text-green-600">见证我们的成长足迹</p>
          </div>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => <TimelineItem key={index} item={item} isLast={index === timeline.length - 1} />)}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">核心团队</h2>
            <p className="text-lg text-green-600">专业团队，为您提供优质服务</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => <TeamMemberCard key={index} member={member} />)}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">外贸优势</h2>
            <p className="text-lg text-green-600">为什么选择华草国际</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => <AdvantageCard key={index} advantage={advantage} />)}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">认证资质</h2>
            <p className="text-lg text-green-600">国际认证，品质保证</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => <CertificationCard key={index} certification={cert} />)}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-6">联系我们</h2>
              <p className="text-gray-600 mb-8">
                我们期待与您建立长期合作关系，为您提供优质的中药材产品和服务。
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-green-700 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-800">公司地址</h4>
                    <p className="text-gray-600">安徽省亳州市谯城区中药材交易中心A座18层</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-green-700 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-800">联系电话</h4>
                    <p className="text-gray-600">+86 558 5555 8888</p>
                    <p className="text-gray-600">+86 558 5555 9999</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-green-700 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-800">邮箱地址</h4>
                    <p className="text-gray-600">info@herbaltrade.com</p>
                    <p className="text-gray-600">sales@herbaltrade.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <ContactForm />
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