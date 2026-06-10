"use client";

import { useEffect, useState, useTransition } from "react";
import { type ArchivePost, type ReactionKey } from "@/data/mock-posts";

type CardReactionsProps = {
  post: ArchivePost;
};

const stickerEmojis: Record<ReactionKey, string> = {
  thumbsup: "👍",
  fire: "🔥",
  heart: "❤️",
  crazy: "🤪"
};

const rotationOffsets: Record<ReactionKey, number> = {
  thumbsup: -5,
  fire: 6,
  heart: -4,
  crazy: 7
};

export function CardReactions({ post }: CardReactionsProps) {
  const [counts, setCounts] = useState<Record<ReactionKey, number>>(post.mockCounts);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let ignore = false;

    fetch(`/api/reactions/${post.id}`)
      .then((res) => res.json())
      .then((payload: { counts?: Partial<Record<ReactionKey, number>> | null }) => {
        if (ignore || !payload.counts) return;
        setCounts((current) => ({
          ...current,
          ...payload.counts
        }));
      })
      .catch(() => {});

    return () => {
      ignore = true;
    };
  }, [post.id]);

  function react(reaction: ReactionKey) {
    const previous = counts;
    setCounts((current) => ({ ...current, [reaction]: current[reaction] + 1 }));

    startTransition(async () => {
      const response = await fetch(`/api/reactions/${post.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reaction })
      }).catch(() => null);

      if (!response?.ok) {
        setCounts(previous);
        return;
      }

      const payload = (await response.json()) as { count?: number };
      if (typeof payload.count === "number") {
        setCounts((current) => ({ ...current, [reaction]: payload.count ?? current[reaction] }));
      }
    });
  }

  return (
    <div className="card-reactions-wrapper">
      {/* Floating Transparent Reaction Barrel Wheel Menu (Appears on Hover) */}
      <div className="tweet-reaction-wheel" aria-label="Quick reactions">
        {(Object.keys(stickerEmojis) as ReactionKey[]).map((key) => (
          <button
            key={key}
            className={`wheel-btn ${key}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              react(key);
            }}
            disabled={isPending}
            aria-label={`React with ${key}`}
          >
            {stickerEmojis[key]}
          </button>
        ))}
      </div>

      {/* Card count stickers */}
      <div className="card-reactions-group" aria-live="polite">
        {(Object.keys(stickerEmojis) as ReactionKey[]).map((key) => {
          if (counts[key] === 0) return null;
          return (
            <button
              key={key}
              className={`card-sticker-badge badge-${key}`}
              style={{ "--sticker-rot": `${rotationOffsets[key]}deg` } as React.CSSProperties}
              type="button"
              onClick={() => react(key)}
              disabled={isPending}
              aria-label={`React with ${key}`}
            >
              <span className="card-sticker-emoji">{stickerEmojis[key]}</span>
              <span className="card-sticker-count">{counts[key]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
