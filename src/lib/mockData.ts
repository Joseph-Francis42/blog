export interface Author {
  name: string;
  role: string;
  avatar: string;
  socials?: {
    twitter?: string;
    github?: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string; // Markdown
  category: string;
  coverImage: string;
  author: Author;
  publishedAt: string;
  readTime: string;
  likes: number;
  views: number;
  featured?: boolean;
}

export const MOCK_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "building-scalable-design-systems-saas-products",
    title: "Building a Scalable Design System for SaaS Products",
    excerpt: "Learn how to structure design tokens, component variants, and automatic handoff workflows to scale your SaaS UI seamlessly across product teams.",
    category: "Design",
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Alex Rivera",
      role: "Lead Design Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      socials: {
        twitter: "https://twitter.com/alexrivera",
        github: "https://github.com/alexrivera"
      }
    },
    publishedAt: "2026-06-18",
    readTime: "6 min read",
    likes: 342,
    views: 1250,
    featured: true
  },
  {
    id: "2",
    slug: "why-next-js-16-is-game-changer-modern-web",
    title: "Why Next.js 16 is a Game-Changer for Modern Web Development",
    excerpt: "An in-depth look at Next.js 16's new Cache Components architecture, instant sibling navigations, React 19 integration, and the future of server rendering.",
    category: "Development",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Marcus Vance",
      role: "Principal Frontend Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      socials: {
        github: "https://github.com/marcusv"
      }
    },
    publishedAt: "2026-06-15",
    readTime: "5 min read",
    likes: 289,
    views: 940
  },
  {
    id: "3",
    slug: "mastering-figmas-auto-layout-tips-tricks",
    title: "Mastering Figma's Auto Layout: Tips, Tricks, and Hidden Gems",
    excerpt: "Level up your design workflow. Explore advanced auto layout features, including wrap layouts, absolute positioning in containers, and responsive grids.",
    category: "Figma",
    coverImage: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Sophia Chen",
      role: "Senior Product Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
    },
    publishedAt: "2026-06-12",
    readTime: "4 min read",
    likes: 198,
    views: 680
  },
  {
    id: "4",
    slug: "rise-of-agentic-ai-how-autonomous-agents-work",
    title: "The Rise of Agentic AI: How Autonomous Coding Agents Work",
    excerpt: "Autonomous AI agents are redefining coding. Examine the architecture of agentic workflows, planning cycles, tool execution, and local reasoning models.",
    category: "AI",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Liam O'Connor",
      role: "AI Research Engineer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
      socials: {
        twitter: "https://twitter.com/liamoconnor"
      }
    },
    publishedAt: "2026-06-08",
    readTime: "8 min read",
    likes: 512,
    views: 1890
  },
  {
    id: "5",
    slug: "designing-for-dark-mode-more-than-inverting-colors",
    title: "Designing for Dark Mode: More Than Just Inverting Colors",
    excerpt: "A practical guide to designing high-contrast, visually pleasing dark interfaces that prevent eye strain and preserve brand styling across themes.",
    category: "Design",
    coverImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Alex Rivera",
      role: "Lead Design Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      socials: {
        twitter: "https://twitter.com/alexrivera"
      }
    },
    publishedAt: "2026-06-05",
    readTime: "5 min read",
    likes: 176,
    views: 520
  },
  {
    id: "6",
    slug: "how-to-optimize-next-js-app-router-core-web-vitals",
    title: "How to Optimize Next.js App Router for Core Web Vitals",
    excerpt: "Step-by-step strategies to optimize Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) in Next.js applications.",
    category: "Development",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Marcus Vance",
      role: "Principal Frontend Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      socials: {
        github: "https://github.com/marcusv"
      }
    },
    publishedAt: "2026-06-02",
    readTime: "7 min read",
    likes: 245,
    views: 810
  },
  {
    id: "7",
    slug: "saas-pricing-page-strategies-ux-case-study",
    title: "SaaS Pricing Page Strategies: A UX & Design System Case Study",
    excerpt: "Analyzing pricing card UX. How color accents, layout layout, FAQs, and pricing toggles influence customer acquisition and conversion rates.",
    category: "SaaS",
    coverImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Sophia Chen",
      role: "Senior Product Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
    },
    publishedAt: "2026-05-28",
    readTime: "6 min read",
    likes: 167,
    views: 480
  },
  {
    id: "8",
    slug: "the-future-of-frontend-component-driven-development",
    title: "The Future of Frontend: Component-Driven Development",
    excerpt: "Examine how modular component-driven development saves engineering hours, keeps styling cohesive, and speeds up product shipments.",
    category: "Development",
    coverImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Marcus Vance",
      role: "Principal Frontend Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      socials: {
        github: "https://github.com/marcusv"
      }
    },
    publishedAt: "2026-05-25",
    readTime: "4 min read",
    likes: 184,
    views: 590
  }
];

// Rich Markdown content template generator
export const getMarkdownContent = (title: string, category: string): string => {
  return `
# ${title}

Welcome to this in-depth guide focusing on **${category}** in modern tech organizations. In this article, we'll dive deep into best practices, architectural layouts, and how you can implement these strategies inside your teams.

Designing digital products at scale requires structured coordination between designers and engineers. As software applications grow, maintaining consistency, speed, and usability becomes a major challenge.

## The Core Problem

Most product teams face significant friction during designer-developer handoffs. Designers create layouts in tools like Figma, while developers implement them in React, Vue, or CSS. Without a single source of truth, small discrepancies in typography, spacing, and colors accumulate over time, resulting in a fragmented user experience.

> "A design system is not a project; it's a product serving other products." — Nathan Curtis

Here is a summary of typical problems faced by scaling teams:
* **UI Inconsistencies:** Buttons, input fields, and layouts look slightly different across pages.
* **Redundant Work:** Developers build identical components from scratch instead of reusing verified code.
* **Slow Shipments:** Design handoffs require constant back-and-forth communication.

---

## 1. Defining Design Tokens

The foundation of a premium UI layout is **design tokens**. Design tokens are the visual atoms of your brand: color hex codes, typographic scales, spacing offsets, and border-radius specifications. 

In a modern styling library (like Tailwind CSS), these tokens are mapped directly to utility values:

\`\`\`css
/* Example Design Tokens */
:root {
  --color-primary: #4f46e5;       /* Indigo */
  --font-heading: 'Outfit', sans-serif;
  --spacing-base: 4px;            /* 4px baseline grid */
  --radius-medium: 12px;
}
\`\`\`

By standardizing these values, your product gains immediate design alignment. If you decide to change the brand's primary purple, you update it in one token, and the entire product adapts.

### Typographic Hierarchy

A well-balanced typography scale creates visual order. Headings should feel distinct from body copy in size, weight, and font family:

1. **Outfit (Heading Font):** Rounded, geometric, and clean. Used to establish immediate impact.
2. **Inter (Body Font):** Highly legible, neutral, and readable at small sizes. Used for readability.

---

## 2. Reusable Component Architectures

Once tokens are defined, we assemble them into **smart components**. Rather than creating custom buttons for every form, we construct a master Button component with specific variants:

* \`variant="primary"\`: Gradient violet background, bold white text, smooth lift animations.
* \`variant="secondary"\`: Translucent background, thin border, subtle hover glows.
* \`variant="ghost"\`: Minimalist layout, hover background fill.

\`\`\`tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  const baseStyles = "px-5 py-2.5 rounded-lg font-semibold transition-all duration-300";
  const variants = {
    primary: "bg-primary hover:bg-primary-hover text-white shadow-md shadow-primary/10 hover:-translate-y-0.5",
    secondary: "border border-border bg-card hover:bg-border/20 text-foreground hover:-translate-y-0.5",
    ghost: "text-muted hover:text-foreground hover:bg-border/10"
  };
  
  return (
    <button className={\`\${baseStyles} \${variants[variant]}\`} {...props}>
      {children}
    </button>
  );
}
\`\`\`

---

## 3. Creating Premium Micro-Animations

Micro-animations make your interface feel alive and interactive. Subtle movements guide the user's attention and provide immediate feedback to actions:

* **Card Hover Lift:** A gentle Y-axis offset (\`-translate-y-1\`) and increased shadow density make a card look like it's lifting off the page.
* **Image Scale:** Overflow-hidden containers with a scale transition (\`scale-105\`) on the cover image when hovered add depth.
* **Loading Fades:** Clean fade-in transitions prevent visual jarring during server-side state hydration.

---

## 4. Accessibility and SEO Best Practices

A premium UI isn't just about appearance; it must be usable by everyone and visible to search engines:

* **Semantic Tags:** Use \`<article>\` for blog content, \`<header>\` for navigation, and \`<section>\` to organize sections.
* **Color Contrast:** Keep foreground/background contrast ratios above 4.5:1 for standard text (WCAG AA).
* **Alt Tags:** Ensure every cover photograph contains descriptive text to aid screen readers.

By combining structured tokens, reusable code components, smooth animations, and solid accessibility, you build a state-of-the-art blog application that delights users and achieves business goals.
`;
};
