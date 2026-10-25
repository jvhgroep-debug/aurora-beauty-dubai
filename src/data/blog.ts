import posts from './blog-posts.json';

// Keep future or unapproved posts out of generated routes and indexes.
export const publishedBlogPosts = posts.filter((post) =>
  (post.published || ('publicationReady' in post && post.publicationReady === true)) &&
  new Date(post.originalScheduledAt).getTime() <= Date.now()
);

