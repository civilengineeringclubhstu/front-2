const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// Add import
code = code.replace("import { ArrowRight, Calendar, Users, Award, BookOpen, MapPin, CalendarPlus } from 'lucide-react';", 
  "import { ArrowRight, Calendar, Users, Award, BookOpen, MapPin, CalendarPlus } from 'lucide-react';\nimport { getLatestBlogs, getUpcomingEvents } from '@/lib/db';");

// Update Home component signature
code = code.replace("export default function Home() {", 
  `export default function Home() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const b = await getLatestBlogs(3);
      const e = await getUpcomingEvents(3);
      setBlogs(b);
      setUpcomingEvents(e);
    }
    loadData();
  }, []);`);

// Update Blog rendering
const oldBlogStrip = `            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6" style={{ perspective: 1000 }}>
              {[1, 2, 3].map((item) => (
                <motion.div 
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: item * 0.1 }}
                  className="glass-card group flex flex-col h-full overflow-hidden"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                      src={\`https://picsum.photos/seed/blog\${item}/600/400\`}
                      alt="Blog cover"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs font-bold text-info-light mb-2">OCT 12, 2026</div>
                    <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-info-light transition-colors">
                      Transforming the Future of Digital Leadership
                    </h3>
                    <p className="text-primary-light/70 dark:text-primary/70 text-sm line-clamp-3 mb-4 flex-grow">
                      Explore the nuances of modern leadership in an increasingly digital world, featuring insights from our alumni network.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>`;

const newBlogStrip = `            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6" style={{ perspective: 1000 }}>
              {blogs.map((item, idx) => (
                <motion.div 
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card group flex flex-col h-full overflow-hidden"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                      src={item.coverImageUrl || \`https://picsum.photos/seed/blog\${idx}/600/400\`}
                      alt="Blog cover"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs font-bold text-info-light mb-2">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase() : "OCT 12, 2026"}
                    </div>
                    <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-info-light transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-primary-light/70 dark:text-primary/70 text-sm line-clamp-3 mb-4 flex-grow">
                      {item.contentMarkdown ? item.contentMarkdown.replace(/<[^>]+>/g, '').substring(0, 150) : "Explore the nuances of modern leadership..."}
                    </p>
                  </div>
                </motion.div>
              ))}
              {blogs.length === 0 && (
                <div className="col-span-full py-8 text-center text-primary-light/50 dark:text-primary/50">
                  No blogs available yet.
                </div>
              )}
            </div>`;

code = code.replace(oldBlogStrip, newBlogStrip);


const oldEventsStrip = `            <div className="glass rounded-[32px] p-2 flex flex-col gap-2">
              {[
                { title: 'Annual Tech Symposium 2026', month: 'Nov', day: '14', loc: 'Main Auditorium', start: '20261114T090000Z', end: '20261114T170000Z' },
                { title: 'Leadership Workshop', month: 'Nov', day: '21', loc: 'Room 4B', start: '20261121T100000Z', end: '20261121T140000Z' },
                { title: 'End of Year Gala', month: 'Dec', day: '10', loc: 'Grand Hall', start: '20261210T180000Z', end: '20261210T230000Z' }
              ].map((item, idx) => (`;

const newEventsStrip = `            <div className="glass rounded-[32px] p-2 flex flex-col gap-2">
              {upcomingEvents.length === 0 && (
                <div className="p-8 text-center text-primary-light/50 dark:text-primary/50">
                  No upcoming events scheduled.
                </div>
              )}
              {upcomingEvents.map((item, idx) => {
                const eventDate = item.eventDate ? new Date(item.eventDate) : new Date();
                const month = eventDate.toLocaleString('default', { month: 'short' });
                const day = eventDate.getDate().toString();
                // Simple start/end format for google calendar (very rudimentary)
                const startStr = item.eventDate ? item.eventDate.replace(/-/g, '') + 'T' + (item.time ? item.time.replace(':', '') + '00Z' : '090000Z') : '20261114T090000Z';
                const endStr = item.eventDate ? item.eventDate.replace(/-/g, '') + 'T' + '235900Z' : '20261114T170000Z';

                return (`;

code = code.replace(oldEventsStrip, newEventsStrip);

// Replace properties used inside the events map
code = code.replace(/\{item\.month\}/g, '{month}');
code = code.replace(/\{item\.day\}/g, '{day}');
code = code.replace(/item\.loc/g, '(item.location || "TBA")');
code = code.replace(/item\.start/g, 'startStr');
code = code.replace(/item\.end/g, 'endStr');

fs.writeFileSync('app/page.tsx', code);
