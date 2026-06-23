"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, X, Heart, Eye, ArrowRight, Calendar, Clock, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { BlogPost } from "@/lib/mockData";
import Newsletter from "./Newsletter";

interface BlogContainerProps {
  initialSearch: string;
  initialCategory: string;
}

export default function BlogContainer({ initialSearch, initialCategory }: BlogContainerProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Debounce search query to optimize API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Sync state changes with URL query parameters for SEO and shareability
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (activeCategory && activeCategory !== "All") params.set("category", activeCategory);

    const query = params.toString() ? `?${params.toString()}` : "";
    router.push(`${pathname}${query}`, { scroll: false });
  }, [debouncedSearch, activeCategory, router, pathname]);

  // React Query to fetch posts dynamically (client side)
  const { data: posts = [], isFetching, isPlaceholderData } = useQuery<BlogPost[]>({
    queryKey: ["posts", debouncedSearch, activeCategory],
    queryFn: async () => {
      const res = await fetch(`/api/posts?search=${debouncedSearch}&category=${activeCategory}`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
    // Prefetched data on server serves as initial data, then client refetches
    staleTime: 30000,
  });

  // React Query to fetch categories
  const { data: categories = ["All"] } = useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/posts?getCategories=true");
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
    staleTime: 600000, // Categories don't change often
  });

  // Listen for the "/" shortcut key to focus the search bar
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  // Split featured post from the rest
  const hasFilter = debouncedSearch !== "" || activeCategory !== "All";
  const featuredPost = !hasFilter && posts.length > 0 ? posts[0] : null;
  const gridPosts = featuredPost ? posts.slice(1) : posts;

  // Stagger animation variants for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      {/* Decorative gradient backgrounds */}
      <div className="absolute top-20 left-1/4 h-[500px] w-[500px] rounded-full glow-purple -z-10 opacity-70" />
      <div className="absolute top-40 right-1/4 h-[500px] w-[500px] rounded-full glow-blue -z-10 opacity-70" />

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto py-8 sm:py-12 space-y-4">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
          Insights & <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Engineering</span> Blog
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
          Discover detailed technical tutorials, design token workflows, and architecture analyses from Joseph Francis.
        </p>
      </section>

      {/* Filter and Search controls */}
      <section id="categories-section" className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between border-b border-border/60 pb-6">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/15 scale-102"
                      : "bg-card hover:bg-border/20 text-muted-foreground hover:text-foreground border border-border"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:max-w-xs shrink-0">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              id="blog-search-input"
              ref={searchInputRef}
              type="text"
              placeholder="Search articles... (Press '/')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-border bg-card/60 pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/80 focus:bg-card focus:border-primary focus:ring-4 focus:ring-ring focus:outline-none transition-all duration-200"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  searchInputRef.current?.focus();
                }}
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-muted-foreground hover:text-foreground"
                aria-label="Clear Search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Blog Post (Large Card) */}
      {featuredPost && (
        <section className="animate-fade-in">
          <Link href={`/blog/${featuredPost.slug}`} className="group block overflow-hidden rounded-2xl md:rounded-3xl border border-border bg-card hover:border-border-hover shadow-sm hover:shadow-md transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Image */}
              <div className="lg:col-span-7 overflow-hidden aspect-video lg:aspect-auto lg:h-[400px]">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  loading="eager"
                  className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              {/* Content info */}
              <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 lg:pl-0 lg:py-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-block rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary uppercase tracking-wider">
                      {featuredPost.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                    {featuredPost.title}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-4">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-border/80 pt-6">
                  {/* Author info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="h-10 w-10 rounded-full border border-border"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-foreground leading-none">{featuredPost.author.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{featuredPost.author.role}</p>
                    </div>
                  </div>
                  {/* Read article link */}
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:translate-x-1.5 transition-transform duration-300">
                    <span>Read Article</span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Blog Cards Grid */}
      <section className="space-y-8">
        {featuredPost && (
          <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Recent Articles
          </h3>
        )}

        {/* Loading Skeletons */}
        {isFetching && posts.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col h-[400px] rounded-2xl border border-border bg-card overflow-hidden animate-pulse">
                <div className="bg-border/60 aspect-video w-full" />
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-border/60 rounded-md w-1/3" />
                    <div className="h-6 bg-border/60 rounded-md w-full" />
                    <div className="h-6 bg-border/60 rounded-md w-5/6" />
                    <div className="h-4 bg-border/60 rounded-md w-full mt-4" />
                    <div className="h-4 bg-border/60 rounded-md w-2/3" />
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 bg-border/60 rounded-full" />
                      <div className="space-y-1">
                        <div className="h-3.5 bg-border/60 rounded-md w-20" />
                        <div className="h-2.5 bg-border/60 rounded-md w-14" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/20 space-y-4"
          >
            <p className="text-base text-muted-foreground">
              No articles found matching <span className="font-semibold text-foreground">"{searchTerm}"</span> in category <span className="font-semibold text-foreground">"{activeCategory}"</span>.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
              }}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-white cursor-pointer"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          /* Dynamic Grid */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {gridPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  layout
                  className="group flex flex-col h-full rounded-2xl border border-border bg-card hover:border-border-hover hover:shadow-md transition-all duration-300"
                >
                  <Link href={`/blog/${post.slug}`} className="flex flex-col h-full overflow-hidden">
                    {/* Cover image */}
                    <div className="overflow-hidden aspect-video shrink-0 bg-border/20">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>

                    {/* Meta info & Titles */}
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-md">
                            {post.category}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <h4 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug">
                          {post.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Footer Info */}
                      <div className="flex items-center justify-between border-t border-border/80 pt-4 mt-auto">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="h-8 w-8 rounded-full border border-border"
                          />
                          <div>
                            <h5 className="text-xs font-bold text-foreground leading-tight">
                              {post.author.name}
                            </h5>
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              {post.publishedAt}
                            </p>
                          </div>
                        </div>

                        {/* Likes/Views stats */}
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" />
                            <span>{post.views}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3.5 w-3.5 text-red-500/80" />
                            <span>{post.likes}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Newsletter Signup Card */}
      <Newsletter />
    </div>
  );
}
