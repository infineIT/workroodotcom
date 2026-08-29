import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/ui-brand/Reveal";
import { Accent } from "@/components/ui-brand/SectionHeading";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.BlogPost.filter({ published: true }, "-published_date", 50)
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-pad bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <Reveal as="p" className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-slate">
            Blog
          </Reveal>
          <Reveal as="h1" delay={0.05} className="mt-5 text-[clamp(2.2rem,5vw,3.6rem)] text-brand-ink">
            From the <Accent>workshop</Accent>.
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-5 text-lg text-brand-ink/70">
            Tips, stories and news from the Workroo team.
          </Reveal>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-brand-line border-t-brand-blue rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-brand-slate py-24 text-xl font-medium">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={(i % 3) * 0.05}>
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
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-brand-slate">
                      <span>{post.published_date || ""}</span>
                      {post.tags && post.tags.length > 0 && (
                        <span className="text-brand-blue font-semibold">
                          {post.tags[0]}
                        </span>
                      )}
                    </div>
                    <h2 className="mt-2 text-lg text-brand-ink group-hover:text-brand-blue transition-colors">
                      {post.title}
                    </h2>
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
        )}
      </div>
    </section>
  );
}
