import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      {/* Phone Frame */}
      <div className="relative">
        {/* Phone Border - Hanya bingkai luar dan area layar */}
        <div className="relative w-[380px] h-[800px] bg-white rounded-[3rem] shadow-2xl border-[14px] border-gray-800 overflow-hidden">
          
          {/* Screen Content */}
          <div className="w-full h-full overflow-hidden">
            <div className="w-full h-full overflow-y-auto scrollbar-hide">
              {children}
            </div>
          </div>

        </div>

        {/* Device Label */}
        <div className="absolute -bottom-8 left-0 right-0 text-center">
          <p className="text-gray-500 text-sm font-medium">Screen Preview • 360 x 800</p>
        </div>
      </div>
    </div>
  );
}
