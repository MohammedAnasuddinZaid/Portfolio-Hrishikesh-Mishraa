export interface KnowledgeEntry {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
}

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: 'whois-1',
    keywords: ['who', 'hrishikesh', 'about', 'background', 'tell me', 'introduce', 'bio', 'person', 'mishra'],
    question: 'Who is Hrishikesh Mishra?',
    answer: 'Hrishikesh Mishra is a technology entrepreneur, Co-Founder & CEO of Belvo, Angel Investor, and Software Engineer. He specializes in building high-scale digital infrastructure, fintech rails, and mentoring first-principles technical founders. His career spans a decade of evolution from the terminal to executive leadership.'
  },
  {
    id: 'whois-2',
    keywords: ['title', 'role', 'position', 'designation', 'ceo', 'co-founder', 'what does he do'],
    question: 'What is Hrishikesh Mishra\'s current role?',
    answer: 'Hrishikesh is the Co-Founder & Chief Executive Officer (CEO) at Belvo, a full-stack digital services agency. He is also an active angel investor and software engineer.'
  },
  {
    id: 'skills-1',
    keywords: ['skill', 'tech', 'stack', 'technologies', 'know', 'proficient', 'languages', 'code', 'programming'],
    question: 'What are Hrishikesh\'s technical skills?',
    answer: 'His core stack includes: Swift (6+ years), SwiftUI (5+), Objective-C (6+), TypeScript (6+), React/Next.js (6+), Node.js (6+), PostgreSQL (5+), Firebase (5+), Kubernetes & AWS (5+), Python (4+), C++ (4+), and Xcode & Git (6+).'
  },
  {
    id: 'skills-2',
    keywords: ['mobile', 'ios', 'swift', 'app', 'iphone'],
    question: 'Does Hrishikesh have iOS development experience?',
    answer: 'Yes! Hrishikesh has over half a decade of hands-on iOS engineering experience. He has shipped top-tier consumer and enterprise applications using Swift, SwiftUI, Combine, and custom Metal/CoreAnimation graphics pipelines.'
  },
  {
    id: 'experience-1',
    keywords: ['experience', 'work', 'career', 'timeline', 'journey', 'history', 'past', 'employment'],
    question: 'What is Hrishikesh\'s career timeline?',
    answer: '2016-2018: Lead Software & Protocol Engineer at Global Fintech Systems. 2018-2021: CTO & Co-Founder at a Stealth Fintech Venture. 2021-Present: Co-Founder & CEO at Belvo.'
  },
  {
    id: 'experience-2',
    keywords: ['belvo', 'company', 'agency', 'venture', 'business', 'startup'],
    question: 'Tell me about Belvo',
    answer: 'Belvo is a full-stack digital services agency founded by Hrishikesh Mishra. They offer 16 service verticals including Web Development, Branding, Social Media Management, SEO, Digital Marketing, Content Design, 3D/CGI, Animation & VFX, E-Commerce, Performance Marketing, App Development, Software Development, and more. Contact: contact.belvo@gmail.com, Phone: +91 89284 66820 / +91 98495 67122, Location: Goregaon, Mumbai.'
  },
  {
    id: 'belvo-services',
    keywords: ['belvo service', 'belvo offer', 'belvo do', 'agency service', 'digital service'],
    question: 'What services does Belvo offer?',
    answer: 'Belvo offers 16 service verticals: Web Development, Branding, Social Media Management, SEO, Digital Marketing, Content & Creative Design, Brand Outreach & PR, 3D & CGI, Animation & VFX, Graphics Designing, E-Commerce Management, Performance Marketing, Influencer Marketing, App Development, Software Development, and CRM & Automation.'
  },
  {
    id: 'belvo-contact',
    keywords: ['contact belvo', 'belvo email', 'belvo phone', 'belvo address', 'reach belvo'],
    question: 'How to contact Belvo?',
    answer: 'Email: contact.belvo@gmail.com | Alt: info.belvo@gmail.com | Careers: career.belvo@gmail.com | Phone: +91 89284 66820 / +91 98495 67122 | Location: Goregaon, Mumbai, Maharashtra | Response Time: Within 24 hours.'
  },
  {
    id: 'investments-1',
    keywords: ['invest', 'portfolio', 'funding', 'backed', 'startup', 'angel', 'founder'],
    question: 'What companies has Hrishikesh invested in?',
    answer: 'His portfolio includes: Alpha Ledger (Fintech, Series A — processing $2.4B annual volume), Nexus AI (AI/ML, Seed — 10x dev velocity boost), SecureFlow (Cybersecurity, Series A — protecting 500M+ records), MetricStack (Infrastructure, Seed — 100B+ log events daily), and CraftFlow (SaaS, Seed — used by 12,000+ engineers).'
  },
  {
    id: 'investments-2',
    keywords: ['thesis', 'invest criteria', 'what he looks for', 'investment philosophy'],
    question: 'What is Hrishikesh\'s investment thesis?',
    answer: 'Hrishikesh partners with founders who demonstrate relentless execution, technical obsession, and deep domain conviction. He invests in first-principles technical founders building deep technology, developer tools, and scalable SaaS solutions. He focuses on Seed and Pre-Seed stages, providing capital, architecture reviews, and GTM strategy.'
  },
  {
    id: 'services-1',
    keywords: ['service', 'offer', 'consulting', 'advisory', 'engage', 'hire'],
    question: 'What consulting services does Hrishikesh offer?',
    answer: '1. Business & Growth Strategy — From zero to scale. 2. Brand Identity & Positioning — Institutional authority. 3. Native iOS & Mobile Engineering — Pixel-perfect precision. 4. Executive & Technical Advisory — Operator guidance. Ideal for early-stage founders and growth companies aiming for Series A/B expansion.'
  },
  {
    id: 'contact-1',
    keywords: ['contact', 'email', 'phone', 'reach', 'message', 'connect', 'hrishikesh contact'],
    question: 'How to contact Hrishikesh?',
    answer: 'Executive Email: hello@hrishikesh.com | Alt: realhrishikeshmishra@gmail.com | Blog: https://www.hrishikesmishra.buzz | Location: India & Global.'
  },
  {
    id: 'social-1',
    keywords: ['social', 'instagram', 'linkedin', 'follow', 'media', '@'],
    question: 'Where to find Belvo on social media?',
    answer: 'Instagram: @belvo_official (https://instagram.com/belvo_official) | LinkedIn: belvo.buzz (https://linkedin.com/company/belvo-buzz).'
  },
  {
    id: 'philosophy-1',
    keywords: ['philosophy', 'approach', 'belief', 'mentality', 'ethos', 'principle'],
    question: 'What is Hrishikesh\'s philosophy?',
    answer: '"Precision is not just a technical requirement; it\'s a moral obligation when building at scale." Hrishikesh believes that code is the leverage, but execution is the competitive edge. His career is defined by the intersection of rigorous software engineering and aggressive business scaling.'
  },
  {
    id: 'expertise-1',
    keywords: ['expertise', 'capabilities', 'domain', 'specialize', 'expert'],
    question: 'What are Hrishikesh\'s core expertise areas?',
    answer: '1. Software Engineering — Distributed ledgers, microservices, API gateways. 2. iOS Development — Swift, SwiftUI, Metal shaders. 3. Brand Strategy & Identity. 4. Angel Investing. 5. Business & Growth Advisory. 6. Digital Transformation.'
  },
  {
    id: 'stats-1',
    keywords: ['stat', 'metric', 'number', 'scale', 'traffic', 'revenue'],
    question: 'What are Hrishikesh\'s key metrics?',
    answer: 'Brands & Startups Scaled: 100+ | Monthly API Requests: 100M+ | Capital Raised: $50M+ | Active Accounts: 10M+ | System Uptime: 99.99%.'
  },
  {
    id: 'blog-1',
    keywords: ['blog', 'article', 'write', 'thought', 'leadership', 'content'],
    question: 'Does Hrishikesh have a blog?',
    answer: 'Yes! You can read his thought leadership articles at https://www.hrishikesmishra.buzz'
  },
  {
    id: 'greeting',
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'whatsup'],
    question: 'Hello',
    answer: 'Hello! Welcome to my interactive portfolio. Feel free to ask me anything about my background, skills, experience, Belvo, investments, or services. How can I help you today?'
  },
  {
    id: 'thanks',
    keywords: ['thanks', 'thank', 'appreciate', 'grateful'],
    question: 'Thank you',
    answer: 'You\'re very welcome! I\'m glad I could help. If you have any more questions, feel free to ask. I\'m here to help you learn more about Hrishikesh and Belvo.'
  },
];

export const defaultResponse = "I'm not sure I understand that question. Try asking me about Hrishikesh's background, skills, experience, Belvo services, investments, or how to get in touch. I can answer in natural language — just ask!";
