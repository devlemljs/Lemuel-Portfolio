import { useState } from 'react';
import { LayoutGrid, List, ArrowRight } from 'lucide-react';

const imgFutureCreators = '/images/future_creators_notext_1786899127553.jpg';
const imgYcDream = '/images/yc_dream_dots_1786892209656.jpg';
const imgFinance = '/images/finance_dots_1786892225295.jpg';
const imgBalanceTech = '/images/balance_tech_dots_1786892239100.jpg';
const imgFlingsIt = '/images/flings_it_dots_1786892252441.jpg';
const imgStartupKdrama = '/images/startup_kdrama_dots_1786892268998.jpg';
const imgTechBridge = '/images/tech_bridge_dots_1786892281995.jpg';
const imgAiWeapon = '/images/ai_weapon_dots_1786892294655.jpg';
const imgNatureWalk = '/images/solitary_walk_dots_1786892576302.jpg';
const imgCoffeeCup = '/images/coffee_pour_dots_1786892561695.jpg';
const imgInfiniteLearn = '/images/infinite_learn_dots_1786892988758.jpg';
const imgHelloWorld = '/images/hello_world_dots_1786892351630.jpg';

export interface PostItem {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
}

export const POSTS: PostItem[] = [
  {
    id: 1,
    category: "Professional",
    title: "The Future Belongs to the Ones Who Create",
    excerpt: "In a world saturated with consumers and passive observers, real leverage belongs to those who pick up the tools and build.",
    content: "We live in an era where consuming is effortless. Every feed is optimized to keep us scrolling, reacting, and admiring from the sidelines. But the true inflection points in history—and in our personal trajectories—have always been driven by the builders: the ones who transform abstract ideas into tangible software, tools, and experiences that touch people's lives.\n\nCreating is inherently vulnerable. When you build something, you risk indifference, criticism, and failure. Yet that exact friction is what builds enduring resilience and capability. The tools available today give single individuals the leverage that entire organizations used to require. The future doesn't belong to those who wait for permission or predict trends from afar; it belongs to the ones who wake up every day and choose to create.",
    date: "August 20, 2026",
    readTime: "4 min read",
    tags: ["Professional", "Creation", "Innovation"],
    image: imgFutureCreators
  },
  {
    id: 2,
    category: "Personal",
    title: "Y Combinator, You Are the Dream",
    excerpt: "What happens when you watch too much startup content and start daydreaming about a world you have no real plan to enter but cannot stop imagining.",
    content: "I have consumed enough startup content, founder interviews, and late night YouTube rabbit holes about YC to the point where it stopped feeling like research and started feeling like a parasocial relationship with a world I will probably never be part of. Somewhere between watching another \"day in my life as a YC founder\" video and reading through batch announcements of companies I now use every day, I started daydreaming about what it would feel like to just exist in that world. The energy, the obsession, the rooms full of people building things that did not exist yesterday.\n\nIt is just a daydream and I know that. I am not writing a business plan or drafting an application, I am just a person who watches too much startup content and occasionally stares at the ceiling imagining a life that feels cinematic and far away. There is something weirdly comforting about dreaming of a place like that even with no real plan to get there. Like a movie you love knowing you will never live it, but it still makes you feel something.",
    date: "July 12, 2026",
    readTime: "4 min read",
    tags: ["Personal", "Startups", "Daydreaming"],
    image: imgYcDream
  },
  {
    id: 3,
    category: "Professional",
    title: "Diving Deep into Entrepreneurial Finance",
    excerpt: "Exploring the complex world of the financial industry, investment strategies, and the economics of venture capital through the lens of equity.",
    content: "My current studies have taken a deep dive into the fascinating world of Entrepreneurial Finance. This field is a powerful combination of financial industry insights, investment dynamics, and the intricacies of venture investing.\n\nI am exploring the specific mindset of a venture capitalist, delving into the underlying economics and the critical role of equity in long-term value creation. By mastering these concepts, I am equipping myself with a deep understanding of how capital flows within the industry, ensuring that projects are backed by solid financial foundations and strategic investment frameworks.",
    date: "June 08, 2026",
    readTime: "4 min read",
    tags: ["Professional", "Finance", "Venture Capital"],
    image: imgFinance
  },
  {
    id: 4,
    category: "Professional",
    title: "How I Stay Inspired: Balancing Tech Passion and Business Studies",
    excerpt: "Staying curious and inspired by merging entrepreneurship stories with experimental small-scale tech projects.",
    content: "Maintaining a balance between my passion for technology and my business studies requires a constant stream of inspiration. I stay curious by actively watching and reading stories from successful entrepreneurs who have navigated similar paths.\n\nBrainstorming and experimenting with small projects allows me to apply what I learn in real-time, keeping the learning process exciting. By blending theoretical business concepts with practical technical implementation, I ensure that my skills remain sharp and relevant. This continuous cycle of discovery and creation is what fuels my drive to innovate and build meaningful digital solutions.",
    date: "May 02, 2026",
    readTime: "4 min read",
    tags: ["Professional", "Tech", "Business"],
    image: imgBalanceTech
  },
  {
    id: 5,
    category: "Personal",
    title: "\"Then He Flings It\": Jin's Words That Changed How I Think",
    excerpt: "How a single unbothered quote from BTS's Jin became my personal philosophy for dealing with uncertainty and overthinking.",
    content: "There's a moment from BTS's In the Soop where Jin watches someone handle a pajeon and casually says, \"What if he flings it? Then he flings it.\" I stumbled across it on a late night scroll and laughed, then couldn't stop thinking about it. Seven words that somehow summed up everything I've been struggling to practice: letting go of outcomes I was never in control of in the first place.\n\nI used to spend so much energy dreading the what ifs that I forgot to actually live the what is. Jin's words hit differently because they weren't advice, they were just him, completely unbothered, choosing peace over panic. And that's the version of myself I'm working toward. Not careless, not reckless, just someone who does their best, releases the rest, and trusts that whatever gets flung, they'll handle it.",
    date: "March 26, 2026",
    readTime: "4 min read",
    tags: ["Personal", "Philosophy", "Mindset"],
    image: imgFlingsIt
  },
  {
    id: 6,
    category: "Personal",
    title: "How \"Start-Up\" K-Drama Sparked My Passion for Tech and Business",
    excerpt: "Reflecting on the K-drama that changed my career path and inspired me to dive into the world of coding and entrepreneurship.",
    content: "Watching the K-drama \"Start-Up\" was a definitive turning point that reshaped my entire career perspective. The story of young entrepreneurs in Sandbox navigating the challenges of building a tech company resonated deeply with my own ambitions.\n\nIt wasn't just about the romance, as it highlighted the grit and innovation required to change lives through code. This show inspired me to teach myself programming and view business as a platform for solving real-world problems. Seeing characters tackle obstacles with determination gave me the courage to pursue my dual passion for technology and entrepreneurship.",
    date: "February 18, 2026",
    readTime: "4 min read",
    tags: ["Personal", "Inspiration", "Career"],
    image: imgStartupKdrama
  },
  {
    id: 7,
    category: "Professional",
    title: "Bridging the Gap: Tech and Business as an Entrepreneurship Learner",
    excerpt: "Exploring the intersection of technology and business through the lens of an entrepreneurship enthusiast.",
    content: "As an entrepreneurship learner, I have realized that technology serves as the ultimate leverage in the modern business landscape. Understanding market trends is crucial, but being able to build the tools that execute those strategies is a total game-changer.\n\nMy academic background in entrepreneurship perfectly complements my technical skills in web development and data analysis. I believe the future belongs to those who can speak the languages of both the user and the machine. My goal is to use this unique perspective to build products that are commercially viable and user-centric.",
    date: "January 14, 2026",
    readTime: "4 min read",
    tags: ["Professional", "Entrepreneurship", "Business"],
    image: imgTechBridge
  },
  {
    id: 8,
    category: "Professional",
    title: "Leveraging AI: My Secret Weapon for Work and Projects",
    excerpt: "How I integrate AI tools into my daily workflow to enhance productivity in both my professional and personal life.",
    content: "AI has transitioned from a futuristic concept into a practical tool that I integrate into my daily routine. Whether I am brainstorming project ideas or debugging code, these technologies have significantly boosted my overall productivity.\n\nI view these advanced tools not as a replacement for human intelligence, but as a powerful amplifier. By automating repetitive tasks and providing instant information, AI allows me to focus on high-level strategic thinking. This approach ensures that I remain efficient while tackling complex creative problem-solving challenges in my work and school.",
    date: "December 05, 2025",
    readTime: "4 min read",
    tags: ["Professional", "AI", "Productivity"],
    image: imgAiWeapon
  },
  {
    id: 9,
    category: "Personal",
    title: "A Solitary Walk Through Nature as a Form of Meditation",
    excerpt: "How an hour-long walk serves as a mental reset, allowing new ideas to surface and clearing the mind from digital noise.",
    content: "Stepping away from the desk and embarking on an hour-long walk has become one of my most effective meditation practices. It's a deliberate break from the constant stream of notifications and digital demands that define a tech-driven life.\n\nWhile walking, I find that the rhythmic movement helps declutter my thoughts. It is often during these quiet solo treks that my most creative ideas emerge. By refreshing my mind and body in the fresh air, I return to my projects with a perspective that is sharp and rejuvenated. This simple habit of walking is a powerful tool for seeking clarity and maintaining long-term mental focus.",
    date: "November 01, 2025",
    readTime: "3 min read",
    tags: ["Personal", "Mindfulness", "Wellness"],
    image: imgNatureWalk
  },
  {
    id: 10,
    category: "Personal",
    title: "No day feels complete without a good cup of coffee",
    excerpt: "Exploring my deep appreciation for coffee and how it fuels my creativity and daily productivity.",
    content: "For me, coffee is more than just a morning beverage; it is a vital ritual that marks the beginning of my creative process. The aroma of freshly ground beans and the warmth of the first sip provide a sense of comfort and clarity that is essential for a productive day.\n\nWhether I am deep in a coding session or brainstorming new business strategies, a good cup of coffee serves as my constant companion. It is the fuel that keeps my mind sharp and my energy levels high. I truly believe that a day is not complete without the perfect brew to spark inspiration and focus.",
    date: "October 03, 2025",
    readTime: "3 min read",
    tags: ["Personal", "Lifestyle", "Coffee"],
    image: imgCoffeeCup
  },
  {
    id: 11,
    category: "Professional",
    title: "The Infinite Journey: Why I Never Stop Learning",
    excerpt: "Reflections on the importance of staying hungry for knowledge and maintaining a growth mindset in a rapidly evolving world.",
    content: "In the rapidly evolving worlds of technology and business, the only constant factor is continuous change. This reality is why I have adopted a firm philosophy of lifelong learning to stay ahead of the curve.\n\nWhether I am picking up a new programming language or studying market trends, I remain hungry for more knowledge. I believe that a growth mindset is the most valuable asset anyone can possess in today's competitive environment. Every new thing I learn becomes a powerful tool in its belt, ready to be used to build something amazing.",
    date: "September 08, 2025",
    readTime: "4 min read",
    tags: ["Professional", "Growth", "Learning"],
    image: imgInfiniteLearn
  },
  {
    id: 12,
    category: "Personal",
    title: "My Journey: The First Hello World",
    excerpt: "Reflecting on the day I first tried to learn HTML5, CSS3, and JS fundamentals, and the fear of the terminal.",
    content: "It was August 16, 2025, when I officially started my journey into tech. I remember being so intimidated by the terminal and the command line, where every typed character felt like it could break something. My first 'Hello World' appearing on the screen felt like a massive achievement, a small but significant victory that proved I could actually make things happen through code.\n\nI spent countless hours diving into the fundamentals of HTML5, CSS3, and JavaScript, trying to make sense of how the web really works. Even after building my first simple pages, I was still terrified of making my first commit and push to GitHub, fearing that my mistakes would be visible to the world. Little did I know that this mixture of fear and excitement was just the beginning of an incredible adventure in building, creating, and continuous growth.",
    date: "August 16, 2025",
    readTime: "4 min read",
    tags: ["Personal", "Coding", "Beginnings"],
    image: imgHelloWorld
  }
];

export function BlogThumbnailPlaceholder({ id }: { id: number }) {
  return (
    <div className="w-full h-full bg-slate-900 relative flex items-center justify-center overflow-hidden p-4">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#a855f7 1px, transparent 1px)',
          backgroundSize: '8px 8px'
        }}
      />
      <div className="relative z-10 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
        <span className="text-[11px] font-mono text-slate-300 font-medium tracking-wider uppercase">
          Post {id}
        </span>
      </div>
    </div>
  );
}

export function Blog({ onReadArticle, onViewAllArticles }: { onReadArticle: (id: number) => void, onViewAllArticles: () => void }) {
  return (
    <section id="blog" className="pt-16 pb-2 sm:pt-20 sm:pb-4 relative border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0C0C0F] transition-colors duration-300 overflow-hidden">
      {/* Fading Dot Pattern - Half Circle Right Edge (moved down) */}
      <div 
        className="absolute top-12 sm:top-16 right-0 w-32 h-56 sm:w-40 sm:h-72 pointer-events-none opacity-25 dark:opacity-20 z-0" 
        style={{ 
          maskImage: 'radial-gradient(circle at right, black, transparent 70%)', 
          WebkitMaskImage: 'radial-gradient(circle at right, black, transparent 70%)' 
        }}
      >
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#64748b 1.1px, transparent 1.1px)', backgroundSize: '12px 12px', backgroundPosition: 'right center' }} />
      </div>

      {/* Fading Dot Pattern - Left Edge Lower-Middle Cut Circle */}
      <div 
        className="absolute top-[55%] -translate-y-1/2 left-0 w-36 h-60 sm:w-44 sm:h-72 pointer-events-none opacity-25 dark:opacity-20 z-0" 
        style={{ 
          maskImage: 'radial-gradient(circle at left, black 15%, transparent 70%)', 
          WebkitMaskImage: 'radial-gradient(circle at left, black 15%, transparent 70%)' 
        }}
      >
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#64748b 1.1px, transparent 1.1px)', backgroundSize: '12px 12px', backgroundPosition: 'left center' }} />
      </div>


      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center">
            Blog
          </h2>
          <button 
            onClick={onViewAllArticles}
            className="text-sm font-bold text-slate-900 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 uppercase tracking-wider transition-colors flex items-center"
          >
            ALL BLOGS <span className="ml-2">→</span>
          </button>
        </div>

        {/* Posts Clean List */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {POSTS.slice(0, 3).map((post) => (
            <article 
              key={post.id} 
              onClick={() => onReadArticle(post.id)}
              className="py-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-8 group cursor-pointer hover:bg-rose-500/[0.03] dark:hover:bg-rose-500/[0.04] transition-colors -mx-4 px-4 sm:-mx-3 sm:px-3 rounded-xl"
            >
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-2xl line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
              <div className="text-xs font-mono text-slate-400 dark:text-slate-500 sm:mt-1 shrink-0">
                {post.date}
              </div>
            </article>
          ))}
        </div>
        
      </div>
    </section>
  );
}
