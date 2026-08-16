import { Home, User, Wrench, FolderOpen, FileText, Mail, Phone, Facebook, Instagram, Linkedin, Github, X } from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ThemeToggle } from './ThemeToggle';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeSection: string;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'blog', label: 'Blog', icon: FileText },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: 'https://www.facebook.com/share/1BosJpYybu', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/lemm.ljs?igsh=NzRkdXZzY2Y2c2R4', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/lemuel-suico', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/devlemljs', label: 'GitHub' },
];

const profile = '/images/profile.webp';
const cover = '/images/spidyweb.webp';

export function Sidebar({ activeSection, isOpen, onClose, onNavigate }: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-[100dvh] w-[280px] bg-white dark:bg-[#0C0C0F] border-r border-slate-200 dark:border-slate-800/80 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col transition-all duration-300 ease-in-out md:translate-x-0 shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Top Strip (Cover Photo Placeholder) */}
        <div 
          className="relative h-[100px] w-full shrink-0 overflow-hidden border-b border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-[#141419]"
          data-image="cover-photo"
        >
          {/* Cover Placeholder Image with Fallback */}
          <img 
            src={cover} 
            alt="Cover" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-slate-100 dark:bg-[#141419] border-2 border-dashed border-slate-300/80 dark:border-slate-800 flex items-center justify-center p-2 text-center -z-10">
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold bg-white/80 dark:bg-[#0C0C0F]/80 px-2.5 py-1 rounded border border-slate-200/80 dark:border-slate-800/80">
              Cover Image Placeholder
            </span>
          </div>

          {/* Mobile Close Button (top-right of cover area) */}
          <button 
            onClick={onClose}
            className="absolute top-2.5 right-2.5 p-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 md:hidden z-30 bg-white/80 dark:bg-[#141419]/80 backdrop-blur-md rounded-full shadow-xs border border-slate-200/80 dark:border-slate-700/80 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            aria-label="Close Sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col px-6 pb-6 pt-0 flex-1 min-h-0 relative">
          {/* Avatar Row with ThemeToggle counterpart right below cover image */}
          <div className="relative -mt-10 mb-3 shrink-0 flex items-end justify-between">
            <div 
              className="w-20 h-20 rounded-full border-4 border-white dark:border-[#0C0C0F] bg-slate-50 dark:bg-[#141419] flex items-center justify-center text-slate-300 dark:text-slate-600 shadow-md shrink-0 transition-colors duration-300 overflow-hidden relative"
              data-image="avatar"
            >
              <img 
                src={profile} 
                alt="Lemuel Jan Suico" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <User size={32} />
              </div>
            </div>

            {/* Toggle Button right below cover photo (counterpart of profile avatar) */}
            <div className="pt-10 relative -top-[6px] translate-x-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Profile Info */}
            <div className="mb-6 shrink-0">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 leading-tight transition-colors duration-300">Lemuel Jan Suico</h1>
            <p className="text-xs text-slate-900 dark:text-slate-300 font-medium mb-1.5 leading-snug transition-colors duration-300">
              Business Intelligence | Web Development | AI Specialist
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 transition-colors duration-300">Pasig City, Philippines</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col justify-start gap-2 overflow-y-auto h-[235px] -mt-[14px] mb-[5px] pb-[5px]">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-300 text-left w-full relative overflow-hidden group cursor-pointer",
                  activeSection === id
                    ? "text-black dark:text-white bg-slate-100/50 dark:bg-slate-800/30"
                    : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40"
                )}
              >
                {/* Active Indicator Line */}
                {activeSection === id && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/5 bg-black dark:bg-white rounded-r-full shadow-[0_0_8px_rgba(0,0,0,0.6)]"></span>
                )}
                
                <Icon className={cn(
                  "w-4 h-4 relative z-10 transition-all duration-300 shrink-0",
                  activeSection === id 
                    ? "text-black dark:text-white scale-110" 
                    : "text-slate-400 dark:text-slate-500 group-hover:text-black dark:group-hover:text-white group-hover:scale-110"
                )} />

                <span className={cn(
                  "relative z-10 transition-transform duration-300",
                  activeSection === id ? "translate-x-0 font-semibold" : "group-hover:translate-x-0.5"
                )}>
                  {label}
                </span>
              </button>
            ))}
          </nav>

          {/* Spacer */}
          <div className="mt-auto pt-6 shrink-0 border-t border-slate-200 dark:border-slate-800/80 pb-2 -mx-6 px-6 transition-colors duration-300">
            {/* Contact Info */}
            <div className="flex flex-col items-start mb-4 text-left gap-1.5">
              <a href="mailto:lemuelsuico.ljs@gmail.com" className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors font-medium group/link">
                <Mail className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover/link:text-rose-600 dark:group-hover/link:text-rose-400 shrink-0 transition-colors" />
                <span className="font-bold">lemuelsuico.ljs@gmail.com</span>
              </a>
              <a href="tel:09942326765" className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors font-medium group/link">
                <Phone className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover/link:text-rose-600 dark:group-hover/link:text-rose-400 shrink-0 transition-colors" />
                <span>09942326765</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-2.5">
              {SOCIAL_LINKS.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-md bg-white dark:bg-[#141419] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 shadow-xs border border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-500/40 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-all duration-300"
                  aria-label={social.label}
                  title={social.label}
                >
                  <social.icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
