export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Arjun Mehta',
    role: 'CTO',
    company: 'Alpha Ledger',
    text: 'Hrishikesh is the rare breed who can architect a distributed system at 3 AM and pitch it to a boardroom at 9 AM. His technical rigor and execution velocity are unmatched. He didn\'t just help us scale — he rewired how we think about infrastructure.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Priya Sharma',
    role: 'Founder & CEO',
    company: 'Nexus AI',
    text: 'Working with Hrishikesh was a masterclass in building. He has an almost prescient ability to identify bottlenecks before they become problems. His architectural guidance saved us months of rewrites and shaped our entire platform strategy.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Vikram Desai',
    role: 'VP Engineering',
    company: 'SecureFlow',
    text: 'Hrishikesh brings a level of precision and depth that transforms teams. He doesn\'t just write code — he builds systems of thought. His review of our security architecture led to a 40% performance improvement while strengthening our threat model.',
    rating: 5,
  },
  {
    id: 't4',
    name: 'Ananya Patel',
    role: 'Product Lead',
    company: 'CraftFlow',
    text: 'The iOS architecture Hrishikesh designed for us was a revelation. Clean, modular, and battle-tested. Our development velocity increased 3x after adopting his patterns. He sets a standard that stays with your team long after the engagement ends.',
    rating: 5,
  },
  {
    id: 't5',
    name: 'Rahul Kapoor',
    role: 'Managing Partner',
    company: 'Kapoor Ventures',
    text: 'I\'ve seen hundreds of technical founders. Hrishikesh stands apart — he has the rare combination of deep technical conviction and business pragmatism. His portfolio companies consistently outperform because he brings both engineering excellence and strategic clarity.',
    rating: 5,
  },
];
