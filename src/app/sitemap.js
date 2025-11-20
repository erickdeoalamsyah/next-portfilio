export default function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://erickdeoalamsyah.web.id';

  const now = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1
    }
  ];
}
