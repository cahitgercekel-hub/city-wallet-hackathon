import { ReactNode } from "react";

const ContextChip = ({ icon, children }: { icon?: ReactNode; children: ReactNode }) => (
  <span className="shrink-0 inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-muted text-foreground/80">
    {icon}
    {children}
  </span>
);

export default ContextChip;
