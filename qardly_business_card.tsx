import React, { useState, useEffect, useRef } from 'react';

/**
 * Low-poly Geometric Hummingbird Logo
 * Exact polygonal vector matching the Figma visual identity.
 */
const OrigamiHummingbird = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Beak & Head */}
    <polygon points="65,33 93,28 85,24" fill="#6366F1" opacity="0.95" />
    <polygon points="52,22 65,33 46,43" fill="#06B6D4" />
    {/* Upper Wing */}
    <polygon points="65,33 86,24 72,48" fill="#3B82F6" />
    <polygon points="46,43 72,48 56,66" fill="#EC4899" />
    {/* Lower Wing & Body */}
    <polygon points="46,43 35,58 56,66" fill="#8B5CF6" />
    <polygon points="35,58 24,49 46,43" fill="#10B981" />
    {/* Tail feathers */}
    <polygon points="56,66 64,84 52,74" fill="#F59E0B" />
    <polygon points="52,74 58,88 47,80" fill="#EF4444" />
  </svg>
);

const CARDS_DATA = [
  {
    id: 'mariannedb',
    title: 'MarianneDB',
    companyName: 'Marianne Databases Inc.',
    holderName: 'MARIANNE TOMANENG',
    role: 'CHIEF EXECUTIVE OFFICER',
    address: 'STA. MESA, MANILA CITY',
    officeDetail: 'PUP STA. MESA, MANILA',
    phone: '+63 924 984 0920',
    email: 'mariannedb@qardly.com',
    website: 'https://MarianneDB.org',
    mapLocation: 'Sta. Mesa, Manila City',
    streetInfo: 'Anonas St., Sta. Mesa',
    postalCode: '1016',
    areaTag: 'PUP Technology Core',
  },
  {
    id: 'nexuscloud',
    title: 'NexusCloud',
    companyName: 'Nexus Cloud Infrastructure',
    holderName: 'ALEXANDER REYES',
    role: 'HEAD OF ENGINEERING',
    address: 'BGC, TAGUIG CITY',
    officeDetail: 'HIGH STREET SOUTH, BGC',
    phone: '+63 917 552 8841',
    email: 'areyes@nexuscloud.io',
    website: 'https://nexuscloud.io',
    mapLocation: 'Bonifacio Global City, Taguig',
    streetInfo: '28th Street cor. 7th Ave',
    postalCode: '1634',
    areaTag: 'BGC Innovation Hub',
  }
];

export default function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Dynamic Scroll-Driven Blur State
  const [blurPx, setBlurPx] = useState(0);
  const [topOpacity, setTopOpacity] = useState(1);
  const scrollContainerRef = useRef(null);

  const card = CARDS_DATA[currentCardIndex];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollY = container.scrollTop;
      
      // Target: smoothly reach full blur (8px-10px) over 180px of scroll
      const MAX_SCROLL = 180;
      const MAX_BLUR = 9.5;
      
      const ratio = Math.min(scrollY / MAX_SCROLL, 1);
      
      // Calculate Gaussian blur in pixels
      const calculatedBlur = ratio * MAX_BLUR;
      // Subtle contrast/opacity shift to mirror Figma depth of field
      const calculatedOpacity = 1 - ratio * 0.35;

      setBlurPx(calculatedBlur);
      setTopOpacity(calculatedOpacity);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (text) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleSave = () => {
    setIsSaved(!isSaved);
    showToast(!isSaved ? 'Saved to your Qards Deck!' : 'Removed from Qards Deck');
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % CARDS_DATA.length);
    setIsSaved(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#DFDBD0] text-[#1C1C1A] flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 antialiased selection:bg-[#214336] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 z-50 bg-[#1C1C1A] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl flex items-center space-x-2 animate-bounce">
          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main UI Card Wrapper (Pure UI - No Phone Hardware/Mockup) */}
      <div className="w-full max-w-[430px] h-screen sm:h-[880px] bg-[#EFECE4] sm:rounded-[36px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] sm:border sm:border-[#DDD8CC] flex flex-col overflow-hidden relative">

        {}
        <header className="sticky top-0 z-30 bg-[#EFECE4]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-[#1C1C1A]/10 transition-colors">
          <div className="flex items-center space-x-2">
            <span className="font-black text-sm tracking-widest text-[#214336] uppercase font-sans">
              QARDLY
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => showToast('Browsing Qards Deck')}
              className="text-[10px] font-bold tracking-widest text-[#76746C] hover:text-[#1C1C1A] uppercase transition"
            >
              Qards
            </button>
            <button 
              onClick={() => showToast('Qardly v2.4 • NFC Digital Identity')}
              className="text-[10px] font-bold tracking-widest text-[#76746C] hover:text-[#1C1C1A] uppercase transition"
            >
              About
            </button>
            <button 
              onClick={() => setShowQrModal(true)}
              className="bg-[#214336] hover:bg-[#183329] active:scale-95 text-white text-[9px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-md shadow-sm transition"
            >
              Show My Qard
            </button>
          </div>
        </header>

        {/* Scrollable Canvas Container */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >

          {}
          {/* TOP SECTION: Dynamically blurs and softens as user scrolls down */}
          <section 
            id="top-deck-section"
            style={{
              filter: `blur(${blurPx.toFixed(2)}px)`,
              opacity: topOpacity.toFixed(2),
              transform: `scale(${1 - (blurPx * 0.005)})`,
              transformOrigin: 'top center',
              transition: 'filter 75ms ease-out, opacity 75ms ease-out, transform 75ms ease-out'
            }}
            className="px-6 pt-5 pb-6 will-change-[filter,opacity]"
          >
            
            {/* Stacked Skewed NFC Cards Deck */}
            <div className="relative w-full h-56 flex items-center justify-center my-1 group perspective-1000">
              
              {/* Back Gold Card Accent */}
              <div 
                className="absolute w-[285px] h-[172px] bg-[#F6C158] rounded-2xl shadow-md -rotate-6 -translate-x-3 -translate-y-1.5 transition-transform duration-300 group-hover:-rotate-8 group-hover:-translate-x-5"
                style={{
                  backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.3) 0%, transparent 60%)'
                }}
              />

              {/* Front Primary Sky-Blue NFC Card */}
              <div 
                className="absolute w-[290px] h-[175px] bg-[#8CB9FD] rounded-2xl shadow-xl p-4 flex flex-col justify-between text-slate-800 -rotate-1 transition-all duration-300 group-hover:rotate-0 group-hover:scale-[1.02] border border-blue-200/40"
                style={{
                  background: 'linear-gradient(135deg, #99C3FF 0%, #83B2FB 100%)',
                  boxShadow: '0 16px 32px -8px rgba(59, 130, 246, 0.35), 0 4px 12px rgba(0,0,0,0.06)'
                }}
              >
                {/* Card Top Row */}
                <div className="flex justify-between items-start">
                  <span className="text-[8px] font-black tracking-widest uppercase text-slate-900/90">
                    {card.companyName}
                  </span>
                  
                  {/* Contactless Waves Icon */}
                  <div className="flex items-center space-x-1" title="NFC Enabled">
                    <svg className="w-4 h-4 text-slate-900 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" d="M8.5 16.5a5 5 0 0 1 0-7M12 19a8.5 8.5 0 0 0 0-14M15.5 21.5a12 12 0 0 0 0-19" />
                    </svg>
                  </div>
                </div>

                {/* Card Center Identity */}
                <div className="my-auto">
                  <h3 className="font-black text-[13px] tracking-wide uppercase text-slate-950 leading-tight">
                    {card.holderName}
                  </h3>
                  <p className="text-[8px] font-bold uppercase tracking-wider text-slate-700/90 mt-0.5">
                    {card.role}
                  </p>
                </div>

                {/* Card Bottom Row */}
                <div className="flex justify-between items-end">
                  <div className="text-[7.5px] font-bold text-slate-800/80 leading-relaxed tracking-tight">
                    <p className="uppercase">{card.officeDetail}</p>
                    <p className="tracking-wide text-slate-900">{card.phone}</p>
                  </div>

                  {/* Micro Origami Bird Logo on Card */}
                  <div className="flex flex-col items-center">
                    <OrigamiHummingbird className="w-9 h-9 drop-shadow-sm" />
                    <span className="text-[6px] font-black uppercase tracking-wider text-slate-900 -mt-0.5">
                      {card.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="flex justify-center -mt-1 mb-3">
              <div className="text-[#1C1C1A]/60 flex flex-col items-center -space-y-1.5 animate-pulse cursor-pointer"
                   onClick={() => scrollContainerRef.current?.scrollBy({ top: 120, behavior: 'smooth' })}>
                <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
                <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
              </div>
            </div>

            {/* Profile Overview Section */}
            <div className="mb-4">
              <div className="text-[9px] font-black tracking-widest text-[#76746C] uppercase mb-1">
                QARDS DECK &bull; NFC SCANNED
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-black text-[#1C1C1A] tracking-tight">
                    {card.title}
                  </h1>
                  <p className="text-xs text-[#76746C] font-semibold mt-0.5">
                    {card.companyName}
                  </p>
                  
                  <button 
                    onClick={handleToggleSave}
                    className={`mt-3 text-[10px] font-extrabold px-4 py-2 rounded-md shadow-sm uppercase tracking-wider transition active:scale-95 flex items-center space-x-1.5 ${
                      isSaved 
                        ? 'bg-[#183329] text-white ring-2 ring-emerald-600/30' 
                        : 'bg-[#214336] hover:bg-[#183329] text-white'
                    }`}
                  >
                    <span>{isSaved ? 'In Your Qards' : 'Add to Qards'}</span>
                    {isSaved && (
                      <svg className="w-3 h-3 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Main Profile Origami Logo Art */}
                <div className="flex flex-col items-center pl-4 border-l border-[#1C1C1A]/15">
                  <OrigamiHummingbird className="w-16 h-16 drop-shadow-md" />
                  <span className="text-[7.5px] text-[#76746C] font-semibold mt-1">
                    {card.companyName}
                  </span>
                </div>
              </div>
            </div>

            {/* Horizontal Divider */}
            <div className="border-t border-[#1C1C1A]/15 my-4" />

            {/* Key-Value Details List */}
            <div className="space-y-2.5 text-[10px]">
              <div className="flex justify-between items-center">
                <span className="text-[#76746C] font-bold tracking-wider uppercase">COMPANY NAME</span>
                <span className="text-[#1C1C1A] font-semibold text-right">{card.companyName}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[#76746C] font-bold tracking-wider uppercase">COMPANY ADDRESS</span>
                <span className="text-[#1C1C1A] font-semibold text-right">{card.address}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#76746C] font-bold tracking-wider uppercase">COMPANY EMAIL</span>
                <a 
                  href={`mailto:${card.email}`}
                  className="text-[#1C1C1A] font-semibold uppercase hover:underline"
                >
                  {card.email}
                </a>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#76746C] font-bold tracking-wider uppercase">OFFICIAL WEBSITE</span>
                <a 
                  href={card.website}
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[#1C1C1A] font-semibold underline underline-offset-2 decoration-[#1C1C1A]/40 hover:decoration-[#1C1C1A]"
                >
                  {card.website}
                </a>
              </div>
            </div>

          </section>

          {}
          {/* BOTTOM SECTION: Always remains crisp and sharply focused */}
          <section id="bottom-office-section" className="px-6 pb-8 pt-3 bg-gradient-to-b from-transparent via-[#EFECE4] to-[#EFECE4]">
            
            {/* Subsection Subheader & Next Qard Controller */}
            <div className="flex items-center justify-between mb-4 pt-1">
              <span className="font-black text-[11px] tracking-wider text-[#1C1C1A] uppercase">
                QARDLY INC.
              </span>
              <button 
                onClick={handleNextCard}
                className="bg-[#214336] hover:bg-[#183329] active:scale-95 text-white text-[9px] font-extrabold px-3 py-1.5 rounded transition uppercase tracking-wider flex items-center space-x-1"
              >
                <span>Next Qard</span>
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Location Title Header */}
            <div className="mb-3.5">
              <div className="flex items-center space-x-1.5 text-[#214336] text-[10px] font-black uppercase tracking-wider">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>Office Location</span>
              </div>
              <h2 className="text-base font-black text-[#1C1C1A] tracking-tight mt-0.5">
                {card.mapLocation}
              </h2>
            </div>

            {/* Stylized Vector Map Component */}
            <div className="relative w-full h-56 bg-[#ECE8DA] rounded-2xl overflow-hidden border border-[#1C1C1A]/15 shadow-sm flex flex-col justify-between p-3 select-none">
              
              {/* Vector Map Roads, River & Typography */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 400 240">
                {/* Secondary Grid Streets */}
                <path d="M-20 45 L420 55" stroke="#FAF8F3" strokeWidth="12" />
                <path d="M-20 100 L420 92" stroke="#FAF8F3" strokeWidth="9" />
                <path d="M115 -10 L140 250" stroke="#FAF8F3" strokeWidth="9" />
                <path d="M310 -10 L285 250" stroke="#FAF8F3" strokeWidth="9" />
                <path d="M180 -10 L200 250" stroke="#E3DFC0" strokeWidth="4" strokeDasharray="6,4" />

                {/* Pasig River Curved Vector Ribbon */}
                <path 
                  d="M-10 180 C75 185, 150 172, 235 198 C315 224, 370 202, 420 214" 
                  fill="none" 
                  stroke="#9AC3E6" 
                  strokeWidth="28" 
                  strokeLinecap="round" 
                />
                <text x="60" y="186" fill="#5F8EBA" fontSize="7.5" fontFamily="sans-serif" fontWeight="800" letterSpacing="1.5">
                  PASIG RIVER
                </text>

                {/* Ramon Magsaysay Boulevard Express Highway */}
                <path d="M305 -10 Q288 115 315 250" fill="none" stroke="#252F3F" strokeWidth="7" />
                <text x="255" y="94" fill="#71717A" fontSize="6.5" fontFamily="sans-serif" fontWeight="600">
                  R. MAGSAYSAY BLVD
                </text>
                <text x="290" y="224" fill="#71717A" fontSize="6.5" fontFamily="sans-serif" fontWeight="600">
                  PUP MAIN CAMPUS
                </text>
              </svg>

              {/* Floating Map Chips */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm flex items-center space-x-1.5 text-[8.5px] font-black text-[#1C1C1A]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  <span>{card.areaTag}</span>
                </div>
                <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm text-[8.5px] font-black text-[#1C1C1A]">
                  Metro Manila
                </div>
              </div>

              {/* Animated Map Pin Location */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                <div className="relative flex items-center justify-center">
                  {/* Radar pulse ripples */}
                  <div className="absolute w-14 h-14 bg-emerald-600/20 rounded-full animate-ping pointer-events-none" />
                  <div className="absolute w-8 h-8 bg-emerald-600/30 rounded-full pointer-events-none" />
                  
                  {/* Pin label badge */}
                  <div className="bg-[#1C2C26] text-white px-3 py-1 rounded-full shadow-lg flex items-center space-x-1.5 border border-emerald-500/40 transform transition hover:scale-105 cursor-pointer">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[9px] font-extrabold tracking-wide uppercase">{card.title} HQ</span>
                  </div>
                </div>
                {/* Pointer needle stalk */}
                <div className="w-0.5 h-3.5 bg-[#1C2C26]" />
                <div className="w-2 h-2 rounded-full bg-emerald-600 shadow -mt-0.5" />
              </div>

              {/* Bottom Address Info & Action */}
              <div className="relative z-10 flex items-end justify-between bg-gradient-to-t from-white/90 via-white/50 to-transparent p-1.5 -m-1.5 rounded-b-xl backdrop-blur-[1px]">
                <div className="text-[7.5px] font-black text-[#1C1C1A] leading-tight">
                  <p>{card.streetInfo}</p>
                  <p className="text-[#76746C] font-semibold">Postal Code {card.postalCode}</p>
                </div>
                
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(card.companyName + ' ' + card.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white hover:bg-neutral-50 active:scale-95 text-[#1C1C1A] font-black text-[8px] uppercase tracking-wider px-2.5 py-1.5 rounded-md shadow-sm border border-neutral-200 flex items-center space-x-1 transition"
                >
                  <span>Open Maps</span>
                  <svg className="w-2.5 h-2.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>

          </section>

        </div>

        {}
        <div className="bg-[#E7E3D8] border-t border-[#1C1C1A]/10 px-4 py-2 flex items-center justify-between text-[9px] text-[#76746C] font-bold">
          <div className="flex items-center space-x-1.5">
            <span className={`w-2 h-2 rounded-full ${blurPx > 0.5 ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
            <span>Scroll Blur: <strong className="text-[#1C1C1A]">{blurPx.toFixed(1)}px</strong></span>
          </div>
          <span className="uppercase text-[8px] tracking-wider text-[#1C1C1A]/70">
            {blurPx > 4 ? 'Top Deck Blurred' : 'Scroll Down to Blur Top'}
          </span>
        </div>

        {}
        {showQrModal && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
            <div className="bg-[#EFECE4] w-full max-w-xs rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center relative border border-white/20">
              <button 
                onClick={() => setShowQrModal(false)}
                className="absolute top-3 right-3 text-[#1C1C1A] hover:bg-black/5 p-1.5 rounded-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <OrigamiHummingbird className="w-10 h-10 mb-2" />
              <h3 className="font-black text-sm text-[#1C1C1A] uppercase tracking-wider">{card.title} Qard</h3>
              <p className="text-[10px] text-[#76746C] mb-4">Tap to share via NFC or scan the QR code below</p>

              {/* QR Code Placeholder Graphic */}
              <div className="w-36 h-36 bg-white p-2 rounded-xl shadow-inner border border-[#1C1C1A]/15 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="#1C1C1A">
                  <rect x="10" y="10" width="24" height="24" rx="3" fill="#1C1C1A"/>
                  <rect x="14" y="14" width="16" height="16" rx="2" fill="white"/>
                  <rect x="18" y="18" width="8" height="8" rx="1" fill="#1C1C1A"/>
                  <rect x="66" y="10" width="24" height="24" rx="3" fill="#1C1C1A"/>
                  <rect x="70" y="14" width="16" height="16" rx="2" fill="white"/>
                  <rect x="74" y="18" width="8" height="8" rx="1" fill="#1C1C1A"/>
                  <rect x="10" y="66" width="24" height="24" rx="3" fill="#1C1C1A"/>
                  <rect x="14" y="70" width="16" height="16" rx="2" fill="white"/>
                  <rect x="18" y="74" width="8" height="8" rx="1" fill="#1C1C1A"/>
                  {/* Inner matrix dots */}
                  <rect x="42" y="14" width="6" height="6" rx="1" />
                  <rect x="52" y="24" width="6" height="6" rx="1" />
                  <rect x="42" y="42" width="16" height="16" rx="2" />
                  <rect x="68" y="44" width="8" height="6" rx="1" />
                  <rect x="68" y="68" width="6" height="14" rx="1" />
                  <rect x="80" y="78" width="10" height="6" rx="1" />
                  <rect x="42" y="72" width="8" height="8" rx="1" />
                </svg>
              </div>

              <button 
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  showToast('Card link copied to clipboard!');
                  setShowQrModal(false);
                }}
                className="mt-5 w-full bg-[#214336] hover:bg-[#183329] text-white text-[10px] font-black uppercase tracking-wider py-2 rounded-lg transition"
              >
                Copy Direct Link
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}