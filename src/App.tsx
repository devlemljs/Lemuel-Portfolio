import { useState, useEffect, useMemo } from 'react';
import { Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Tools } from './components/Tools';
import { Projects } from './components/Projects';
import { ProjectDetails } from './components/ProjectDetails';
import { AllProjects } from './components/AllProjects';
import { Blog } from './components/Blog';
import { BlogPost } from './components/BlogPost';
import { AllBlogs } from './components/AllBlogs';
import { CTA } from './components/CTA';
import { Contact } from './components/Contact';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useSEO } from './hooks/useSEO';

const SECTION_IDS = ['home', 'about', 'tools', 'projects', 'blog', 'contact'];

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

const VIEW_STATE_KEY = 'portfolio_view_state';

function MainApp() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'main' | 'blog-post' | 'all-blogs' | 'project-details' | 'all-projects'>(() => {
    try {
      const saved = sessionStorage.getItem(VIEW_STATE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.view) return parsed.view;
      }
    } catch {}
    return 'main';
  });

  const [selectedPost, setSelectedPost] = useState<number | null>(() => {
    try {
      const saved = sessionStorage.getItem(VIEW_STATE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.selectedPost ?? null;
      }
    } catch {}
    return null;
  });

  const [selectedProject, setSelectedProject] = useState<number | null>(() => {
    try {
      const saved = sessionStorage.getItem(VIEW_STATE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.selectedProject ?? null;
      }
    } catch {}
    return null;
  });
  
  // Sync view state for lightweight instant restore
  useEffect(() => {
    try {
      sessionStorage.setItem(VIEW_STATE_KEY, JSON.stringify({
        view: currentView,
        selectedPost,
        selectedProject
      }));
    } catch {}
  }, [currentView, selectedPost, selectedProject]);

  const activeSection = useScrollSpy(SECTION_IDS);

  const seoData = useMemo(() => {
    const baseHost = "https://lemuelsuico.com";
    if (currentView === 'main') {
      switch (activeSection) {
        case 'about':
          return {
            title: "About | Lemuel Jan Suico",
            description: "Learn more about Lemuel Jan Suico, a self-taught full-stack developer and Business Intelligence specialist.",
            canonicalUrl: `${baseHost}/#about`,
            schemaMarkup: {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Lemuel Jan Suico",
              "jobTitle": "Web Developer & Business Intelligence Analyst",
              "url": baseHost
            }
          };
        case 'projects':
          return {
            title: "Projects | Lemuel Jan Suico",
            description: "Explore the portfolio of Lemuel Jan Suico, featuring web applications and data-driven tools.",
            canonicalUrl: `${baseHost}/#projects`,
            schemaMarkup: {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Projects Portfolio",
              "url": `${baseHost}/#projects`
            }
          };
        case 'blog':
          return {
            title: "Blog | Lemuel Jan Suico",
            description: "Read articles by Lemuel Jan Suico on Business Intelligence, Web Development, and AI workflows.",
            canonicalUrl: `${baseHost}/#blog`,
            schemaMarkup: {
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Lemuel Jan Suico's Blog",
              "url": `${baseHost}/#blog`
            }
          };
        case 'home':
        default:
          return {
            title: "Lemuel Jan Suico | Business Intelligence & Web Development",
            description: "Lemuel Jan Suico is a Business Intelligence specialist and Full-Stack Web Developer. I build web applications and data-driven tools that solve real operational problems.",
            canonicalUrl: baseHost,
            schemaMarkup: {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Lemuel Jan Suico | Portfolio",
              "url": baseHost
            }
          };
      }
    }
    
    // For other views we can return a general SEO, or they could have their own logic in the components.
    if (currentView === 'blog-post') {
      return {
        title: "Article | Lemuel Jan Suico",
        description: "Read the latest article by Lemuel Jan Suico.",
        canonicalUrl: `${baseHost}/article`,
      };
    }

    if (currentView === 'project-details') {
      return {
        title: "Project Details | Lemuel Jan Suico",
        description: "Details about a project by Lemuel Jan Suico.",
        canonicalUrl: `${baseHost}/project`,
      };
    }
    
    return {
      title: "Lemuel Jan Suico | Portfolio",
      description: "Lemuel Jan Suico's Portfolio",
      canonicalUrl: baseHost,
    };
  }, [currentView, activeSection]);

  useSEO(seoData);

  const scrollToSection = (id: string) => {
    setIsSidebarOpen(false);
    
    // If we're not on main view, first return to main view, then scroll after render
    if (currentView !== 'main') {
      setCurrentView('main');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReadArticle = (id: number) => {
    setSelectedPost(id);
    setCurrentView('blog-post');
  };

  const handleViewAllArticles = () => {
    setCurrentView('all-blogs');
  };

  const handleBackToBlogSection = () => {
    setCurrentView('main');
    setTimeout(() => {
      const element = document.getElementById('blog');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleBackToProjectsSection = () => {
    setCurrentView('main');
    setTimeout(() => {
      const element = document.getElementById('projects');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleViewProjectDetails = (id: number) => {
    setSelectedProject(id);
    setCurrentView('project-details');
  };

  const handleViewAllProjects = () => {
    setCurrentView('all-projects');
  };

  // Prevent background scrolling when mobile sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-slate-200 selection:text-black flex font-sans transition-colors duration-300">
      {/* Mobile Header (Navbar-ish, just for hamburger) */}
      <div className="md:hidden fixed top-0 left-0 w-full z-40 bg-white/90 dark:bg-[#0C0C0F]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between transition-colors duration-300">
        <div 
          className="flex items-center" 
          title="Lem Suico"
        >
          <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
            Lemuel Jan Suico
          </span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white p-1 -mr-1 transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <Sidebar 
        activeSection={currentView === 'main' ? activeSection : ''} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={scrollToSection}
      />
      
      {/* Main Content Area */}
      <main className="flex-1 w-full md:pl-[280px] flex flex-col relative pt-14 md:pt-0">
        {currentView === 'main' && (
          <div className="flex flex-col w-full">
            <Hero />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <About />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Tools />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Projects onViewDetails={handleViewProjectDetails} onViewAllProjects={handleViewAllProjects} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Blog onReadArticle={handleReadArticle} onViewAllArticles={handleViewAllArticles} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <CTA />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Contact />
            </motion.div>
          </div>
        )}
        
        {currentView === 'blog-post' && selectedPost !== null && (
          <BlogPost 
            postId={selectedPost} 
            onBack={handleBackToBlogSection} 
          />
        )}
        
        {currentView === 'all-blogs' && (
          <AllBlogs 
            onBack={handleBackToBlogSection} 
            onReadArticle={handleReadArticle}
          />
        )}

        {currentView === 'project-details' && selectedProject !== null && (
          <ProjectDetails 
            projectId={selectedProject} 
            onBack={handleBackToProjectsSection} 
          />
        )}

        {currentView === 'all-projects' && (
          <AllProjects 
            onBack={handleBackToProjectsSection}
            onViewDetails={handleViewProjectDetails}
          />
        )}
      </main>
    </div>
  );
}

