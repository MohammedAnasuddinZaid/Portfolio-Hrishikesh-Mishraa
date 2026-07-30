import { ExpertiseItem, TimelineItem, InvestmentItem, ServiceItem, TechStackItem, BelvoMetrics } from '../types';

export const PORTFOLIO_INFO = {
  name: "Hrishikesh Mishra",
  nickname: "Hrishi",
  title: "Co-Founder & CEO @ Belvo | Angel Investor | Software Engineer",
  tagline: "Building Businesses. Engineering Products. Investing in Founders.",
  bioShort: "Hrishikesh Mishra is a technology entrepreneur, CEO of Belvo, and strategic growth partner specializing in high-scale digital infrastructure, fintech rails, and founder mentorship.",
  bioLong: "My career has been defined by the intersection of rigorous software engineering and aggressive business scaling. I believe that code is the leverage, but execution is the competitive edge. As the Co-Founder & CEO of Belvo, I lead a team dedicated to redefining digital infrastructure across global markets. Beyond Belvo, I actively invest in first-principles technical founders building deep technology, developer tools, and scalable SaaS solutions.",
  email: "hello@hrishikesh.com",
  secondaryEmail: "realhrishikeshmishra@gmail.com",
  blogUrl: "https://www.hrishikesmishra.buzz",
  location: "India & Global",
  portraitUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwfl2CQQbpAVIQVfxc_YIjGjgxjzxJ_TY80mPQMBrSh7PVTUr-L1-0WPcFY0XemVrh2zHHO1-g7Xh9fj9XIUZzbHM0o3RmRn6siEVWhaddbvxn8PujNQP2J4eicJfUgloS2qAcyoayLuryANC0sup1N3RsKHMe-M9xZd727-_VZW4tlq2Z_OFG8jH5BQIaqC4nuwUoxn-BUwRwXDAPIRhInaK2C47UAK6hPs2jkbyWnshs5NRBOR3BJg",
  hiringPortraitUrl: "https://media.licdn.com/dms/image/v2/D4D03AQE1Z9s1yq8yJg/profile-displayphoto-shrink_800_800/0/1718291823912?e=1726099200&v=beta&t=H3-1R5iS3yU",
  stats: [
    { label: "Brands & Startups Scaled", value: "100+", suffix: "" },
    { label: "Monthly API Requests", value: "100M", suffix: "+" },
    { label: "Capital Raised / Series B", value: "$50M", suffix: "+" },
    { label: "Active Accounts Linked", value: "10M", suffix: "+" },
    { label: "System Uptime Benchmark", value: "99.99", suffix: "%" },
  ]
};

export const EXPERTISE_LIST: ExpertiseItem[] = [
  {
    id: "software-engineering",
    title: "Software Engineering",
    category: "Technical Architecture",
    icon: "terminal",
    description: "Architecting high-performance distributed systems, microservices, and financial ledgers handling millions of requests with sub-millisecond latency.",
    fullDetails: "Deep expertise in building fault-tolerant distributed backends, REST/gRPC API gateways, event-driven streaming, and transaction processing engines designed for 99.99% reliability under extreme load.",
    highlights: ["Distributed Ledger Protocols", "Sub-millisecond API Gateways", "Event-Driven Microservices", "Zero-Downtime Migration Architecture"]
  },
  {
    id: "ios-development",
    title: "iOS Development",
    category: "Mobile Systems",
    icon: "smartphone",
    description: "Crafting pixel-perfect, fluid native mobile experiences for Apple's ecosystem using Swift, SwiftUI, Combine, and custom graphic pipelines.",
    fullDetails: "Over half a decade of hands-on iOS engineering experience, shipping top-tier consumer and enterprise applications with complex real-time animations, offline storage, and biometric security.",
    highlights: ["Swift & SwiftUI Architecture", "Custom Metal & CoreAnimation Shaders", "Biometric Vault & Keychain Security", "Offline Data Sync & Reactive State"]
  },
  {
    id: "brand-strategy",
    title: "Brand Strategy & Identity",
    category: "Creative Direction",
    icon: "token",
    description: "Positioning technology ventures to resonate with the top 1% of demanding consumers, institutional investors, and global markets.",
    fullDetails: "Translating complex technical capabilities into clear, compelling brand narratives that build institutional trust, command market authority, and accelerate organic customer acquisition.",
    highlights: ["Positioning & Narrative Arc", "Visual Identity Systems", "Go-To-Market Execution", "Institutional Authority Design"]
  },
  {
    id: "angel-investing",
    title: "Angel Investing",
    category: "Venture Capital",
    icon: "trending_up",
    description: "Deploying capital and conviction into first-principles technical founders across AI, Fintech, Infrastructure, and Developer Tools.",
    fullDetails: "Active angel investor and advisor, providing early-stage founders with direct access to capital, technical architecture reviews, executive recruitment, and GTM strategy.",
    highlights: ["Seed & Pre-Seed Conviction", "Architecture & Tech Due Diligence", "Founder Mentorship", "Series A/B GTM Strategy"]
  },
  {
    id: "business-consulting",
    title: "Business & Growth Advisory",
    category: "Executive Strategy",
    icon: "business_center",
    description: "Guiding early-stage and high-growth ventures through critical inflection points from initial product-market fit to Series B scaling.",
    fullDetails: "Helping founders streamline operational workflows, build high-performing engineering organizations, scale revenue models, and navigate digital transformation.",
    highlights: ["Product-Market Fit Iteration", "Engineering Org Design", "Revenue Model Optimization", "Board Advisory & Governance"]
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    category: "Enterprise Innovation",
    icon: "data_exploration",
    description: "Modernizing legacy business processes with cutting-edge cloud infrastructure, automation, and AI-driven workflow engines.",
    fullDetails: "Leading enterprise digital overhauls, converting manual processes into scalable web/mobile platforms with automated data pipelines and bank-grade security protocols.",
    highlights: ["Legacy System Modernization", "Cloud Infrastructure Migration", "Automated Workflows", "Enterprise Security Standards"]
  }
];

export const TIMELINE_LIST: TimelineItem[] = [
  {
    id: "step-1",
    period: "2016 — 2018",
    title: "Lead Software & Protocol Engineer",
    organization: "Global Fintech Systems",
    role: "Engineering Lead",
    summary: "Pioneered high-frequency transaction parsing algorithms, secure ledger protocols, and fault-tolerant financial communication pipelines.",
    keyAchievements: [
      "Designed real-time transaction engine processing 15,000 requests/sec with < 8ms latency.",
      "Architected encrypted data vault protocol compliant with international financial security standards.",
      "Mentored junior engineers and instituted rigorous code review & CI/CD standards."
    ],
    skillsUsed: ["Swift", "Objective-C", "C++", "SQL", "Cryptographic Security"]
  },
  {
    id: "step-2",
    period: "2018 — 2021",
    title: "CTO & Co-Founder",
    organization: "Stealth Fintech Venture",
    role: "Technical Co-Founder",
    summary: "Built and scaled an end-to-end digital financial services platform from zero to over 50,000 active users with zero security incidents.",
    keyAchievements: [
      "Built native iOS and Android client applications along with scalable Node.js microservices.",
      "Managed fundraising technical due diligence, securing seed round backing.",
      "Grew engineering and product teams from 3 to 22 cross-functional specialists."
    ],
    skillsUsed: ["SwiftUI", "Node.js", "React", "PostgreSQL", "AWS", "Product Strategy"]
  },
  {
    id: "step-3",
    period: "2021 — PRESENT",
    title: "Co-Founder & Chief Executive Officer (CEO)",
    organization: "Belvo",
    role: "Executive CEO",
    summary: "Spearheading Belvo's vision as a full-stack digital services agency — building brands, websites, apps, and driving growth through SEO, performance marketing, and creative design.",
    keyAchievements: [
      "Expanded Belvo into 14 service verticals spanning web dev, branding, marketing, and software.",
      "Scaled the organization across engineering, design, marketing, and business development.",
      "Helped over 100+ brands and startups build, launch, and scale modern digital products."
    ],
    skillsUsed: ["Executive Leadership", "Brand Strategy", "Digital Marketing", "Software Architecture", "Team Building"],
    isCurrent: true
  }
];

export const BELVO_INFO = {
  name: "Belvo",
  tagline: "Full-Stack Digital Services Agency",
  description: "Belvo is a full-stack digital services agency specializing in web development, branding, social media marketing, SEO, digital marketing, and creative design. From concept to launch, we build brands that dominate.",
  email: "contact.belvo@gmail.com",
  secondaryEmail: "info.belvo@gmail.com",
  careerEmail: "career.belvo@gmail.com",
  phone: ["+91 89284 66820", "+91 98495 67122"],
  social: {
    instagram: "https://instagram.com/belvo_official",
    linkedin: "https://linkedin.com/company/belvo-buzz",
  },
  location: "Goregaon, Mumbai, Maharashtra",
  responseTime: "24 hours",
  services: [
    { id: "web-dev", name: "Web Development", icon: "code", description: "Business websites, portfolio sites, landing pages, and responsive mobile-friendly websites." },
    { id: "branding", name: "Branding", icon: "token", description: "Logo design, brand identity systems, and comprehensive visual branding materials." },
    { id: "social-media", name: "Social Media Management", icon: "share", description: "Content creation, campaign management, and brand visibility growth across platforms." },
    { id: "seo", name: "SEO", icon: "search", description: "Google ranking optimization, on-page SEO, keyword research, and technical SEO audits." },
    { id: "digital-marketing", name: "Digital Marketing", icon: "campaign", description: "Online advertising, marketing strategy, lead generation, and brand promotion." },
    { id: "content-design", name: "Content & Creative Design", icon: "palette", description: "Graphics, marketing materials, promotional content, and visual storytelling." },
    { id: "brand-outreach", name: "Brand Outreach & PR", icon: "public", description: "Media relations, press releases, influencer coordination, and public image management." },
    { id: "3d-cgi", name: "3D & CGI", icon: "view_in_ar", description: "3D modeling, product visualization, architectural rendering, and CGI animation." },
    { id: "animation-vfx", name: "Animation & VFX", icon: "movie", description: "Motion graphics, visual effects, explainer videos, and animated brand content." },
    { id: "graphics", name: "Graphics Designing", icon: "design_services", description: "Print & digital graphics, UI mockups, packaging design, and illustration." },
    { id: "ecommerce", name: "E-Commerce Management", icon: "shopping_cart", description: "Store setup, product listings, payment integration, and conversion optimization." },
    { id: "performance-marketing", name: "Performance Marketing", icon: "analytics", description: "Paid ads, ROI tracking, conversion funnels, and data-driven campaign optimization." },
    { id: "influencer-marketing", name: "Influencer Marketing", icon: "groups", description: "Creator partnerships, campaign strategy, audience targeting, and ROI measurement." },
    { id: "app-dev", name: "App Development", icon: "smartphone", description: "Native iOS & Android apps, cross-platform solutions, and app store deployment." },
    { id: "software-dev", name: "Software Development", icon: "terminal", description: "Custom software, SaaS platforms, APIs, and enterprise-grade digital solutions." },
    { id: "crm-automation", name: "CRM & Automation", icon: "settings", description: "CRM setup, workflow automation, lead tracking, and customer journey optimization." },
  ]
};

export const BELVO_METRICS: BelvoMetrics = {
  apiRequests: "100M+",
  capitalRaised: "$50M+",
  activeAccounts: "10M+",
  uptime: "99.99%",
  latencyMs: 12,
  activeRegions: 6
};

export const PORTFOLIO_INVESTMENTS: InvestmentItem[] = [
  {
    id: "alpha-ledger",
    name: "Alpha Ledger",
    category: "Fintech",
    stage: "Series A",
    tagline: "Institutional B2B Financial Protocols",
    description: "Next-generation programmable settlement network for cross-border enterprise payments and automated liquidity routing.",
    icon: "account_balance",
    metrics: "Processing $2.4B annual volume"
  },
  {
    id: "nexus-ai",
    name: "Nexus AI",
    category: "AI/ML",
    stage: "Seed",
    tagline: "Generative Ops & Agent Infrastructure",
    description: "Autonomous AI orchestration layer enabling enterprise software to execute multi-step business logic with zero human latency.",
    icon: "hub",
    metrics: "10x dev velocity boost"
  },
  {
    id: "secureflow",
    name: "SecureFlow",
    category: "Cybersecurity",
    stage: "Series A",
    tagline: "Automated Data Compliance & Shielding",
    description: "Real-time automated PII masking and cryptographic access management for multi-cloud enterprise databases.",
    icon: "shield",
    metrics: "Protecting 500M+ user records"
  },
  {
    id: "metricstack",
    name: "MetricStack",
    category: "Infrastructure",
    stage: "Seed",
    tagline: "High-Velocity Observability Engine",
    description: "Sub-second distributed log aggregation and predictive anomaly detection built for cloud-native Kubernetes clusters.",
    icon: "data_exploration",
    metrics: "100B+ log events parsed daily"
  },
  {
    id: "craftflow",
    name: "CraftFlow",
    category: "SaaS",
    stage: "Seed",
    tagline: "Collaborative Product Design Systems",
    description: "Developer-first design token synchronization bridging Figma models with production React and Swift components automatically.",
    icon: "layers",
    metrics: "Used by 12,000+ engineers"
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "business-strategy",
    title: "Business & Growth Strategy",
    subtitle: "From Zero to Scale",
    description: "Comprehensive strategic roadmap defining product-market fit, unit economics, go-to-market channels, and organizational growth models.",
    icon: "trending_up",
    deliverables: ["Comprehensive Growth Roadmap", "GTM Execution Playbook", "Pricing & Monetization Architecture", "Investor Pitch & Narrative Deck"],
    idealFor: "Early-stage founders and growth companies aiming for Series A/B expansion."
  },
  {
    id: "brand-identity",
    title: "Brand Identity & Positioning",
    subtitle: "Institutional Authority",
    description: "End-to-end brand transformation including visual identity, typography systems, editorial tone, and premium digital presence.",
    icon: "token",
    deliverables: ["Brand Strategy & Positioning Document", "Design System & UI Guidelines", "Digital Style Guide & Assets", "High-Conversion Landing Experience"],
    idealFor: "Tech companies seeking elite market positioning and institutional credibility."
  },
  {
    id: "mobile-development",
    title: "Native iOS & Mobile Engineering",
    subtitle: "Pixel-Perfect Precision",
    description: "High-performance native iOS applications built with Swift and SwiftUI, featuring real-time graphics, offline persistence, and biometric security.",
    icon: "smartphone",
    deliverables: ["Production-Ready iOS App Codebase", "SwiftUI Component Library", "Backend REST/gRPC API Integration", "App Store Deployment & CI/CD Setup"],
    idealFor: "Startups requiring fluid, top-tier mobile user experiences."
  },
  {
    id: "startup-advisory",
    title: "Executive & Technical Advisory",
    subtitle: "Operator Guidance",
    description: "Direct bi-weekly advisory sessions with Hrishikesh covering technical architecture, hiring elite engineers, fundraising, and board strategy.",
    icon: "groups",
    deliverables: ["Bi-weekly 1-on-1 Strategic Calls", "Architecture & Code Reviews", "Engineering Candidate Vetting", "Direct Investor Introduction Support"],
    idealFor: "Technical and non-technical founders navigating hypergrowth."
  }
];

export const TECH_STACK: TechStackItem[] = [
  { name: "Swift", category: "Mobile", icon: "code", experience: "6+ Years", useCase: "Native iOS Applications & Metal Graphics" },
  { name: "SwiftUI", category: "Mobile", icon: "layers", experience: "5+ Years", useCase: "Declarative UI Architecture & Dynamic Layouts" },
  { name: "Objective-C", category: "Mobile", icon: "terminal", experience: "6+ Years", useCase: "Legacy Framework Interop & Low-Level C APIs" },
  { name: "TypeScript", category: "Frontend", icon: "javascript", experience: "6+ Years", useCase: "Type-Safe Fullstack Systems & Web Apps" },
  { name: "React / Next.js", category: "Frontend", icon: "web", experience: "6+ Years", useCase: "High-Performance Interactive User Interfaces" },
  { name: "Node.js & Express", category: "Backend", icon: "dns", experience: "6+ Years", useCase: "Scalable Microservices & Real-Time APIs" },
  { name: "PostgreSQL", category: "Database", icon: "storage", experience: "5+ Years", useCase: "Relational Ledgers & Complex Data Models" },
  { name: "Firebase", category: "Database", icon: "cloud", experience: "5+ Years", useCase: "Realtime Data Sync & Biometric Auth" },
  { name: "Kubernetes & AWS", category: "DevOps & Cloud", icon: "cloud_queue", experience: "5+ Years", useCase: "Container Orchestration & Auto-Scaling Infra" },
  { name: "Python", category: "Backend", icon: "data_object", experience: "4+ Years", useCase: "Data Processing Pipelines & AI Integrations" },
  { name: "C++", category: "Backend", icon: "memory", experience: "4+ Years", useCase: "High-Frequency Algorithms & Memory Management" },
  { name: "Xcode & Git", category: "DevOps & Cloud", icon: "build", experience: "6+ Years", useCase: "Automated Build Pipelines & CI/CD Workflows" }
];
