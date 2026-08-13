'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';

const navLinks = [
  { href: '/', label: 'Home' },
  {
    label: 'About',
    children: [
      { href: '/about/leadership', label: 'Leadership' },
      { href: '/about/constitution', label: 'Constitution' },
      { href: '/about/history', label: 'History' },
    ],
  },
  {
    label: 'Content',
    children: [
      { href: '/content/gallery', label: 'Gallery' },
      { href: '/content/blog', label: 'Blog' },
      { href: '/content/magazine', label: 'Magazine' },
      { href: '/content/resources', label: 'Resources' },
    ],
  },
  {
    label: 'Event',
    children: [
      { href: '/events/archive', label: 'Archive' },
      { href: '/events/upcoming', label: 'Upcoming' },
      { href: '/events/notice', label: 'Notice' },
    ],
  },
  {
    label: 'Verification',
    children: [
      { href: '/verification/certificate', label: 'Certificate' },
      { href: '/verification/membership', label: 'Membership' },
    ],
  },
  {
    label: 'Contact',
    children: [
      { href: '/contact', label: 'Contact Form' },
      { href: '/contact/location', label: 'Location' },
      { href: '/contact/faq', label: 'FAQ' },
    ],
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 rounded-b-2xl',
        isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-info-light to-blue-400 flex items-center justify-center text-white font-bold text-xl shadow-lg"
          >
            C
          </motion.div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">Club Platform</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, idx) => (
            <div key={idx} className="relative group px-3 py-2">
              {link.href ? (
                <Link
                  href={link.href}
                  className={cn(
                    'font-medium text-sm transition-colors hover:text-info-light flex items-center gap-1',
                    pathname === link.href ? 'text-info-light' : 'text-primary-light/80 dark:text-primary/80'
                  )}
                >
                  {link.label}
                </Link>
              ) : (
                <button className="font-medium text-sm transition-colors hover:text-info-light text-primary-light/80 dark:text-primary/80 flex items-center gap-1">
                  {link.label}
                  <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
                </button>
              )}

              {/* Dropdown */}
              {link.children && (
                <div className="absolute top-full left-0 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                  <div className="bg-white/95 dark:bg-[#141923]/95 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-xl rounded-2xl rounded-tr-none rounded-tl-none p-2 min-w-[200px] flex flex-col gap-1">
                    {link.children.map((child, cIdx) => (
                      <Link
                        key={cIdx}
                        href={child.href}
                        className={cn(
                          'px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/10',
                          pathname === child.href ? 'bg-black/5 text-info-light' : ''
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button 
            className="lg:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/20 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  {link.href ? (
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-bold text-lg"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <>
                      <div className="font-bold text-lg text-primary-light/50">{link.label}</div>
                      <div className="flex flex-col gap-2 pl-4 border-l-2 border-black/10 dark:border-white/10">
                        {link.children?.map((child, cIdx) => (
                          <Link
                            key={cIdx}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-base py-1 text-primary-light/80 dark:text-primary/80"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
