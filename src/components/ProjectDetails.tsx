import { ArrowLeft, ExternalLink, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PROJECTS, GRAPHICS_POSTERS, PosterItem } from './Projects';

export function ProjectDetails({ projectId, onBack }: { projectId: number; onBack: () => void }) {
  const project = PROJECTS.find(p => p.id === projectId) || PROJECTS[0];
  const [selectedPoster, setSelectedPoster] = useState<PosterItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isGraphicsDesign = project.id === 4 || project.title.toLowerCase().includes('graphic');
  const isDataAnalysis = project.title.toLowerCase().includes('data analysis');
  const isSwingBase = project.title.toLowerCase().includes('swingbase');
  const isInternshipfy = project.title.toLowerCase().includes('internshipfy');
  const marqueePosters = [...GRAPHICS_POSTERS, ...GRAPHICS_POSTERS, ...GRAPHICS_POSTERS];

  // Helper functions for project-specific copy
  const getOverview = () => {
    if (isGraphicsDesign) {
      return "This graphic design showcase highlights creative visual concepts, moodboard drafts, and brand identity brainstorms designed in Canva. It explores the full creative journey from preliminary visual brainstorming to refined graphic compositions and promotional templates.";
    }
    if (isDataAnalysis) {
      return "This project focuses on in-depth exploratory data analysis (EDA) and statistical modeling using Python. Utilizing raw datasets sourced directly from Kaggle, the objective is to transform complex quantitative figures into structured, actionable business intelligence and high-level visual discoveries.";
    }
    if (isSwingBase) {
      return "SwingBase is a social enterprise school project focused on creating professional websites through collaborative professional efforts. It aims to bridge the gap between technical web development and social impact by delivering accessible, modern digital solutions for community initiatives.";
    }
    if (isInternshipfy) {
      return "Internshipfy is a dedicated platform designed to streamline internship workflows including daily time keeping, milestone tracking, and budget management. It eliminates manual spreadsheets with an intuitive, unified system for interns and supervisors.";
    }
    return "This clean and modern portfolio website was built to provide a professional digital space for showcasing high-impact projects, design systems, and technical capabilities in an engaging interactive layout.";
  };

  const getSectionTitle = () => {
    if (isGraphicsDesign) return "Canva Design & Brainstorming Process";
    if (isDataAnalysis) return "Methodology & Statistical Modeling";
    if (isSwingBase) return "Collaborative Architecture & Social Mission";
    return "Technical Implementation";
  };

  const getDetails = () => {
    if (isGraphicsDesign) {
      return "Using Canva as the central design workspace, the workflow begins with visual brainstorming and moodboarding. The process involves crafting custom layout compositions, selecting harmonious color palettes, experimenting with typography pairs, and arranging graphic elements to build cohesive visual brand assets.";
    }
    if (isDataAnalysis) {
      return "Data manipulation and cleaning are executed using Pandas to handle complex data structures, filter out anomalies, and structure multi-dimensional metrics. For visual discovery, Seaborn and Matplotlib are utilized to generate statistical distribution charts, correlation heatmaps, regression curves, and comparative category graphs that highlight hidden trends.";
    }
    if (isSwingBase) {
      return "The project leverages modern web design workflows, component-driven UI architecture, and iterative user testing to craft intuitive digital platforms. Team members coordinate across frontend engineering, content strategy, and user experience design to deliver high-quality web assets.";
    }
    if (isInternshipfy) {
      return "Developed with an intuitive dashboard interface, time-tracking timers, automated weekly report generators, and expense ledger tools that keep all internship deliverables organized in one secure place.";
    }
    return "The architecture is designed to be modular and responsive. We separated concerns meticulously, ensuring that the presentation layer remains decoupled from business logic. Modern engineering standards and performance optimizations were critical in achieving the desired outcomes.";
  };

  const getResults = () => {
    if (isGraphicsDesign) {
      return "The result is a versatile gallery of graphic design concepts and marketing templates that express strong visual hierarchy, brand consistency, and engaging aesthetic composition.";
    }
    if (isDataAnalysis) {
      return "The resulting analytical reports deliver clear, visual explanations of underlying patterns, enabling data-informed decision-making and strategic operational optimizations based on empirical evidence.";
    }
    if (isSwingBase) {
      return "Established a collaborative web initiative that delivers high-impact digital solutions, uniting student developers around a meaningful social mission and supporting community partners.";
    }
    if (isInternshipfy) {
      return "Delivers a frictionless tracking experience that reduces administrative overhead and provides transparent visibility into student hours and budget allocations.";
    }
    return "Post-launch metrics indicated a significant improvement in user engagement and a drastic reduction in load times. The solution not only met but exceeded the initial performance targets set by the stakeholders.";
  };

  return (
    <article className="min-h-screen bg-white dark:bg-[#0C0C0F] transition-colors duration-300 relative overflow-hidden">
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

      <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <button 
          onClick={onBack}
          className="group flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-12 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to projects section
        </button>

        <header className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
            {project.title}
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mb-6">
            {project.fullDetails || project.hook}
          </p>

          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-rose-600 dark:hover:bg-rose-600 text-white dark:text-slate-900 dark:hover:text-white text-sm font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Visit Live Site <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </header>

        {/* Project Visual Display */}
        {isGraphicsDesign ? (
          <div className="mb-16">
            {/* Infinite Right-to-Left Marquee Loop */}
            <div className="relative w-full overflow-hidden bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 rounded-2xl py-6 group shadow-xs">
              {/* Fade gradient edges */}
              <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-slate-50 dark:from-slate-850 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-slate-50 dark:from-slate-850 to-transparent z-10 pointer-events-none" />

              <div className="flex w-max animate-marquee-left group-hover:[animation-play-state:paused]">
                {marqueePosters.map((poster, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedPoster(poster)}
                    className="h-56 sm:h-64 md:h-72 aspect-[2/3] shrink-0 mx-2 sm:mx-3 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 cursor-pointer shadow-xs"
                  >
                    <img 
                      src={poster.image} 
                      alt={poster.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Lightbox for Enlarged View on Click */}
            {selectedPoster && (
              <div 
                className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setSelectedPoster(null)}
              >
                <div 
                  className="relative max-h-[85vh] max-w-[90vw] aspect-[2/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedPoster(null)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 text-white border border-slate-600 flex items-center justify-center hover:bg-slate-800 transition-colors cursor-pointer z-10"
                    aria-label="Close preview"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <img 
                    src={selectedPoster.image} 
                    alt={selectedPoster.title} 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        ) : isInternshipfy ? (
          <div className="mb-12">
            <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-xl mx-auto">
              {/* Column 1 - Phone View */}
              <div 
                className="w-full aspect-[9/16] bg-slate-100 dark:bg-slate-800/80 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden flex flex-col items-center justify-center"
                data-image="internshipfy-preview-1"
              >
                {project.phonePreviews?.[0] ? (
                  <img 
                    src={project.phonePreviews[0]} 
                    alt="Internshipfy Screen 1" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute top-2.5 w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                    <div className="w-10 h-10 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">1</span>
                    </div>
                    <span className="text-slate-600 dark:text-slate-300 font-medium text-xs sm:text-sm">
                      Screen 1
                    </span>
                  </>
                )}
              </div>

              {/* Column 2 - Phone View */}
              <div 
                className="w-full aspect-[9/16] bg-slate-100 dark:bg-slate-800/80 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden flex flex-col items-center justify-center"
                data-image="internshipfy-preview-2"
              >
                {project.phonePreviews?.[1] ? (
                  <img 
                    src={project.phonePreviews[1]} 
                    alt="Internshipfy Screen 2" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute top-2.5 w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                    <div className="w-10 h-10 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">2</span>
                    </div>
                    <span className="text-slate-600 dark:text-slate-300 font-medium text-xs sm:text-sm">
                      Screen 2
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 rounded-2xl mb-12 overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
            {project.detailImage || project.image ? (
              <img 
                src={project.detailImage || project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-slate-400 dark:text-slate-500 font-medium">Project Preview Image</span>
            )}
          </div>
        )}

        <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Overview</h2>
          <p className="mb-6 leading-relaxed text-slate-700 dark:text-slate-300">
            {getOverview()}
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">
            {getSectionTitle()}
          </h2>
          <p className="mb-6 leading-relaxed text-slate-700 dark:text-slate-300">
            {getDetails()}
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">Results</h2>
          <p className="mb-6 leading-relaxed text-slate-700 dark:text-slate-300">
            {getResults()}
          </p>
        </div>
      </div>
    </article>
  );
}

