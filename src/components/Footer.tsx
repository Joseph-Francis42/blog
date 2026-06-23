import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-white dark:bg-card/40">
      <div className="mx-auto max-w-[1200px] px-6 py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          
          {/* Logo B + BlogVerse */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-foreground text-xs font-black text-white">
              B
            </span>
            <span className="text-lg font-bold text-foreground">
              BlogVerse
            </span>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation" className="flex gap-6">
            <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm text-muted hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#" className="text-sm text-muted hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted hover:text-foreground transition-colors">
              Terms
            </Link>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} BlogVerse. Built with Next.js &amp; React Query.
          </p>
        </div>
      </div>
    </footer>
  );
}
