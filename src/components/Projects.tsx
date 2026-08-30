import { CobwebPattern } from './CobwebPattern';

export const lemuel = '/projects/lemuel.webp';
export const data = '/projects/data.webp';
export const internship = '/projects/internship.webp';
export const graphics = '/projects/graphics.webp';
export const daniela = '/projects/daniela.webp';
export const gio = '/projects/gio.webp';
export const swingbase = '/projects/swingbase.webp';

export const projectDetail1 = '/projectdetails/1.webp';
export const projectDetail2 = '/projectdetails/2.webp';
export const projectDetail3 = '/projectdetails/3.webp';
export const projectDetail4 = '/projectdetails/4.webp';
export const projectDetail5 = '/projectdetails/5.webp';
export const projectDetail6 = '/projectdetails/6.webp';
export const projectDetail7 = '/projectdetails/7.webp';
export const projectDetail8 = '/projectdetails/8.webp';
export const projectDetail9 = '/projectdetails/9.webp';
export const projectDetail10 = '/projectdetails/10.webp';
export const analyticsDetail = '/projectdetails/analytics.webp';
export const internshipDetail1 = '/projectdetails/internship1.webp';
export const internshipDetail2 = '/projectdetails/internship2.webp';
export const danielaDetail = '/projectdetails/port dan.webp';
export const gioDetail = '/projectdetails/port gio.webp';
export const lemuelDetail = '/projectdetails/port lem.webp';
export const swingbaseDetail = '/projectdetails/swingbase.webp';

export interface PosterItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  hook: string;
  fullDetails: string;
  link?: string;
  image: string;
  detailImage?: string;
  phonePreviews?: string[];
  gallery?: string[];
}

export const GRAPHICS_POSTERS: PosterItem[] = [
  { id: 1, title: "Canva Design Concept #1", category: "Visual Brainstorm", image: projectDetail1 },
  { id: 2, title: "Brand Identity Draft", category: "Moodboard & Assets", image: projectDetail2 },
  { id: 3, title: "Typography & Palette", category: "Canva Layout", image: projectDetail3 },
  { id: 4, title: "Marketing Creative", category: "Visual Hierarchy", image: projectDetail4 },
  { id: 5, title: "Product Campaign", category: "Canva Design", image: projectDetail5 },
  { id: 6, title: "Social Graphic Concept", category: "Creative Composition", image: projectDetail6 },
  { id: 7, title: "Brand Asset Design", category: "Color & Styling", image: projectDetail7 },
  { id: 8, title: "Editorial Layout Draft", category: "Canva Workspace", image: projectDetail8 },
  { id: 9, title: "Creative Showcase", category: "Final Concept", image: projectDetail9 },
  { id: 10, title: "Brand Campaign Concept", category: "Final Presentation", image: projectDetail10 },
];

export const PROJECTS: ProjectItem[] = [
  {
    title: "Graphics Design",
    hook: "Creative graphic design concepts and visual branding created in Canva.",
    fullDetails: "A creative collection of graphic design concepts, visual branding moodboards, and promotional layouts created using Canva. This project showcases the complete design process from preliminary brainstorming and color harmony exploration to refined social media graphics and marketing assets.",
    id: 4,
    image: graphics,
    gallery: [
      projectDetail1,
      projectDetail2,
      projectDetail3,
      projectDetail4,
      projectDetail5,
      projectDetail6,
      projectDetail7,
      projectDetail8,
      projectDetail9,
      projectDetail10,
    ],
  },
  {
    title: "Internshipfy",
    hook: "Specialized platform streamlining internship time keeping and budget workflows.",
    fullDetails: "Internshipfy is a specialized platform designed to streamline internship workflows including time keeping and budget management. Visit internshipfyy.vercel.app to explore the dashboards and report keeping features.",
    link: "https://internshipfyy.vercel.app",
    id: 3,
    image: internship,
    phonePreviews: [internshipDetail1, internshipDetail2],
  },
  {
    title: "Portfolio Website",
    hook: "Clean modern portfolio showcasing high-impact projects and responsive design.",
    fullDetails: "This clean and modern portfolio website was built to provide a professional digital space for showcasing high-impact projects and skills. You can visit daniela-lacuarin.vercel.app to explore the full interactive experience and responsive design implementation.",
    link: "https://daniela-lacuarin.vercel.app",
    id: 5,
    image: daniela,
    detailImage: danielaDetail,
  },
  {
    title: "Data Analysis",
    hook: "In-depth Python data analysis and statistical modeling from Kaggle.",
    fullDetails: "Using Python for in-depth data analysis, I utilize powerful libraries like Pandas for data manipulation, and Matplotlib and Seaborn for creating insightful visualizations. This project involves clear, step-by-step analysis of raw datasets sourced from Kaggle, providing actionable business insights through thorough statistical modeling.",
    link: "files/Lemuel Data Analysis.pdf", 
    id: 2,
    image: data,
    detailImage: analyticsDetail,
  },
  {
    title: "SwingBase",
    hook: "Social enterprise school project creating collaborative websites for impact.",
    fullDetails: "SwingBase is a social enterprise school project focused on creating professional websites through collaborative professional efforts. Visit swingbase.vercel.app to see the project in action and learn more about our social mission.",
    link: "https://swingbase.vercel.app",
    id: 7,
    image: swingbase,
    detailImage: swingbaseDetail,
  },
  {
    title: "Portfolio Website",
    hook: "Sleek personal portfolio website presenting software engineering and design.",
    fullDetails: "This clean and modern portfolio website was built to provide a professional digital space for showcasing high-impact projects and skills. You can visit giosabucido.vercel.app to explore the full interactive experience and responsive design implementation.",
    link: "https://giosabucido.vercel.app",
    id: 6,
    image: gio,
    detailImage: gioDetail,
  },
  {
    title: "First Portfolio Website",
    hook: "Early personal portfolio created to showcase projects and background.",
    fullDetails: "This is my first personal portfolio website, built to establish an online presence and showcase early projects, foundational skills, and academic background in a clean layout. You can visit lemueljansuico.vercel.app to explore the original design.",
    link: "https://lemueljansuico.vercel.app",
    id: 1,
    image: lemuel,
    detailImage: lemuelDetail,
  }
];

export function Projects({ onViewDetails, onViewAllProjects }: { onViewDetails: (id: number) => void, onViewAllProjects: () => void }) {
  return (
    <section id="projects" className="py-24 relative border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0C0C0F] transition-colors duration-300 overflow-hidden">
      {/* Spider-Man Cobweb - Upper Left */}
      <div className="absolute top-0 left-0 w-72 h-72 sm:w-88 sm:h-88 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] pointer-events-none opacity-30 dark:opacity-20 z-0 text-slate-400 dark:text-slate-300">
        <CobwebPattern corner="top-left" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center">
            Projects
          </h2>
          <button 
            onClick={onViewAllProjects}
            className="text-sm font-bold text-slate-900 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 uppercase tracking-wider transition-colors flex items-center"
          >
            ALL PROJECTS <span className="ml-2">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PROJECTS.slice(0, 3).map((project) => (
            <div 
              key={project.id}
              className="bg-white dark:bg-[#141419] border border-slate-200 dark:border-slate-800/80 rounded-xl overflow-hidden flex flex-col group hover:-translate-y-1 hover:border-rose-300/80 dark:hover:border-rose-500/40 hover:shadow-[0_8px_24px_rgba(244,63,94,0.06)] transition-all duration-300"
            >
              {/* Image Header */}
              <div 
                className="aspect-video w-full bg-slate-100 dark:bg-[#181820] relative overflow-hidden flex items-center justify-center border-b border-slate-200 dark:border-slate-800/80"
                data-image={`project-${project.id}`}
              >
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                    <div className="w-16 h-16 border-2 border-dashed rounded-lg border-slate-400 dark:border-slate-600" />
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 flex-1">
                  {project.hook}
                </p>

                <button 
                  onClick={() => onViewDetails(project.id)}
                  className="inline-flex items-center text-sm font-semibold text-slate-900 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 transition-colors mt-auto w-fit cursor-pointer"
                >
                  View Details
                  <span className="ml-1 opacity-70 group-hover:translate-x-1 transition-transform inline-block">
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
