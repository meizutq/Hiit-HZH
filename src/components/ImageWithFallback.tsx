import React, { useState } from 'react';
import { Dumbbell } from 'lucide-react';
import { cn } from '../lib/utils';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
  fallbackIcon?: React.ReactNode;
}

export default function ImageWithFallback({ 
  src, 
  alt, 
  className, 
  fallbackIcon,
  ...props 
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center bg-zinc-900 border border-zinc-800 rounded-3xl",
        className
      )}>
        {fallbackIcon || <Dumbbell className="w-12 h-12 text-zinc-700 animate-pulse" />}
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mt-4 px-4 text-center">
          {alt || 'Đang tải hình ảnh...'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}
