// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Leaf, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
// @ts-ignore;
import { Badge } from '@/components/ui';

export function Footer({
  $w
}) {
  const handleNavigation = pageId => {
    $w.utils.navigateTo({
      pageId,
      params: {}
    });
  };
  return <footer className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4 cursor-pointer" onClick={() => handleNavigation('index')}>
              <Leaf className="h-8 w-8" />
              <div>
                <h3 className="text-xl font-bold">华草国际</h3>
                <p className="text-sm text-green-200">中药材外贸专家</p>
              </div>
            </div>
            <p className="text-green-200 text-sm">
              专注中药材种植、加工与出口贸易，为全球客户提供优质道地药材。
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-green-200 hover:text-white"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-green-200 hover:text-white"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-green-200 hover:text-white"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-green-200 hover:text-white"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNavigation('index')} className="text-green-200 hover:text-white transition-colors">
                  首页
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('tcm-products')} className="text-green-200 hover:text-white transition-colors">
                  产品中心
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('tcm-about-us')} className="text-green-200 hover:text-white transition-colors">
                  关于我们
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('tcm-contact-us')} className="text-green-200 hover:text-white transition-colors">
                  联系我们
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">联系我们</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />+86 558 5555 8888
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />info@herbaltrade.com
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />安徽省亳州市谯城区
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">质量认证</h4>
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-green-700">有机认证</Badge>
              <Badge variant="secondary" className="bg-green-700">GAP认证</Badge>
              <Badge variant="secondary" className="bg-green-700">出口资质</Badge>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center">
          <p className="text-green-200 text-sm">© 2024 华草国际. 保留所有权利.</p>
        </div>
      </div>
    </footer>;
}