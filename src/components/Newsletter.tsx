"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    
    // Simulate API registration delay
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <section id="newsletter-section" className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-border bg-card shadow-lg p-6 sm:p-10 md:p-16 mt-20">
      {/* Background blobs for organic visual glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-gradient-to-tr from-secondary/10 to-primary/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-2xl text-center space-y-6">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Subscribe to our newsletter
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
          Get weekly insights, Figma templates, and design token architectures sent directly to your inbox. No spam. Unsubscribe anytime.
        </p>

        {status === "success" ? (
          <div className="mx-auto max-w-md rounded-xl bg-success/10 border border-success/20 p-4 flex items-center gap-3 text-success text-left animate-fade-in">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold text-sm">Subscription successful!</p>
              <p className="text-xs opacity-90">Thank you for subscribing. Please check your inbox to confirm your email.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-grow">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  disabled={status === "loading"}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/80 focus:border-primary focus:ring-4 focus:ring-ring focus:outline-none transition-all duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-hover text-sm font-semibold text-white px-6 shadow-md shadow-primary/10 transition-all duration-200 disabled:opacity-50 cursor-pointer"
              >
                {status === "loading" ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 text-xs text-red-500 text-left pl-1">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{errorMessage}</span>
              </div>
            )}
          </form>
        )}
        
        <p className="text-xs text-muted-foreground/80">
          Join over <span className="font-semibold text-foreground">15,000+</span> designers and engineers.
        </p>
      </div>
    </section>
  );
}
