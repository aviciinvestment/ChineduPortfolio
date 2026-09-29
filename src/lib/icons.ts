import type { ComponentType } from "react";
import {
  PenTool,
  Plane,
  Scan,
  Activity,
  Box,
  Wrench,
  Cog,
  Ruler,
  Layers,
  Sparkles,
  Rocket,
  Gauge,
  Hammer,
} from "lucide-react";

type IconComponent = ComponentType<{ className?: string; strokeWidth?: number }>;

const ICONS: Record<string, IconComponent> = {
  PenTool,
  Plane,
  Scan,
  Activity,
  Box,
  Wrench,
  Cog,
  Ruler,
  Layers,
  Sparkles,
  Rocket,
  Gauge,
  Hammer,
};

export const skillIconNames = Object.keys(ICONS);

export function getSkillIcon(name?: string | null): IconComponent {
  return (name && ICONS[name]) || Box;
}
