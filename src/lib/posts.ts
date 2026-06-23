import { BlogPost, MOCK_POSTS, getMarkdownContent } from "./mockData";

// In-memory posts store to allow adding new articles at runtime
let postsStore: BlogPost[] = [...MOCK_POSTS];

// Simulate API Latency (e.g., 150ms) to allow loading states to show
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getPosts(search?: string, category?: string): Promise<BlogPost[]> {
  await delay(150); // simulated network delay
  
  let posts = [...postsStore];
  
  // Apply category filter (case-insensitive)
  if (category && category.toLowerCase() !== "all") {
    posts = posts.filter(
      (post) => post.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Apply search query filter (case-insensitive search in title or excerpt)
  if (search) {
    const query = search.toLowerCase().trim();
    posts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
    );
  }
  
  // Always attach full markdown content dynamically
  return posts.map(post => ({
    ...post,
    content: post.content || getMarkdownContent(post.title, post.category)
  }));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  await delay(100); // simulated network delay
  
  const post = postsStore.find((p) => p.slug === slug);
  if (!post) return null;
  
  return {
    ...post,
    content: post.content || getMarkdownContent(post.title, post.category)
  };
}

export async function getCategories(): Promise<string[]> {
  await delay(50);
  const categories = postsStore.map((post) => post.category);
  // Return unique categories, prepend "All"
  return ["All", ...Array.from(new Set(categories))];
}

export async function addPost(postData: Omit<BlogPost, "id" | "likes" | "views" | "publishedAt">): Promise<BlogPost> {
  await delay(100);
  const newPost: BlogPost = {
    ...postData,
    id: String(postsStore.length + 1),
    likes: 0,
    views: 0,
    publishedAt: new Date().toISOString().split("T")[0],
  };
  
  // Prepend to array so it appears at the top of the home feed
  postsStore = [newPost, ...postsStore];
  return newPost;
}
