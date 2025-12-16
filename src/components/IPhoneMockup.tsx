import { ReactNode } from "react";

interface IPhoneMockupProps {
  children: ReactNode;
}

export function IPhoneMockup({ children }: IPhoneMockupProps) {
  return (
    <div className="relative mx-auto" style={{ width: "375px" }}>
      {/* iPhone Frame */}
      <div 
        className="relative bg-slate-900 rounded-[3rem] p-3 shadow-2xl"
        style={{
          boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.25), 0 30px 60px -30px rgba(0, 0, 0, 0.3), inset 0 0 0 2px rgba(255,255,255,0.1)"
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-slate-900 rounded-b-2xl z-20" />
        
        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-800" />
          <div className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700" />
        </div>
        
        {/* Screen Container */}
        <div 
          className="relative bg-white rounded-[2.3rem] overflow-hidden"
          style={{ height: "750px" }}
        >
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-white z-10 flex items-end justify-between px-8 pb-1">
            <span className="text-xs font-semibold text-slate-900">9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                <div className="w-1 h-1 bg-slate-900 rounded-full" />
                <div className="w-1 h-1 bg-slate-900 rounded-full" />
                <div className="w-1 h-1 bg-slate-900 rounded-full" />
                <div className="w-1 h-1 bg-slate-300 rounded-full" />
              </div>
              <svg className="w-4 h-3 text-slate-900" viewBox="0 0 17 11">
                <rect x="0" y="0" width="15" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1"/>
                <rect x="2" y="2" width="9" height="7" rx="1" fill="currentColor"/>
                <rect x="16" y="3.5" width="1" height="4" rx="0.5" fill="currentColor"/>
              </svg>
            </div>
          </div>
          
          {/* Screen Content */}
          <div className="h-full pt-12 overflow-hidden">
            {children}
          </div>
          
          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900 rounded-full" />
        </div>
      </div>
      
      {/* Side Buttons */}
      <div className="absolute -left-0.5 top-32 w-1 h-8 bg-slate-800 rounded-l" />
      <div className="absolute -left-0.5 top-44 w-1 h-14 bg-slate-800 rounded-l" />
      <div className="absolute -left-0.5 top-60 w-1 h-14 bg-slate-800 rounded-l" />
      <div className="absolute -right-0.5 top-40 w-1 h-16 bg-slate-800 rounded-r" />
    </div>
  );
}
