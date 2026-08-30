import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { PROJECTS } from './Projects';

export function AllProjects({ onBack, onViewDetails }: { onBack: () => void, onViewDetails: (id: number) => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0C0C0F] transition-colors duration-300 py-16 sm:py-20 relative overflow-hidden">
      {/* Fading Dot Pattern - Upper Right */}
      <div 
        className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 pointer-events-none opacity-25 dark:opacity-20 z-0" 
        style={{ 
          maskImage: 'radial-gradient(circle at top right, black, transparent 70%)', 
          WebkitMaskImage: 'radial-gradient(circle at top right, black, transparent 70%)' 
        }}
      >
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#64748b 1.1px, transparent 1.1px)', backgroundSize: '12px 12px', backgroundPosition: 'top right' }} />
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
          Back to projects section
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Projects
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PROJECTS.map((project) => (
            <div 
              key={project.id}
              className="bg-white dark:bg-[#141419] border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-2xs transition-all duration-300"
            >
              {/* Card Image Header */}
              <div 
                className="aspect-video w-full bg-slate-100 dark:bg-[#181820] relative overflow-hidden flex items-center justify-center border-b border-slate-200/80 dark:border-slate-800/80"
                data-image={`project-${project.id}`}
              >
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center opacity-30 dark:opacity-40 group-hover:opacity-50 transition-opacity">
                    <div className="w-16 h-16 border-2 border-dashed rounded-lg border-slate-400 dark:border-slate-600 flex items-center justify-center">
                      {project.id === 4 && <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">Canva</span>}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors leading-snug">
                  {project.title}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                  {project.hook}
                </p>

                <button 
                  onClick={() => onViewDetails(project.id)}
                  className="inline-flex items-center text-xs font-mono font-bold text-slate-900 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors mt-auto w-fit uppercase tracking-wider"
                >
                  View Details
                  <span className="ml-1.5 group-hover:translate-x-1 transition-transform inline-block">
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
