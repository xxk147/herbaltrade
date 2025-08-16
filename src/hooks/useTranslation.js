
// @ts-ignore;
import { useState, useEffect } from 'react';
// @ts-ignore;
import { translations } from '@/lib/translations';

export function useTranslation() {
  const [language, setLanguage] = useState('zh');

  useEffect(() => {
    // 从localStorage获取保存的语言偏好
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  const t = (path) => {
    const keys = path.split('.');
    let result = translations[language];
    
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key];
      } else {
        // 如果找不到翻译，返回中文作为fallback
        result = translations.zh;
        for (const k of keys) {
          if (result && typeof result === 'object' && k in result) {
            result = result[k];
          } else {
            return path; // 返回原始路径作为最后手段
          }
        }
        break;
      }
    }
    
    return result || path;
  };

  const changeLanguage = (langCode) => {
    if (translations[langCode]) {
      setLanguage(langCode);
      localStorage.setItem('preferred-language', langCode);
      // 触发语言变更事件
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: langCode }));
    }
  };

  return { t, language, changeLanguage };
}
