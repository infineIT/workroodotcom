import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SectionHeading, { Accent } from "@/components/ui-brand/SectionHeading";
import Reveal from "@/components/ui-brand/Reveal";

export default function BlogPreview() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    base44.entities.BlogPost.filter({ published: true }, "-published_date", 3)
      .then(setPosts)
      .catch(() => {});
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="section-pad bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Resources"
            title={<>From the <Accent>workshop</Accent>.</>}
          />
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark"
          >
            View all posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.06}>
              <Link
                to={`/blog/${post.slug || post.id}`}
                className="group block rounded-card border border-brand-line overflow-hidden bg-white h-full"
              >
                {post.cover_image && (
                  <div className="img-frame aspect-[16/10] rounded-none">
                    <img src={post.cover_image} alt={post.title} />
                  </div>
                )}
                <div className="p-6">
                  <span className="text-xs uppercase tracking-[0.14em] text-brand-slate">
                    {post.published_date || ""}
                  </span>
                  <h3 className="mt-2 text-lg text-brand-ink group-hover:text-brand-blue transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-brand-slate line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
