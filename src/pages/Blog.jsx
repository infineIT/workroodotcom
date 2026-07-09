import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { usePageMotion } from "@/lib/motion";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const motionRef = usePageMotion([loading]);

  useEffect(() => {
    base44.entities.BlogPost.filter({ published: true }, "-published_date", 50)
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div ref={motionRef} className="min-h-screen bg-cream font-body">
      <Navbar />
      <div className="pt-32 md:pt-44 pb-24 max-w-6xl mx-auto px-6">
        <div className="mb-16 md:mb-24" data-reveal-group>
          <p className="eyebrow label-bar mb-6" data-reveal>
            Blog
          </p>
          <h1
            className="text-ink mb-6"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}
            data-reveal
          >
            From the <span className="text-rust">workshop</span>.
          </h1>
          <p className="text-ink/75 text-lg max-w-md" data-reveal>
            Tips, stories and news from the Workroo team.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-hairline border-t-ink rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-taupe py-24 text-xl font-medium">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div>
            {posts.map((post, i) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug || post.id}`}
                className={`group grid grid-cols-1 md:grid-cols-12 gap-6 items-center hairline-t py-10 ${
                  i === posts.length - 1 ? "hairline-b" : ""
                }`}
              >
                <div className="md:col-span-2 flex flex-col gap-2">
                  <span className="eyebrow eyebrow-muted">{post.published_date || ""}</span>
                  {post.tags && post.tags.length > 0 && (
                    <span className="text-rust text-xs font-semibold uppercase tracking-[0.14em]">
                      {post.tags[0]}
                    </span>
                  )}
                </div>
                <div className="md:col-span-7">
                  <h2
                    className="text-ink font-semibold transition-colors duration-300 group-hover:text-rust"
                    style={{ fontSize: "clamp(1.3rem, 2.4vw, 1.8rem)" }}
                  >
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-taupe text-sm leading-relaxed mt-3 max-w-xl">
                      {post.excerpt}
                    </p>
                  )}
                </div>
                <div className="md:col-span-3 md:justify-self-end">
                  {post.cover_image && (
                    <div className="img-frame w-full md:w-48 h-32">
                      <img src={post.cover_image} alt={post.title} />
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
