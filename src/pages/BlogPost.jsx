import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ReactMarkdown from "react-markdown";
import { usePageMotion } from "@/lib/motion";

export default function BlogPost() {
  const { slugOrId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const motionRef = usePageMotion([loading]);

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
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-hairline border-t-ink rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6 px-6">
        <p className="font-display text-ink text-3xl">Post not found.</p>
        <Link to="/blog" className="btn-pill">
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div ref={motionRef} className="min-h-screen bg-cream font-body">
      <Navbar />
      <div className="pt-32 md:pt-44 pb-24 max-w-3xl mx-auto px-6">
        <Link
          to="/blog"
          className="eyebrow inline-block mb-10 transition-colors hover:text-rust"
        >
          ← Back to blog
        </Link>

        {post.tags && post.tags.length > 0 && (
          <p className="eyebrow mb-4">{post.tags.join(" · ")}</p>
        )}

        <h1
          className="font-display text-ink mb-8"
          style={{ fontSize: "clamp(2.3rem, 5.5vw, 3.8rem)" }}
        >
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-10 pb-8 hairline-b">
          {post.author_avatar && (
            <img
              src={post.author_avatar}
              alt={post.author_name}
              className="w-9 h-9 rounded-full object-cover"
            />
          )}
          {post.author_name && (
            <span className="text-ink text-sm font-medium">{post.author_name}</span>
          )}
          {post.published_date && (
            <span className="eyebrow">{post.published_date}</span>
          )}
        </div>

        {post.cover_image && (
          <div className="img-frame h-64 md:h-96 mb-12" data-img-reveal data-parallax>
            <img src={post.cover_image} alt={post.title} />
          </div>
        )}

        <div className="post-prose">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
      <Footer />
    </div>
  );
}
