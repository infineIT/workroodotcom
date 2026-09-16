import { base44, hasBase44Config } from "@/api/base44Client";

const isRecord = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

export async function getPublishedPosts(limit = 50) {
  if (!hasBase44Config || !base44) return [];

  try {
    const result = await base44.entities.BlogPost.filter(
      { published: true },
      "-published_date",
      limit
    );

    return Array.isArray(result) ? result.filter(isRecord) : [];
  } catch {
    return [];
  }
}

export async function getBlogPost(slugOrId) {
  if (!hasBase44Config || !base44) return null;

  try {
    const bySlug = await base44.entities.BlogPost.filter({ slug: slugOrId });
    if (Array.isArray(bySlug) && bySlug.length > 0 && isRecord(bySlug[0])) {
      return bySlug[0];
    }

    const byId = await base44.entities.BlogPost.get(slugOrId);
    return isRecord(byId) ? byId : null;
  } catch {
    return null;
  }
}
