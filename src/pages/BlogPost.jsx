import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-gray-700">Post not found.</p>
        <Link to="/blog" className="text-sm font-medium" style={{ color: "#F05A28" }}>← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar />
      <div className="pt-24 pb-20 max-w-3xl mx-auto px-6">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {post.cover_image && (
          <div className="rounded-2xl overflow-hidden mb-8 h-64 md:h-80">
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center gap-1 mb-4">
            <Tag className="w-3 h-3" style={{ color: "#F05A28" }} />
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs font-semibold uppercase tracking-wider mr-2" style={{ color: "#F05A28" }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
          {post.author_avatar && (
            <img src={post.author_avatar} alt={post.author_name} className="w-9 h-9 rounded-full object-cover" />
          )}
          {post.author_name && <span className="text-sm font-medium text-gray-700">{post.author_name}</span>}
          {post.published_date && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              <span>{post.published_date}</span>
            </div>
          )}
        </div>

        <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
      <Footer />
    </div>
  );
}