import { useState, useEffect, useRef } from 'react';

export function useScrollSpy(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;

  useEffect(() => {
    let ticking = false;

    const checkActiveSection = () => {
      // Highlight the last section if scrolled near the bottom
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 30;
      if (isAtBottom && sectionIds.length > 0) {
        const lastId = sectionIds[sectionIds.length - 1];
        if (activeSectionRef.current !== lastId) {
          setActiveSection(lastId);
        }
        ticking = false;
        return;
      }

      const halfWindow = window.innerHeight * 0.45;
      let currentActiveId = activeSectionRef.current;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // A section is active if it spans across the trigger threshold
          if (rect.top <= halfWindow && rect.bottom > halfWindow) {
            currentActiveId = id;
            break;
          }
        }
      }

      if (currentActiveId && currentActiveId !== activeSectionRef.current) {
        setActiveSection(currentActiveId);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(checkActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    checkActiveSection();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
}

