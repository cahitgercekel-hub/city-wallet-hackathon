import { ReactNode } from "react";

const MobileShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen w-full bg-muted/30 flex justify-center">
    <div className="w-full max-w-[390px] min-h-screen bg-background relative">
      {children}
    </div>
  </div>
);

export default MobileShell;
