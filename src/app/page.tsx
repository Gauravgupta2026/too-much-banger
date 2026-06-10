"use client";

import { useMemo, useState } from "react";
import { InterestForm } from "@/components/interest-form";
import { CardReactions } from "@/components/reaction-bar";
import { mockPosts, reactionLabels, type ArchivePost, type ReactionKey } from "@/data/mock-posts";

type AttendeeStatus = "was-there" | "watching-chaos" | null;

const timeline = [
  ["Before", "A house party in Bangalore got organized like a tiny operating system."],
  ["During", "People met, danced, pitched, gossiped, disappeared, and allegedly had fun."],
  ["After", "The timeline woke up and decided this was now a public policy issue."],
  ["Archive", "This site preserves the funniest overreactions before nuance ruins them."]
];

function totalReactions(post: ArchivePost) {
  return Object.values(post.mockCounts).reduce((sum, count) => sum + count, 0);
}

export default function Home() {
  const [attendeeStatus, setAttendeeStatus] = useState<AttendeeStatus>(null);
  const leaderboard = useMemo(
    () => [...mockPosts].sort((a, b) => totalReactions(b) - totalReactions(a)).slice(0, 4),
    []
  );

  // Hover to reveal lens tracking state
  const [revealCoords, setRevealCoords] = useState({ x: 50, y: 50 });
  const [isRevealHovered, setIsRevealHovered] = useState(false);

  // Layer 2: Hero reveal stickers state
  const [heroCounts, setHeroCounts] = useState({ fire: 88, heart: 42, rocket: 31, cup: 16 });

  const handleRevealMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setRevealCoords({ x, y });
  };

  return (
    <main>
      <section className="hero section-pad">
        <div className="noise" />
        <nav className="topbar" aria-label="Site navigation">
          <a href="#archive">Archive</a>
          <a href="#leaderboard">Leaderboard</a>
          <a href="#join">Want in?</a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Unofficial morning-after archive</p>
            <h1>Too Much Banger</h1>
            <p className="dek">
              A playful scrapbook of the takes, subtweets, anthropology papers, and very serious
              feelings that escaped after Bangerlore.
            </p>
            <div className="entry-card">
              <p>For calibration: were you there?</p>
              <div className="choice-row">
                <button
                  className={attendeeStatus === "was-there" ? "choice active" : "choice"}
                  type="button"
                  onClick={() => setAttendeeStatus("was-there")}
                >
                  I saw the confetti
                </button>
                <button
                  className={attendeeStatus === "watching-chaos" ? "choice active" : "choice"}
                  type="button"
                  onClick={() => setAttendeeStatus("watching-chaos")}
                >
                  I saw the tweets
                </button>
              </div>
              <p className="choice-caption">
                {attendeeStatus === "was-there"
                  ? "Fine. You may judge the takes with eyewitness authority."
                  : attendeeStatus === "watching-chaos"
                    ? "Also valid. The discourse was its own afterparty."
                    : "No wrong answer. The internet already formed six committees."}
              </p>
            </div>
          </div>

          {/* Full-Height Hover Reveal Evidence Board */}
          <div className="hero-reveal-wrapper">
            <div
              className={`reveal-container ${isRevealHovered ? "hovered" : ""}`}
              onMouseMove={handleRevealMouseMove}
              onMouseEnter={() => setIsRevealHovered(true)}
              onMouseLeave={() => {
                setIsRevealHovered(false);
                setRevealCoords({ x: 50, y: 50 });
              }}
              style={{
                "--mask-x": `${revealCoords.x}%`,
                "--mask-y": `${revealCoords.y}%`
              } as React.CSSProperties}
            >
              {/* Layer 2: Reaction stickers (Hover wiggles, click increments) */}
              <button
                className="reveal-sticker st-1"
                type="button"
                onClick={() => setHeroCounts((c) => ({ ...c, fire: c.fire + 1 }))}
                aria-label="React with fire"
              >
                <span>🔥</span> <b>{heroCounts.fire}</b>
              </button>
              <button
                className="reveal-sticker st-2"
                type="button"
                onClick={() => setHeroCounts((c) => ({ ...c, heart: c.heart + 1 }))}
                aria-label="React with heart"
              >
                <span>❤️</span> <b>{heroCounts.heart}</b>
              </button>
              <button
                className="reveal-sticker st-3"
                type="button"
                onClick={() => setHeroCounts((c) => ({ ...c, rocket: c.rocket + 1 }))}
                aria-label="React with rocket"
              >
                <span>🚀</span> <b>{heroCounts.rocket}</b>
              </button>
              <button
                className="reveal-sticker st-4"
                type="button"
                onClick={() => setHeroCounts((c) => ({ ...c, cup: c.cup + 1 }))}
                aria-label="React with cup"
              >
                <span>🥤</span> <b>{heroCounts.cup}</b>
              </button>

              {/* Layer 1: Reveal cover stenciled slate */}
              <div className="reveal-cover">
                <span className="reveal-badge">RESTRICTED MORNING-AFTER DETAILS</span>
                <h3>CONTAINMENT BREACH EVIDENCE</h3>
                <p>Move mouse over this section to sweep lens and inspect the party photos</p>
                <div className="reveal-icon">🔍</div>
              </div>

              {/* Layer 0: Scattered dense photo collage */}
              <div className="reveal-image-wrap">
                <div className="reveal-images-collage">
                  <div className="collage-polaroid img-1">
                    <img src="/party_evidence_1.png" alt="Evidence photo 1" className="collage-photo" />
                    <span className="polaroid-label">evidence-01.jpg</span>
                  </div>
                  <div className="collage-polaroid img-2">
                    <img src="/party_evidence_2.png" alt="Evidence photo 2" className="collage-photo" />
                    <span className="polaroid-label">containment_breach.png</span>
                  </div>
                  <div className="collage-polaroid img-3">
                    <img src="/party_photo.png" alt="Evidence photo 3" className="collage-photo" />
                    <span className="polaroid-label">bangerlore_aftermath.png</span>
                  </div>
                  <div className="collage-polaroid img-4">
                    <img src="/party_evidence_1.png" alt="Evidence photo 4" className="collage-photo" />
                    <span className="polaroid-label">confetti_rain.jpg</span>
                  </div>
                  <div className="collage-polaroid img-5">
                    <img src="/party_evidence_2.png" alt="Evidence photo 5" className="collage-photo" />
                    <span className="polaroid-label">red_cup_counter.png</span>
                  </div>
                  <div className="collage-polaroid img-6">
                    <img src="/party_photo.png" alt="Evidence photo 6" className="collage-photo" />
                    <span className="polaroid-label">leak_archive.png</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="context section-pad">
        <div className="section-heading">
          <p className="eyebrow">For the uninitiated</p>
          <h2>What happened?</h2>
        </div>
        <div className="context-card">
          <p>
            Bangerlore is an invite-only Bangalore tech party. The stated idea is simple: make a
            party that the organizers themselves would want to attend, with a filtered guest list
            and enough lore to survive until the next version.
          </p>
          <p>
            Then the screenshots travelled. People who went had stories. People who did not go had
            frameworks. The result was a small cultural storm about parties, status, tech scenes,
            entitlement, FOMO, and whether Bangalore was becoming a mirror maze with better coffee.
          </p>
        </div>
        <div className="timeline">
          {timeline.map(([label, text]) => (
            <article key={label}>
              <span>{label}</span>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="meanwhile" aria-label="Meanwhile transition">
        <div className="comic-panel">
          <span>MEANWHILE ON THE INTERNET...</span>
        </div>
      </section>

      <section className="archive section-pad" id="archive">
        <div className="section-heading">
          <p className="eyebrow">Specimens, not receipts</p>
          <h2>The wall of takes</h2>
          <p>
            Mock posts for now. Real tweets can replace these later without changing the archive layout.
          </p>
        </div>

        <div className="masonry-container">
          <div className="masonry">
            {mockPosts.map((post) => (
              <article
                className={`tweet-card ${post.featured ? "featured" : ""}`}
                key={post.id}
                style={{ "--rotate": `${post.rotation}deg` } as React.CSSProperties}
              >
                {/* Left Column: Avatar */}
                <div className="tweet-left">
                  <div className="tweet-avatar">{post.avatar}</div>
                </div>
                
                {/* Right Column: Content */}
                <div className="tweet-right">
                  <div className="tweet-header">
                    <span className="tweet-author-name">{post.author}</span>
                    {post.verified && (
                      <span className="tweet-verified-badge" aria-label="Verified account">
                        <svg viewBox="0 0 24 24" className="verified-icon">
                          <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.99-3.818-3.99-.48 0-.941.1-1.356.278C14.78 2.51 13.518 1.5 12 1.5c-1.517 0-2.78 1.01-3.416 2.288-.415-.178-.877-.278-1.356-.278-2.108 0-3.818 1.78-3.818 3.99 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 3.99 3.818 3.99.48 0 .941-.1 1.356-.278C9.22 21.49 10.482 22.5 12 22.5c1.517 0 2.78-1.01 3.416-2.288.415.178.877.278 1.356.278 2.108 0 3.818-1.78 3.818-3.99 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.72 4.17l-3.32-3.34 1.4-1.42 1.92 1.92 4.9-4.9 1.4 1.42-6.3 6.32z" />
                        </svg>
                      </span>
                    )}
                    <span className="tweet-handle">@{post.handle}</span>
                    <span className="tweet-dot">·</span>
                    <time className="tweet-time">{post.timestamp.split("·")[1]?.trim() || "3h"}</time>
                  </div>
                  
                  <p className="tweet-text">{post.text}</p>
                  
                  {post.mediaUrl && (
                    <div className="tweet-media">
                      <img src={post.mediaUrl} alt="Tweet attachment" className="tweet-image" />
                    </div>
                  )}
                  
                  {/* Native X Engagement Bar */}
                  <div className="tweet-actions" aria-label="Tweet engagement">
                    <div className="tweet-action reply">
                      <svg viewBox="0 0 24 24"><path d="M1.751 10c0-4.42 3.584-8 8.005-8 4.42 0 8.005 3.58 8.005 8s-3.585 8-8.005 8c-.06 0-.115-.003-.175-.005l-.03.005-4.148-.01c-.107 0-.213-.01-.3-.03-.44-.086-.713-.51-.625-.95l.797-3.98c-1.777-1.477-2.929-3.704-2.929-6.184zm8.005-6c-3.316 0-6.004 2.687-6.004 6 0 1.954.94 3.7 2.404 4.81l-.01.03-.5 2.5 2.1-.8c.27-.1.57-.1.84 0 1.01.37 2.11.56 3.17.56 3.316 0 6.004-2.687 6.004-6s-2.688-6-6.004-6z"/></svg>
                      <span>{post.replies}</span>
                    </div>
                    <div className="tweet-action repost">
                      <svg viewBox="0 0 24 24"><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.898 2 2 2h6v2H7.5c-2.206 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM22.5 16v-8.45l2.068-1.93-1.364-1.46L18.768 8.3 17.4 6.84 21.832 2.7l4.432 4.14-1.364 1.46-2.068-1.93V16c0 2.21-1.794 4-4 4H10v-2h9.5c1.102 0 2-.9 2-2z"/></svg>
                      <span>{post.reposts}</span>
                    </div>
                    <div className="tweet-action like">
                      <svg viewBox="0 0 24 24"><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.353-2.73 4.644-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.377-7.452 13.11-10.034 13.157H12zM7.354 4.725c-2.128 0-3.404 2.002-3.404 3.753 0 4.931 5.31 10.37 8.05 11.16 2.74-.79 8.05-6.229 8.05-11.16 0-1.75-1.277-3.753-3.404-3.753-1.78 0-2.9 1.4-3.725 2.563c-.18.25-.49.4-.82.4h-.01c-.33 0-.64-.15-.82-.4-.827-1.162-1.947-2.563-3.727-2.563z"/></svg>
                      <span>{post.likes}</span>
                    </div>
                    <div className="tweet-action bookmark">
                      <svg viewBox="0 0 24 24"><path d="M4 4.5C4 3.12 5.12 2 6.5 2h11C18.88 2 20 3.12 20 4.5v16.16c0 .49-.33.92-.81 1.04-.1.02-.2.03-.3.03-.38 0-.73-.19-.92-.53l-5.97-5.22-5.97 5.22c-.19.34-.54.53-.92.53-.1 0-.2-.01-.3-.03-.48-.12-.81-.55-.81-1.04V4.5zM6.5 4c-.28 0-.5.22-.5.5v14.34l5.37-4.7c.36-.31.9-.31 1.25 0l5.38 4.7V4.5c0-.28-.22-.5-.5-.5h-11z"/></svg>
                      <span>{post.bookmarks}</span>
                    </div>
                    <div className="tweet-action views">
                      <svg viewBox="0 0 24 24"><path d="M8.75 21V3h2v18h-2zM18 21V9h2v12h-2zm-4.625 0v-6h2v6h-2zm-9.25 0v-3h2v3h-2z"/></svg>
                      <span>{post.views}</span>
                    </div>
                  </div>
                  
                  {/* Stamped card reactions */}
                  <CardReactions post={post} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="leaderboard section-pad" id="leaderboard">
        <div className="section-heading">
          <p className="eyebrow">Wall of Fame / Walk of Shame</p>
          <h2>Most over-stamped evidence</h2>
        </div>
        <div className="evidence-board">
          {leaderboard.map((post, index) => (
            <article className="evidence-card" key={post.id}>
              <span className="rank">#{index + 1}</span>
              <p>{post.text}</p>
              <div className="mini-reactions">
                {(Object.keys(reactionLabels) as ReactionKey[]).map((reaction) => (
                  <span key={reaction}>
                    {reactionLabels[reaction].icon} {post.mockCounts[reaction]}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="join section-pad" id="join">
        <div className="join-copy">
          <p className="eyebrow">Final form</p>
          <h2>Want to be at the next one?</h2>
          <p>
            Leave a trace. This is wired for Supabase submissions once production environment
            variables are added.
          </p>
        </div>
        <InterestForm attendeeStatus={attendeeStatus} />
      </section>
    </main>
  );
}
