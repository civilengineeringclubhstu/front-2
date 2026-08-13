const fs = require('fs');

// Patch upcoming page
let upCode = fs.readFileSync('app/events/upcoming/page.tsx', 'utf8');
upCode = upCode.replace("import { MapPin, Calendar, Clock, Ticket } from 'lucide-react';", 
  "import { MapPin, Calendar, Clock, Ticket } from 'lucide-react';\nimport { useEffect, useState } from 'react';\nimport { getUpcomingEvents } from '@/lib/db';");

upCode = upCode.replace("export default function UpcomingPage() {", 
  `export default function UpcomingPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const e = await getUpcomingEvents(20);
      setEvents(e);
      setLoading(false);
    }
    fetchEvents();
  }, []);`);

const upReturnOld = `        {UPCOMING.map((event, idx) => (`
const upReturnNew = `        {loading && <div className="text-center p-8">Loading upcoming events...</div>}
        {!loading && events.length === 0 && (
          <div className="text-center p-8">No upcoming events scheduled at the moment.</div>
        )}
        {events.map((event, idx) => {
          const title = event.title;
          const loc = event.location || 'TBA';
          const desc = event.descriptionMarkdown || '';
          const img = event.coverImageUrl || 'https://picsum.photos/seed/ev/800/450';
          const eventDate = event.eventDate ? new Date(event.eventDate) : new Date();
          const dStr = eventDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
          const tStr = event.time || 'TBA';
          
          const startStr = event.eventDate ? event.eventDate.replace(/-/g, '') + 'T' + (event.time ? event.time.replace(':', '') + '00Z' : '090000Z') : '20261114T090000Z';
          const endStr = event.eventDate ? event.eventDate.replace(/-/g, '') + 'T' + '235900Z' : '20261114T170000Z';

          return (`;
upCode = upCode.replace(upReturnOld, upReturnNew);
upCode = upCode.replace(/event\.id/g, '(event.id || idx)');
upCode = upCode.replace(/event\.image/g, 'img');
upCode = upCode.replace(/event\.title/g, 'title');
upCode = upCode.replace(/event\.date/g, 'dStr');
upCode = upCode.replace(/event\.time/g, 'tStr');
upCode = upCode.replace(/event\.location/g, 'loc');
upCode = upCode.replace(/event\.desc/g, 'desc');
upCode = upCode.replace(/event\.start/g, 'startStr');
upCode = upCode.replace(/event\.end/g, 'endStr');
upCode = upCode.replace(/ \}\)/, ' )})}'); // fix the closing brackets for map
fs.writeFileSync('app/events/upcoming/page.tsx', upCode);

// Patch blog page
let blogCode = fs.readFileSync('app/content/blog/page.tsx', 'utf8');
blogCode = blogCode.replace("import { ArrowRight, Calendar } from 'lucide-react';", 
  "import { ArrowRight, Calendar } from 'lucide-react';\nimport { useEffect, useState } from 'react';\nimport { getAllBlogs } from '@/lib/db';");

blogCode = blogCode.replace("export default function BlogPage() {", 
  `export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      const b = await getAllBlogs();
      setBlogs(b);
      setLoading(false);
    }
    fetchBlogs();
  }, []);`);

const blogReturnOld = `        {BLOG_POSTS.map((post, idx) => (`;
const blogReturnNew = `        {loading && <div className="col-span-full text-center p-8">Loading blogs...</div>}
        {!loading && blogs.length === 0 && (
          <div className="col-span-full text-center p-8">No blogs available yet.</div>
        )}
        {blogs.map((post, idx) => {
          const img = post.coverImageUrl || \`https://picsum.photos/seed/b\${idx}/800/500\`;
          const title = post.title;
          const date = post.createdAt ? new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'Unknown Date';
          const excerpt = post.contentMarkdown ? post.contentMarkdown.replace(/<[^>]+>/g, '').substring(0, 150) + '...' : '';

          return (`;
blogCode = blogCode.replace(blogReturnOld, blogReturnNew);
blogCode = blogCode.replace(/post\.id/g, '(post.id || idx)');
blogCode = blogCode.replace(/post\.image/g, 'img');
blogCode = blogCode.replace(/post\.title/g, 'title');
blogCode = blogCode.replace(/post\.date/g, 'date');
blogCode = blogCode.replace(/post\.excerpt/g, 'excerpt');
blogCode = blogCode.replace(/ \}\)/, ' )})}'); // fix closing brackets
fs.writeFileSync('app/content/blog/page.tsx', blogCode);

