import React, { useState, useEffect } from 'react';
import { CheckCircle2, TrendingUp, DollarSign, Globe2, Lock, ArrowRight, ShieldCheck, Users, Crown, Star, Plus, Minus, Reply, X, Copy, Check, Play, Film, CheckIcon } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Countdown from './components/Countdown';
import { VideoModal } from './components/VideoPreview';
import { Testimonial } from './types';
import { translations, getInitialLanguage, Language, TranslationSchema } from './translations';
import { LanguageSelector } from './components/LanguageSelector';

const PAYPAL_CLIENT_ID = "AVxQYNem8VSj-46hc80juvbrt0U9eVfL9RAwFhH8wxlPIcKreVuEjjJZ5FNIN6rhmOTBc6YURTvtGBYq";
const JOIN_LINK = "https://www.paypal.com/ncp/payment/D2SR9M5QZL6RQ";

// --- Legal Content Data ---
const LEGAL_CONTENT = {
  terms: {
    title: "TERMS OF SERVICE",
    content: `
      **1. ACCEPTANCE OF TERMS**
      By accessing and using PLEASURE HEAVEN, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.

      **2. DIGITAL SERVICES & NO REFUND POLICY**
      PLEASURE HEAVEN provides immediate access to digital content, community channels, and exclusive media via Telegram.
      
      **DUE TO THE NATURE OF DIGITAL PRODUCTS, ALL SALES ARE FINAL.**
      
      By purchasing a subscription, you acknowledge and agree that:
      - You are gaining immediate access to proprietary digital content.
      - You explicitly waive your right to a "cooling-off" period or withdrawal once access has been granted.
      - **WE DO NOT OFFER REFUNDS UNDER ANY CIRCUMSTANCES**, regardless of your usage of the service or personal preferences regarding the content.

      **3. SUBSCRIPTION & CANCELLATION**
      - Your subscription allows you access to the content for the duration of the billing period.
      - You may cancel your subscription at any time via the Customer Portal provided after purchase.
      - Cancellation stops future billing. You will retain access until the end of your current billing cycle. No partial refunds are given for unused time.

      **4. PROHIBITED CONDUCT**
      - You may not share, leak, redistribute, or resell any content found within PLEASURE HEAVEN.
      - We reserve the right to terminate your account immediately without refund if you are found violating these rules.
    `
  },
  privacy: {
    title: "PRIVACY POLICY",
    content: `
      **1. DATA COLLECTION**
      We respect your privacy. We only collect the minimum information necessary to provide our services:
      - Email address (for purchase confirmation and access).
      - Payment details (processed securely by PayPal; we do not store your full credit card number).

      **2. TELEGRAM USAGE**
      Our services are delivered via Telegram. Your interaction with the Telegram app is subject to Telegram's own Privacy Policy. We do not have access to your private data on Telegram outside of our specific groups/channels.

      **3. DATA PROTECTION**
      We do not sell, trade, or rent your personal identification information to others. We implement appropriate data collection, storage, and processing practices to protect against unauthorized access.
    `
  },
  support: {
    title: "SUPPORT CENTER",
    content: `
      **NEED ASSISTANCE?**
      We are here to help you with access issues, billing inquiries, or general questions.

      **CONTACT US**
      - **Email:** pleasureheavenn@gmail.com
      - **Telegram:** https://t.me/pleasureheaven7
      - **Twitter (X):** @PleasureHeavenn

      **RESPONSE TIME**
      We aim to respond to all inquiries within 24 hours.

      **COMMON ISSUES**
      - **Didn't receive invite link?** Please check your email spam folder first. If it's not there, email us with your transaction ID.
      - **Canceling subscription?** Use the link provided in your purchase email or your PayPal account to manage your subscription.
    `
  }
};

// --- Custom Components ---

const LegalModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy' | 'support' | null;
}> = ({ isOpen, onClose, type }) => {
  if (!isOpen || !type) return null;

  const data = LEGAL_CONTENT[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-50/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-50 border border-slate-200 rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 p-4 flex justify-between items-center shrink-0">
          <h3 className="font-display text-slate-800 text-xl tracking-wider">{data.title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 transition">
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-8 overflow-y-auto text-slate-500 leading-relaxed whitespace-pre-line text-sm md:text-base">
          {data.content}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex justify-end shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-50 hover:bg-slate-900 text-slate-900 rounded font-bold text-sm transition"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

// 1. Chat Card (Replicates Telegram Dark Mode)
const ChatCard: React.FC<{
  name: string;
  avatarColor: string;
  messages: { text: string; isMe: boolean; time: string; reaction?: string }[];
}> = ({ name, avatarColor, messages }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200 font-sans text-sm break-inside-avoid mb-6">
    {/* Header */}
    <div className="bg-slate-100 p-3 flex items-center gap-3 border-b border-slate-200">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-slate-900 font-bold text-xs bg-[#333]`}>
        {name.substring(0, 2).toUpperCase()}
      </div>
      <div>
        <div className="text-slate-800 font-bold text-sm">{name}</div>
        <div className="text-slate-400 text-xs">last seen recently</div>
      </div>
    </div>
    {/* Messages */}
    <div className="p-4 space-y-3 bg-slate-50">
      {messages.map((msg, idx) => (
        <div key={idx} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
          <div 
            className={`max-w-[85%] rounded-lg p-2.5 relative ${
              msg.isMe 
                ? 'bg-slate-50 text-slate-900 rounded-br-none' 
                : 'bg-slate-200 text-slate-800 rounded-bl-none'
            }`}
          >
            <div className="leading-relaxed whitespace-pre-wrap">{msg.text}</div>
            <div className={`text-[10px] mt-1 flex items-center gap-1 ${msg.isMe ? 'text-[#555] justify-end' : 'text-slate-400 justify-end'}`}>
               {msg.time}
               {msg.isMe && <span>✓✓</span>}
            </div>
            {msg.reaction && (
              <div className="absolute -bottom-2 -right-2 bg-[#333] text-slate-900 rounded-full px-1.5 py-0.5 text-xs border border-[#111]">
                {msg.reaction}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 2. Stat Card (Replicates Profit Dashboard)
const StatCard: React.FC = () => (
  <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-6 break-inside-avoid font-sans">
    <div className="flex justify-between items-center mb-6">
      <div className="text-xs font-bold text-slate-400 tracking-wider">PROFIT: 2024</div>
      <div className="text-[#4ade80] text-xs font-bold flex items-center gap-1">
        <TrendingUp size={14} /> SEE TRENDS
      </div>
    </div>
    <div className="mb-2">
      <div className="text-4xl font-extrabold text-slate-800">$22,408.01</div>
      <div className="text-slate-500 text-sm mt-1">Total profit</div>
    </div>
    <div className="mt-6 space-y-3">
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-500">Income</span>
          <span className="font-bold text-slate-800">$103,251</span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#4ade80] w-[80%]"></div>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-500">Expenses</span>
          <span className="font-bold text-slate-800">$81,263</span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#f87171] w-[60%]"></div>
        </div>
      </div>
    </div>
    <div className="mt-6 pt-4 border-t border-slate-200">
       <div className="flex items-center justify-between text-slate-500 text-sm hover:bg-slate-100 p-2 rounded cursor-pointer transition">
         <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#4ade80]"/> Review 1 transaction</span>
         <ArrowRight size={16} />
       </div>
    </div>
  </div>
);

// 3. Social Proof Image with Shimmer/Skeleton Loader
const SocialProofImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-md border border-slate-200 bg-white group">
      {/* Skeleton / Shimmer Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 bg-slate-100 overflow-hidden rounded-xl min-h-[200px] flex items-center justify-center">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-[#333]/50 to-transparent" />
          <div className="relative z-20 w-6 h-6 border-2 border-slate-300 border-t-[#0a0a0a] rounded-full animate-spin" />
        </div>
      )}

      <img
        src={imgSrc}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (imgSrc.endsWith('.jpg')) {
            setImgSrc(imgSrc.replace('.jpg', '.png'));
          }
        }}
        className={`w-full h-auto rounded-xl transition-all duration-500 ease-out transform group-hover:scale-105 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95 min-h-[200px]'
        }`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

// 4. Masonry Grid Component for Balanced Layout
const MasonryGrid: React.FC<{ items: SocialProofItem[] }> = ({ items }) => {
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1024) setColumns(4);
      else if (window.innerWidth >= 768) setColumns(3);
      else setColumns(2);
    };
    
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const columnWrapper: SocialProofItem[][] = Array.from({ length: columns }, () => []);
  
  items.forEach((item, index) => {
    columnWrapper[index % columns].push(item);
  });

  return (
    <div className="flex gap-4 items-start">
      {columnWrapper.map((colItems, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-4 flex-1 min-w-0">
          {colItems.map((item, idx) => (
            <div key={idx} className="w-full break-inside-avoid">
               {item.type === 'image' && (
                  <SocialProofImage src={item.src} alt={item.alt} />
               )}
               {item.type === 'chat' && <ChatCard name={item.name!} avatarColor={item.avatarColor!} messages={item.messages!} />}
               {item.type === 'stat' && <StatCard />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// --- HOW TO USE YOUR OWN IMAGES ---
type SocialProofItem = 
  | { type: 'image'; src: string; alt: string }
  | { type: 'chat'; name: string; avatarColor: string; messages: { text: string; isMe: boolean; time: string; reaction?: string }[] }
  | { type: 'stat' };

const socialProofItems: SocialProofItem[] = [
  {
    type: 'image',
    src: 'https://i.ibb.co/Mk96q1G5/photo-2026-05-13-02-44-07.jpg',
    alt: 'Member Proof 1'
  },
  {
    type: 'image',
    src: 'https://i.ibb.co/d0Tnzsp6/photo-2026-05-13-02-43-51.jpg',
    alt: 'Member Proof 2'
  },
  {
    type: 'image',
    src: 'https://i.ibb.co/xSx6pQqR/photo-2026-05-13-02-43-54.jpg',
    alt: 'Member Proof 3'
  },
  {
    type: 'image',
    src: 'https://i.ibb.co/7xSzXcZk/photo-2026-05-13-02-43-59.jpg',
    alt: 'Member Proof 4'
  },
  {
    type: 'image',
    src: 'https://i.ibb.co/Kc6zXhnm/photo-2026-05-13-02-44-08.jpg',
    alt: 'Member Proof 5'
  },
  {
    type: 'image',
    src: 'https://i.ibb.co/4g51XCkB/photo-2026-05-13-02-44-03.jpg',
    alt: 'Member Proof 6'
  },
  {
    type: 'image',
    src: 'https://i.ibb.co/hx90kgxv/photo-2026-05-13-02-44-00.jpg',
    alt: 'Member Proof 7'
  },
  {
    type: 'image',
    src: 'https://i.ibb.co/FkwjC03G/photo-2026-05-13-02-44-04.jpg',
    alt: 'Member Proof 8'
  },
  {
    type: 'image',
    src: 'https://i.ibb.co/FkBFnGFh/photo-2026-05-13-02-44-02.jpg',
    alt: 'Member Proof 9'
  },
  {
    type: 'image',
    src: 'https://i.ibb.co/rGynTn0h/photo-2026-05-13-02-43-56.jpg',
    alt: 'Member Proof 10'
  },
  {
    type: 'image',
    src: 'https://i.ibb.co/fY34NWG5/photo-2026-05-13-02-43-57.jpg',
    alt: 'Member Proof 11'
  },
  {
    type: 'image',
    src: 'https://i.ibb.co/3YRRm7BR/photo-2026-05-13-02-44-06.jpg',
    alt: 'Member Proof 12'
  }
];

// Top Promo Bar Component
const PromoBar: React.FC<{ onJoinClick: () => void; t: TranslationSchema['promo'] }> = ({ onJoinClick, t }) => {
  const STORAGE_KEY = 'ph_promo_expiry';
  const DEFAULT_DURATION = 2 * 3600 + 12 * 60; // 2 hours 12 minutes

  const [timeLeft, setTimeLeft] = useState<number>(() => {
    if (typeof window === 'undefined') return DEFAULT_DURATION;
    const now = Date.now();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const target = parseInt(stored, 10);
      if (!isNaN(target) && target > now) {
        return Math.floor((target - now) / 1000);
      }
    }
    const newTarget = now + DEFAULT_DURATION * 1000;
    localStorage.setItem(STORAGE_KEY, newTarget.toString());
    return DEFAULT_DURATION;
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const stored = localStorage.getItem(STORAGE_KEY);
      let target = stored ? parseInt(stored, 10) : 0;
      if (isNaN(target) || target <= now) {
        target = now + DEFAULT_DURATION * 1000;
        localStorage.setItem(STORAGE_KEY, target.toString());
      }
      setTimeLeft(Math.max(0, Math.floor((target - now) / 1000)));
    };

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="absolute top-0 left-0 w-full h-10 bg-slate-50 z-50 flex items-center justify-center text-slate-800 text-xs md:text-sm font-bold tracking-wide shadow-sm border-b border-slate-200 px-3">
      <span className="relative flex h-2 w-2 mr-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
      </span>
      <span className="bg-slate-50 text-slate-900 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded tracking-wider mr-2 uppercase shadow-2xs">
        {t.discountBadge}
      </span>
      <span className="uppercase font-bold tracking-wider text-[11px] md:text-xs text-slate-500">{t.expiresIn}</span> 
      <span className="mx-2 font-mono border border-slate-200 px-2.5 py-0.5 rounded text-xs tracking-wider text-slate-800 font-semibold">
        {formatTime(timeLeft)}
      </span>
      <button 
        onClick={onJoinClick} 
        className="inline-flex items-center gap-1 text-[11px] md:text-xs font-bold tracking-wider uppercase text-slate-900 hover:text-slate-500 transition-all ml-1 active:scale-95 cursor-pointer"
      >
        <span>{t.joinNow}</span>
        <ArrowRight size={12} className="stroke-[2]" />
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => getInitialLanguage());
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | 'support' | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('ph_user_lang', newLang);
  };

  const t = translations[lang] || translations.en;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <PayPalScriptProvider options={{ 
      "client-id": PAYPAL_CLIENT_ID, 
      currency: "USD", 
      intent: "capture", 
      components: "buttons,applepay,googlepay" 
    }}>
    <div className="relative min-h-screen bg-neutral-50/40 text-neutral-900 selection:bg-black selection:text-white">
      {/* Top Header Navbar - In-flow so it does not follow when scrolling down */}
      <nav className="relative w-full z-40 bg-white/95 border-b border-neutral-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3.5 sm:py-4 flex justify-between items-center gap-3">
          <div className="flex items-center gap-2 shrink-0">
             <span className="text-xl sm:text-2xl md:text-3xl text-black font-display tracking-tight font-black uppercase whitespace-nowrap">
               PLEASURE HEAVEN
             </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageSelector currentLanguage={lang} onLanguageChange={handleLanguageChange} />
            <a 
              href="https://t.me/pleasureheaven7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-black transition-colors p-1"
              aria-label="Telegram"
            >
              <TelegramIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </a>
            <a 
              href="https://x.com/MistikTapinak" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-black transition-colors p-1"
              aria-label="X (Twitter)"
            >
              <XIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative w-full min-h-[90vh] md:min-h-[92vh] flex flex-col justify-end overflow-hidden pt-12 sm:pt-16 pb-12 md:pb-16 px-4 md:px-12 text-center md:text-left z-10">
        
        {/* Top Image Layer - Full-Bleed Large Hero Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-[center_top] md:bg-[center_20%] bg-no-repeat opacity-60 md:opacity-70 transition-opacity"
            style={{
              backgroundImage: "url('https://i.ibb.co/mF00RdKF/g-rsel-2026-09-05-030342129.png')"
            }}
          />
          {/* Seamless fade to background at the bottom edge */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-neutral-50/40 to-neutral-50/15" />
        </div>

        {/* Clean Natural Flow without Big Opaque White Card */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center md:items-start mt-auto">
          
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] leading-[0.98] mb-4 md:mb-6 text-black font-black tracking-tighter uppercase max-w-4xl drop-shadow-sm">
            WANT ONLYFANS? <br className="hidden sm:block" />
            <span className="text-neutral-500">DON'T OVERPAY.</span>
          </h1>

          <p className="text-neutral-800 font-semibold text-base sm:text-xl md:text-2xl mb-8 max-w-2xl leading-snug tracking-tight">
            Join our <strong className="text-black font-black">VIP GROUP</strong>. Access 10K+ exclusive leaks that you never find online.
          </p>
          
          {/* Semi-transparent Glassmorphic Badges - Compact & Equal Width */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3 mb-10 w-full text-black font-bold text-sm">
            <span className="flex items-center justify-center gap-2 bg-white/50 hover:bg-white/70 backdrop-blur-xl border border-white/80 px-4 py-2.5 rounded-full shadow-lg shadow-black/5 transition-all w-[215px] sm:w-[220px] whitespace-nowrap">
              <CheckIcon className="w-4.5 h-4.5 text-emerald-600 shrink-0" strokeWidth={3} />
              <span>Request Any Model</span>
            </span>
            <span className="flex items-center justify-center gap-2 bg-white/50 hover:bg-white/70 backdrop-blur-xl border border-white/80 px-4 py-2.5 rounded-full shadow-lg shadow-black/5 transition-all w-[215px] sm:w-[220px] whitespace-nowrap">
              <CheckIcon className="w-4.5 h-4.5 text-emerald-600 shrink-0" strokeWidth={3} />
              <span>$3,000/mo Value</span>
            </span>
            <span className="flex items-center justify-center gap-2 bg-white/50 hover:bg-white/70 backdrop-blur-xl border border-white/80 px-4 py-2.5 rounded-full shadow-lg shadow-black/5 transition-all w-[215px] sm:w-[220px] whitespace-nowrap">
              <CheckIcon className="w-4.5 h-4.5 text-emerald-600 shrink-0" strokeWidth={3} />
              <span>24/7 VIP Support</span>
            </span>
          </div>

          {/* CTA Buttons - Brutalist Nike Style with Glass Accents */}
          <div className="w-full flex flex-col items-center md:items-start">
            <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-2xl justify-center md:justify-start">
              <button 
                onClick={() => window.open(JOIN_LINK, '_blank')}
                className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 font-display font-black text-base sm:text-lg px-8 sm:px-12 py-4 rounded-full transition-all flex items-center justify-center gap-3 uppercase tracking-wider group active:scale-95 cursor-pointer text-center shadow-2xl shadow-red-600/30"
              >
                <span>{t.hero.ctaLifetime}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform shrink-0" />
              </button>
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full sm:w-auto bg-white/60 hover:bg-white/90 text-neutral-500 hover:text-neutral-800 font-display font-bold text-base sm:text-lg px-6 sm:px-8 py-4 rounded-full transition-all flex items-center justify-center gap-3 uppercase tracking-wider border border-neutral-300/80 hover:border-neutral-500 backdrop-blur-xl cursor-pointer active:scale-95 group text-center shadow-md shadow-black/5"
              >
                <Play size={18} className="fill-current text-neutral-500 group-hover:text-neutral-800 group-hover:scale-110 transition-transform shrink-0" />
                <span>{t.hero.ctaPreview}</span>
              </button>
            </div>

            {/* Seamless Native Embedded Trustpilot Widget */}
            <div className="mt-5 sm:mt-6 flex items-center justify-center md:justify-start w-full max-w-2xl">
              <div className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 py-2.5 px-5 sm:px-6 rounded-2xl bg-white/70 hover:bg-white/90 backdrop-blur-xl border border-white/80 shadow-md shadow-black/5 transition-all select-none">
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-sm sm:text-base text-neutral-950 tracking-tight">
                    Excellent
                  </span>
                  {/* 5 Signature Green Trustpilot Star Boxes */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div key={star} className="w-5 h-5 sm:w-6 sm:h-6 bg-[#00B67A] flex items-center justify-center rounded-[3px] shadow-2xs">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" aria-hidden="true">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-4 w-px bg-neutral-300/80 hidden sm:block" />

                {/* Trustpilot Brand & Star */}
                <div className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#00B67A]" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span className="font-display font-black text-sm sm:text-base tracking-tight text-neutral-950">
                    Trustpilot
                  </span>
                </div>
              </div>
            </div>

            {/* Telegram Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full justify-center md:justify-start">
              <a
                href="https://t.me/pleasureheaven7"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[#2AABEE]/90 hover:bg-[#2AABEE] text-white font-black rounded-full transition-all active:scale-95 text-sm uppercase tracking-wider cursor-pointer shadow-lg shadow-[#2AABEE]/25 backdrop-blur-md border border-white/30"
              >
                <TelegramIcon className="w-5 h-5 fill-current shrink-0 text-white" />
                <span>Chat with us on Telegram</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Trusted By Many / Social Proof */}
      <section className="relative z-10 py-16 md:py-24 bg-white/70 backdrop-blur-md border-y border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-center text-3xl md:text-5xl mb-12 md:mb-16 text-black font-black uppercase tracking-tight">
            {t.socialProof.title}<span className="text-neutral-400"> {t.socialProof.titleHighlight}</span>
          </h2>
          
          <MasonryGrid items={socialProofItems} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-16 md:py-24 bg-neutral-50/50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-center text-3xl md:text-5xl mb-8 md:mb-12 text-black font-black uppercase tracking-tight">
            {t.faq.title}<span className="text-neutral-400"> {t.faq.titleHighlight}</span>
          </h2>
          <div className="space-y-4">
            {t.faq.items.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="relative z-10 py-16 md:py-24 bg-white/80 backdrop-blur-md border-t border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-center text-3xl md:text-5xl mb-8 md:mb-12 text-black font-black uppercase tracking-tight">
            {t.whoWeAre.title}<span className="text-neutral-400"> {t.whoWeAre.titleHighlight}</span>
          </h2>
          <div className="bg-white/85 backdrop-blur-xl border border-white/90 p-8 md:p-12 rounded-3xl shadow-xl shadow-black/5 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 border border-neutral-200">
              <Crown className="text-black" size={40} />
            </div>
            <div className="space-y-4 text-center md:text-left rtl:md:text-right">
              <p className="text-neutral-600 leading-relaxed text-lg font-semibold">
                {t.whoWeAre.p1}
              </p>
              <p className="text-neutral-600 leading-relaxed text-lg font-semibold">
                {t.whoWeAre.p2}
              </p>
              <p className="text-black leading-relaxed font-black text-lg uppercase tracking-wider">
                {t.whoWeAre.p3}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Choice Section */}
      <section className="relative z-10 py-16 md:py-24 bg-neutral-50/50 border-t border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-5xl mb-8 md:mb-12 text-black font-black uppercase tracking-tight">
            {t.choice.title}<span className="text-neutral-400"> {t.choice.titleHighlight}</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Blue Pill (OnlyFans) */}
            <div className="p-8 rounded-3xl bg-white/70 backdrop-blur-md border border-neutral-200 hover:border-neutral-300 transition-all group shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 bg-neutral-100 border border-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xs">
                  <span className="font-display font-black text-3xl tracking-tighter text-[#00AFF0]">OF</span>
                </div>
                <h3 className="font-display font-black text-2xl mb-4 text-neutral-800 uppercase tracking-tight">{t.choice.ofTitle}</h3>
                <ul className="text-left rtl:text-right text-neutral-600 space-y-3 mb-8 font-medium">
                  {t.choice.ofItems.map((item, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start">
                      <X size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

             {/* Red Pill (Pleasure Heaven) - Nike signature style */}
             <div className="relative p-8 rounded-3xl bg-white/90 backdrop-blur-xl border-2 border-black shadow-2xl shadow-black/10 hover:shadow-black/15 transition-all group overflow-hidden flex flex-col justify-between">
              <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 bg-black text-white text-[10px] font-black uppercase px-3.5 py-1 rounded-full tracking-wider shadow-sm">
                {t.choice.vipBadge}
              </div>
              <div>
                <div className="w-16 h-16 bg-neutral-100 border border-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xs">
                  <Crown className="text-black" size={32} />
                </div>
                <h3 className="font-display font-black text-2xl mb-4 text-black uppercase tracking-tight">{t.choice.phTitle}</h3>
                <ul className="text-left rtl:text-right text-black space-y-3 mb-8 font-bold">
                  {t.choice.phItems.map((item, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start">
                      <CheckCircle2 className="text-black w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <button 
                  onClick={() => window.open(JOIN_LINK, '_blank')}
                  className="block w-full text-center bg-black text-white hover:bg-neutral-800 font-black py-4 uppercase tracking-wider transition-all shadow-lg rounded-full cursor-pointer active:scale-95 text-base"
                >
                  {t.choice.enterButton}
                </button>
                <div className="mt-4 w-full bg-neutral-100/90 backdrop-blur-md border border-neutral-200/80 rounded-full p-2.5 sm:p-3 shadow-xs flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 relative overflow-hidden text-left rtl:text-right">
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-neutral-700 font-bold text-[10px] sm:text-xs uppercase tracking-wide whitespace-nowrap">{t.hero.offerExpiresIn}</span>
                  </div>
                  <Countdown compact />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-16 md:py-24 bg-white/80 backdrop-blur-md overflow-hidden border-t border-neutral-200/80">
        <div className="relative max-w-lg mx-auto px-4 text-center">
          <div className="bg-white/85 backdrop-blur-xl border border-white/90 p-8 md:p-12 rounded-3xl shadow-xl shadow-black/5">
            <h3 className="font-display font-black text-2xl text-black mb-6 uppercase tracking-tight">{t.contact.title}</h3>
            <div className="text-center space-y-4 text-neutral-600 font-semibold text-base sm:text-lg">
              <p>+1 (213) 986-8699</p>
              <p>{t.contact.ukPhone}</p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm sm:text-base">
                <span className="text-neutral-400 font-bold">{t.contact.emailLabel}</span>
                <button
                  onClick={() => handleCopyEmail('pleasureheavenn@gmail.com')}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-black rounded-full border border-neutral-200 transition-all cursor-pointer font-bold text-xs sm:text-sm group active:scale-95 max-w-full overflow-hidden"
                  title={t.contact.copyTitle}
                >
                  <span className="truncate">pleasureheavenn@gmail.com</span>
                  {emailCopied ? (
                    <span className="flex items-center text-xs text-emerald-600 font-bold gap-1 bg-white px-2 py-0.5 rounded-full border border-emerald-300 shrink-0">
                      <Check size={14} /> {t.contact.copied}
                    </span>
                  ) : (
                    <Copy size={15} className="text-neutral-500 group-hover:scale-110 transition-transform shrink-0" />
                  )}
                </button>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex flex-col items-center gap-2">
                <a
                  href="https://t.me/pleasureheaven7"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-black font-black rounded-full shadow-md transition-all active:scale-95 text-sm sm:text-base tracking-wide uppercase"
                >
                  <TelegramIcon className="w-5 h-5 fill-current shrink-0" />
                  <span>{t.contact.messageTelegram}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white/70 backdrop-blur-md border-t border-neutral-200 py-12 text-center text-neutral-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <Crown className="text-neutral-400 mb-4" size={36} />
          <p className="mb-4 font-semibold text-neutral-600">&copy; {new Date().getFullYear()} {t.footer.rightsReserved}</p>
          <div className="flex gap-6 font-bold">
            <button onClick={() => setActiveModal('terms')} className="hover:text-black transition cursor-pointer">{t.footer.terms}</button>
            <button onClick={() => setActiveModal('privacy')} className="hover:text-black transition cursor-pointer">{t.footer.privacy}</button>
            <button onClick={() => setActiveModal('support')} className="hover:text-black transition cursor-pointer">{t.footer.support}</button>
          </div>
        </div>
      </footer>

      {/* Sticky Floating Bottom Conversion Bar */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-40 p-2.5 sm:p-3 md:p-4 bg-white/85 backdrop-blur-2xl border-t border-white/80 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out transform ${
          showStickyCTA ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2.5 sm:gap-4">
          <div className="hidden sm:flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center border border-neutral-200 shrink-0">
              <Crown size={20} className="text-black" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display text-black font-black text-base md:text-lg whitespace-nowrap uppercase tracking-tight">{t.stickyCta.brandTitle}</span>
                <span className="bg-neutral-100 text-neutral-700 text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full border border-neutral-200 whitespace-nowrap">
                  {t.stickyCta.lifetimeAccess}
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-semibold truncate">{t.stickyCta.tagline}</p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 w-full sm:w-auto">
            <div className="sm:hidden flex flex-col min-w-0 pr-2 rtl:pr-0 rtl:pl-2">
              <span className="text-[11px] text-black font-black uppercase tracking-wider truncate">{t.stickyCta.limitedOffer}</span>
              <span className="text-[11px] text-neutral-500 font-semibold truncate">{t.stickyCta.subTagline}</span>
            </div>
            <button
              onClick={() => window.open(JOIN_LINK, '_blank')}
              className="bg-black text-white hover:bg-neutral-800 shadow-xl font-display font-black text-sm sm:text-base px-5 sm:px-8 py-3 rounded-full transition-all flex items-center gap-2 whitespace-nowrap active:scale-95 cursor-pointer shrink-0 uppercase tracking-wider"
            >
              <span>{t.stickyCta.joinButton}</span>
              <ArrowRight size={16} className="rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Video Preview Modal */}
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        videoUrl="https://files.catbox.moe/ust2lm.mp4" 
      />

      {/* Legal Modal */}
      <LegalModal 
        isOpen={!!activeModal} 
        onClose={() => setActiveModal(null)} 
        type={activeModal} 
      />

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-50/80 backdrop-blur-sm">
          <div className="bg-slate-50 border border-slate-200 rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 transition-colors z-10 cursor-pointer"
            >
              <X size={24} />
            </button>
            
            <div className="p-8 text-center border-b border-slate-200 bg-white">
              <Crown className="text-slate-800 mx-auto mb-4" size={40} />
              <h2 className="font-display font-semibold text-2xl text-slate-900 mb-2">{t.paymentModal.title}</h2>
              <p className="text-slate-500 text-sm">{t.paymentModal.subtitle}</p>
            </div>
            
            <div className="p-8 bg-slate-50">
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#4ade80]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="text-[#4ade80]" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{t.paymentModal.successTitle}</h3>
                  <p className="text-slate-500 mb-6">{t.paymentModal.successDesc}</p>
                  <p className="text-sm text-slate-400 animate-pulse">{t.paymentModal.redirecting}</p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-slate-900 font-semibold">{t.paymentModal.membershipTitle}</span>
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-50 text-slate-900 text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                          {t.paymentModal.specialOffer}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 text-left">
                      {t.paymentModal.lifetimeNotice}
                    </p>
                  </div>

                  {/* Privacy Guard Notice */}
                  <div className="mb-5 p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 text-left shadow-xs">
                    <ShieldCheck size={20} className="text-slate-800 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-semibold text-slate-900 block mb-0.5 tracking-wide">{t.paymentModal.discreetBillingTitle}</span>
                      <p className="text-slate-500 leading-relaxed font-semibold">
                        {t.paymentModal.discreetBillingDesc}
                      </p>
                    </div>
                  </div>

                  {paymentError && (
                    <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded text-red-400 text-sm">
                      {paymentError}
                    </div>
                  )}

                  {isProcessing ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="w-8 h-8 border-4 border-slate-200 border-t-[#0a0a0a] rounded-full animate-spin mb-4"></div>
                      <p className="text-slate-500 font-semibold">{t.paymentModal.processing}</p>
                    </div>
                  ) : (
                    <PayPalButtons 
                      style={{ layout: "vertical", shape: "rect", color: "gold" }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          intent: "CAPTURE",
                          purchase_units: [
                            {
                              description: "Pleasure Heaven Lifetime VIP Membership",
                              amount: {
                                currency_code: "USD",
                                value: "19.99"
                              }
                            }
                          ]
                        });
                      }}
                      onApprove={async (data, actions) => {
                        if (actions.order) {
                          setIsProcessing(true);
                          setPaymentError(null);
                          try {
                            const details = await actions.order.capture();
                            console.log("Transaction completed by " + details.payer.name.given_name, details);
                            setIsProcessing(false);
                            setIsSuccess(true);
                            setTimeout(() => {
                              window.location.href = "https://t.me/+tfa6ux05WnAwYjQ8";
                            }, 2500);
                          } catch (error) {
                            setIsProcessing(false);
                            setPaymentError("An error occurred during payment capture. Please try again.");
                          }
                        }
                      }}
                      onError={(err) => {
                        console.error("PayPal Checkout onError", err);
                        setPaymentError("An error occurred during payment. Please try again.");
                      }}
                    />
                  )}
                  
                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <Lock size={12} />
                    <span>{t.paymentModal.securePayment}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </PayPalScriptProvider>
  );
};

const FAQItem: React.FC<{question: string, answer: string}> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
      <div className={`border rounded-2xl bg-white/80 backdrop-blur-md overflow-hidden transition-all duration-200 ${isOpen ? 'border-black shadow-md' : 'border-neutral-200/80 hover:border-neutral-300 shadow-xs'}`}>
          <button 
              onClick={() => setIsOpen(!isOpen)}
              className="w-full p-5 md:p-6 text-left rtl:text-right flex justify-between items-center hover:bg-neutral-50/60 transition-colors"
          >
              <span className="font-display font-black text-base md:text-lg text-black uppercase tracking-tight">{question}</span>
              {isOpen ? <Minus className="text-black shrink-0" /> : <Plus className="text-neutral-400 shrink-0" />}
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
               <div className="p-5 md:p-6 pt-0 text-neutral-600 font-medium leading-relaxed whitespace-pre-line border-t border-neutral-100 bg-neutral-50/40">
                  {answer}
               </div>
          </div>
      </div>
  );
};

// Helper for X icon
const XCircle: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
);

const TelegramIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const XIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

export default App;