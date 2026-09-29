"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Award,
  Info,
  Mail,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";
import { useTheme } from "@/components/ThemeContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, User, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Skills", href: "/admin/skills", icon: Wrench },
  { name: "Certifications", href: "/admin/certifications", icon: Award },
  { name: "About", href: "/admin/about", icon: Info },
  { name: "Contact", href: "/admin/contact", icon: Mail },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useTheme();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const allowedEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "").split(",");

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent text-foreground">
        <div className="w-8 h-8 border-4 border-warm border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !user.email || !allowedEmails.includes(user.email)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent text-foreground p-4">
        <div className="bg-panel p-8 rounded-xl border border-line text-center flex flex-col gap-6 max-w-sm w-full shadow-lg">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-2">Admin Access</h2>
            <p className="text-muted text-sm">
              You must be an authorized administrator to view this page.
            </p>
          </div>
          
          <button
            onClick={handleLogin}
            className="bg-warm text-warm-fg px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors"
          >
            Sign in with Google
          </button>
          
          {user && !allowedEmails.includes(user.email!) && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded text-left">
              <p className="text-red-500 text-xs font-medium">
                Access Denied: <br/>
                <span className="text-foreground">{user.email}</span> is not authorized.
              </p>
              <button onClick={handleLogout} className="text-xs text-muted hover:text-foreground mt-2 underline">
                Sign out
              </button>
            </div>
          )}

          <Link href="/" className="text-sm text-muted hover:text-warm mt-4 transition-colors">
            &larr; Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const isActive = (href: string) =>
    href === "/admin"
      ? pathname === "/admin"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-transparent text-foreground">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-panel border-b md:border-b-0 md:border-r border-line flex flex-col">
        <div className="flex items-center justify-between gap-3 p-4 md:p-6 md:border-b border-line">
          <div>
            <Link href="/admin" className="text-lg md:text-xl font-bold uppercase tracking-wider">
              Admin Panel
            </Link>
            <p className="hidden md:block text-xs uppercase tracking-widest text-muted mt-1">
              Content Manager
            </p>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-lg border border-line text-muted hover:text-accent hover:bg-panel-soft transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link
              href="/"
              aria-label="Back to portfolio"
              className="p-2.5 rounded-lg border border-line text-muted hover:text-accent hover:bg-panel-soft transition-colors"
            >
              <span className="text-sm font-medium">&larr;</span>
            </Link>
          </div>
        </div>

        <nav className="flex md:flex-1 gap-1 px-3 pb-3 md:px-4 md:pb-0 md:pt-4 md:flex-col overflow-x-auto md:overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 px-3 py-2 md:gap-3 md:px-4 md:py-3 rounded-lg transition-colors border whitespace-nowrap shrink-0 ${
                  active
                    ? "bg-warm/15 border-warm/40 text-accent font-medium"
                    : "border-transparent text-muted hover:text-accent hover:bg-panel-soft/60"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex p-4 border-t border-line flex-col gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex items-center justify-between gap-3 w-full px-4 py-3 rounded-lg border border-line text-muted hover:text-accent hover:bg-panel-soft transition-colors"
          >
            <span className="text-sm font-medium">
              {isDarkMode ? "Dark mode" : "Light mode"}
            </span>
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Link
            href="/"
            className="text-sm text-muted hover:text-accent flex items-center gap-2 px-4 py-2"
          >
            &larr; Back to Portfolio
          </Link>
          
          <button
            onClick={handleLogout}
            className="text-sm text-red-500/80 hover:text-red-500 flex items-center gap-2 px-4 py-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
