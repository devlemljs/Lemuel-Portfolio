import ParticleText from './ParticleText';
import { useTheme } from '../context/ThemeContext';

export function CTA() {
  const { isDark } = useTheme();

  return (
    <section className="relative py-1 sm:py-1.5 bg-white dark:bg-[#0C0C0F] transition-colors duration-300 flex items-center justify-center overflow-hidden">
      {/* Background Dot Pattern with Minimal Radial Mask */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15 dark:opacity-20 z-0" 
        style={{ 
          maskImage: 'radial-gradient(circle at center, black 15%, transparent 50%)', 
          WebkitMaskImage: 'radial-gradient(circle at center, black 15%, transparent 50%)' 
        }}
      >
        <div 
          className="w-full h-full" 
          style={{ 
            backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', 
            backgroundSize: '12px 12px' 
          }} 
        />
      </div>

      {/* Radial Red/Blue Ambient Glow Backdrop in both Light and Dark Mode */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
        <div className="w-[85%] h-[80px] sm:h-[100px] bg-gradient-to-r from-red-500/25 via-rose-500/20 to-blue-500/25 dark:from-red-600/40 dark:via-rose-900/20 dark:to-blue-600/40 blur-2xl rounded-full opacity-80 animate-pulse" />
      </div>

      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 relative z-10">
        {/* Desktop: One line */}
        <div className="hidden sm:block w-full h-[82px] md:h-[95px]">
          <ParticleText
            text="Follow Your Dream, Start-Up!"
            particleSize={2.0}
            density={4}
            color={isDark ? '#f87171' : '#dc2626'}
            highlightColor={isDark ? '#60a5fa' : '#2563eb'}
            scatter={140}
            gatherDuration={1600}
            stagger={420}
            pointerRepel={40}
            repelRadius={120}
            idleDrift={0.8}
            trigger="mount"
            fontSize="clamp(1.2rem, 5vw, 3.8rem)"
            fontWeight={800}
            fontFamily="monospace, sans-serif"
            glow={true}
          />
        </div>
        {/* Mobile: Two lines */}
        <div className="sm:hidden w-full h-[120px] flex flex-col items-center justify-center">
          <ParticleText
            text="Follow Your Dream!"
            particleSize={1.5}
            density={4}
            color={isDark ? '#f87171' : '#dc2626'}
            highlightColor={isDark ? '#60a5fa' : '#2563eb'}
            scatter={80}
            gatherDuration={1200}
            stagger={300}
            pointerRepel={30}
            repelRadius={80}
            idleDrift={0.5}
            trigger="mount"
            fontSize="clamp(1.5rem, 7vw, 2rem)"
            fontWeight={800}
            fontFamily="monospace, sans-serif"
            glow={true}
          />
          <ParticleText
            text="Start-Up!"
            particleSize={1.5}
            density={4}
            color={isDark ? '#f87171' : '#dc2626'}
            highlightColor={isDark ? '#60a5fa' : '#2563eb'}
            scatter={80}
            gatherDuration={1200}
            stagger={300}
            pointerRepel={30}
            repelRadius={80}
            idleDrift={0.5}
            trigger="mount"
            fontSize="clamp(1.5rem, 7vw, 2rem)"
            fontWeight={800}
            fontFamily="monospace, sans-serif"
            glow={true}
          />
        </div>
      </div>
    </section>
  );
}
