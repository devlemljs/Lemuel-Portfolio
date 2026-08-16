import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { POSTS } from './Blog';

const background = '/images/spidey.webp';

export function BlogPost({ postId, onBack }: { postId: number; onBack: () => void }) {
  const post = POSTS.find(p => p.id === postId) || POSTS[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <article className="min-h-screen bg-white dark:bg-[#0C0C0F] transition-colors duration-300 relative overflow-hidden">
      {/* Fixed Center Background Image Placeholder (Strictly Centered within Blog Content Viewport, Fixed, Strictly Non-Hoverable / Click-Through) */}
      <div 
      
        className="fixed top-0 bottom-0 left-0 md:left-[280px] right-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden select-none bg-transparent"
        aria-hidden="true"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <div className="w-[90vw] max-w-[1200px] h-[85vh] flex items-center justify-center bg-transparent border-none shadow-none outline-none pointer-events-none select-none">
          {/* Frameless centered placeholder enlarged (Non-interactive / no hover) */}
          <div className="w-full h-full max-w-[800px] max-h-[800px] flex items-center justify-center bg-transparent border-none shadow-none outline-none opacity-[0.08] dark:opacity-[0.14] transition-colors duration-300 pointer-events-none select-none">
            <img
              src={background}
              alt=""
              className="w-full h-full object-contain pointer-events-none select-none"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* Fixed Upper Right Dot Pattern (Non-scrollable) */}
      <div 
        className="fixed top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 pointer-events-none opacity-25 dark:opacity-20 z-0 select-none" 
        style={{ 
          maskImage: 'radial-gradient(circle at top right, black, transparent 70%)', 
          WebkitMaskImage: 'radial-gradient(circle at top right, black, transparent 70%)',
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      >
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#64748b 1.1px, transparent 1.1px)', backgroundSize: '12px 12px', backgroundPosition: 'top right' }} />
      </div>

      {/* Fixed Partial Circle Dot Pattern - Middle Lower Left Edge near Navbar / Sidebar border */}
      <div 
        className="fixed top-[62%] -translate-y-1/2 left-0 md:left-[280px] w-48 h-64 sm:w-60 sm:h-80 pointer-events-none opacity-35 dark:opacity-30 z-0 select-none" 
        style={{ 
          maskImage: 'radial-gradient(circle at 0% 50%, black 0%, black 35%, transparent 70%)', 
          WebkitMaskImage: 'radial-gradient(circle at 0% 50%, black 0%, black 35%, transparent 70%)',
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      >
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#64748b 1.2px, transparent 1.2px)', backgroundSize: '12px 12px', backgroundPosition: 'left center' }} />
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

      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-20 relative z-10">
        <button 
          onClick={onBack}
          className="group flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to posts
        </button>

        <header className="mb-10 pb-6 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
            <span>Read · {post.readTime}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight mb-4">
            {post.title}
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
            {post.excerpt}
          </p>
        </header>

        <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-6 leading-relaxed text-slate-700 dark:text-slate-300 font-sans">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
