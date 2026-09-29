"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, ExternalLink } from "lucide-react";

type Certification = {
  id: string;
  name: string;
  issuer: string | null;
  issueDate: string | null;
  credentialId: string | null;
  url: string | null;
  imageUrl: string | null;
};

const isHostedLocally = (url: string) =>
  url.startsWith("/") || url.includes("res.cloudinary.com");

export default function CertificationsView({ certifications }: { certifications: Certification[] }) {
  return (
    <div className="w-full">
      <main className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 lg:px-20 pt-16 pb-28 md:pt-24 md:pb-28 flex flex-col gap-20">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent/60">
              04 // AWARDS
            </span>
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight uppercase">
              Certifications
            </h2>
          </div>
          <div className="h-[1px] w-24 mb-10 bg-gradient-to-r from-warm to-transparent" />

          {certifications.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <p className="text-lg uppercase tracking-widest text-accent/60">
                Content coming soon...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certifications.map((certification, index) => (
                <motion.div
                  key={certification.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 md:p-8 border border-secondary/30 bg-secondary/10 flex flex-col gap-4 backdrop-blur-sm hover:-translate-y-2 hover:border-warm/50 hover:shadow-[0_18px_40px_-24px_rgba(194,87,31,0.6)] transition-all duration-300"
                >
                  {certification.imageUrl && (
                    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-secondary/30 bg-secondary/10">
                      {isHostedLocally(certification.imageUrl) ? (
                        <Image
                          src={certification.imageUrl}
                          alt={`${certification.name} certificate`}
                          fill
                          sizes="(max-width: 768px) 90vw, 420px"
                          className="object-cover"
                        />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={certification.imageUrl}
                          alt={`${certification.name} certificate`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <Award className="w-10 h-10 text-accent shrink-0" strokeWidth={1.5} />
                    {certification.issueDate && (
                      <span className="text-xs font-bold uppercase tracking-widest text-accent/60">
                        {certification.issueDate}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-wider text-accent">
                    {certification.name}
                  </h3>

                  {certification.issuer && (
                    <p className="text-sm uppercase tracking-[2px] text-accent/70">
                      {certification.issuer}
                    </p>
                  )}

                  {certification.credentialId && (
                    <p className="text-sm text-accent/60 break-words">
                      Credential ID: {certification.credentialId}
                    </p>
                  )}

                  {certification.url && (
                    <a
                      href={certification.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent hover:opacity-70 transition-opacity"
                    >
                      View Credential <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </main>
    </div>
  );
}
