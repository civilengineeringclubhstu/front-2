const fs = require('fs');
let code = fs.readFileSync('components/navbar.tsx', 'utf8');

// Update navLinks
const oldNavLinks = `  {
    label: 'About',
    children: [
      { href: '/about/leadership', label: 'Leadership' },
      { href: '/about/constitution', label: 'Constitution' },
      { href: '/about/history', label: 'History' },
    ],
  },`;

const newNavLinks = `  {
    label: 'About',
    children: [
      { 
        label: 'Leadership',
        subChildren: [
          { href: '/about/leadership/executive', label: 'Executive' },
          { href: '/about/leadership/alumni', label: 'Alumni' },
          { href: '/about/leadership/advisory', label: 'Advisory' },
          { href: '/about/leadership/taskforce', label: 'Taskforce' },
        ]
      },
      { href: '/about/constitution', label: 'Constitution' },
      { href: '/about/history', label: 'History' },
    ],
  },`;

code = code.replace(oldNavLinks, newNavLinks);

// Replace mapping for desktop
const oldDesktopDropdown = `                    {link.children.map((child, cIdx) => (
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
                    ))}`;

const newDesktopDropdown = `                    {link.children.map((child: any, cIdx) => {
                      if (child.subChildren) {
                        return (
                          <div key={cIdx} className="relative group/sub">
                            <button className="w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-between">
                              {child.label}
                              <ChevronDown className="w-3 h-3 -rotate-90" />
                            </button>
                            <div className="absolute top-0 left-full pl-2 opacity-0 -translate-x-2 pointer-events-none group-hover/sub:opacity-100 group-hover/sub:translate-x-0 group-hover/sub:pointer-events-auto transition-all duration-300">
                              <div className="bg-white/95 dark:bg-[#141923]/95 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-xl rounded-2xl p-2 min-w-[180px] flex flex-col gap-1">
                                {child.subChildren.map((sub: any, sIdx: number) => (
                                  <Link
                                    key={sIdx}
                                    href={sub.href}
                                    className={cn(
                                      'px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/10',
                                      pathname === sub.href ? 'bg-black/5 text-info-light' : ''
                                    )}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return (
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
                      );
                    })}`;

code = code.replace(oldDesktopDropdown, newDesktopDropdown);

// Replace mapping for mobile
const oldMobileDropdown = `{link.children?.map((child, cIdx) => (
                          <Link
                            key={cIdx}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-base py-1 text-primary-light/80 dark:text-primary/80"
                          >
                            {child.label}
                          </Link>
                        ))}`;

const newMobileDropdown = `{link.children?.map((child: any, cIdx) => {
                          if (child.subChildren) {
                            return (
                              <div key={cIdx} className="flex flex-col gap-1 py-1">
                                <div className="text-base font-semibold text-primary-light/80 dark:text-primary/80">{child.label}</div>
                                <div className="flex flex-col gap-1 pl-3 border-l border-black/5 dark:border-white/5">
                                  {child.subChildren.map((sub: any, sIdx: number) => (
                                    <Link
                                      key={sIdx}
                                      href={sub.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="text-sm py-1 text-primary-light/60 dark:text-primary/60"
                                    >
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            );
                          }
                          return (
                            <Link
                              key={cIdx}
                              href={child.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-base py-1 text-primary-light/80 dark:text-primary/80"
                            >
                              {child.label}
                            </Link>
                          );
                        })}`;

code = code.replace(oldMobileDropdown, newMobileDropdown);

fs.writeFileSync('components/navbar.tsx', code);
