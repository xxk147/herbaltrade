
// @ts-ignore;
import React, { useState, useMemo } from 'react';
// @ts-ignore;
import { Search, Filter as FilterIcon, ChevronLeft, ChevronRight, ShoppingCart, Heart, Star, Leaf, Menu, X, Globe, Phone, Mail, MapPin } from 'lucide-react';
// @ts-ignore;
import { Input, Button, Card, CardContent, CardFooter, Badge } from '@/components/ui';
// @ts-ignore;
import { Navigation } from '@/components/Navigation';
// @ts-ignore;
import { Footer } from '@/components/Footer';

// Filter Sidebar Component
function TCMFilterSidebar({
  filters,
  onFilterChange,
  onClearFilters
}) {
  const efficacyOptions = ['补气', '养血', '清热', '解毒', '活血', '安神', '滋阴', '壮阳'];
  const partOptions = ['根', '茎', '叶', '花', '果实', '种子', '皮', '全草'];
  const originOptions = ['中国', '韩国', '日本', '印度', '越南', '泰国', '美国', '加拿大'];
  
  const toggleFilter = (type, value) => {
    const current = filters[type] || [];
    const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    onFilterChange(type, updated);
  };

  const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0);

  return <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-green-800 flex items-center">
          <FilterIcon className="h-5 w-5 mr-2" />
          筛选条件
        </h3>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters} 
            className="text-green-600"
          >
            清除全部
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* 功效筛选 */}
        <div>
          <h4 className="font-medium text-green-800 mb-3">功效分类</h4>
          <div className="flex flex-wrap gap-2">
            {efficacyOptions.map(option => (
              <Badge 
                key={option} 
                variant={filters.efficacy?.includes(option) ? 'default' : 'outline'}
                className={`cursor-pointer transition-colors ${
                  filters.efficacy?.includes(option) 
                    ? 'bg-green-700 text-white' 
                    : 'border-green-300 text-green-700 hover:bg-green-50'
                }`}
                onClick={() => toggleFilter('efficacy', option)}
              >
                {option}
              </Badge>
            ))}
          </div>
        </div>

        {/* 药材部位筛选 */}
        <div>
          <h4 className="font-medium text-green-800 mb-3">药材