'use client';

import { PageHeader } from '@/components/page-header';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function LocationPage() {
  return (
    <div className="container mx-auto px-6 max-w-7xl pb-24">
      <PageHeader title="Our Location" description="Come visit us at our headquarters." />
      
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 flex flex-col gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-info-light/10 text-info-light flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl">Address</h3>
          <p className="text-primary-light/70 dark:text-primary/70">
            University Campus, Academic Block 4<br />
            Room 402, 4th Floor<br />
            City, Country 12345
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 flex flex-col gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-info-light/10 text-info-light flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl">Office Hours</h3>
          <div className="text-primary-light/70 dark:text-primary/70 flex flex-col gap-1">
            <div className="flex justify-between"><span>Mon - Fri:</span> <span>10:00 AM - 6:00 PM</span></div>
            <div className="flex justify-between"><span>Saturday:</span> <span>10:00 AM - 2:00 PM</span></div>
            <div className="flex justify-between"><span>Sunday:</span> <span>Closed</span></div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 flex flex-col gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-info-light/10 text-info-light flex items-center justify-center">
            <Navigation className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl">Directions</h3>
          <p className="text-primary-light/70 dark:text-primary/70">
            Enter through the main gate, take the first right towards the science buildings. We are located in the glass building next to the central library.
          </p>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full h-[500px] rounded-[36px] overflow-hidden glass p-4 border-white/20 shadow-2xl"
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sus!4v1714246820542!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0, borderRadius: '24px' }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>
    </div>
  );
}
