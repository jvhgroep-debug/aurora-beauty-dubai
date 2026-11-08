import posts from './blog-posts.json';

// One date/status selection shared by articles, overview and sitemap routes.
export const publishedBlogPosts = posts.filter((post) => {
  const record = post as typeof post & { publishAt?: string; publicationStatus?: string };
  if (['cancelled-by-schedule-change', 'skipped-quality'].includes(record.publicationStatus ?? '')) return false;
  const ready = post.published || ('publicationReady' in post && post.publicationReady === true);
  return ready && [post.originalScheduledAt, record.publishAt ?? post.originalScheduledAt, post.datePublished].every(value => Number.isFinite(Date.parse(value)) && Date.parse(value) <= Date.now());
});
