'use client';

import { PageHeader } from '@/components/page-header';
import { MemberCard } from '@/components/member-card';

const MOCK_LEADERSHIP = [
  { name: 'Alice Walker', designation: 'President', photoUrl: 'https://picsum.photos/seed/p1/400/400', batch: '2022' },
  { name: 'Bob Smith', designation: 'Vice President', photoUrl: 'https://picsum.photos/seed/p2/400/400', batch: '2022' },
  { name: 'Charlie Davis', designation: 'General Secretary', photoUrl: 'https://picsum.photos/seed/p3/400/400', batch: '2023' },
  { name: 'Diana Prince', designation: 'Treasurer', photoUrl: 'https://picsum.photos/seed/p4/400/400', batch: '2023' },
  { name: 'Evan Wright', designation: 'Operations Lead', photoUrl: 'https://picsum.photos/seed/p5/400/400', batch: '2024' },
  { name: 'Fiona Lee', designation: 'Event Coordinator', photoUrl: 'https://picsum.photos/seed/p6/400/400', batch: '2024' },
];

export default function LeadershipPage() {
  return (
    <div className="container mx-auto px-6 max-w-7xl pb-24">
      <PageHeader 
        title="Executive Committee" 
        description="Meet the dedicated individuals guiding our club towards excellence."
      />
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" style={{ perspective: 1000 }}>
        {MOCK_LEADERSHIP.map((member, idx) => (
          <MemberCard 
            key={idx}
            index={idx}
            name={member.name}
            designation={member.designation}
            batch={member.batch}
            photoUrl={member.photoUrl}
            facebookUrl="#"
            linkedinUrl="#"
            email="contact@example.com"
          />
        ))}
      </div>
    </div>
  );
}
