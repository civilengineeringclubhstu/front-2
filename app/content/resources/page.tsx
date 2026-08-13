'use client';

import { PageHeader } from '@/components/page-header';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Download, FileText, File, Video, Code } from 'lucide-react';
import { useState } from 'react';

const RESOURCES = [
  { id: 1, title: 'Leadership Workshop Slides', type: 'PDF', category: 'Workshop', image: 'https://picsum.photos/seed/r1/400/300' },
  { id: 2, title: 'Annual Report 2025', type: 'DOCX', category: 'Official', image: 'https://picsum.photos/seed/r2/400/300' },
  { id: 3, title: 'React Best Practices', type: 'CODE', category: 'Technical', image: 'https://picsum.photos/seed/r3/400/300' },
  { id: 4, title: 'Event Planning Template', type: 'XLSX', category: 'Management', image: 'https://picsum.photos/seed/r4/400/300' },
  { id: 5, title: 'Marketing Assets Pack', type: 'ZIP', category: 'Design', image: 'https://picsum.photos/seed/r5/400/300' },
  { id: 6, title: 'Keynote Recording', type: 'MP4', category: 'Video', image: 'https://picsum.photos/seed/r6/400/300' },
];

const FILE_TYPES = ['All', 'PDF', 'DOCX', 'XLSX', 'ZIP', 'MP4', 'CODE'];

const getIcon = (type: string) => {
  switch (type) {
    case 'PDF': return <FileText className="w-4 h-4" />;
    case 'MP4': return <Video className="w-4 h-4" />;
    case 'CODE': return <Code className="w-4 h-4" />;
    default: return <File className="w-4 h-4" />;
  }
};

export default function ResourcesPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredResources = activeFilter === 'All' 
    ? RESOURCES 
    : RESOURCES.filter(r => r.type === activeFilter);

  return (
    <div className="container mx-auto px-6 max-w-7xl pb-24">
      <PageHeader title="Resources" noTopSpace />
      
      {/* Filter Ribbon */}
      <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar">
        {FILE_TYPES.map(type => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
              activeFilter === type 
                ? 'bg-info-light text-white shadow-lg shadow-info-light/30' 
                : 'glass hover:bg-white/80 dark:hover:bg-white/10'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      
      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredResources.map((resource) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={resource.id}
              className="glass-card flex flex-col overflow-hidden group"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={resource.image}
                  alt={resource.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  {getIcon(resource.type)} {resource.type}
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <div className="text-xs font-bold text-info-light uppercase tracking-wider mb-2">
                  {resource.category}
                </div>
                <h3 className="font-bold text-lg leading-tight mb-4 group-hover:text-info-light transition-colors line-clamp-2">
                  {resource.title}
                </h3>
                
                <button className="mt-auto flex items-center justify-center w-full py-2.5 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-info-light hover:text-white transition-colors font-semibold text-sm gap-2">
                  <Download className="w-4 h-4" /> Download
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      <div className="mt-12 flex justify-center">
        <button className="btn-secondary">Load More</button>
      </div>
    </div>
  );
}
