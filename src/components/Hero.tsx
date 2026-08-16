import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DepthText from './DepthText';
import { CobwebPattern } from './CobwebPattern';
import { useTheme } from '../context/ThemeContext';

const ROLES = ["Business Intelligence", "Web Development", "AI Specialist"];

const profile = '/images/lem parker.webp';

function TypewriterText({ text, onComplete }: { text: string, onComplete: () => void }) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    if (!isDeleting) {
      if (displayText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, 70);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        onComplete();
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, text, onComplete]);

  return <span className="text-slate-700 dark:text-slate-200 whitespace-nowrap text-[16px] xs:text-[19px] sm:text-[24px] md:text-[30px] leading-tight font-medium">{displayText}</span>;
}

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isDark } = useTheme();

  return (
    <section id="home" className="min-h-[80vh] sm:min-h-[84vh] md:min-h-screen relative flex items-center py-16 sm:py-20 md:py-0 bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
      {/* Spider-Man Cobweb - Upper Right */}
      <div className="absolute top-0 right-0 w-72 h-72 sm:w-88 sm:h-88 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] pointer-events-none opacity-30 dark:opacity-20 z-0 text-slate-400 dark:text-slate-300">
        <CobwebPattern corner="top-right" />
      </div>

      {/* Fading Dot Pattern - Left Edge Below Tagline */}
      <div 
        className="absolute bottom-4 sm:bottom-8 md:bottom-12 left-0 w-52 h-80 sm:w-64 sm:h-96 md:w-72 md:h-[26rem] pointer-events-none opacity-25 dark:opacity-20 z-0" 
        style={{ 
          maskImage: 'radial-gradient(ellipse at left, black 20%, transparent 72%)', 
          WebkitMaskImage: 'radial-gradient(ellipse at left, black 20%, transparent 72%)' 
        }}
      >
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#64748b 1.1px, transparent 1.1px)', backgroundSize: '12px 12px', backgroundPosition: 'left center' }} />
      </div>

      {/* Profile Image Background - Sits behind text */}
      <div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2 w-[85%] md:w-[50%] h-[75%] sm:h-[80%] md:h-[95%] z-0 opacity-15 sm:opacity-20 md:opacity-100 pointer-events-none flex items-end justify-end md:pr-12">
        <div 
          className="w-full h-full relative" 
          style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
        >
          {/* Replace this img src with your transparent profile image */}
          <img 
            src= {profile} 
            alt="Lemuel Jan Suico - Business Intelligence Specialist and Web Developer" 
            loading="eager"
            decoding="async"
            width="600"
            height="800"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-contain object-bottom md:object-right transition-opacity duration-500 ease-out ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10 py-6 sm:py-8 md:py-0">
        <div className="max-w-4xl relative z-20 mt-4 sm:mt-6 md:mt-0">
          <div className="mb-4 sm:mb-6 py-1 sm:py-2">
            <DepthText
              text="Lemuel Jan Suico"
              layers={24}
              depth={2.2}
              faceColor={isDark ? "#e2e8f0" : "#94a3b8"}
              depthColor="#000000"
              tilt={8}
              pointerTracking={true}
              autoOrbit={true}
              orbitSpeed={0.3}
              fontSize="clamp(1.65rem, 6.2vw, 4.8rem)"
              fontWeight={900}
              shadow={true}
            />
          </div>
          
          <div className="h-8 sm:h-10 md:h-12 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-medium text-black dark:text-white flex items-center flex-wrap">
              <div className="relative flex items-center">
                <div className="flex items-center">
                  <TypewriterText 
                    text={ROLES[currentRole]} 
                    onComplete={() => setCurrentRole((prev) => (prev + 1) % ROLES.length)} 
                  />
                </div>
                <span className="w-1.5 sm:w-2 h-5 sm:h-7 md:h-8 bg-black dark:bg-white ml-1 animate-pulse shrink-0" />
              </div>
            </h2>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light max-w-2xl mt-2 sm:mt-4 md:mt-0 relative z-20">
            Understanding people. Solving business problems. Creating value with strategy, and purpose.
          </p>
        </div>
      </div>
    </section>
  );
}
