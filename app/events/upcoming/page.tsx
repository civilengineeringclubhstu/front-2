'use client';

import { PageHeader } from '@/components/page-header';
import Image from 'next/image';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, Ticket } from 'lucide-react';

const UPCOMING = [
  { id: 1, title: 'Annual Tech Symposium 2026', date: 'November 14, 2026', time: '09:00 AM', location: 'Main Auditorium', desc: 'Join us for our biggest event of the year featuring keynote speakers from top tech companies, interactive workshops, and a massive networking session.', image: 'https://picsum.photos/seed/u1/800/450' },
  { id: 2, title: 'Winter Code Camp', date: 'December 20, 2026', time: '10:00 AM', location: 'Computer Lab 3', desc: 'A week-long intensive coding bootcamp designed to take your web development skills to the next level.', image: 'https://picsum.photos/seed/u2/800/450' },
];

export default function UpcomingPage() {
  return (
    <div className="container mx-auto px-6 max-w-7xl pb-24">
      <PageHeader title="Upcoming Events" description="Register and save your spot for our next big things." />
      
      <div className="flex flex-col gap-12">
        {UPCOMING.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="glass-card overflow-hidden group flex flex-col md:flex-row"
          >
            <div className="relative md:w-2/5 aspect-video md:aspect-auto h-64 md:h-auto overflow-hidden shrink-0">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </div>
            
            <div className="p-8 md:p-10 flex flex-col justify-center flex-grow">
              <div className="flex flex-wrap gap-4 text-sm font-bold text-info-light mb-4">
                <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {event.date}</div>
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {event.time}</div>
              </div>
              
              <h3 className="text-3xl font-bold mb-4">{event.title}</h3>
              
              <div className="flex items-center gap-2 text-primary-light/60 dark:text-primary/60 font-semibold mb-6">
                <MapPin className="w-5 h-5" /> {event.location}
              </div>
              
              <p className="text-primary-light/80 dark:text-primary/80 text-lg leading-relaxed mb-8">
                {event.desc}
              </p>
              
              <div className="flex flex-wrap gap-4 mt-auto">
                <button className="btn-primary">
                  <Ticket className="w-5 h-5 mr-2" /> Register Now
                </button>
                <button className="btn-secondary">
                  Add to Calendar
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
