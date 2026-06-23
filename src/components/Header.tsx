"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { useTheme } from "@/app/providers";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for the "/" search shortcut to highlight it to user
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        const searchInput = document.getElementById("blog-search-input");
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Articles", href: "/" },
    { name: "About", href: "/about" }
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/80 glass-effect shadow-sm"
          : "bg-white border-b border-transparent"
      }`}
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo B + BlogVerse */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-sm font-black text-white transition-transform duration-200 group-hover:scale-105">
              B
            </span>
            <span className="text-lg font-bold tracking-tight text-foreground">
              BlogVerse
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted hover:bg-border/10 hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Quick Search Shortcut Indicator */}
            <button
              onClick={() => {
                const searchInput = document.getElementById("blog-search-input");
                if (searchInput) searchInput.focus();
              }}
              className="flex items-center gap-2 rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-muted hover:border-border-hover hover:text-foreground transition-all duration-200 cursor-pointer"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search posts...</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted">
                /
              </kbd>
            </button>

            {/* Theme toggle - Sun/Moon */}
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card hover:bg-border/20 text-muted hover:text-foreground transition-all duration-200 cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {theme === "light" ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m8.942-8.942h-2.25M4.158 12h-2.25m3.76-7.078 1.59 1.59m11.362 11.362 1.59 1.59M18.364 5.318l-1.59 1.59m-11.362 11.362-1.59 1.59M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" /></svg>
              )}
            </button>

            {/* Write article button */}
            <Link
              href="/write"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-foreground hover:bg-neutral-800 dark:bg-foreground dark:hover:bg-neutral-200 text-sm font-semibold text-background px-4 py-2 transition-all duration-200 gap-1.5 shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              <span>Write</span>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2.5">
            {/* Mobile dark mode */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted"
              aria-label="Toggle Dark Mode"
            >
              {theme === "light" ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m8.942-8.942h-2.25M4.158 12h-2.25m3.76-7.078 1.59 1.59m11.362 11.362 1.59 1.59M18.364 5.318l-1.59 1.59m-11.362 11.362-1.59 1.59M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" /></svg>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card p-4 transition-all duration-300 animate-fade-in">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-muted hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
            
            <Link
              href="/write"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-10 items-center justify-center rounded-lg bg-foreground text-background text-sm font-semibold shadow-md gap-1.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              <span>Write</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
