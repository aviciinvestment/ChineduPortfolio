"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full relative z-10 border-t border-line bg-background/80 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-medium text-muted uppercase tracking-widest text-center sm:text-left">
          &copy; 2026 Chinedu John Systems. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-warm animate-pulse" />
          <span className="text-xs font-bold text-warm uppercase tracking-widest">
            System Online
          </span>
        </div>
      </div>
    </footer>
  );
}
