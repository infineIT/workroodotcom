import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";

export default function BlogPost() {
  const { slugOrId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      // Try by slug first, fall back to id
      const bySlug = await base44.entities.BlogPost.filter({ slug: slugOrId });
      if (bySlug && bySlug.length > 0) {
        setPost(bySlug[0]);
      } else {
        try {
          const byId = await base44.entities.BlogPost.get(slugOrId);
          setPost(byId);
        } catch {
          setNotFound(true);
        }
      }
      setLoading(false);
    }
    load();
  }, [slugOrId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-line border-t-brand-blue rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6">
        <p className="text-brand-ink text-2xl font-display font-semibold">
          Post not found.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center rounded-pill border border-brand-ink px-6 py-3 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-ink hover:text-white"
        >
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="section-pad bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          to="/blog"
          className="inline-block mb-10 text-xs font-semibold uppercase tracking-[0.14em] text-brand-slate transition-colors hover:text-brand-blue"
        >
          ← Back to blog
        </Link>

        {post.tags && post.tags.length > 0 && (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
            {post.tags.join(" · ")}
          </p>
        )}

        <h1 className="text-brand-ink mb-8 text-[clamp(1.9rem,4.5vw,3rem)]">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-10 pb-8 border-b border-brand-line">
          {post.author_avatar && (
            <img
              src={post.author_avatar}
              alt={post.author_name}
              className="w-9 h-9 rounded-full object-cover"
            />
          )}
          {post.author_name && (
            <span className="text-brand-ink text-sm font-medium">
              {post.author_name}
            </span>
          )}
          {post.published_date && (
            <span className="text-xs uppercase tracking-[0.14em] text-brand-slate">
              {post.published_date}
            </span>
          )}
        </div>

        {post.cover_image && (
          <div className="img-frame h-64 md:h-96 mb-12">
            <img src={post.cover_image} alt={post.title} />
          </div>
        )}

        <div className="post-prose">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
