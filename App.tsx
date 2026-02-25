import React, { useState, useEffect } from 'react';
import { CheckCircle2, TrendingUp, DollarSign, Globe2, Lock, ArrowRight, ShieldCheck, Users, Crown, Star, Plus, Minus, Reply, X } from 'lucide-react';
import MatrixCanvas from './components/MatrixCanvas';
import ChatWidget from './components/ChatWidget';
import Countdown from './components/Countdown';
import { Testimonial } from './types';

const JOIN_LINK = "https://buy.stripe.com/eVqaEW3Ek4TNeeHg9Nbwk04";

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
      - Payment details (processed securely by Stripe; we do not store your full credit card number).

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
      - **Email:** naxavt@gmail.com
      - **Twitter (X):** @PleasureHeavenn

      **RESPONSE TIME**
      We aim to respond to all inquiries within 24 hours.

      **COMMON ISSUES**
      - **Didn't receive invite link?** Please check your email spam folder first. If it's not there, email us with your transaction ID.
      - **Canceling subscription?** Use the link provided in your purchase email to access the Stripe Customer Portal.
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
        <div className="bg-violet-600 p-4 flex justify-between items-center shrink-0">
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

// --- HOW TO USE YOUR OWN IMAGES ---
type SocialProofItem = 
  | { type: 'image'; src: string; alt: string }
  | { type: 'chat'; name: string; avatarColor: string; messages: { text: string; isMe: boolean; time: string; reaction?: string }[] }
  | { type: 'stat' };

// IMPORTANT: These images are from your public folder (p1.jpg to p12.jpg)
const localImages = Array.from({ length: 12 }, (_, i) => ({
  type: 'image' as const,
  src: `/p${i + 1}.jpg`,
  alt: `Member Proof ${i + 1}`
}));

const socialProofItems: SocialProofItem[] = [
  ...localImages.slice(0, 8),
  {
    type: 'image',
    src: 'https://i.postimg.cc/xjf67J46/gorsel-2026-01-16-174844839.png',
    alt: 'Member Proof Extra'
  },
  ...localImages.slice(8)
];

const faqs = [
  {
    question: "Do you see my credit card number when I pay?",
    answer: "No. We don't see your card informations. Our site is powered by Stripe. So you can just safely pay."
  },
  {
    question: "How can I manage my subscription?",
    answer: "After you pay you will get a customer portal. Where you can cancel your subscription or change your payment details.\n\nIf you can't manage your subscription with customer portal, you can reach to us and we can cancel your subscription manually."
  },
  {
    question: "Where will I watch the videos?",
    answer: "Our videos are hosted on Telegram, a popular messaging and video-sharing app. If you're not already registered, you can sign up in just 2 minutes—for free!\n\nPlus, your privacy is protected: no one can see which groups or channels you're in. And as a bonus, Telegram makes it super easy to search for your models.\n\nAfter you pay directly you will see the invite link. If you don't see the invite link contact with us: naxavt@gmail.com or send a message to Our Twitter Account"
  },
  {
    question: "Are the videos long?",
    answer: "80% of the videos are long. We don't upload short videos unless the model doesn't have too much long videos. At that point we have to upload her short videos.\n\nAnd if you wonder, we don't upload images and GIFs. Only videos."
  },
  {
    question: "I couldn't find the models I wanted",
    answer: "Generally, we choose to upload content from the top 1% OnlyFans models.\n\nIf you can't find the models you're looking for, you can simply make a request to us on Telegram about the ones you want. We'll upload all of their paid videos within a couple of days."
  }
];

// Top Promo Bar Component
const PromoBar: React.FC = () => {
  // 4 hours 47 minutes in seconds = (4 * 3600) + (47 * 60) = 14400 + 2820 = 17220
  const INITIAL_TIME = 17220; 
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return INITIAL_TIME; // Loop back
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 z-50 flex items-center justify-center text-white text-xs md:text-sm font-bold tracking-wider shadow-md">
      <span className="animate-pulse mr-2">●</span>
      LIMITED TIME OFFER: <span className="mx-2 font-mono bg-white/20 px-2 py-0.5 rounded">{formatTime(timeLeft)}</span>
      <span className="hidden md:inline mr-2">-</span>
      <a href={JOIN_LINK} target="_blank" rel="noopener noreferrer" className="underline hover:text-violet-100 ml-1 md:ml-0">JOIN NOW</a>
    </div>
  );
};

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | 'support' | null>(null);

  return (
    <div className="relative min-h-screen bg-[#f4f1fd] text-slate-900 selection:bg-violet-200 selection:text-violet-900">
      <MatrixCanvas />
      
      <PromoBar />

      {/* Absolute Header (disappears on scroll) - Pushed down by PromoBar height */}
      <nav className="absolute top-10 w-full z-40 bg-[#f4f1fd]/90 backdrop-blur-md border-b border-violet-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <span className="text-3xl md:text-4xl text-violet-600" style={{ fontFamily: "'Great Vibes', cursive" }}>PleasureHeaven</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://t.me/pheaven0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-violet-600 hover:text-violet-800 transition-colors transform hover:scale-110"
              aria-label="Telegram"
            >
              <TelegramIcon className="w-8 h-8" />
            </a>
            <a 
              href="https://x.com/MistikTapinak" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-violet-600 hover:text-violet-800 transition-colors transform hover:scale-110"
              aria-label="X (Twitter)"
            >
              <XIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 pt-40 pb-12 px-4 text-center overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-block border border-violet-200 bg-white rounded-full px-4 py-1 text-violet-600 font-mono text-sm mb-4 animate-fade-in shadow-sm">
            ● PORTAL OPEN: LIMITED SPOTS AVAILABLE
          </div>
          
          <h1 className="font-display text-4xl md:text-7xl leading-tight mb-4 text-slate-900">
            START YOUR <span className="brand-text">3 DAYS FREE TRIAL!</span>
          </h1>
          
          <div className="text-slate-600 text-lg md:text-xl max-w-3xl mb-6 leading-relaxed text-left inline-block">
            <ul className="space-y-3 list-disc pl-5 marker:text-violet-500">
              <li>
                Get full access to content worth over <span className="font-bold text-slate-900">$3000/month</span> and we upload 100+ videos every day.
              </li>
              <li>
                Be able to watch <span className="font-bold text-slate-900">over 6000 long</span> paid videos of OnlyFans models.
              </li>
              <li>
                <span className="font-bold text-slate-900">You can request</span> your favourite OnlyFans models. We will upload the videos within 2 days.
              </li>
              <li>
                Don't deal with links and ads. If you want download and <span className="font-bold text-slate-900">watch later</span>.
              </li>
            </ul>
            <p className="text-sm text-slate-500 font-medium mt-4 italic text-center">
              (When purchasing, the business name will appear as FLOW1 LTD.)
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center w-full justify-center">
            <a 
              href={JOIN_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto brand-bg text-white font-display text-xl px-12 py-4 rounded hover:brightness-110 hover:scale-105 transition-all shadow-[0_10px_40px_rgba(139,92,246,0.3)] flex items-center justify-center gap-2"
            >
              JOIN PLEASURE HEAVEN <ArrowRight size={24} />
            </a>
          </div>
          
          {/* Social Proof Bar */}
          <div className="mt-24 flex flex-wrap justify-center gap-8 md:gap-16 text-slate-500 font-mono text-sm">
            <div className="flex items-center gap-2">
              <Users className="text-violet-500" size={18} />
              <span>3,000+ MEMBERS</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-violet-500" size={18} />
              <span>99% POSITIVE REVIEWS</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-violet-500" size={18} />
              <span>PAY SAFELY</span>
            </div>
          </div>
        </div>
      </header>

      {/* The Choice Section */}
      <section className="relative z-10 py-24 bg-white border-t border-violet-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-12 text-slate-900">CHOOSE <span className="text-violet-600">SIDE</span></h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Blue Pill (OnlyFans) - Gray/Slate styled */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors group shadow-sm">
              <div className="w-16 h-16 bg-white border border-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <span className="font-display text-3xl tracking-tighter text-[#00AFF0]">OF</span>
              </div>
              <h3 className="font-display text-2xl mb-4 text-slate-600">ONLYFANS</h3>
              <ul className="text-left text-slate-500 space-y-3 mb-8">
                <li className="flex gap-2 items-start"><XCircle className="text-red-400 w-5 h-5 flex-shrink-0 mt-0.5" /> <span>Unexpected fees</span></li>
                <li className="flex gap-2 items-start"><XCircle className="text-red-400 w-5 h-5 flex-shrink-0 mt-0.5" /> <span>Poor website design</span></li>
                <li className="flex gap-2 items-start"><XCircle className="text-red-400 w-5 h-5 flex-shrink-0 mt-0.5" /> <span>No content downloads</span></li>
                <li className="flex gap-2 items-start"><XCircle className="text-red-400 w-5 h-5 flex-shrink-0 mt-0.5" /> <span>$400+ for decent content</span></li>
              </ul>
            </div>

             {/* Red Pill (Pleasure Heaven) - Violet styled */}
             <div className="relative p-8 rounded-2xl bg-violet-50 border border-violet-200 shadow-lg shadow-violet-100 hover:border-violet-400 transition-colors group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent pointer-events-none"></div>
              <div className="w-16 h-16 bg-white border border-violet-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Crown className="text-violet-500" size={32} />
              </div>
              <h3 className="font-display text-2xl mb-4 text-violet-600">PLEASURE HEAVEN</h3>
              <ul className="text-left text-slate-600 space-y-3 mb-8">
                <li className="flex gap-2 items-start"><CheckCircle2 className="text-violet-500 w-5 h-5 flex-shrink-0 mt-0.5" /> <span>No unexpected fees (No PPVs)</span></li>
                <li className="flex gap-2 items-start"><CheckCircle2 className="text-violet-500 w-5 h-5 flex-shrink-0 mt-0.5" /> <span>Download videos</span></li>
                <li className="flex gap-2 items-start"><CheckCircle2 className="text-violet-500 w-5 h-5 flex-shrink-0 mt-0.5" /> <span>Watch the models' videos you don't find online</span></li>
                <li className="flex gap-2 items-start"><CheckCircle2 className="text-violet-500 w-5 h-5 flex-shrink-0 mt-0.5" /> <span>Be able to watch over 80+ models' videos</span></li>
                <li className="flex gap-2 items-start"><CheckCircle2 className="text-violet-500 w-5 h-5 flex-shrink-0 mt-0.5" /> <span>Be able to request models' videos</span></li>
              </ul>
              <a 
                href={JOIN_LINK}
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center bg-violet-600 text-white font-bold py-3 uppercase tracking-wider hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/30 rounded"
              >
                Enter Pleasure Heaven
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Many / Social Proof - Updated with Masonry Grid */}
      <section className="relative z-10 py-24 bg-[#f4f1fd] border-y border-violet-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-center text-4xl mb-16 text-slate-900">TRUSTED BY <span className="text-violet-500">MANY</span></h2>
          
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-6 space-y-3 md:space-y-6">
            {socialProofItems.map((item, index) => {
              if (item.type === 'image') {
                return (
                  <div key={index} className="break-inside-avoid mb-6">
                    <img 
                      src={item.src} 
                      alt={item.alt} 
                      className="w-full h-auto rounded-xl shadow-md border border-violet-100 hover:scale-[1.02] transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                );
              } else if (item.type === 'chat') {
                return <ChatCard key={index} name={item.name!} avatarColor={item.avatarColor!} messages={item.messages!} />;
              } else if (item.type === 'stat') {
                return <StatCard key={index} />;
              }
              return null;
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-center text-4xl mb-12 text-slate-900">FREQUENTLY ASKED <span className="brand-text">QUESTIONS</span></h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section className="relative z-10 py-24 bg-[#f4f1fd] overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white blur-[120px] rounded-full pointer-events-none opacity-60"></div>
        
        <div className="relative max-w-lg mx-auto px-4 text-center">
          <div className="bg-white/80 backdrop-blur-xl border border-violet-200 p-8 md:p-12 rounded-3xl shadow-[0_20px_60px_rgba(139,92,246,0.15)]">
            <div className="text-center space-y-4 text-slate-800 font-bold text-lg">
              <p>Contact us : +1 (213) 986-8699</p>
              <p>For UK: +44 20 4628 1675</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white border-t border-slate-100 py-12 text-center text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <Crown className="text-violet-600 mb-4" size={40} />
          <p className="mb-4">&copy; {new Date().getFullYear()} PLEASURE HEAVEN. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <button onClick={() => setActiveModal('terms')} className="hover:text-violet-600 transition">Terms of Service</button>
            <button onClick={() => setActiveModal('privacy')} className="hover:text-violet-600 transition">Privacy Policy</button>
            <button onClick={() => setActiveModal('support')} className="hover:text-violet-600 transition">Support</button>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
      
      {/* Legal Modal */}
      <LegalModal 
        isOpen={!!activeModal} 
        onClose={() => setActiveModal(null)} 
        type={activeModal} 
      />
    </div>
  );
};

const FAQItem: React.FC<{question: string, answer: string}> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
      <div className="border border-violet-100 rounded-lg bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <button 
              onClick={() => setIsOpen(!isOpen)}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
          >
              <span className="font-display text-lg text-slate-800">{question}</span>
              {isOpen ? <Minus className="text-violet-500" /> : <Plus className="text-violet-500" />}
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
               <div className="p-6 pt-0 text-slate-600 leading-relaxed whitespace-pre-line border-t border-slate-50 bg-slate-50/50">
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