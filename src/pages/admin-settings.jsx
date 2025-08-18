// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Textarea, useToast, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { Globe, Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Shield, FileText, Save, Image, Search } from 'lucide-react';

// 默认系统设置数据
const defaultSettings = {
  website: {
    name: '中药材贸易网',
    logo: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=200&fit=crop',
    seoTitle: '中药材贸易网 - 专业中药材批发交易平台',
    seoKeywords: '中药材,中药批发,中药材交易,中药饮片,中药材市场',
    seoDescription: '专业的中药材批发交易平台，提供长白山野山参、岷县当归、宁夏枸杞等优质中药材，品质保证，价格优惠。'
  },
  contact: {
    phone: '400-123-4567',
    email: 'service@herbaltrade.com',
    address: '北京市朝阳区建国路88号中药材大厦'
  },
  social: {
    wechat: 'herbaltrade2024',
    weibo: '@中药材贸易网',
    facebook: 'herbaltradechina',
    instagram: 'herbaltrade_official'
  },
  legal: {
    icp: '京ICP备2024012345号',
    police: '京公网安备11010502012345号'
  }
};
export default function AdminSettingsPage(props) {
  const {
    toast
  } = useToast();
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 加载系统设置
  useEffect(() => {
    loadSettings();
  }, []);

  // 从数据模型加载设置
  const loadSettings = async () => {
    setLoading(true);
    try {
      const result = await props.$w.cloud.callDataSource({
        dataSourceName: 'system_settings',
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
        const savedSettings = result.records[0];
        setSettings({
          website: {
            name: savedSettings.website_name || defaultSettings.website.name,
            logo: savedSettings.website_logo || defaultSettings.website.logo,
            seoTitle: savedSettings.seo_title || defaultSettings.website.seoTitle,
            seoKeywords: savedSettings.seo_keywords || defaultSettings.website.seoKeywords,
            seoDescription: savedSettings.seo_description || defaultSettings.website.seoDescription
          },
          contact: {
            phone: savedSettings.contact_phone || defaultSettings.contact.phone,
            email: savedSettings.contact_email || defaultSettings.contact.email,
            address: savedSettings.contact_address || defaultSettings.contact.address
          },
          social: {
            wechat: savedSettings.social_wechat || defaultSettings.social.wechat,
            weibo: savedSettings.social_weibo || defaultSettings.social.weibo,
            facebook: savedSettings.social_facebook || defaultSettings.social.facebook,
            instagram: savedSettings.social_instagram || defaultSettings.social.instagram
          },
          legal: {
            icp: savedSettings.legal_icp || defaultSettings.legal.icp,
            police: savedSettings.legal_police || defaultSettings.legal.police
          }
        });
      } else {
        // 如果没有记录，使用默认设置
        setSettings(defaultSettings);
      }
    } catch (error) {
      console.error('加载设置失败:', error);
      toast({
        title: "加载失败",
        description: "使用默认设置",
        variant: "destructive"
      });
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  };

  // 保存系统设置
  const handleSave = async () => {
    setSaving(true);
    try {
      // 准备保存的数据
      const saveData = {
        website_name: settings.website.name,
        website_logo: settings.website.logo,
        seo_title: settings.website.seoTitle,
        seo_keywords: settings.website.seoKeywords,
        seo_description: settings.website.seoDescription,
        contact_phone: settings.contact.phone,
        contact_email: settings.contact.email,
        contact_address: settings.contact.address,
        social_wechat: settings.social.wechat,
        social_weibo: settings.social.weibo,
        social_facebook: settings.social.facebook,
        social_instagram: settings.social.instagram,
        legal_icp: settings.legal.icp,
        legal_police: settings.legal.police
      };

      // 检查是否已存在记录
      const existing = await props.$w.cloud.callDataSource({
        dataSourceName: 'system_settings',
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
          dataSourceName: 'system_settings',
          methodName: 'wedaUpdateV2',
          params: {
            data: saveData,
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
          dataSourceName: 'system_settings',
          methodName: 'wedaCreateV2',
          params: {
            data: saveData
          }
        });
      }
      toast({
        title: "保存成功",
        description: "系统设置已更新",
        variant: "default"
      });
    } catch (error) {
      console.error('保存设置失败:', error);
      toast({
        title: "保存失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  // 处理输入变化
  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // 渲染输入字段
  const renderInput = (label, value, onChange, placeholder, type = 'text') => <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full" />
    </div>;

  // 渲染文本域
  const renderTextarea = (label, value, onChange, placeholder, rows = 3) => <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} className="w-full" />
    </div>;
  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-2 text-gray-600">加载中...</p>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-green-800">系统设置</h1>
              <p className="text-sm text-gray-600">配置网站基本信息和联系方式</p>
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
        <Tabs defaultValue="website" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="website">网站信息</TabsTrigger>
            <TabsTrigger value="contact">联系方式</TabsTrigger>
            <TabsTrigger value="social">社交媒体</TabsTrigger>
            <TabsTrigger value="legal">备案信息</TabsTrigger>
          </TabsList>

          {/* 网站基本信息 */}
          <TabsContent value="website">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  网站基本信息
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderInput('网站名称', settings.website.name, value => handleInputChange('website', 'name', value), '请输入网站名称')}
                
                {renderInput('网站LOGO', settings.website.logo, value => handleInputChange('website', 'logo', value), '请输入LOGO URL或上传图片')}

                {renderInput('SEO标题', settings.website.seoTitle, value => handleInputChange('website', 'seoTitle', value), '请输入SEO标题')}

                {renderInput('SEO关键词', settings.website.seoKeywords, value => handleInputChange('website', 'seoKeywords', value), '多个关键词用逗号分隔')}

                {renderTextarea('SEO描述', settings.website.seoDescription, value => handleInputChange('website', 'seoDescription', value), '请输入网站SEO描述')}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 联系方式 */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  联系方式
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderInput('联系电话', settings.contact.phone, value => handleInputChange('contact', 'phone', value), '请输入联系电话')}

                {renderInput('联系邮箱', settings.contact.email, value => handleInputChange('contact', 'email', value), '请输入联系邮箱', 'email')}

                {renderTextarea('公司地址', settings.contact.address, value => handleInputChange('contact', 'address', value), '请输入详细地址')}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 社交媒体 */}
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  社交媒体链接
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderInput('微信公众号', settings.social.wechat, value => handleInputChange('social', 'wechat', value), '请输入微信公众号')}

                {renderInput('新浪微博', settings.social.weibo, value => handleInputChange('social', 'weibo', value), '请输入微博账号')}

                {renderInput('Facebook', settings.social.facebook, value => handleInputChange('social', 'facebook', value), '请输入Facebook账号')}

                {renderInput('Instagram', settings.social.instagram, value => handleInputChange('social', 'instagram', value), '请输入Instagram账号')}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 备案信息 */}
          <TabsContent value="legal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  备案信息
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderInput('ICP备案号', settings.legal.icp, value => handleInputChange('legal', 'icp', value), '请输入ICP备案号')}

                {renderInput('公安备案号', settings.legal.police, value => handleInputChange('legal', 'police', value), '请输入公安备案号')}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 保存按钮 */}
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} disabled={saving} className="bg-green-700 hover:bg-green-800">
            <Save className="h-4 w-4 mr-2" />
            {saving ? '保存中...' : '保存设置'}
          </Button>
        </div>
      </main>
    </div>;
}