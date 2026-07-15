import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'أثر إسلامي',
    short_name: 'أثر',
    description: 'منصة إسلامية متكاملة للتسبيح والأذكار والقرآن وصفحات الأثر',
    start_url: '/',
    display: 'standalone',
    background_color: '#059669',
    theme_color: '#059669',
    icons: [
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
