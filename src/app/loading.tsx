import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-6 p-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-line rounded-full"></div>
        <div className="w-16 h-16 border-4 border-warm border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-warm rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="text-sm font-bold text-warm uppercase tracking-widest animate-pulse">
        Loading System...
      </p>
    </div>
  );
}
