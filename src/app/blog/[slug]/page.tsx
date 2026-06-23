import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getPostBySlug, getPosts } from "@/lib/posts";
import PostContent from "@/components/PostContent";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for individual blog posts (SEO optimization)
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found - Beyond UI Blog",
    };
  }

  return {
    title: `${post.title} - Beyond UI Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://beyondui.design/blog/${post.slug}`,
      images: [
        {
          url: post.coverImage,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();

  // Fetch/Prefetch post details on server
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["post", slug],
      queryFn: () => getPostBySlug(slug),
    }),
    queryClient.prefetchQuery({
      queryKey: ["posts", "", "All"],
      queryFn: () => getPosts(),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostContent slug={slug} />
    </HydrationBoundary>
  );
}
