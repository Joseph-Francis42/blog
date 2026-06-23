import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getPosts, getCategories } from "@/lib/posts";
import BlogContainer from "@/components/BlogContainer";

interface HomePageProps {
  searchParams: Promise<{ search?: string; category?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { search, category } = await searchParams;
  const queryClient = new QueryClient();

  const activeCategory = category || "All";
  const activeSearch = search || "";

  // Prefetch data on the server side (SSR)
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["posts", activeSearch, activeCategory],
      queryFn: () => getPosts(activeSearch, activeCategory),
    }),
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogContainer initialSearch={activeSearch} initialCategory={activeCategory} />
    </HydrationBoundary>
  );
}
