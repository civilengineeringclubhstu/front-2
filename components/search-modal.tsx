'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Loader2 } from 'lucide-react';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Highlight, Configure, useInstantSearch } from 'react-instantsearch';

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '';
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || '';

const searchClient = appId && apiKey ? algoliasearch(appId, apiKey) : null;

const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'content';

// Custom wrapper to handle empty queries and loading states
function EmptyQueryBoundary({ children, fallback }: { children: React.ReactNode, fallback?: React.ReactNode }) {
  const { indexUiState } = useInstantSearch();
  if (!indexUiState.query) {
    return (
      <div className="py-12 text-center text-primary-light/50 dark:text-primary/50">
        {fallback || "Start typing to search..."}
      </div>
    );
  }
  return <>{children}</>;
}

function Hit({ hit }: any) {
  return (
    <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer group">
      <h3 className="font-bold text-lg mb-1 group-hover:text-info-light transition-colors">
        <Highlight attribute="title" hit={hit} classNames={{ highlighted: 'bg-yellow-200/50 dark:bg-yellow-500/20 text-inherit' }} />
      </h3>
      <p className="text-sm text-primary-light/70 dark:text-primary/70 line-clamp-2">
        <Highlight attribute="description" hit={hit} classNames={{ highlighted: 'bg-yellow-200/50 dark:bg-yellow-500/20 text-inherit' }} />
      </p>
    </div>
  );
}

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const hasKeys = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID && process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#141923] rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden flex flex-col max-h-[80vh]"
          >
            {hasKeys && searchClient ? (
              <InstantSearch searchClient={searchClient} indexName={indexName}>
                <Configure hitsPerPage={5} />
                <div className="p-4 border-b border-black/10 dark:border-white/10 flex items-center gap-3">
                  <Search className="w-5 h-5 text-primary-light/50 dark:text-primary/50" />
                  <SearchBox 
                    placeholder="Search blogs, events, leaders..."
                    classNames={{
                      root: 'flex-1',
                      form: 'relative flex items-center',
                      input: 'w-full bg-transparent border-none outline-none text-lg placeholder:text-primary-light/40 dark:placeholder:text-primary/40',
                      submit: 'hidden',
                      reset: 'hidden',
                      loadingIndicator: 'hidden'
                    }}
                    autoFocus
                  />
                  <button 
                    onClick={onClose}
                    className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="overflow-y-auto flex-1 p-4">
                  <EmptyQueryBoundary>
                    <Hits 
                      hitComponent={Hit} 
                      classNames={{
                        root: 'h-full',
                        list: 'flex flex-col gap-3',
                        item: 'list-none'
                      }}
                    />
                  </EmptyQueryBoundary>
                </div>
                
                <div className="p-3 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 flex items-center justify-between text-xs text-primary-light/60 dark:text-primary/60">
                  <div className="flex items-center gap-1">
                    <span>Search by</span>
                    <span className="font-bold text-[#5468ff]">Algolia</span>
                  </div>
                  <span>esc to close</span>
                </div>
              </InstantSearch>
            ) : (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 mb-2">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Search Unavailable</h3>
                <p className="text-primary-light/70 dark:text-primary/70 max-w-md">
                  Algolia search keys are missing. Please add NEXT_PUBLIC_ALGOLIA_APP_ID and NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY to your environment variables.
                </p>
                <button 
                  onClick={onClose}
                  className="mt-4 px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
