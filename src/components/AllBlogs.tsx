import { ArrowLeft, LayoutGrid, List } from 'lucide-react';
import { useEffect, useState } from 'react';
import { POSTS, BlogThumbnailPlaceholder } from './Blog';

const BLOG_VIEW_MODE_KEY = 'portfolio_blog_view_mode';

export function AllBlogs({ onBack, onReadArticle }: { onBack: () => void, onReadArticle: (id: number) => void }) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    try {
      const saved = localStorage.getItem(BLOG_VIEW_MODE_KEY);
      if (saved === 'grid' || saved === 'list') return saved;
    } catch {}
    return 'grid';
  });

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    try {
      localStorage.setItem(BLOG_VIEW_MODE_KEY, mode);
    } catch {}
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0C0C0F] transition-colors duration-300 py-16 sm:py-20 relative overflow-hidden">
      {/* Fading Dot Pattern - Half Circle Right Edge (moved down) */}
      <div 
        className="absolute top-12 sm:top-16 right-0 w-32 h-56 sm:w-40 sm:h-72 pointer-events-none opacity-25 dark:opacity-20 z-0" 
        style={{ 
          maskImage: 'radial-gradient(circle at right, black, transparent 70%)', 
          WebkitMaskImage: 'radial-gradient(circle at right, black, transparent 70%)' 
        }}
      >
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#64748b 1.1px, transparent 1.1px)', backgroundSize: '12px 12px', backgroundPosition: 'right center' }} />
      </div>

      {/* Fading Dot Pattern - Left Edge Lower-Middle Cut Circle */}
      <div 
        className="absolute top-[45%] -translate-y-1/2 left-0 w-36 h-60 sm:w-44 sm:h-72 pointer-events-none opacity-25 dark:opacity-20 z-0" 
        style={{ 
          maskImage: 'radial-gradient(circle at left, black 15%, transparent 70%)', 
          WebkitMaskImage: 'radial-gradient(circle at left, black 15%, transparent 70%)' 
        }}
      >
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#64748b 1.1px, transparent 1.1px)', backgroundSize: '12px 12px', backgroundPosition: 'left center' }} />
      </div>

      {/* Fading Dot Pattern - Bottom Center */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full md:w-3/4 h-[36px] pointer-events-none opacity-30 dark:opacity-20 z-0" 
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)', 
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' 
        }}
      >
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#64748b 1.1px, transparent 1.1px)', backgroundSize: '12px 12px', backgroundPosition: 'bottom center' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <button 
          onClick={onBack}
          className="group flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to blog section
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Blog
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
            {/* List / Grid toggle switch */}
            <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700 inline-flex items-center gap-1 shadow-2xs">
              <button 
                onClick={() => handleViewModeChange('list')}
                className={`p-2 rounded-lg transition-all cursor-pointer ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
                title="List View"
                aria-label="Switch to list view"
              >
                <List className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleViewModeChange('grid')}
                className={`p-2 rounded-lg transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
                title="Grid View"
                aria-label="Switch to grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {POSTS.map((post) => (
              <article 
                key={post.id} 
                onClick={() => onReadArticle(post.id)}
                className="group cursor-pointer flex flex-col"
              >
                {/* Image / WebP Placeholder */}
                <div 
                  className="w-full aspect-[16/10] bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden relative mb-4 group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-all shadow-2xs"
                  data-image={`all-blog-card-${post.id}`}
                >
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <BlogThumbnailPlaceholder id={post.id} />
                  )}
                </div>

                {/* Date */}
                <div className="text-xs font-mono text-slate-400 dark:text-slate-500 font-medium tracking-tight mb-1.5">
                  {post.date}
                </div>

                {/* Title */}
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug tracking-tight mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2">
                  {post.title}
                </h2>

                {/* Read Time */}
                <div className="text-xs font-mono text-slate-400 dark:text-slate-500 font-normal mt-auto pt-1">
                  Read · {post.readTime}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800 border-t border-b border-slate-100 dark:border-slate-800">
            {POSTS.map((post) => (
              <article 
                key={post.id} 
                onClick={() => onReadArticle(post.id)}
                className="py-6 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 group cursor-pointer hover:bg-slate-50/60 dark:hover:bg-slate-800/60 rounded-xl transition-colors -mx-2 px-2"
              >
                <div 
                  className="w-full sm:w-44 aspect-[16/10] bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shrink-0"
                  data-image={`all-blog-list-${post.id}`}
                >
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <BlogThumbnailPlaceholder id={post.id} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono text-slate-400 dark:text-slate-500 font-medium mb-1">
                    {post.date}
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors mb-1.5">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-2">
                    {post.excerpt}
                  </p>
                  <div className="text-xs font-mono text-slate-400 dark:text-slate-500 font-normal">
                    Read · {post.readTime}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

