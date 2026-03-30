import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/persons', '/rooms', '/devices', '/tickets'],
        disallow: ['/admin'],
      },
    ],
    sitemap: 'https://helpdesk-portal.vercel.app/sitemap.xml',
  }
}
