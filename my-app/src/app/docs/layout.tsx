"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import DocsHeader from "@/components/docs/DocsHeader";
import DocsSidebar from "@/components/docs/DocsSidebar";
import DocsPageNav from "@/components/docs/DocsPageNav";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      {/* Sidebar: fixed overlay on mobile, sticky on desktop */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 shrink-0 transition-transform duration-200 ease-out md:sticky md:top-0 md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <DocsSidebar
          onNavigate={() => setSidebarOpen(false)}
          searchQuery={searchQuery}
          className="h-full"
        />
      </div>

      {/* Overlay when sidebar open on mobile */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/20 transition-opacity md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main: header + content + page nav */}
      <main className="min-h-0 flex-1 overflow-y-auto flex flex-col">
        <DocsHeader
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <div className="max-w-3xl flex-1 px-4 py-8 md:px-8 md:py-10">
          {children}
          <DocsPageNav />
        </div>
      </main>
    </div>
  );
}
