import Link from "next/link";

export const metadata = {
  title: "About — Joseph Francis Blog",
  description: "Learn about this modern blog platform built by Joseph Francis using Next.js, React Query, and Tailwind CSS.",
};

export default function AboutPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
      <div className="animate-fade-in space-y-8">
        {/* Back Link */}
        <Link
          href="/"
          className="group mb-8 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition-all duration-300 hover:border-muted hover:text-foreground hover:bg-border/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          <span>Back to articles</span>
        </Link>

        {/* Hero Card */}
        <div className="relative mb-10 overflow-hidden rounded-[20px] shadow-sm">
          <div className="relative h-48 sm:h-56 md:h-64">
            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
              alt="Joseph Francis Workspace"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 rounded-[20px]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-heading">
                About The Creator
              </h1>
            </div>
          </div>
        </div>

        {/* Creator Info Card */}
        <section className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(260,45%,55%)] to-[hsl(320,40%,50%)] text-lg font-black text-white font-heading">
                JF
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground font-heading">Joseph Francis</h2>
                <p className="text-sm text-muted">Creator &amp; Principal Developer</p>
              </div>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Hi there! I'm <span className="font-semibold text-foreground">Joseph Francis</span>, and I built this blog application as a modern, high-performance platform to explore the latest web technologies and showcase full-stack frontend patterns. This project demonstrates my proficiency in server-side rendering (SSR), dynamic routing, state synchronization, and clean, modular component design.
            </p>
          </div>

          {/* Built With Card */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="mb-5 text-lg font-bold text-foreground font-heading">Built With</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background p-4 transition-all duration-300 hover:shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: "hsl(260, 55%, 60%)" }}></div>
                  <h3 className="text-sm font-semibold text-foreground">Next.js</h3>
                </div>
                <p className="text-xs leading-relaxed text-muted">React framework with server-side rendering &amp; App Router</p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-4 transition-all duration-300 hover:shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: "hsl(320, 55%, 60%)" }}></div>
                  <h3 className="text-sm font-semibold text-foreground">React Query</h3>
                </div>
                <p className="text-xs leading-relaxed text-muted">Powerful data fetching, caching &amp; state management</p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-4 transition-all duration-300 hover:shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: "hsl(200, 55%, 60%)" }}></div>
                  <h3 className="text-sm font-semibold text-foreground">Tailwind CSS</h3>
                </div>
                <p className="text-xs leading-relaxed text-muted">Utility-first CSS for rapid, responsive UI development</p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-4 transition-all duration-300 hover:shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: "hsl(220, 55%, 60%)" }}></div>
                  <h3 className="text-sm font-semibold text-foreground">TypeScript</h3>
                </div>
                <p className="text-xs leading-relaxed text-muted">Type-safe JavaScript for reliable, maintainable code</p>
              </div>
            </div>
          </div>

          {/* Key Features Card */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="mb-5 text-lg font-bold text-foreground font-heading">Key Features</h2>
            <ul className="space-y-3">
              {[
                "Server-Side Rendering for lightning-fast page loads",
                "Dynamic routing for individual blog posts",
                "Real-time search with instant filtering",
                "Fully responsive design across all devices",
                "SEO optimized with dynamic metadata",
                "Accessible — WCAG compliant with keyboard navigation",
                "Clean, modern design with premium aesthetics"
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Footer Actions */}
        <div className="mt-10 text-center space-y-4">
          <p className="text-sm text-muted">Thanks for checking out the Blog!</p>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-foreground hover:bg-neutral-800 text-background px-6 text-sm font-semibold transition-all duration-200"
          >
            <span>Explore Articles</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
