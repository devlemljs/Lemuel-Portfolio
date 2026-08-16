import { useState, useEffect } from 'react';
import { Download, ArrowLeft, ChevronRight, GraduationCap, Briefcase, X } from 'lucide-react';
import { motion } from 'motion/react';
import { CobwebPattern } from './CobwebPattern';

const CV = '/files/Lemuel_Jan_Suico_Resume.webp';
const CVpdf = '/files/Lemuel_Jan_Suico_Resume.pdf';

export function About() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'education' | 'experience' | null>(null);

  useEffect(() => {
    if (isCVModalOpen || activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCVModalOpen, activeModal]);

  return (
    <>
      <section id="about" className="py-20 md:py-24 relative border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0C0C0F] transition-colors duration-300 overflow-hidden">
        {/* Spider-Man Cobweb - Lower Right */}
        <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-88 sm:h-88 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] pointer-events-none opacity-30 dark:opacity-20 z-0 text-slate-400 dark:text-slate-300">
          <CobwebPattern corner="bottom-right" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
            About
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Summary */}
            <div className="lg:col-span-6">
              <div className="prose prose-lg text-slate-600 dark:text-slate-300">
                <p className="leading-relaxed">
                  Passionate about blending business insights with cutting-edge technology to solve real-world problems. Experienced in building responsive web applications and data-driven solutions using modern tools. Always eager to learn, collaborate, and deliver impactful results in fast-paced environments. Constantly exploring new ways to leverage AI and data to optimize operations and create value.
                </p>
              </div>
              
              <div className="mt-8 relative inline-block">
                {/* Circular dot pattern overlapping upper right of button, behind button */}
                <div 
                  className="absolute -top-6 -right-8 w-28 h-28 rounded-full pointer-events-none opacity-50 z-0" 
                  aria-hidden="true"
                  style={{ 
                    backgroundImage: 'radial-gradient(#64748b 1.5px, transparent 1.5px)', 
                    backgroundSize: '9px 9px',
                    maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
                  }} 
                />

                <motion.button
                  onClick={() => setIsCVModalOpen(true)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative z-10 inline-flex items-center justify-center px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-md hover:shadow-xl hover:shadow-slate-500/30 text-sm font-medium rounded-md transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <span className="relative z-10">View CV</span>
                  <span className="absolute inset-0 bg-slate-300 dark:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </div>
            </div>
            
            {/* Right Column: Fact List */}
            <div className="lg:col-span-6 border-t border-slate-200 dark:border-slate-800 lg:border-t-0 lg:pt-0 pt-8 space-y-1">
              
              {/* Clickable Education Card */}
              <div 
                onClick={() => setActiveModal('education')}
                className="py-3 px-4 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-800 hover:bg-slate-100/40 dark:hover:bg-slate-800/30 transition-all duration-300 cursor-pointer group flex flex-col sm:flex-row sm:items-start justify-between gap-2"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                      Education
                      <span className="text-xs font-normal text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 px-2 py-0.5 rounded-full transition-colors duration-300 inline-flex items-center gap-0.5">
                        Click for details <ChevronRight className="w-3 h-3" />
                      </span>
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-2xl">
                    BS Entrepreneurship · Rizal Technological University
                  </p>
                </div>
                <div className="text-xs font-mono text-slate-400 dark:text-slate-500 sm:mt-1 shrink-0">
                  2024 — Present
                </div>
              </div>
              
              {/* Clickable Experience Card */}
              <div 
                onClick={() => setActiveModal('experience')}
                className="py-3 px-4 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-800 hover:bg-slate-100/40 dark:hover:bg-slate-800/30 transition-all duration-300 cursor-pointer group flex flex-col sm:flex-row sm:items-start justify-between gap-2"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                      Experience
                      <span className="text-xs font-normal text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 px-2 py-0.5 rounded-full transition-colors duration-300 inline-flex items-center gap-0.5">
                        Click for details <ChevronRight className="w-3 h-3" />
                      </span>
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-2xl">
                    Tenet Health (AR Follow-up) & Concentrix (Advisor II / I)
                  </p>
                </div>
                <div className="text-xs font-mono text-slate-400 dark:text-slate-500 sm:mt-1 shrink-0">
                  2024 — Present
                </div>
              </div>
              
              <div className="py-3 px-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-medium text-slate-900 dark:text-white mb-1">
                    Focus Areas
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-2xl">
                    Business Intelligence · Web Development · AI-assisted Workflows
                  </p>
                </div>
                <div className="text-xs font-mono text-slate-400 dark:text-slate-500 sm:mt-1 shrink-0">
                  Skills
                </div>
              </div>

            </div>
            
          </div>
        </div>
      </section>

      {/* Experience / Education Details Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          ></div>
          
          <div className="relative bg-white dark:bg-black rounded-2xl shadow-2xl flex flex-col w-full max-w-2xl max-h-[85vh] overflow-hidden border border-slate-100 dark:border-slate-900 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-900 bg-white dark:bg-black">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-white text-black dark:text-black">
                  {activeModal === 'experience' ? (
                    <Briefcase className="w-5 h-5" />
                  ) : (
                    <GraduationCap className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-black dark:text-white text-lg">
                    {activeModal === 'experience' ? 'Work Experience' : 'Education'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activeModal === 'experience' ? 'Detailed professional timeline & achievements' : 'Academic background & qualifications'}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-white dark:bg-black">
              {activeModal === 'experience' ? (
                <div className="space-y-8">
                  {/* Position 1 */}
                  <div className="relative pl-6 border-l-2 border-slate-300 dark:border-slate-700 space-y-2">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black dark:bg-white border-2 border-white dark:border-black shadow-xs" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-base font-bold text-black dark:text-white">
                        AR Follow-up Representative — <span className="text-black dark:text-white">Tenet Health</span>
                      </h4>
                      <span className="text-xs font-mono font-medium text-black dark:text-white bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-full w-fit">
                        July 2026 – Present
                      </span>
                    </div>

                    <ul className="list-disc list-outside ml-4 text-sm text-black dark:text-white space-y-1.5 pt-1">
                      <li>Handling accounts receivable follow-up for healthcare claims using Athena and IDX billing systems</li>
                      <li>Currently in training, building hands-on experience with hospital billing workflows and payer follow-up</li>
                      <li>Applying prior insurance knowledge to identify and resolve outstanding claim issues</li>
                    </ul>
                  </div>

                  {/* Position 2 */}
                  <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-black" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-base font-bold text-black dark:text-white">
                        Advisor II, Customer Associate — <span className="text-black dark:text-white">Concentrix</span>
                      </h4>
                      <span className="text-xs font-mono font-medium text-black dark:text-white bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-full w-fit">
                        Oct 2025 – Jan 2026
                      </span>
                    </div>

                    <ul className="list-disc list-outside ml-4 text-sm text-black dark:text-white space-y-1.5 pt-1">
                      <li>Promoted from Advisor I after strong performance handling US healthcare insurance accounts</li>
                      <li>Managed complex claims, benefits, and eligibility cases with a focus on accuracy and resolution speed</li>
                      <li>Recognized as a top performer for consistent quality and volume on the account</li>
                    </ul>
                  </div>

                  {/* Position 3 */}
                  <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-black" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-base font-bold text-black dark:text-white">
                        Advisor I, Customer Associate — <span className="text-black dark:text-white">Concentrix</span>
                      </h4>
                      <span className="text-xs font-mono font-medium text-black dark:text-white bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-full w-fit">
                        June 2024 – Oct 2025
                      </span>
                    </div>

                    <ul className="list-disc list-outside ml-4 text-sm text-black dark:text-white space-y-1.5 pt-1">
                      <li>Supported a US healthcare insurance account covering claims, benefits, eligibility, COB, EOB, and appeals</li>
                      <li>Built a strong foundation in insurance terminology and payer processes through direct member and provider interactions</li>
                      <li>Promoted to Advisor II based on consistent performance and product knowledge</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Education 1 */}
                  <div className="relative pl-6 border-l-2 border-slate-300 dark:border-slate-700 space-y-2">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black dark:bg-white border-2 border-white dark:border-black shadow-xs" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-base font-bold text-black dark:text-white">
                        Rizal Technological University
                      </h4>
                      <span className="text-xs font-mono font-medium text-black dark:text-white bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-full w-fit">
                        2024 – Present
                      </span>
                    </div>
                    <p className="text-sm font-medium text-black dark:text-white">
                      Bachelor of Science in Entrepreneurship
                    </p>

                    <ul className="list-disc list-outside ml-4 text-sm text-black dark:text-white space-y-1.5 pt-1">
                      <li>Consistent academic achiever maintaining honors standing with a strong general weighted average</li>
                      <li>Built practical skills in web development and business tools alongside coursework</li>
                    </ul>
                  </div>

                  {/* Education 2 */}
                  <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-black" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-base font-bold text-black dark:text-white">
                        Buting Senior High School
                      </h4>
                      <span className="text-xs font-mono font-medium text-black dark:text-white bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-full w-fit">
                        2022 – 2024
                      </span>
                    </div>
                    <p className="text-sm font-medium text-black dark:text-white">
                      Accountancy, Business and Management (ABM)
                    </p>

                    <ul className="list-disc list-outside ml-4 text-sm text-black dark:text-white space-y-1.5 pt-1">
                      <li>Graduated with honors</li>
                      <li>Developed early interest in technology and design that carried into college pursuits</li>
                    </ul>
                  </div>

                  {/* Education 3 */}
                  <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-black" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-base font-bold text-black dark:text-white">
                        Hilongos National Vocational School
                      </h4>
                      <span className="text-xs font-mono font-medium text-black dark:text-white bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-full w-fit">
                        2018 – 2022
                      </span>
                    </div>
                    <p className="text-sm font-medium text-black dark:text-white">
                      Junior High, Major in Electricity
                    </p>

                    <ul className="list-disc list-outside ml-4 text-sm text-black dark:text-white space-y-1.5 pt-1">
                      <li>Graduated with honors</li>
                      <li>Maintained consistent academic performance across all four years</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* CV Modal */}
      {isCVModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsCVModalOpen(false)}
          ></div>
          <div className="relative bg-white dark:bg-[#0C0C0F] border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl flex flex-col w-full max-w-4xl max-h-[92vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-black shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCVModalOpen(false)}
                  className="inline-flex items-center gap-1.5 px-2 py-1 text-black dark:text-white hover:opacity-70 font-semibold text-sm transition-all cursor-pointer active:scale-95"
                  aria-label="Back"
                >
                  <ArrowLeft className="w-4 h-4 text-black dark:text-white stroke-[2.5]" />
                  <span>Back</span>
                </button>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <h3 className="font-bold text-black dark:text-white text-base sm:text-lg">Curriculum Vitae</h3>
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href={CVpdf}
                  download="Lemuel_Jan_Suico_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 bg-black hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-black text-xs sm:text-sm font-medium rounded-md shadow-sm transition-colors cursor-pointer"
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">PDF</span>
                </a>
              </div>
            </div>

            {/* Modal Body: Responsive Image with No Outline */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 bg-slate-100/60 dark:bg-black flex justify-center items-start">
              <img
                src={CV}
                alt="Lemuel Jan Suico Resume"
                className="w-full max-w-[760px] h-auto object-contain select-none block shadow-sm"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallbackEl = document.getElementById('cv-fallback-container');
                  if (fallbackEl) fallbackEl.style.display = 'flex';
                }}
              />
              <div id="cv-fallback-container" className="hidden flex-col items-center justify-center py-16 text-slate-400 dark:text-slate-500 text-center">
                <p className="text-sm font-medium">Resume preview will appear once {CV} is uploaded.</p>
                <a 
                  href={CVpdf}
                  download="Lemuel_Jan_Suico_Resume.pdf"
                  className="mt-3 text-xs text-blue-500 hover:underline flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
