import { NextRequest, NextResponse } from "next/server";
import { getPosts, getCategories, addPost } from "@/lib/posts";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || undefined;
  const category = searchParams.get("category") || undefined;
  const getCats = searchParams.get("getCategories") === "true";

  try {
    if (getCats) {
      const categories = await getCategories();
      return NextResponse.json(categories);
    }

    const posts = await getPosts(search, category);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("API Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, excerpt, content, category, coverImage, author } = body;

    // Basic validation
    if (!title || !excerpt || !content || !category || !coverImage) {
      return NextResponse.json(
        { error: "Missing required fields: title, excerpt, content, category, coverImage" },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const wordCount = content.split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    const newPost = await addPost({
      title,
      slug,
      excerpt,
      content,
      category,
      coverImage,
      readTime,
      author: author || {
        name: "Joseph Francis",
        role: "Creator & Principal Developer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("API Error adding post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
