"use client";

import { motion } from "framer-motion";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/components/ThemeContext";

type Profile = {
  name: string;
  title: string;
  email: string;
  phone: string | null;
  linkedin: string | null;
  whatsapp: string | null;
  contactIntro: string | null;
  avatarUrl: string | null;
} | null;

const DEFAULTS = {
  name: "Chinedu John Ezenkwu",
  title: "Aerospace & Mechanical CAD Design Engineer",
  email: "sosochukwunedum@gmail.com",
  phone: "+234 916 615 9310",
  linkedin: "https://www.linkedin.com/search/results/all/?keywords=Chinedu+John+Ezenkwu",
  whatsapp: "2349166159310",
  contactIntro:
    "Available for full-time opportunities, freelance engineering projects, or technical consulting. Let's discuss how we can build high-fidelity solutions together.",
  avatarUrl: "/profile.png",
};

export default function ContactView({ profile }: { profile: Profile }) {
  const { isDarkMode } = useTheme();

  const name = profile?.name || DEFAULTS.name;
  const title = profile?.title || DEFAULTS.title;
  const email = profile?.email || DEFAULTS.email;
  const phone = profile?.phone ?? DEFAULTS.phone;
  const linkedin = profile?.linkedin ?? DEFAULTS.linkedin;
  const whatsapp = profile?.whatsapp ?? DEFAULTS.whatsapp;
  const intro = profile?.contactIntro || DEFAULTS.contactIntro;
  const avatarUrl = profile?.avatarUrl || DEFAULTS.avatarUrl;

  const nameParts = name.trim().split(" ");
  const lastName = nameParts.length > 1 ? nameParts.pop() : "";
  const firstName = nameParts.join(" ");

  const cardClass = `group flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
    isDarkMode ? "border-white/10 hover:border-warm/50 hover:bg-warm/5" : "border-black/10 hover:border-warm/50 hover:bg-warm/5"
  }`;
  const iconWrapClass = `p-3 md:p-4 rounded-full shrink-0 ${
    isDarkMode ? "bg-white/10 text-white" : "bg-black/10 text-black"
  }`;
  const arrowClass = `w-4 h-4 md:w-5 md:h-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
    isDarkMode ? "text-white/30 group-hover:text-white" : "text-black/30 group-hover:text-black"
  }`;

  const contactLinks = [
    {
      key: "email",
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      icon: <Mail strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />,
      external: false,
    },
    ...(linkedin
      ? [
          {
            key: "linkedin",
            label: "LinkedIn",
            value: name,
            href: linkedin,
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 md:w-6 md:h-6"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            ),
            external: true,
          },
        ]
      : []),
    ...(whatsapp
      ? [
          {
            key: "whatsapp",
            label: "WhatsApp",
            value: phone || whatsapp,
            href: `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`,
            icon: <Phone strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />,
            external: true,
          },
        ]
      : phone
        ? [
            {
              key: "phone",
              label: "Phone",
              value: phone,
              href: `tel:${phone.replace(/\s/g, "")}`,
              icon: <Phone strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />,
              external: false,
            },
          ]
        : []),
  ];

  return (
    <div className="w-full">
      <main className="relative pt-24 pb-32 px-6 md:px-10 lg:px-20 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 z-10">
        {/* Left Column: Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`flex-1 flex flex-col items-center lg:items-start max-w-[320px] md:max-w-md mx-auto lg:mx-0 w-full rounded-3xl border p-6 md:p-12 shadow-2xl backdrop-blur-sm ${
            isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
          }`}
        >
          <div className="relative w-40 h-40 md:w-56 md:h-56 mb-8 group">
            <div className="absolute inset-0 rounded-full border-2 border-dashed animate-[spin_20s_linear_infinite] border-warm/60" />
            <div
              className={`absolute inset-2 rounded-full overflow-hidden border-4 ${
                isDarkMode ? "border-[#0a0a0a] bg-white/5" : "border-[#e5e7eb] bg-black/5"
              }`}
            >
              <Image
                src={avatarUrl}
                alt={name}
                fill
                sizes="(max-width: 768px) 160px, 224px"
                quality={100}
                unoptimized={true}
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-normal tracking-tight text-center lg:text-left font-sans uppercase">
            {firstName}
            {lastName && (
              <>
                <br />
                <span className="font-bold">{lastName}</span>
              </>
            )}
          </h1>

          <div className="h-[1px] w-24 my-6 bg-gradient-to-r from-warm to-transparent" />

          <p className="text-sm uppercase tracking-[2px] leading-relaxed text-center lg:text-left text-accent/80">
            {title}
          </p>
        </motion.div>

        {/* Right Column: Contact Info */}
        <div className="flex-1 flex flex-col justify-center gap-12 w-full mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent/60">
              06 // GET IN TOUCH
            </span>
            <h2 className="text-4xl md:text-6xl font-normal tracking-tight uppercase">Contact</h2>
            <p className="text-sm md:text-base leading-relaxed max-w-lg mt-2 text-accent/80">
              {intro}
            </p>
          </motion.div>

          <div className="flex flex-col gap-6">
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.key}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={cardClass}
              >
                <div className={iconWrapClass}>{link.icon}</div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent/60">
                    {link.label}
                  </span>
                  <span className="text-sm sm:text-base md:text-lg tracking-wide font-medium truncate">
                    {link.value}
                  </span>
                </div>
                <ArrowUpRight className={arrowClass} />
              </motion.a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
