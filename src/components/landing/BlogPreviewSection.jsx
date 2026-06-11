import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowRight, Calendar } from "lucide-react";

export default function BlogPreviewSection() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    base44.entities.BlogPost.filter({ published: true }, "-published_date", 3)
      .then(setPosts)
      .catch(() => {});
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="py-20 bg-white" id="blog">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#F05A28" }}>Blog</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Latest Insights</h2>
          </div>
          <Link
            to="/blog"
            className="hidden md:inline-flex items-center gap-1 text-sm font-semibold hover:opacity-80 transition-opacity"
            style={{ color: "#F05A28" }}
          >
            View all posts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug || post.id}`}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {post.cover_image && (
                <div className="h-44 overflow-hidden">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{post.excerpt}</p>
                )}
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  <span>{post.published_date || ""}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-sm font-semibold"
            style={{ color: "#F05A28" }}
          >
            View all posts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}