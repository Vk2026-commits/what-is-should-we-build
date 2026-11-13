import { Network } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-navy-deep/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-2.5 px-5">
        <Network aria-hidden="true" className="size-7 shrink-0 text-primary" />
        <span className="font-display text-[15px] font-semibold tracking-tight">
          Operations Build Finder
        </span>
      </div>
    </header>
  );
}
