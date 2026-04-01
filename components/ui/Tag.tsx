import { cn } from "@/lib/utils";

type Variant = "gold" | "sage" | "dim";

interface TagProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const styles: Record<Variant, React.CSSProperties> = {
  gold: {
    color: "var(--gold)",
    background: "var(--gold-dim)",
    borderColor: "var(--gold-mid)",
  },
  sage: {
    color: "var(--sage)",
    background: "var(--sage-dim)",
    borderColor: "rgba(90,143,123,0.2)",
  },
  dim: {
    color: "var(--text-dim)",
    background: "transparent",
    borderColor: "var(--border)",
  },
};

/**
 * Small mono-font label chip / tag.
 *
 * <Tag variant="gold">Node.js</Tag>
 * <Tag variant="sage">MongoDB</Tag>
 * <Tag variant="dim">2022–2026</Tag>
 */
export default function Tag({ children, variant = "dim", className }: TagProps) {
  return (
    <span
      className={cn(
        "font-mono text-[0.65rem] tracking-[0.06em] uppercase",
        "px-[0.75rem] py-[0.28rem] rounded-[2px] border",
        "inline-block leading-none",
        className
      )}
      style={styles[variant]}
    >
      {children}
    </span>
  );
}
