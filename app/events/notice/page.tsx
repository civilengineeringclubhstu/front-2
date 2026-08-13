'use client';

import { PageHeader } from '@/components/page-header';
import { motion } from 'motion/react';
import { Bell, Calendar } from 'lucide-react';

const NOTICES = [
  { id: 1, title: 'Call for Executive Committee Nominations', date: 'Oct 20, 2026', desc: 'Nominations for the 2027 Executive Committee are now open. All active members are encouraged to apply.' },
  { id: 2, title: 'Venue Change: Winter Code Camp', date: 'Oct 15, 2026', desc: 'Please note that the venue for the upcoming Winter Code Camp has been moved to Computer Lab 3 to accommodate more participants.' },
  { id: 3, title: 'Membership Renewal Reminder', date: 'Oct 01, 2026', desc: 'A friendly reminder to renew your club membership for the upcoming academic year before the end of the month.' },
  { id: 4, title: 'New Resource Added: AI Prompting Guide', date: 'Sep 25, 2026', desc: 'We have added a comprehensive new guide on AI prompting to our Resources section. Check it out!' },
  { id: 5, title: 'Hackathon Winners Announced', date: 'Sep 10, 2026', desc: 'Congratulations to Team Alpha for winning the Code for Good Hackathon 2026. View the full list of winners on our blog.' },
];

export default function NoticePage() {
  return (
    <div className="container mx-auto px-6 max-w-4xl pb-24">
      <PageHeader title="Notices & Announcements" noTopSpace />
      
      <div className="flex flex-col gap-4">
        {NOTICES.map((notice, idx) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="glass rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:bg-white/80 dark:hover:bg-white/10 transition-colors"
          >
            <div className="hidden md:flex shrink-0 w-16 h-16 rounded-full bg-info-light/10 text-info-light items-center justify-center">
              <Bell className="w-8 h-8" />
            </div>
            
            <div className="flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-sm font-bold text-info-light mb-2">
                <Calendar className="w-4 h-4" /> {notice.date}
              </div>
              <h3 className="text-xl font-bold mb-3">{notice.title}</h3>
              <p className="text-primary-light/70 dark:text-primary/70 leading-relaxed">
                {notice.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 flex justify-center">
        <button className="btn-secondary">Load Older Notices</button>
      </div>
    </div>
  );
}
