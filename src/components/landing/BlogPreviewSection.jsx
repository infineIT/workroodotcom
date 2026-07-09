import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";

export default function BlogPreviewSection() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    base44.entities.BlogPost.filter({ published: true }, "-published_date", 3)
      .then(setPosts)
      .catch(() => {});
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="section-pad bg-cream" id="blog">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12" data-reveal-group>
          <div data-reveal>
            <p className="eyebrow label-bar mb-5">Blog</p>
            <h2
              className="text-ink"
              style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)" }}
            >
              From the <span className="text-rust">workshop</span>.
            </h2>
          </div>
          <Link to="/blog" className="btn-pill" data-reveal>
            View all posts
          </Link>
        </div>

        <div data-reveal-group>
          {posts.map((post, i) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug || post.id}`}
              className={`group grid grid-cols-1 md:grid-cols-12 gap-6 items-center hairline-t py-8 ${
                i === posts.length - 1 ? "hairline-b" : ""
              }`}
              data-reveal
            >
              <div className="md:col-span-2">
                <span className="eyebrow eyebrow-muted">{post.published_date || ""}</span>
              </div>
              <div className="md:col-span-7">
                <h3
                  className="text-ink font-semibold transition-colors duration-300 group-hover:text-rust"
                  style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)" }}
                >
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-taupe text-sm mt-2 max-w-xl">{post.excerpt}</p>
                )}
              </div>
              <div className="md:col-span-3 md:justify-self-end">
                {post.cover_image && (
                  <div className="img-frame w-full md:w-44 h-28">
                    <img src={post.cover_image} alt={post.title} />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
