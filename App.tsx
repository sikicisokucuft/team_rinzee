import React, { useState, useEffect } from 'react';
import { CheckCircle2, TrendingUp, DollarSign, Globe2, Lock, ArrowRight, ShieldCheck, Users, Crown, Star, Plus, Minus, Reply, X, Copy, Check, Play, Film } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import MatrixCanvas from './components/MatrixCanvas';
import Countdown from './components/Countdown';
import { VideoModal } from './components/VideoPreview';
import { Testimonial } from './types';

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
      - **Telegram:** https://t.me/pleheaven
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-blue-600 p-4 flex justify-between items-center shrink-0">
          <h3 className="font-display text-white text-xl tracking-wider">{data.title}</h3>
          <button onClick={onClose} className="text-white/80 hover:text-white transition">
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-8 overflow-y-auto text-slate-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
          {data.content}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded font-bold text-sm transition"
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
  <div className="bg-[#1c242f] rounded-xl overflow-hidden shadow-lg border border-slate-800 font-sans text-sm break-inside-avoid mb-6">
    {/* Header */}
    <div className="bg-[#242f3d] p-3 flex items-center gap-3 border-b border-[#101620]">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${avatarColor}`}>
        {name.substring(0, 2).toUpperCase()}
      </div>
      <div>
        <div className="text-white font-semibold text-sm">{name}</div>
        <div className="text-[#6c7883] text-xs">last seen recently</div>
      </div>
    </div>
    {/* Messages */}
    <div className="p-4 space-y-3 bg-[#0e1621]">
      {messages.map((msg, idx) => (
        <div key={idx} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
          <div 
            className={`max-w-[85%] rounded-lg p-2.5 relative ${
              msg.isMe 
                ? 'bg-[#8774e1] text-white rounded-br-none' 
                : 'bg-[#182533] text-white rounded-bl-none'
            }`}
          >
            <div className="leading-relaxed whitespace-pre-wrap">{msg.text}</div>
            <div className={`text-[10px] mt-1 flex items-center gap-1 ${msg.isMe ? 'text-blue-100 justify-end' : 'text-slate-400 justify-end'}`}>
               {msg.time}
               {msg.isMe && <span>✓✓</span>}
            </div>
            {msg.reaction && (
              <div className="absolute -bottom-2 -right-2 bg-[#2b5278] rounded-full px-1.5 py-0.5 text-xs border border-[#0e1621]">
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
  <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 mb-6 break-inside-avoid font-sans">
    <div className="flex justify-between items-center mb-6">
      <div className="text-xs font-bold text-slate-400 tracking-wider">PROFIT: 2024</div>
      <div className="text-green-600 text-xs font-bold flex items-center gap-1">
        <TrendingUp size={14} /> SEE TRENDS
      </div>
    </div>
    <div className="mb-2">
      <div className="text-4xl font-extrabold text-slate-900">$22,408.01</div>
      <div className="text-slate-500 text-sm mt-1">Total profit</div>
    </div>
    <div className="mt-6 space-y-3">
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-500">Income</span>
          <span className="font-bold text-slate-800">$103,251</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 w-[80%]"></div>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-500">Expenses</span>
          <span className="font-bold text-slate-800">$81,263</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-400 w-[60%]"></div>
        </div>
      </div>
    </div>
    <div className="mt-6 pt-4 border-t border-slate-50">
       <div className="flex items-center justify-between text-slate-600 text-sm hover:bg-slate-50 p-2 rounded cursor-pointer transition">
         <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Review 1 transaction</span>
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
    <div className="relative w-full rounded-xl overflow-hidden shadow-md border border-blue-100/50 bg-blue-50/40 group">
      {/* Skeleton / Shimmer Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 bg-slate-200/70 overflow-hidden rounded-xl min-h-[200px] flex items-center justify-center">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/80 to-transparent" />
          <div className="relative z-20 w-6 h-6 border-2 border-blue-400/40 border-t-blue-600 rounded-full animate-spin" />
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
        loading="eager"
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

const faqs = [
  {
    question: "Do you see my credit card number when I pay?",
    answer: "No. We never see or store your credit card information. All transactions are securely processed through PayPal, ensuring 100% privacy and safety."
  },
  {
    question: "Is this a one-time payment?",
    answer: "Yes! This is a single one-time payment for permanent Lifetime Access. Once joined, you get unlimited access to stream and download all current and future content. You will never be charged again, and there are no hidden subscription fees."
  },
  {
    question: "Where will I watch the videos?",
    answer: "All content is hosted directly on Telegram in private channels. If you don't have Telegram yet, creating a free account takes less than 2 minutes.\n\nYour privacy is completely protected—no one can see what channels you belong to. Telegram also features built-in search so you can easily locate your favorite models.\n\nImmediately after completing your payment, you will receive your instant invite link. If you ever need help, contact us at pleasureheavenn@gmail.com or message us on Telegram at @pleheaven."
  },
  {
    question: "Are the videos long?",
    answer: "Yes! Over 80% of our videos are full-length features. We strictly focus on full video content and avoid uploading short clips unless long-format material is unavailable for a specific creator.\n\nNote: We upload full video media only—no standalone photos or GIFs."
  },
  {
    question: "I couldn't find the models I wanted",
    answer: "We regularly archive content from top 1% creators. If a model you want is not currently in the channel, simply message us on Telegram with your request. Our team will upload their complete video collection within a few days."
  }
];

// Top Promo Bar Component
const PromoBar: React.FC<{ onJoinClick: () => void }> = ({ onJoinClick }) => {
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
    <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 z-50 flex items-center justify-center text-white text-xs md:text-sm font-bold tracking-wide shadow-sm border-b border-blue-400/20 px-3">
      <span className="relative flex h-2 w-2 mr-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
      </span>
      <span className="uppercase font-extrabold tracking-wider text-[11px] md:text-xs">SPECIAL OFFER EXPIRES IN:</span> 
      <span className="mx-2 font-mono bg-white/15 border border-white/25 px-2.5 py-0.5 rounded-full text-xs shadow-inner backdrop-blur-xs tracking-wider text-blue-50 font-bold">
        {formatTime(timeLeft)}
      </span>
      <button 
        onClick={onJoinClick} 
        className="inline-flex items-center gap-1 text-[11px] md:text-xs font-black tracking-wider uppercase bg-white text-blue-700 px-3 py-1 rounded-full hover:bg-blue-50 transition-all shadow-xs ml-1 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span>JOIN NOW</span>
        <ArrowRight size={12} className="stroke-[3]" />
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | 'support' | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

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
    <div className="relative min-h-screen bg-[#f0f7ff] text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <MatrixCanvas />
      
      {/* Absolute Header (disappears on scroll) */}
      <nav className="absolute top-0 w-full z-40 bg-[#f0f7ff]/90 backdrop-blur-md border-b border-blue-100/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <span className="text-2xl md:text-3xl text-blue-600 font-display tracking-wide">PLEASURE HEAVEN</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://t.me/pleheaven" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
              aria-label="Telegram"
            >
              <TelegramIcon className="w-8 h-8" />
            </a>
            <a 
              href="https://x.com/MistikTapinak" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
              aria-label="X (Twitter)"
            >
              <XIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 pt-20 md:pt-24 pb-6 md:pb-10 px-4 text-center overflow-hidden">
        {/* Instant Hero Background Ambient Placeholder */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] md:w-[800px] md:h-[450px] bg-gradient-to-r from-blue-200/40 via-sky-100/30 to-blue-100/30 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto flex flex-col items-center">

          
          <h1 className="font-display text-3xl md:text-6xl leading-tight mb-4 text-slate-900">
            JOIN OUR <span className="brand-text">VIP MEMBERSHIP!</span>
          </h1>
          
          <div className="text-slate-600 text-base md:text-xl max-w-3xl mb-6 leading-relaxed text-left inline-block">
            <ul className="space-y-3 list-disc pl-5 marker:text-blue-500">
              <li>
                Specialized in <span className="font-bold text-slate-900">high-quality JOI videos</span> + thousands of exclusive OnlyFans content
              </li>
              <li>
                Get instant access to over <span className="font-bold text-slate-900">$3,000/month</span> worth of premium videos
              </li>
              <li>
                Watch <span className="font-bold text-slate-900">8,000+ full-length videos</span> from top creators
              </li>
              <li>
                <span className="font-bold text-slate-900">Request any model</span> — we upload within 48 hours
              </li>
              <li>
                <span className="font-bold text-slate-900">One-time payment</span> for <span className="font-bold text-slate-900">Lifetime Access</span>. No recurring fees.
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="w-full max-w-2xl flex flex-col items-center">
            <div className="flex flex-col md:flex-row gap-4 items-center w-full justify-center">
              <button 
                onClick={() => window.open(JOIN_LINK, '_blank')}
                className="w-full md:w-auto brand-bg text-white font-display text-xl px-12 py-4 rounded-xl hover:brightness-110 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.6)] flex items-center justify-center gap-3 group active:scale-98 cursor-pointer"
              >
                <span>GET LIFETIME ACCESS NOW</span>
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white font-display text-xl px-10 py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2.5 border border-slate-700/80 cursor-pointer active:scale-98 group"
              >
                <Play size={20} className="fill-current text-sky-400 group-hover:scale-110 transition-transform" />
                <span>WATCH VIP PREVIEW</span>
              </button>
            </div>

            {/* Privacy Guard Notice */}
            <div className="mt-5 inline-flex items-center gap-2.5 px-4 py-2.5 bg-blue-50/90 border border-blue-200/90 text-slate-800 rounded-full text-xs md:text-sm font-medium shadow-xs backdrop-blur-md">
              <ShieldCheck size={18} className="text-blue-600 shrink-0" />
              <span>
                <strong className="text-blue-950 font-bold">🔒 100% Discreet Billing:</strong> Appears strictly as neutral <strong className="text-blue-700 font-extrabold underline underline-offset-2">FLOW1 LTD</strong> on bank & PayPal statements.
              </span>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-md bg-gradient-to-b from-white via-blue-50/20 to-white border border-blue-200/90 rounded-2xl p-4 md:p-5 shadow-lg shadow-blue-900/5 flex items-center justify-between relative overflow-hidden transition-all hover:border-blue-300/80">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-slate-800 font-extrabold text-[10px] sm:text-xs uppercase tracking-wide whitespace-nowrap">SPECIAL OFFER EXPIRES IN:</span>
                <span className="bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                  <span className="text-slate-400 line-through font-medium text-[9px]">$35</span>
                  <span className="text-emerald-900 font-black">$25</span>
                </span>
              </div>
              <Countdown />
            </div>
          </div>
          
          {/* Social Proof Bar */}
          <div className="mt-8 md:mt-24 flex flex-row flex-nowrap items-center justify-center gap-x-6 md:gap-16 text-slate-500 font-mono text-xs md:text-sm whitespace-nowrap">
            <div className="flex items-center gap-1.5 md:gap-2">
              <Users className="text-blue-500" size={16} />
              <span>3,000+ VIP MEMBERS</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <Star className="text-blue-500" size={16} />
              <span>99% POSITIVE REVIEWS</span>
            </div>
          </div>
        </div>
      </header>



      {/* Trusted By Many / Social Proof - Updated with Masonry Grid */}
      <section className="relative z-10 py-16 md:py-24 bg-[#f0f7ff] border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-center text-3xl md:text-4xl mb-12 md:mb-16 text-slate-900">TRUSTED BY <span className="text-blue-600">THOUSANDS</span></h2>
          
          <MasonryGrid items={socialProofItems} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-center text-3xl md:text-4xl mb-8 md:mb-12 text-slate-900">FREQUENTLY ASKED <span className="brand-text">QUESTIONS</span></h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>



      {/* Who We Are Section */}
      <section className="relative z-10 py-16 md:py-24 bg-white border-t border-blue-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-center text-3xl md:text-4xl mb-8 md:mb-12 text-slate-900">WHO WE <span className="brand-text">ARE</span></h2>
          <div className="bg-gradient-to-br from-white via-blue-50/40 to-sky-50/20 border border-blue-200/90 p-8 md:p-12 rounded-3xl shadow-md flex flex-col md:flex-row gap-8 items-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center flex-shrink-0 border border-blue-200 shadow-sm">
              <Crown className="text-blue-600" size={40} />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <p className="text-slate-700 leading-relaxed text-lg font-medium">
                At Pleasure Heaven, we have been archiving premium digital content since 2023. Our dedicated team collects the highest quality and most exclusive media from hundreds of creators, maintaining a continuously updated, well-organized library. Over the years, our media network has generated millions of views and brought together hundreds of thousands of followers.
              </p>
              <p className="text-slate-700 leading-relaxed text-lg font-medium">
                Our primary mission is to offer a secure, completely private platform with effortless search and navigation—delivering full creator libraries at an unbeatable price.
              </p>
              <p className="text-blue-700 leading-relaxed font-bold text-lg uppercase tracking-wider">
                Today, thousands of active VIP members enjoy exclusive daily updates across our private channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Choice Section */}
      <section className="relative z-10 py-16 md:py-24 bg-white border-t border-blue-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-5xl mb-8 md:mb-12 text-slate-900">CHOOSE YOUR <span className="brand-text">SIDE</span></h2>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Blue Pill (OnlyFans) - Gray/Slate styled */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-slate-300 transition-colors group shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 bg-white border border-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <span className="font-display text-3xl tracking-tighter text-[#00AFF0]">OF</span>
                </div>
                <h3 className="font-display text-2xl mb-4 text-slate-600">ONLYFANS</h3>
                <ul className="text-left text-slate-500 space-y-3 mb-8">
                  <li className="flex gap-2 items-start"><XCircle className="text-red-400 w-5 h-5 flex-shrink-0 mt-0.5" /> <span>Unpredictable pay-per-view fees</span></li>
                  <li className="flex gap-2 items-start"><XCircle className="text-red-400 w-5 h-5 flex-shrink-0 mt-0.5" /> <span>Cluttered & slow interface</span></li>
                  <li className="flex gap-2 items-start"><XCircle className="text-red-400 w-5 h-5 flex-shrink-0 mt-0.5" /> <span>No direct video downloads</span></li>
                  <li className="flex gap-2 items-start"><XCircle className="text-red-400 w-5 h-5 flex-shrink-0 mt-0.5" /> <span>$400+ per month for full access</span></li>
                </ul>
              </div>
            </div>

             {/* Red Pill (Pleasure Heaven) - Blue styled */}
             <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white via-blue-50/70 to-sky-50/40 border-2 border-blue-400 shadow-xl shadow-blue-200/50 hover:border-blue-500 transition-colors group overflow-hidden flex flex-col justify-between">
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-[11px] font-black uppercase px-3 py-1 rounded-full tracking-wider shadow-sm">
                VIP CHOICE
              </div>
              <div>
                <div className="w-16 h-16 bg-white border border-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Crown className="text-blue-600" size={32} />
                </div>
                <h3 className="font-display text-2xl mb-4 text-blue-700">PLEASURE HEAVEN</h3>
                <ul className="text-left text-slate-700 space-y-3 mb-8 font-medium">
                  <li className="flex gap-2 items-start"><CheckCircle2 className="text-blue-600 w-5 h-5 flex-shrink-0 mt-0.5" /> <span>Zero hidden fees or PPVs</span></li>
                  <li className="flex gap-2 items-start"><CheckCircle2 className="text-blue-600 w-5 h-5 flex-shrink-0 mt-0.5" /> <span>Direct video downloads enabled</span></li>
                  <li className="flex gap-2 items-start"><CheckCircle2 className="text-blue-600 w-5 h-5 flex-shrink-0 mt-0.5" /> <span>Exclusive videos not found anywhere else online</span></li>
                  <li className="flex gap-2 items-start"><CheckCircle2 className="text-blue-600 w-5 h-5 flex-shrink-0 mt-0.5" /> <span>Full access to 80+ top creator libraries</span></li>
                  <li className="flex gap-2 items-start"><CheckCircle2 className="text-blue-600 w-5 h-5 flex-shrink-0 mt-0.5" /> <span>Custom model requests fulfilled within 48 hours</span></li>
                </ul>
              </div>
              <div>
                <button 
                  onClick={() => window.open(JOIN_LINK, '_blank')}
                  className="block w-full text-center brand-bg text-white font-bold py-3.5 uppercase tracking-wider hover:brightness-110 transition-all shadow-md rounded-xl cursor-pointer"
                >
                  Enter Pleasure Heaven
                </button>
                <div className="mt-5 w-full bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex items-center justify-between relative overflow-hidden text-left">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700"></div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-slate-800 font-extrabold text-[10px] sm:text-xs uppercase tracking-wide whitespace-nowrap">SPECIAL OFFER EXPIRES IN:</span>
                    <span className="bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                      <span className="text-slate-400 line-through font-medium text-[9px]">$35</span>
                      <span className="text-emerald-900 font-black">$25</span>
                    </span>
                  </div>
                  <Countdown compact />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-16 md:py-24 bg-[#f0f7ff] overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white blur-[120px] rounded-full pointer-events-none opacity-60"></div>
        
        <div className="relative max-w-lg mx-auto px-4 text-center">
          <div className="bg-white/90 backdrop-blur-xl border border-blue-200/80 p-8 md:p-12 rounded-3xl shadow-lg">
            <h3 className="font-display text-2xl text-slate-900 mb-6 tracking-wide">CONTACT US</h3>
            <div className="text-center space-y-4 text-slate-700 font-medium text-base sm:text-lg">
              <p>+1 (213) 986-8699</p>
              <p>For UK: +44 20 4628 1675</p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm sm:text-base">
                <span className="text-slate-500 font-semibold">Email:</span>
                <button
                  onClick={() => handleCopyEmail('pleasureheavenn@gmail.com')}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200/80 transition-all cursor-pointer font-medium text-xs sm:text-sm group active:scale-95 max-w-full overflow-hidden"
                  title="Click to copy email address"
                >
                  <span className="truncate">pleasureheavenn@gmail.com</span>
                  {emailCopied ? (
                    <span className="flex items-center text-xs text-emerald-600 font-semibold gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                      <Check size={14} /> Copied!
                    </span>
                  ) : (
                    <Copy size={15} className="text-blue-500 group-hover:scale-110 transition-transform shrink-0" />
                  )}
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col items-center gap-2">
                <a
                  href="https://t.me/pleheaven"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 text-sm sm:text-base tracking-wide"
                >
                  <TelegramIcon className="w-5 h-5 fill-current shrink-0" />
                  <span>Message Us On Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white border-t border-slate-100 py-12 text-center text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <Crown className="text-blue-500 mb-4" size={40} />
          <p className="mb-4">&copy; {new Date().getFullYear()} PLEASURE HEAVEN. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <button onClick={() => setActiveModal('terms')} className="hover:text-blue-600 transition">Terms of Service</button>
            <button onClick={() => setActiveModal('privacy')} className="hover:text-blue-600 transition">Privacy Policy</button>
            <button onClick={() => setActiveModal('support')} className="hover:text-blue-600 transition">Support</button>
          </div>
        </div>
      </footer>

      {/* Sticky Floating Bottom Conversion Bar */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-40 p-3 md:p-4 bg-white/95 backdrop-blur-xl border-t border-blue-200/80 shadow-[0_-8px_30px_rgba(37,99,235,0.12)] transition-all duration-500 ease-out transform ${
          showStickyCTA ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 flex-shrink-0">
              <Crown size={20} className="text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-slate-900 text-base md:text-lg">PLEASURE HEAVEN VIP</span>
                <span className="bg-blue-100 text-blue-800 text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200/60">
                  LIFETIME ACCESS
                </span>
                <div className="flex items-center gap-1.5 ml-1">
                  <span className="text-xs text-slate-400 line-through font-medium">$35</span>
                  <span className="text-sm md:text-base font-extrabold text-blue-900">$25</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium">8,000+ Videos • Daily Updates • One-Time Payment</p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <div className="sm:hidden flex flex-col">
              <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">LIMITED OFFER</span>
              <span className="text-xs text-slate-600 font-medium">One-Time • Lifetime Access</span>
            </div>
            <button
              onClick={() => window.open(JOIN_LINK, '_blank')}
              className="brand-bg text-white font-display text-base md:text-lg px-6 md:px-8 py-3 rounded-xl hover:brightness-110 transition-all shadow-md flex items-center gap-2 whitespace-nowrap active:scale-95"
            >
              <span>JOIN VIP NOW</span>
              <ArrowRight size={18} />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10"
            >
              <X size={24} />
            </button>
            
            <div className="p-8 text-center border-b border-slate-100">
              <Crown className="text-blue-500 mx-auto mb-4" size={40} />
              <h2 className="font-display text-2xl text-slate-900 mb-2">JOIN PLEASURE HEAVEN</h2>
              <p className="text-slate-500 text-sm">Secure your VIP access today.</p>
            </div>
            
            <div className="p-8 bg-slate-50">
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Payment Successful!</h3>
                  <p className="text-slate-600 mb-6">Welcome to Pleasure Heaven VIP.</p>
                  <p className="text-sm text-slate-500 animate-pulse">Redirecting to Telegram channel...</p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-slate-800 font-semibold">Lifetime VIP Membership</span>
                      <div className="flex items-center gap-2">
                        <span className="line-through text-slate-400 text-xs font-medium">$35.00</span>
                        <span className="text-slate-900 font-extrabold text-xl">$25.00</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 text-left">
                      * Lifetime Access: Enjoy permanent VIP membership with this one-time payment. No recurring fees.
                    </p>
                  </div>

                  {/* Privacy Guard Notice */}
                  <div className="mb-5 p-4 bg-blue-50/90 border border-blue-200/90 rounded-xl flex items-start gap-3 text-left shadow-xs">
                    <ShieldCheck size={20} className="text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold text-blue-950 block mb-0.5 tracking-wide">🔒 100% Discreet Billing (Privacy Guard)</span>
                      <p className="text-slate-700 leading-relaxed font-medium">
                        On your bank or PayPal statement, this transaction will appear strictly as <strong className="text-blue-700 font-bold underline underline-offset-2">FLOW1 LTD</strong> with zero mention of VIP or adult content.
                      </p>
                    </div>
                  </div>

                  {paymentError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded text-red-600 text-sm">
                      {paymentError}
                    </div>
                  )}

                  {isProcessing ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                      <p className="text-slate-600 font-medium">Processing payment...</p>
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
                    <span>Secure encrypted payment</span>
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
      <div className={`border rounded-xl bg-white overflow-hidden transition-all duration-200 ${isOpen ? 'border-blue-300 shadow-md ring-1 ring-blue-200' : 'border-blue-200/80 hover:border-blue-300 shadow-sm'}`}>
          <button 
              onClick={() => setIsOpen(!isOpen)}
              className="w-full p-5 md:p-6 text-left flex justify-between items-center hover:bg-blue-50/40 transition-colors"
          >
              <span className="font-display text-base md:text-lg text-slate-900">{question}</span>
              {isOpen ? <Minus className="text-blue-600 shrink-0" /> : <Plus className="text-blue-600 shrink-0" />}
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
               <div className="p-5 md:p-6 pt-0 text-slate-600 leading-relaxed whitespace-pre-line border-t border-blue-100/60 bg-blue-50/20">
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