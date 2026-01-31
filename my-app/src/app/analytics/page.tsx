"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAnalytics, clearAnalytics, type AnalyticsEvent } from "@/lib/analytics";

export default function AnalyticsPage() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  useEffect(() => {
    setEvents(getAnalytics());
  }, []);

  const loadEvents = () => setEvents(getAnalytics());

  const handleClear = () => {
    clearAnalytics();
    setEvents([]);
  };

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <header className="shrink-0 bg-background px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              ← Back
            </Link>
            <span className="text-muted-foreground">|</span>
            <h1 className="text-sm font-semibold text-foreground">
              <span className="text-muted-foreground">//</span> Analytics
            </h1>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-xl border-2 border-border bg-card font-medium shadow-sm hover:bg-muted/50"
              onClick={loadEvents}
              aria-label="Refresh analytics"
            >
              Refresh
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-xl border-2 border-border bg-card font-medium shadow-sm hover:bg-muted/50"
              onClick={handleClear}
              aria-label="Clear analytics"
            >
              Clear
            </Button>
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-5 pt-2 md:p-8 md:pt-2">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)] min-h-[200px] md:p-6">
            {events.length === 0 ? (
              <p className="text-muted-foreground py-8 text-center text-sm">
                No analytics data yet
              </p>
            ) : (
              <ul className="space-y-3 text-xs">
                {events.map((evt, i) => (
                  <li
                    key={`${evt.timestamp}-${i}`}
                    className="rounded-xl border border-border/60 bg-muted/20 p-3 font-mono"
                  >
                    <span className="font-semibold text-primary">{evt.name}</span>
                    <span className="text-muted-foreground ml-2">
                      {new Date(evt.timestamp).toLocaleString()}
                    </span>
                    {evt.payload != null && Object.keys(evt.payload).length > 0 && (
                      <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-muted/30 p-2 text-[10px] text-muted-foreground">
                        {JSON.stringify(evt.payload, null, 2)}
                      </pre>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
