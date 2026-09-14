import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://workroo.com";
const DEFAULT_TITLE = "Workroo — Mechanics and customers, connected in real time";
const DEFAULT_DESCRIPTION =
  "Workroo connects mechanics and customers in real time with live workshop updates and a transparent record of every repair.";

function upsertMeta(attribute, value, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${value}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function removeMeta(attribute, value) {
  document.head.querySelector(`meta[${attribute}="${value}"]`)?.remove();
}

function upsertCanonical(href) {
  let tag = document.head.querySelector('link[rel="canonical"]');

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
}

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  type = "website",
  image = undefined,
  noindex = false,
}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const canonicalPath = pathname.replace(/\/+$/, "") || "/";
    const canonicalUrl = new URL(canonicalPath, SITE_URL).toString();
    const robots = noindex ? "noindex, nofollow" : "index, follow";

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:site_name", "Workroo");
    upsertMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertCanonical(canonicalUrl);

    if (image) {
      upsertMeta("property", "og:image", image);
      upsertMeta("name", "twitter:image", image);
    } else {
      removeMeta("property", "og:image");
      removeMeta("name", "twitter:image");
    }
  }, [description, image, noindex, pathname, title, type]);

  return null;
}
