// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardFooter, Badge, Button } from '@/components/ui';
// @ts-ignore;
import { ShoppingCart, Heart, Star } from 'lucide-react';

export function ProductCard({
  product,
  t,
  onProductClick
}) {
  return <Card className="group hover:shadow-lg transition-shadow bg-white overflow-hidden">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <div className="absolute top-2 left-2 flex gap-1">
          {product.efficacy.slice(0, 2).map(eff => <Badge key={eff} variant="secondary" className="bg-green-100 text-green-800 text-xs">
              {eff}
            </Badge>)}
        </div>
        <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="h-4 w-4 text-green-700" />
        </button>
      </div>

      <CardContent className="p-4">
        <h3 className="font-bold text-green-800 text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 italic mb-2">{product.latin}</p>
        
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">{t('products.origin')}:</span>
            <span className="font-medium">{product.origin}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t('products.part')}:</span>
            <span className="font-medium">{product.part}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">等级:</span>
            <span className="font-medium">{product.grade}</span>
          </div>
        </div>

        <div className="mt-3">
          <span className="text-xl font-bold text-green-800">{product.priceRange}</span>
        </div>

        <div className="flex items-center mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-green-700 hover:bg-green-800" onClick={() => onProductClick(product.id)}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          {t('products.inquiryBtn')}
        </Button>
      </CardFooter>
    </Card>;
}