// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Leaf, Award, Users, Globe, Shield, Heart, Phone, Mail, MapPin, Star, CheckCircle } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent } from '@/components/ui';

// @ts-ignore;
import { Navigation } from '@/components/Navigation';
// @ts-ignore;
import { Footer } from '@/components/Footer';
export default function TCMAboutUsPage(props) {
  const teamMembers = [{
    name: '张华',
    position: '创始人 & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    experience: '20年中药材贸易经验',
    expertise: '中药材鉴定、国际贸易'
  }, {
    name: '李明',
    position: '质量总监',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    experience: '15年质量管理经验',
    expertise: 'GAP认证、质量控制'
  }, {
    name: '王芳',
    position: '市场总监',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop',
    experience: '12年国际市场经验',
    expertise: '海外市场拓展、客户关系'
  }, {
    name: '陈强',
    position: '技术总监',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop',
    experience: '10年技术研发经验',
    expertise: '中药材加工、技术创新'
  }];
  const certifications = [{
    title: '有机认证',
    description: '通过中国有机产品认证',
    icon: Award
  }, {
    title: 'GAP认证',
    description: '良好农业规范认证',
    icon: Shield
  }, {
    title: '出口资质',
    description: '具备完整出口资质',
    icon: Globe
  }, {
    title: '质量认证',
    description: 'ISO9001质量管理体系',
    icon: CheckCircle
  }];
  const values = [{
    title: '质量第一',
    description: '坚持选用道地药材，严格把控每一个生产环节',
    icon: Award
  }, {
    title: '诚信经营',
    description: '以诚信为本，建立长期稳定的客户关系',
    icon: Heart
  }, {
    title: '创新发展',
    description: '结合传统与现代技术，不断创新产品和服务',
    icon: Star
  }, {
    title: '全球视野',
    description: '服务全球市场，传播中医药文化',
    icon: Globe
  }];
  return <div style={props.style} className="min-h-screen bg-gray-50">
      <Navigation $w={props.$w} currentPage="tcm-about-us" />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">关于华草国际</h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              传承千年中医药文化，服务全球健康事业
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-green-800 mb-6">我们的故事</h2>
                <p className="text-gray-600 mb-4">
                  华草国际成立于2004年，是一家专注于中药材种植、加工与出口贸易的综合性企业。
                  二十年来，我们始终秉承"质量第一，诚信为本"的经营理念，致力于为全球客户提供优质道地药材。
                </p>
                <p className="text-gray-600 mb-4">
                  从最初的小型贸易公司，发展成为拥有完整产业链的现代化企业，我们在安徽、甘肃、云南等地
                  建立了GAP认证种植基地，产品远销欧美、日韩、东南亚等50多个国家和地区。
                </p>
                <p className="text-gray-600">
                  我们不仅是中药材的供应商，更是中医药文化的传播者，致力于让世界各地的人们
                  都能享受到中医药的神奇功效。
                </p>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=400&fit=crop" alt="中药材基地" className="rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">核心价值观</h2>
              <p className="text-lg text-green-600">指导我们前行的理念</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
              const Icon = value.icon;
              return <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-green-700" />
                      </div>
                      <h3 className="text-xl font-semibold text-green-800 mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>;
            })}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">资质认证</h2>
              <p className="text-lg text-green-600">严格的质量管理体系</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-10 w-10 text-green-700" />
                      </div>
                      <h3 className="text-lg font-semibold text-green-800 mb-2">{cert.title}</h3>
                      <p className="text-gray-600">{cert.description}</p>
                    </CardContent>
                  </Card>;
            })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">专业团队</h2>
              <p className="text-lg text-green-600">经验丰富的行业专家</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                    <h3 className="text-xl font-semibold text-green-800 mb-1">{member.name}</h3>
                    <p className="text-green-600 mb-2">{member.position}</p>
                    <p className="text-sm text-gray-600 mb-2">{member.experience}</p>
                    <p className="text-sm text-gray-500">{member.expertise}</p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-green-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">联系我们</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              期待与您合作，共同传承和发扬中医药文化
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-800 hover:bg-green-50" onClick={() => props.$w.utils.navigateTo({
              pageId: 'tcm-contact-us',
              params: {}
            })}>
                立即联系
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => props.$w.utils.navigateTo({
              pageId: 'tcm-products',
              params: {}
            })}>
                查看产品
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer $w={props.$w} />
    </div>;
}