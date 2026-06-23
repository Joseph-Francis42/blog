"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect, createContext, useContext } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  // Create query client on client side (persists between renders)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute stale time
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read theme from local storage or OS settings
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const root = document.documentElement;

    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      if (prefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    
    if (nextTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  // Prevent flash before hydration by returning a placeholder or letting children mount
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div style={{ visibility: mounted ? "visible" : "hidden" }} className="min-h-screen">
          {children}
        </div>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}
