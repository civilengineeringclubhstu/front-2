'use client';

import { PageHeader } from '@/components/page-header';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const FAQS = [
  { id: 1, question: 'How can I become a member of the club?', answer: 'You can become a member by filling out the membership form during our bi-annual recruitment drives, which usually happen at the beginning of each semester.' },
  { id: 2, question: 'Do I need prior experience to join?', answer: 'No prior experience is necessary! We welcome students from all backgrounds and skill levels. We provide training and resources for all new members.' },
  { id: 3, question: 'How much is the membership fee?', answer: 'The standard membership fee is $50 per academic year. This covers access to all our resources, workshops, and exclusive networking events.' },
  { id: 4, question: 'Can alumni still participate in club activities?', answer: 'Absolutely! Our alumni network is very active. Alumni can join as mentors, guest speakers, or attend our special alumni networking dinners.' },
  { id: 5, question: 'Who can I contact for partnership opportunities?', answer: 'For sponsorships and partnerships, please use our Contact Form and select "Partnership" as the subject, or email us directly at contact@clubplatform.edu.' },
];

function FaqItem({ item, isOpen, onClick }: { item: typeof FAQS[0], isOpen: boolean, onClick: () => void }) {
  return (
    <div className="glass rounded-[24px] overflow-hidden transition-colors hover:bg-white/70 dark:hover:bg-white/10">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none"
      >
        <span className="font-bold text-lg pr-8">{item.question}</span>
        <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-info-light text-white' : 'glass'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 md:px-8 pb-8 text-primary-light/70 dark:text-primary/70 leading-relaxed border-t border-black/5 dark:border-white/5 pt-6">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <div className="container mx-auto px-6 max-w-4xl pb-24">
      <PageHeader title="Frequently Asked Questions" description="Find answers to common questions about our club, membership, and events." />
      
      <div className="flex flex-col gap-4">
        {FAQS.map((faq, idx) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <FaqItem 
              item={faq} 
              isOpen={openId === faq.id} 
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)} 
            />
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 glass-card p-10 text-center">
        <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
        <p className="text-primary-light/70 dark:text-primary/70 mb-8 max-w-lg mx-auto">
          If you couldn&apos;t find the answer to your question, feel free to reach out to our support team.
        </p>
        <a href="/contact" className="btn-primary inline-flex">
          Contact Support
        </a>
      </div>
    </div>
  );
}
