// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent } from '@/components/ui';

export function CategoryCard({
  category,
  t,
  onNavigate
}) {
  return <Card className="group hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('tcm-products', {
    category: category.id
  })}>
      <CardContent className="p-6 text-center">
        <img src={category.image} alt={category.name} className="w-16 h-16 mx-auto mb-4 object-cover rounded-full" />
        <h3 className="text-lg font-semibold text-green-800 mb-2">{category.name}</h3>
        <p className="text-sm text-gray-600">{category.description}</p>
      </CardContent>
    </Card>;
}