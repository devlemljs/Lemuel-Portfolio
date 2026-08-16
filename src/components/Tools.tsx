import React from 'react';
import { useTheme } from '../context/ThemeContext';

// Row 1: Coding languages (7 tools)
const html5 = '/tools/html5.svg';
const css3 = '/tools/css.svg';
const javascript = '/tools/javascript.svg';
const python = '/tools/python.svg';
const typescript = '/tools/typescript.svg';
const tailwind = '/tools/tailwindcss.svg';
const react = '/tools/react.svg';

// Row 2: Coding tools (7 tools)
const vscode = '/tools/vscode.svg';
const github = '/tools/github.svg';
const githubDark = '/tools/github_dark.svg';
const firebase = '/tools/firebase.svg';
const canva = '/tools/canva.svg';
const openai = '/tools/openai.svg';
const openaiDark = '/tools/openai_dark.svg';
const gemini = '/tools/gemini.svg';
const claude = '/tools/claude.svg';

// Row 3: Communication & admin tools (7 tools)
const gmail = '/tools/gmail.svg';
const gsheets = '/tools/gsheets.svg';
const msteams = '/tools/teams.svg';
const msexcel = '/tools/excel.svg';
const powerbi = '/tools/PowerBI.svg';
const msword = '/tools/word.svg';
const calendar = '/tools/calendar.svg';

interface ToolItem {
  name: string;
  icon: string;
  darkIcon?: string;
}

const row1Tools: ToolItem[] = [
  { name: 'HTML5', icon: html5 },
  { name: 'CSS3', icon: css3 },
  { name: 'JavaScript', icon: javascript },
  { name: 'Python', icon: python },
  { name: 'TypeScript', icon: typescript },
  { name: 'Tailwind CSS', icon: tailwind },
  { name: 'React', icon: react },
];

const row2Tools: ToolItem[] = [
  { name: 'VSCode', icon: vscode },
  { name: 'GitHub', icon: github, darkIcon: githubDark },
  { name: 'Firebase', icon: firebase },
  { name: 'Canva', icon: canva },
  { name: 'OpenAI', icon: openai, darkIcon: openaiDark },
  { name: 'Gemini', icon: gemini },
  { name: 'Claude', icon: claude },
];

const row3Tools: ToolItem[] = [
  { name: 'Gmail', icon: gmail },
  { name: 'Google Sheets', icon: gsheets },
  { name: 'MS Teams', icon: msteams },
  { name: 'MS Excel', icon: msexcel },
  { name: 'Power BI', icon: powerbi },
  { name: 'MS Word', icon: msword },
  { name: 'Calendar', icon: calendar },
];

export function Tools() {
  const { isDark } = useTheme();
  const MarqueeRow = ({ tools, reverse = false, rowIndex }: { tools: ToolItem[]; reverse?: boolean; rowIndex: number }) => {
    // Repeat items to fill wide viewports
    const multiplier = Math.max(2, Math.ceil(14 / tools.length));
    const halfSet = Array.from({ length: multiplier }).flatMap(() => tools);
    const marqueeContent = [...halfSet, ...halfSet];

    return (
      <div className="flex w-full overflow-hidden group">
        <div 
          className={`flex w-max ${reverse ? 'animate-marquee-right' : 'animate-marquee-left'} group-hover:[animation-play-state:paused]`}
        >
          {marqueeContent.map((tool, i) => (
            <div 
              key={`${rowIndex}-${tool.name}-${i}`}
              title={tool.name}
              className="w-16 h-16 shrink-0 mx-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-default overflow-hidden relative"
              data-image={`tool-${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {/* Tool Image */}
              <img
                src={isDark && tool.darkIcon ? tool.darkIcon : tool.icon}
                alt={tool.name}
                className="w-full h-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="tools" className="py-24 relative border-t border-slate-200 dark:border-slate-800/80 overflow-hidden bg-slate-50 dark:bg-[#0C0C0F] transition-colors duration-300">
      {/* Fading Dot Pattern - Upper Left Complete Circle */}
      <div 
        className="absolute top-4 left-4 sm:top-6 sm:left-12 md:left-20 w-56 h-56 sm:w-72 sm:h-72 pointer-events-none opacity-25 dark:opacity-20 z-0" 
        style={{ 
          maskImage: 'radial-gradient(circle at center, black 20%, transparent 70%)', 
          WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 70%)' 
        }}
      >
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#64748b 1.1px, transparent 1.1px)', backgroundSize: '12px 12px' }} />
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

      <div className="max-w-6xl mx-auto px-6 mb-12 relative z-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center">
          Tools & Stack
        </h2>
      </div>

      <div className="w-full flex flex-col gap-6 relative">
        {/* Fade gradient edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 dark:from-[#0C0C0F] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 dark:from-[#0C0C0F] to-transparent z-10 pointer-events-none" />
        
        <MarqueeRow tools={row1Tools} rowIndex={1} />
        <MarqueeRow tools={row2Tools} rowIndex={2} reverse />
        <MarqueeRow tools={row3Tools} rowIndex={3} />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 mt-12">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 opacity-80">
          <span className="font-mono text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400">Programming Languages</span>
          <span className="font-mono text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400">Development & Design</span>
          <span className="font-mono text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400">Business & Productivity</span>
        </div>
      </div>
    </section>
  );
}
