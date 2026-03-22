import Link from 'next/link';
import type { Tool, User } from '@/lib/data';

interface ToolCardProps {
  tool: Tool;
  owner: User;
}

const conditionColors = {
  'new': 'bg-[#2d6a4f] text-white',
  'like-new': 'bg-[#2d6a4f] text-white',
  'good': 'bg-[#ffbe0b] text-[#1a1a1a]',
  'fair': 'bg-[#6b6b6b] text-white',
};

export function ToolCard({ tool, owner }: ToolCardProps) {
  const distance = 3;

  return (
    <Link href={`/tools/${tool.id}`} className="card block overflow-hidden group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={tool.images[0]} 
          alt={tool.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {tool.instantBook && (
          <span className="absolute top-3 left-3 badge bg-[#2d6a4f] text-white text-xs">
            Instant Book
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-medium text-[#222] line-clamp-2">{tool.title}</h3>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className={`badge ${conditionColors[tool.condition]} text-xs capitalize`}>
            {tool.condition.replace('-', ' ')}
          </span>
          <span className="badge badge-outline text-xs capitalize">
            {tool.category.replace('-', ' ')}
          </span>
        </div>
        
        <div className="flex items-center gap-1 mb-3">
          <svg className="w-4 h-4 text-[#ffbe0b] fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span className="text-sm font-medium">{owner.rating.toFixed(1)}</span>
          <span className="text-sm text-[#6b6b6b]">({owner.reviewCount})</span>
          <span className="text-sm text-[#6b6b6b]">·</span>
          <span className="text-sm text-[#6b6b6b]">{distance} mi</span>
        </div>
        
        <div className="flex items-baseline gap-1">
          <span className="price text-xl text-[#e85d04]">${tool.pricePerDay}</span>
          <span className="text-sm text-[#6b6b6b]">/day</span>
        </div>
      </div>
    </Link>
  );
}
