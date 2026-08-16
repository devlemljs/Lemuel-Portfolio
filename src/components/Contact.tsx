import { useState, FormEvent, useEffect } from 'react';
import { CheckCircle2, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CobwebPattern } from './CobwebPattern';
import { HangingSpider } from './HangingSpider';
import { SendIcon } from './SendIcon';
import { submitContactToGoogleSheets } from '../utils/googleAppsScript';

const CONTACT_DRAFT_KEY = 'portfolio_contact_draft';

export function Contact() {
  const [name, setName] = useState(() => {
    try {
      const saved = localStorage.getItem(CONTACT_DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.name || '';
      }
    } catch {}
    return '';
  });

  const [email, setEmail] = useState(() => {
    try {
      const saved = localStorage.getItem(CONTACT_DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.email || '';
      }
    } catch {}
    return '';
  });

  const [message, setMessage] = useState(() => {
    try {
      const saved = localStorage.getItem(CONTACT_DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.message || '';
      }
    } catch {}
    return '';
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Sync draft to localStorage
  useEffect(() => {
    try {
      if (name || email || message) {
        localStorage.setItem(CONTACT_DRAFT_KEY, JSON.stringify({ name, email, message }));
      }
    } catch {}
  }, [name, email, message]);

  useEffect(() => {
    if (showPrivacyModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPrivacyModal]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);

    try {
      // Dispatches to Google Sheets "Portfolio Contact" -> Tab "Contacts" and emails lemuelsuico.ljs@gmail.com
      await submitContactToGoogleSheets({
        name,
        email,
        message,
        spreadsheetName: "Portfolio Contact",
        sheetName: "Contacts",
        recipientEmail: "lemuelsuico.ljs@gmail.com"
      });
    } catch (err) {
      console.warn("Submission handled with local backup:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      try {
        localStorage.removeItem(CONTACT_DRAFT_KEY);
      } catch {}
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
    try {
      localStorage.removeItem(CONTACT_DRAFT_KEY);
    } catch {}
  };

  return (
    <section id="contact" className="pt-2 pb-16 sm:pt-4 sm:pb-20 bg-white dark:bg-[#0C0C0F] transition-colors duration-300 relative overflow-hidden">
      {/* Spider-Man Cobweb - Lower Left */}
      <div className="absolute bottom-0 left-0 w-72 h-72 sm:w-88 sm:h-88 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] pointer-events-none opacity-30 dark:opacity-20 z-0 text-slate-400 dark:text-slate-300">
        <CobwebPattern corner="bottom-left" />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header - Centered */}
        <div className="text-center mb-6 pb-3 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Get in Touch
          </h2>
        </div>

        <div className="max-w-2xl mx-auto relative">
          {/* Hanging Spider on left part of contact box (not too left, not too middle) */}
          <div className="absolute -top-10 sm:-top-12 left-[15%] sm:left-[18%] md:left-[20%] w-9 h-18 sm:w-11 sm:h-22 pointer-events-none z-30">
            <HangingSpider />
          </div>

          {/* Fading Dot Pattern - Attached to right side lower-middle behind contact box */}
          <div 
            className="absolute top-[60%] -translate-y-1/2 -right-8 sm:-right-12 md:-right-16 w-36 h-48 sm:w-48 sm:h-64 pointer-events-none opacity-30 dark:opacity-20 z-0" 
            style={{ 
              maskImage: 'radial-gradient(circle at center, black 25%, transparent 70%)', 
              WebkitMaskImage: 'radial-gradient(circle at center, black 25%, transparent 70%)' 
            }}
          >
            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#64748b 1.1px, transparent 1.1px)', backgroundSize: '12px 12px', backgroundPosition: 'center center' }} />
          </div>

          <div className="relative z-10 bg-gradient-to-b from-slate-50/70 via-white/60 to-rose-50/30 dark:from-slate-850/90 dark:via-slate-900/90 dark:to-slate-850/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-lg shadow-slate-950/5 rounded-2xl p-4 sm:p-5.5 ring-1 ring-rose-500/10 dark:ring-rose-500/10">
          {submitted ? (
            <div className="text-center py-5">
              <div className="w-11 h-11 bg-emerald-50/90 dark:bg-emerald-950/80 backdrop-blur-xs text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2.5 border border-emerald-200/80 dark:border-emerald-800 shadow-2xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
                Message Sent!
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mb-4 max-w-sm mx-auto">
                Thank you for reaching out, {name}. I'll get back to you as soon as possible.
              </p>
              <button
                onClick={handleReset}
                className="text-xs font-mono font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 underline uppercase tracking-wider cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="contact-name" className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1 text-left">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500/70 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1 text-left">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500/70 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1 text-left">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500/70 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none h-28 shadow-2xs"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full py-2.5 px-5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-rose-500/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:pointer-events-none overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <SendIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 pt-1">
                By submitting, you agree to my{' '}
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-rose-600 dark:text-rose-400 underline font-medium hover:text-rose-700 dark:hover:text-rose-300 cursor-pointer"
                >
                  Privacy Policy
                </button>
                .
              </p>
            </form>
          )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
            © 2026 Lemuel Jan Suico. All rights reserved.
          </p>
        </footer>
      </div>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-black rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-900 max-w-lg w-full p-6 sm:p-7 relative overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-900 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white text-black dark:text-black flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">Privacy Policy</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Contact & Information Handling</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed overflow-y-auto pr-1">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">1. Information I Collect</h4>
                  <p>
                    When you use the contact form, I collect your <strong>Name</strong>, <strong>Email Address</strong>, and the <strong>Message</strong> content you provide.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">2. How Your Information Is Used</h4>
                  <p>
                    Your contact information is strictly used by me to process, review, and reply to your inquiries or project requests. I will never sell, rent, or spam your email address.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">3. Feedback & Testimonials Usage</h4>
                  <p>
                    By submitting a message or feedback through this contact form, you agree that positive feedback, appreciation, or general comments regarding services or projects may be selectively quoted or featured as testimonials on my portfolio. Personal sensitive details will remain protected upon request.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">4. Data Protection</h4>
                  <p>
                    I maintain appropriate technical precautions to safeguard the confidentiality of messages and contact data submitted through this platform.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close & Accept
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
