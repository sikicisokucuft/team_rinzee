import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Language, SUPPORTED_LANGUAGES } from '../translations';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentInfo = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/90 hover:bg-white border border-blue-200/90 text-slate-700 hover:text-blue-600 transition-all text-xs font-semibold shadow-2xs backdrop-blur-xs cursor-pointer active:scale-95 whitespace-nowrap"
        title="Change Language"
        aria-label="Select Language"
      >
        <Globe size={13} className="text-blue-600 shrink-0" />
        <span className="uppercase tracking-wider font-bold text-[11px] text-slate-800">{currentInfo.code}</span>
        <ChevronDown size={12} className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-52 sm:w-56 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3.5 py-2 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <Globe size={13} className="text-blue-500" />
              <span>Language</span>
            </div>
            <span className="text-[10px] text-blue-600 font-mono font-bold uppercase">{currentInfo.code}</span>
          </div>
          <div className="max-h-64 sm:max-h-72 overflow-y-auto py-1 overscroll-contain">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLanguage;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3.5 py-2 text-left rtl:text-right flex items-center justify-between text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/90 text-blue-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base leading-none shrink-0">{lang.flag}</span>
                    <span className="truncate">{lang.nativeName}</span>
                    <span className="text-[10px] text-slate-400 font-normal shrink-0">({lang.name})</span>
                  </div>
                  {isSelected && <Check size={14} className="text-blue-600 stroke-[2.5] shrink-0 ml-2 rtl:ml-0 rtl:mr-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
