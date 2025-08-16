// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ChevronLeft, ChevronRight } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

export function HeroCarousel({
  images,
  t,
  onNavigate
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % images.length);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + images.length) % images.length);
  };
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [images.length]);
  if (!images || images.length === 0) return null;
  return <div className="relative h-96 md:h-[500px] overflow-hidden">
      {images.map((image, index) => <div key={index} className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
          <img src={image.url} alt={image.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('home.heroTitle')}</h1>
              <p className="text-xl md:text-2xl mb-8">{t('home.heroSubtitle')}</p>
              <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white" onClick={() => onNavigate('tcm-products')}>
                {t('home.exploreBtn')}
              </Button>
            </div>
          </div>
        </div>)}
      
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors">
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors">
        <ChevronRight className="h-6 w-6" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`} />)}
      </div>
    </div>;
}