"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowLeft, Calendar, Clock, Heart, Eye, Bookmark, Share2, 
  Check, Link2, BookOpen
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/lib/mockData";
import { motion } from "framer-motion";

interface PostContentProps {
  slug: string;
}

// Simple and robust parser to convert markdown structure into semantic HTML elements
// This is styled automatically by Tailwind's @tailwindcss/typography (prose class)
function parseMarkdown(md: string): string {
  if (!md) return "";
  
  let html = md;

  // 1. Double character HTML escape for user input safety (except markup tags we generate)
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 2. Hide block code from other regex transformations
  const codeBlocks: string[] = [];
  html = html.replace(/```(tsx|css|js|typescript|json)?\n([\s\S]*?)\n```/gm, (match, lang, code) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push(`<pre class="language-${lang || 'text'}"><code>${code}</code></pre>`);
    return placeholder;
  });

  // 3. Hide inline code
  const inlineCode: string[] = [];
  html = html.replace(/`([^`\n]+)`/g, (match, code) => {
    const placeholder = `__INLINE_CODE_${inlineCode.length}__`;
    inlineCode.push(`<code>${code}</code>`);
    return placeholder;
  });

  // 4. Blockquotes (restore &gt; blockquote indicator first)
  html = html.replace(/^&gt;\s+(.*?)$/gm, '<blockquote>$1</blockquote>');

  // 5. Headers
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');

  // 6. Strong styling
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // 7. Horizontal dividers
  html = html.replace(/^---$/gm, '<hr />');

  // 8. List Items
  html = html.replace(/^\*\s+(.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
  html = html.replace(/<\/ul>\s*<ul>/g, ''); // Clean merge duplicate adjacent lists

  // 9. Paragraph wraps
  const blocks = html.split(/\n\n+/);
  const parsedBlocks = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (
      trimmed.startsWith('<h') ||
      trimmed.startsWith('<blockquote') ||
      trimmed.startsWith('<pre') ||
      trimmed.startsWith('<ul') ||
      trimmed.startsWith('<li') ||
      trimmed.startsWith('<hr') ||
      trimmed.startsWith('__CODE_BLOCK')
    ) {
      return trimmed;
    }
    return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`;
  });
  html = parsedBlocks.join('\n');

  // 10. Re-inject code elements
  codeBlocks.forEach((block, idx) => {
    html = html.replace(`__CODE_BLOCK_${idx}__`, block);
  });
  inlineCode.forEach((code, idx) => {
    html = html.replace(`__INLINE_CODE_${idx}__`, code);
  });

  return html;
}

export default function PostContent({ slug }: PostContentProps) {
  const router = useRouter();

  // Social share indicators
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Fetch individual article using React Query
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["post", slug],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${slug}`);
      if (!res.ok) throw new Error("Failed to fetch post");
      return res.json();
    },
    staleTime: 30000,
  });

  // Fetch all posts to filter out related articles
  const { data: allPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["posts", "", "All"],
    queryFn: async () => {
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });

  useEffect(() => {
    if (post) {
      setLikeCount(post.likes);
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        <div className="h-6 bg-border/60 rounded-md w-24" />
        <div className="space-y-4">
          <div className="h-10 bg-border/60 rounded-md w-full" />
          <div className="h-10 bg-border/60 rounded-md w-3/4" />
        </div>
        <div className="flex gap-4 items-center">
          <div className="h-12 w-12 bg-border/60 rounded-full" />
          <div className="space-y-2">
            <div className="h-4 bg-border/60 rounded-md w-32" />
            <div className="h-3 bg-border/60 rounded-md w-20" />
          </div>
        </div>
        <div className="bg-border/60 rounded-2xl w-full aspect-video" />
        <div className="space-y-4 py-4">
          <div className="h-4 bg-border/60 rounded-md w-full" />
          <div className="h-4 bg-border/60 rounded-md w-full" />
          <div className="h-4 bg-border/60 rounded-md w-5/6" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-base text-red-500 font-semibold">Failed to load the article details.</p>
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Homepage</span>
        </Link>
      </div>
    );
  }

  // Filter 3 related articles (same category, excluding current post)
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      {/* Decorative background glows */}
      <div className="absolute top-20 left-1/3 h-[400px] w-[400px] rounded-full glow-purple -z-10 opacity-40" />

      {/* Navigation Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors duration-150">Home</Link>
        <span>/</span>
        <Link href="/#categories-section" className="hover:text-foreground transition-colors duration-150">Blog</Link>
        <span>/</span>
        <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
      </nav>

      {/* Article Container */}
      <article className="mx-auto max-w-3xl space-y-8">
        
        {/* Header Metadata */}
        <header className="space-y-6">
          {/* Back link & Category */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-150"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to posts</span>
            </button>
            <span className="inline-block rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary uppercase tracking-wider">
              {post.category}
            </span>
          </div>

          {/* Title and Excerpt */}
          <div className="space-y-4">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              {post.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed italic border-l-2 border-primary/40 pl-4 py-1">
              {post.excerpt}
            </p>
          </div>

          {/* Author Details & Date */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-y border-border/80 py-5">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-11 w-11 rounded-full border border-border"
              />
              <div>
                <h4 className="text-sm font-bold text-foreground leading-none">{post.author.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{post.author.role}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{post.publishedAt}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                <span>{post.views + 1} views</span>
              </span>
            </div>
          </div>
        </header>

        {/* Cover Photo */}
        <div className="overflow-hidden rounded-2xl md:rounded-3xl border border-border aspect-video">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <section 
          className="prose dark:prose-invert prose-indigo lg:prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-p:leading-relaxed prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:rounded-xl"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content || "") }}
        />

        {/* Sticky Actions Bar */}
        <footer className="border-t border-border/80 pt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Like count button */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                liked
                  ? "bg-red-500/10 border-red-500/30 text-red-500 scale-102"
                  : "bg-card border-border hover:bg-border/20 text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Like Article"
            >
              <Heart className={`h-4.5 w-4.5 ${liked ? "fill-current" : ""}`} />
              <span>{likeCount}</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer ${
                bookmarked
                  ? "bg-primary/10 border-primary/30 text-primary scale-102"
                  : "bg-card border-border hover:bg-border/20 text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Bookmark Article"
            >
              <Bookmark className={`h-4.5 w-4.5 ${bookmarked ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Social share actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card hover:bg-border/20 text-muted-foreground hover:text-foreground cursor-pointer transition-all duration-200"
              aria-label="Copy Link"
            >
              {copied ? <Check className="h-4.5 w-4.5 text-success" /> : <Link2 className="h-4.5 w-4.5" />}
              {copied && (
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 rounded bg-foreground px-2 py-1 text-[10px] font-bold text-background shadow">
                  Copied!
                </span>
              )}
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card hover:bg-border/20 text-muted-foreground hover:text-foreground transition-all duration-200"
              aria-label="Share on Twitter"
            >
              <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card hover:bg-border/20 text-muted-foreground hover:text-foreground transition-all duration-200"
              aria-label="Share on LinkedIn"
            >
              <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764 0-.973.784-1.763 1.75-1.763s1.75.79 1.75 1.763c0 .974-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </footer>
      </article>

      {/* Related Posts section */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border pt-12 space-y-8 max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Related Articles
            </h3>
            <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary">
              <span>More in {post.category}</span>
              <BookOpen className="h-4 w-4" />
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {relatedPosts.map((rPost) => (
              <motion.article
                key={rPost.id}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group flex flex-col h-full rounded-2xl border border-border bg-card hover:border-border-hover transition-all duration-300 overflow-hidden"
              >
                <Link href={`/blog/${rPost.slug}`} className="flex flex-col h-full">
                  <div className="overflow-hidden aspect-video bg-border/20">
                    <img
                      src={rPost.coverImage}
                      alt={rPost.title}
                      className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                        {rPost.category}
                      </span>
                      <h4 className="font-heading text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {rPost.title}
                      </h4>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/80 pt-3">
                      <span>{rPost.publishedAt}</span>
                      <span>{rPost.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
