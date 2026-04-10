"use client";

import { useState, FormEvent } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-bg-nav border-b border-bg-nav">
        <div className="max-w-3xl mx-auto px-6 h-12 flex items-center justify-between">
          <span className="text-sm text-white/60 tracking-wide">lineage.community</span>
        </div>
      </nav>

      {/* Wordmark */}
      <section className="max-w-3xl mx-auto px-6 pt-20 md:pt-28">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold text-foreground tracking-tight">
          Lineage<span className="text-gold">.</span>
        </h1>
      </section>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-10 pb-20 md:pt-12 md:pb-28">
        <p className="text-2xl md:text-3xl font-semibold text-foreground leading-tight tracking-tight">
          Every community has a history.
          <br />
          We&rsquo;re building a place to map it.
        </p>
        <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
          Lineage is a new kind of social platform where people build personal timelines of
          their journey through a community. Together, those timelines form a collective
          history that connects us.
        </p>
        <a
          href="#signup"
          className="inline-block mt-8 px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-hover transition-colors"
        >
          Get early access
        </a>
      </section>

      {/* Value Props */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="space-y-10">
          <div className="border-l-3 border-foreground pl-6">
            <h2 className="text-xl font-semibold text-foreground">Map your timeline</h2>
            <p className="mt-2 text-muted">
              Log the places, events, people, and gear that shaped your journey.
            </p>
          </div>
          <div className="border-l-3 border-gold pl-6">
            <h2 className="text-xl font-semibold text-foreground">
              Find where your lines cross
            </h2>
            <p className="mt-2 text-muted">
              Discover the moments you shared with people you didn&rsquo;t know you had history
              with.
            </p>
          </div>
          <div className="border-l-3 border-foreground pl-6">
            <h2 className="text-xl font-semibold text-foreground">
              Build something collective
            </h2>
            <p className="mt-2 text-muted">
              Individual timelines weave into a shared community record, richer with every
              contributor.
            </p>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section id="signup" className="max-w-3xl mx-auto px-6 pb-24">
        <div className="bg-surface rounded-2xl border border-border p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-foreground">Join the founding crew</h2>
          <p className="mt-2 text-muted">
            Sign up to get early access and help shape what Lineage becomes.
          </p>

          {status === "success" ? (
            <div className="mt-6 p-4 bg-gold/5 border border-gold/20 rounded-lg">
              <p className="text-foreground font-medium">
                You&rsquo;re on the list.
              </p>
              <p className="text-muted text-sm mt-1">
                Check your inbox for a welcome note.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/40"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Count me in"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-3 text-sm text-red-600">{errorMsg}</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <span>&copy; 2026 Lineage Community Technologies Inc.</span>
          <a
            href="mailto:jay@lineage.community"
            className="hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}
