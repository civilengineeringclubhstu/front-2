'use client';

import { PageHeader } from '@/components/page-header';
import Image from 'next/image';
import { motion } from 'motion/react';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

const EVENTS = [
  { id: 1, title: 'Annual Tech Symposium 2025', date: 'October 15, 2025', location: 'Main Auditorium', desc: 'A gathering of minds to discuss the future of technology and its impact on society.', image: 'https://picsum.photos/seed/e1/800/450', isUpcoming: false },
  { id: 2, title: 'Leadership Retreat', date: 'August 10, 2025', location: 'Mountain Resort', desc: 'An intensive weekend focused on team building, strategy planning, and personal growth.', image: 'https://picsum.photos/seed/e2/800/450', isUpcoming: false },
  { id: 3, title: 'Hackathon: Code for Good', date: 'June 5, 2025', location: 'Innovation Lab', desc: '48 hours of coding to solve real-world problems faced by local NGOs.', image: 'https://picsum.photos/seed/e3/800/450', isUpcoming: false },
  { id: 4, title: 'Alumni Networking Dinner', date: 'April 20, 2025', location: 'Grand Hotel', desc: 'Connecting current members with our extensive alumni network across various industries.', image: 'https://picsum.photos/seed/e4/800/450', isUpcoming: false },
];

export default function ArchivePage() {
  return (
    <div className="container mx-auto px-6 max-w-7xl pb-24">
      <PageHeader title="Event Archive" description="A look back at our past milestones and gatherings." />
      
      <div className="grid md:grid-cols-2 gap-8">
        {EVENTS.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-card overflow-hidden group flex flex-col"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold mb-3 group-hover:text-info-light transition-colors line-clamp-1">{event.title}</h3>
              
              <div className="flex flex-wrap gap-4 text-sm font-semibold text-secondary-light mb-4">
                <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {event.date}</div>
                <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {event.location}</div>
              </div>
              
              <p className="text-primary-light/70 dark:text-primary/70 mb-6 flex-grow">{event.desc}</p>
              
              <button className="flex items-center font-bold text-sm text-info-light hover:underline">
                View Event Details <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 flex justify-center">
        <button className="btn-secondary">Load More</button>
      </div>
    </div>
  );
}
