"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

const IMAGE_PRESETS = [
  { name: "Code & Setup", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" },
  { name: "Design System", url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" },
  { name: "AI & Neural Network", url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80" },
  { name: "Figma Workspace", url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80" }
];

export default function WritePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Development");
  const [coverImage, setCoverImage] = useState(IMAGE_PRESETS[0].url);
  const [content, setContent] = useState("");

  const [customImage, setCustomImage] = useState("");
  const [useCustomUrl, setUseCustomUrl] = useState(false);

  // Mutation to create a new post
  const { mutate: createPost, isPending, error, isSuccess } = useMutation({
    mutationFn: async (newPostData: any) => {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPostData),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to create post");
      }

      return res.json();
    },
    onSuccess: () => {
      // Invalidate the cache to trigger a reload of posts on the homepage
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      
      // Redirect back home after a short delay
      setTimeout(() => {
        router.push("/");
      }, 1500);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const postPayload = {
      title,
      excerpt,
      content,
      category,
      coverImage: useCustomUrl ? customImage : coverImage,
      author: {
        name: "Joseph Francis",
        role: "Creator & Principal Developer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      },
    };

    createPost(postPayload);
  };

  return (
    <main id="main-content" className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
      <div className="animate-fade-in space-y-6">
        {/* Back Link */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition-all duration-300 hover:border-muted hover:text-foreground hover:bg-border/10"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back to articles</span>
        </Link>

        {/* Page Title */}
        <div className="space-y-1.5">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">
            Write a new article
          </h1>
          <p className="text-sm text-muted">
            Share your insights, design learnings, or frontend architecture updates with the community.
          </p>
        </div>

        {isSuccess ? (
          <div className="rounded-2xl bg-success/10 border border-success/20 p-6 flex flex-col items-center text-center gap-3 text-success">
            <CheckCircle2 className="h-12 w-12" />
            <h3 className="text-lg font-bold">Article published successfully!</h3>
            <p className="text-sm opacity-90 max-w-sm">
              Your article has been added. Redirecting you to the home feed to check it out...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-3 text-red-500 text-sm">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{(error as Error).message}</span>
              </div>
            )}

            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-bold text-foreground block">
                Title
              </label>
              <input
                id="title"
                type="text"
                required
                placeholder="e.g., Implementing TanStack Query Mutations in Next.js"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isPending}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-4 focus:ring-ring focus:outline-none transition-all"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-bold text-foreground block">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isPending}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-4 focus:ring-ring focus:outline-none transition-all cursor-pointer"
              >
                {["Development", "Design", "Figma", "SaaS", "AI"].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <label htmlFor="excerpt" className="text-sm font-bold text-foreground block">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                required
                rows={3}
                placeholder="Write a brief, engaging summary of the article..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                disabled={isPending}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-4 focus:ring-ring focus:outline-none transition-all resize-none"
              />
            </div>

            {/* Cover Image Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-foreground">Cover Image</label>
                <button
                  type="button"
                  onClick={() => setUseCustomUrl(!useCustomUrl)}
                  className="text-xs text-primary font-bold hover:underline cursor-pointer"
                >
                  {useCustomUrl ? "Use preset image" : "Provide custom URL"}
                </button>
              </div>

              {useCustomUrl ? (
                <input
                  type="url"
                  required
                  placeholder="Paste cover photo URL (e.g. https://images.unsplash.com/...)"
                  value={customImage}
                  onChange={(e) => setCustomImage(e.target.value)}
                  disabled={isPending}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-4 focus:ring-ring focus:outline-none transition-all"
                />
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {IMAGE_PRESETS.map((preset) => {
                    const isSelected = coverImage === preset.url;
                    return (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setCoverImage(preset.url)}
                        disabled={isPending}
                        className={`relative rounded-xl overflow-hidden aspect-video border text-left cursor-pointer group hover:scale-[1.01] transition-all duration-300 ${
                          isSelected ? "border-primary ring-4 ring-ring" : "border-border"
                        }`}
                      >
                        <img src={preset.url} alt={preset.name} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/45 flex items-end p-2">
                          <span className="text-[10px] font-bold text-white leading-tight">{preset.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Markdown Content */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="content" className="text-sm font-bold text-foreground block">
                  Markdown Content
                </label>
                <span className="text-[10px] text-muted">Supports headers, lists, blockquotes, and code</span>
              </div>
              <textarea
                id="content"
                required
                rows={10}
                placeholder="Write your article body content in markdown. For example:
# Header 1
## Header 2
This is a paragraph with **bold** text and `inline code`.

* List item 1
* List item 2

> This is an inspirational quote.
"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isPending}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground font-mono focus:border-primary focus:ring-4 focus:ring-ring focus:outline-none transition-all"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/80">
              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-background px-5 text-sm font-semibold text-muted hover:bg-border/10 hover:text-foreground transition-all duration-200"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-foreground hover:bg-neutral-800 dark:bg-foreground dark:hover:bg-neutral-200 text-sm font-semibold text-background px-6 shadow-md transition-all duration-200 disabled:opacity-50 cursor-pointer"
              >
                {isPending ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                ) : (
                  <span>Publish Article</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
