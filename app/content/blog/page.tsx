'use client';

import { PageHeader } from '@/components/page-header';
import Image from 'next/image';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

const BLOG_POSTS = [
  { id: 1, title: 'The Future of AI in Education', excerpt: 'How artificial intelligence is reshaping the way we learn and process information in academic settings.', date: 'Oct 24, 2026', image: 'https://picsum.photos/seed/b1/800/500' },
  { id: 2, title: 'Building Resilient Teams', excerpt: 'Insights from our latest leadership summit on fostering psychological safety and resilience within student organizations.', date: 'Oct 12, 2026', image: 'https://picsum.photos/seed/b2/800/500' },
  { id: 3, title: 'Sustainable Tech Practices', excerpt: 'A deep dive into how modern developers can minimize their carbon footprint through efficient coding practices.', date: 'Sep 28, 2026', image: 'https://picsum.photos/seed/b3/800/500' },
  { id: 4, title: 'Navigating Your First Internship', excerpt: 'Advice from our alumni network on making the most out of your early career opportunities and networking effectively.', date: 'Sep 15, 2026', image: 'https://picsum.photos/seed/b4/800/500' },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-6 max-w-7xl pb-24">
      <PageHeader title="Our Blog" description="Thoughts, stories, and insights from our community." />
      
      <div className="grid md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post, idx) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-card group flex flex-col h-full overflow-hidden"
          >
            <div className="relative h-[250px] w-full overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-info-light font-semibold text-sm mb-3">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 group-hover:text-info-light transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-primary-light/70 dark:text-primary/70 mb-6 line-clamp-3 flex-grow">
                {post.excerpt}
              </p>
              
              <Link href={`/content/blog/${post.id}`} className="inline-flex items-center font-bold text-sm hover:text-info-light transition-colors mt-auto">
                Read Article <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
