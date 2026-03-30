import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://helpdesk-portal.vercel.app'

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/persons`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.8 },
    { url: `${base}/rooms`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${base}/devices`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.8 },
    { url: `${base}/tickets`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
  ]
}
