import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const inputClass =
  "w-full bg-panel-soft border border-line text-accent rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-warm/60 focus:border-warm placeholder:text-muted transition-colors";

export const labelClass = "text-sm font-medium text-accent/70";

export const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 bg-warm text-warm-fg px-4 py-2.5 rounded-lg font-medium transition-all hover:brightness-110 hover:shadow-[0_8px_24px_-8px_rgba(194,87,31,0.65)] active:brightness-95";

export const dangerButtonClass =
  "inline-flex items-center justify-center text-red-600 dark:text-red-400 hover:text-red-500 p-2.5 min-w-11 min-h-11 hover:bg-red-500/10 rounded-lg transition-colors";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-muted hover:text-warm flex items-center gap-2 text-sm w-fit py-2 -my-1 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Link>
  );
}

export function EmptyRow({ colSpan, message }: { colSpan: number; message: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-6 py-8 text-center text-muted">
        {message}
      </td>
    </tr>
  );
}
