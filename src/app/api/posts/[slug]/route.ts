import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/posts";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
      return NextResponse.json(
        { error: `Post with slug '${slug}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("API Error fetching post by slug:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
