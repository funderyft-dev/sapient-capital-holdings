"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type Business = {
  slug: string;
  name: string;
  logo: string;
  short: string;
  description: string;
  focus: string[];
  accent: string;
};

type Person = {
  name: string;
  role: string;
  initials: string;
  bio: string;
  responsibility?: string;
};

type PortfolioProject = {
  company: string;
  title: string;
  description: string;
  focus: string;
};

const businesses: Business[] = [
  {
    slug: "agro-industrial",
    name: "Sapient Agro-Industrial",
    logo: "/sapient-agro-industrial-logo.png",
    short: "Resilient food and agricultural value chains.",
    description: "Sapient Agro-Industrial explores practical opportunities across agricultural production, processing, storage and distribution. The business focuses on strengthening the systems that help food and agricultural enterprises become more resilient, productive and connected.",
    focus: ["Agricultural production", "Processing and storage", "Distribution and market access"],
    accent: "copper",
  },
  {
    slug: "construction-development",
    name: "Sapient Construction & Development",
    logo: "/sapient-construction-development-logo.png",
    short: "Thoughtful infrastructure and asset delivery.",
    description: "Sapient Construction & Development applies commercial discipline and delivery focus to the built environment. The business considers development, project delivery and asset stewardship opportunities that can remain useful and valuable over time.",
    focus: ["Development advisory", "Project delivery", "Asset stewardship"],
    accent: "indigo",
  },
  {
    slug: "shipping-transportation",
    name: "Sapient Shipping & Transportation",
    logo: "/sapient-shipping-transportation-logo.png",
    short: "Connected movement for a growing economy.",
    description: "Sapient Shipping & Transportation explores responsible logistics, transport and maritime opportunities. Its focus is on the infrastructure, services and partnerships that improve the movement of goods, people and essential services.",
    focus: ["Logistics platforms", "Transportation services", "Supply-chain connectivity"],
    accent: "indigo",
  },
  {
    slug: "technologies-investment",
    name: "Sapient Technologies & Investment",
    logo: "/sapient-technologies-investment-logo.png",
    short: "Technology-enabled growth and investment insight.",
    description: "Sapient Technologies & Investment identifies technology and investment opportunities that can improve performance, broaden access and create durable enterprise value. The business combines commercial perspective with a careful view of investment readiness.",
    focus: ["Technology enablement", "Investment intelligence", "Growth platforms"],
    accent: "copper",
  },
];

const groupLeadership: Person[] = [
  { name: "Amanze Jennifer", role: "Group Chief Executive Officer", initials: "AJ", bio: "Provides overall strategic leadership for Sapient Capital Holdings and oversees the development, performance and long-term direction of the group and its subsidiaries." },
  { name: "Awosikunde Teniayo", role: "Group Chief Financial Officer", initials: "AT", bio: "Oversees group financial strategy, capital planning, financial controls, reporting and the responsible allocation of resources across Sapient's businesses." },
  { name: "Owolabi Joseph", role: "Group Secretary", initials: "OJ", bio: "Supports the group's corporate governance, statutory administration, board processes, documentation and regulatory coordination." },
];

const executiveManagement: Person[] = [
  { name: "Abioye Joseph", role: "Chief Executive Officer", initials: "AJ", bio: "Leads operating-company execution, commercial performance and the translation of group priorities into focused delivery." },
  { name: "Issa Adenomola", role: "Business Development Lead", initials: "IA", bio: "Develops new opportunities, builds relationships and supports commercially sound growth across Sapient's operating businesses." },
  { name: "Oladepo Steve", role: "Project Lead", initials: "OS", bio: "Coordinates delivery priorities and supports the disciplined execution of operational and development projects." },
  { name: "Abioye Esther", role: "Chief Executive Officer", initials: "AE", bio: "Provides executive direction for an operating company, with responsibility for sustainable performance and accountable management." },
  { name: "Adedeji Gabriel", role: "Business Development Lead", initials: "AG", bio: "Supports growth initiatives, opportunity development and commercial relationships for the operating company." },
  { name: "Yakubu Yinusa", role: "Project Lead", initials: "YY", bio: "Leads project coordination and supports high-quality operational execution across delivery workstreams." },
];

const committee: Person[] = [
  { name: "Adelu Samuel", role: "Investment Committee Member", initials: "AS", bio: "Brings independent perspective to the review of material investment opportunities and capital allocation decisions.", responsibility: "Reviews strategic fit, commercial rationale and risk before investment decisions are progressed." },
  { name: "Ojegele Boluwaji", role: "Investment Committee Member", initials: "OB", bio: "Contributes independent oversight to the committee's structured evaluation of proposed investments and major commitments.", responsibility: "Supports disciplined challenge, due diligence review and accountable decision-making." },
  { name: "Yakubu Yinusa", role: "Investment Committee Member", initials: "YY", bio: "Supports a balanced assessment of proposed investment opportunities, execution readiness and long-term value creation.", responsibility: "Assesses delivery considerations, risk signals and alignment with approved investment criteria." },
  { name: "Oladepo Steven", role: "Investment Committee Member", initials: "OS", bio: "Provides independent input on investment proposals and the practical factors that support responsible capital deployment.", responsibility: "Contributes to objective review, risk awareness and ongoing investment discipline." },
];

const operatingTeams = [
  { company: "Sapient Agro-Industrial Team", introduction: "Focused on operating direction, business development and delivery priorities across agro-industrial activities.", members: executiveManagement.slice(3, 6) },
  { company: "Sapient Construction & Development Team", introduction: "Focused on commercial direction, business development and project delivery across construction and development activities.", members: executiveManagement.slice(0, 3) },
  { company: "Sapient Shipping & Transportation Team", introduction: "Operating-company appointments will be announced as the team structure is confirmed.", members: [] as Person[] },
  { company: "Sapient Technologies & Investment Team", introduction: "Operating-company appointments will be announced as the team structure is confirmed.", members: [] as Person[] },
];

const mediaItems = [
  { id: "news", label: "News", title: "Group news and business updates", text: "Updates from Sapient Capital Holdings and its operating businesses will be published here.", meta: "Latest updates" },
  { id: "insights", label: "Insights", title: "Perspectives on enduring enterprise", text: "Read thoughtful perspectives on the sectors, systems and decisions shaping sustainable African value creation.", meta: "Perspective" },
  { id: "library", label: "Photo & Video Library", title: "A closer look at Sapient", text: "A curated visual record of our people, businesses, projects and community of partners.", meta: "Library" },
  { id: "publications", label: "Publications", title: "Reports and reference materials", text: "Selected corporate publications and relevant group materials will be available for review.", meta: "Publication" },
  { id: "press", label: "Press Releases", title: "Official announcements", text: "Formal announcements and media statements from Sapient Capital Holdings will appear here.", meta: "Press office" },
];

const portfolioProjects: PortfolioProject[] = [
  { company: "Sapient Agro-Industrial", title: "Agricultural Value Chain Development", description: "Production, aggregation and market-linkage opportunities assessed through a long-term resilience lens.", focus: "Agricultural enterprise" },
  { company: "Sapient Agro-Industrial", title: "Processing Capacity Programme", description: "A focused programme for considering practical processing and storage capacity across agricultural value chains.", focus: "Processing and storage" },
  { company: "Sapient Construction & Development", title: "Built Environment Delivery", description: "Development and delivery work shaped by commercial viability, useful design and disciplined project execution.", focus: "Construction and development" },
  { company: "Sapient Construction & Development", title: "Asset Development Advisory", description: "Project and asset advisory work supporting informed decisions from early opportunity to delivery readiness.", focus: "Project advisory" },
  { company: "Sapient Shipping & Transportation", title: "Logistics Connectivity Programme", description: "Exploring connected logistics capabilities that support the reliable movement of goods and services.", focus: "Logistics" },
  { company: "Sapient Shipping & Transportation", title: "Transport Asset Readiness", description: "Assessing infrastructure and operating requirements for responsible transport and maritime opportunities.", focus: "Transportation" },
  { company: "Sapient Technologies & Investment", title: "Digital Growth Platform", description: "Technology-enabled opportunities considered for their ability to improve access, efficiency and sustainable growth.", focus: "Technology" },
  { company: "Sapient Technologies & Investment", title: "Investment Intelligence Initiative", description: "A structured approach to identifying, evaluating and preparing growth opportunities for investment consideration.", focus: "Investment" },
];

const Arrow = () => <span aria-hidden="true" className="rebuild-arrow">-&gt;</span>;

function Logo({ inverse = false }: { inverse?: boolean }) {
  return <img className="rebuild-logo" src={inverse ? "/sapient-reverse.svg" : "/sapient-horizontal-primary.svg"} alt="Sapient Capital Holdings" />;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="rebuild-eyebrow">{children}</p>;
}

function PageHero({ label, title, text, children }: { label: string; title: string; text: string; children?: ReactNode }) {
  return <section className="rebuild-page-hero"><div className="rebuild-shell"><Eyebrow>{label}</Eyebrow><h1>{title}</h1><p>{text}</p>{children}</div></section>;
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const close = () => { setMenuOpen(false); setActiveMenu(null); };
  const propsFor = (name: string) => ({ onMouseEnter: () => setActiveMenu(name), onMouseLeave: () => setActiveMenu(null), onFocus: () => setActiveMenu(name) });
  const toggle = (name: string) => setActiveMenu((current) => current === name ? null : name);
  const submitSearch = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const value = query.trim(); if (value) window.location.assign(`/search?q=${encodeURIComponent(value)}`); };
  const SearchButton = ({ mobile = false }: { mobile?: boolean }) => <button type="button" className={mobile ? "rebuild-search-button rebuild-mobile-search" : "rebuild-search-button"} aria-label="Search Sapient" onClick={() => setSearchOpen((value) => !value)}><span aria-hidden="true" /></button>;
  return <header className="rebuild-header"><div className="rebuild-shell rebuild-header-inner"><a href="/" className="rebuild-brand" aria-label="Sapient Capital Holdings home" onClick={close}><Logo /></a><div className="rebuild-header-controls"><SearchButton /><button className={menuOpen ? "rebuild-menu-button is-open" : "rebuild-menu-button"} type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="rebuild-navigation" aria-label={menuOpen ? "Close menu" : "Open menu"}><span /><span /><span /></button></div><nav id="rebuild-navigation" className={menuOpen ? `rebuild-nav is-open${activeMenu ? " is-expanded" : ""}` : "rebuild-nav"} aria-label="Primary navigation"><div className="rebuild-mobile-menu-top"><a href="/" aria-label="Sapient Capital Holdings home" onClick={close}><Logo /></a><div><SearchButton mobile /><button type="button" className="rebuild-mobile-close" onClick={close} aria-label="Close menu">X</button></div></div><a href="/" onClick={close}>Home</a><div className="rebuild-nav-group" {...propsFor("about")}><a href="/about" onClick={close}>About</a><button type="button" onClick={() => toggle("about")} aria-expanded={activeMenu === "about"} aria-label="Open About menu">+</button><div className={activeMenu === "about" ? "rebuild-subnav is-open" : "rebuild-subnav"}><a href="/about" onClick={close}>Who We Are</a><div className="rebuild-leadership-menu"><a href="/leadership-governance" onClick={close}>Leadership</a><div className="rebuild-nested-subnav"><a href="/leadership/group-leadership" onClick={close}>Group Leadership</a><a href="/leadership/executive-management" onClick={close}>Executive Management</a><a href="/leadership/investment-committee" onClick={close}>Investment Committee</a></div></div><a href="/leadership-governance#governance" onClick={close}>Governance</a></div></div><div className="rebuild-nav-group" {...propsFor("businesses")}><a href="/our-businesses" onClick={close}>Our Businesses</a><button type="button" onClick={() => toggle("businesses")} aria-expanded={activeMenu === "businesses"} aria-label="Open Our Businesses menu">+</button><div className={activeMenu === "businesses" ? "rebuild-subnav is-open" : "rebuild-subnav"}>{businesses.map((business) => <a href={`/${business.slug}`} onClick={close} key={business.slug}>{business.name.replace("Sapient ", "")}</a>)}</div></div><a href="/projects" onClick={close}>Projects</a><a href="/investors" onClick={close}>Investors</a><div className="rebuild-nav-group" {...propsFor("media")}><a href="/media" onClick={close}>Media</a><button type="button" onClick={() => toggle("media")} aria-expanded={activeMenu === "media"} aria-label="Open Media menu">+</button><div className={activeMenu === "media" ? "rebuild-subnav is-open" : "rebuild-subnav"}>{mediaItems.map((item) => <a href={`/media#${item.id}`} onClick={close} key={item.id}>{item.label}</a>)}</div></div><div className="rebuild-nav-group" {...propsFor("careers")}><a href="/careers" onClick={close}>Careers</a><button type="button" onClick={() => toggle("careers")} aria-expanded={activeMenu === "careers"} aria-label="Open Careers menu">+</button><div className={activeMenu === "careers" ? "rebuild-subnav is-open" : "rebuild-subnav"}><a href="/careers#opportunities" onClick={close}>Career Opportunities</a><a href="/careers#working-at-sapient" onClick={close}>Working at Sapient</a></div></div><a className="rebuild-nav-cta" href="/contact" onClick={close}>Contact Sapient <Arrow /></a></nav></div>{searchOpen && <div className="rebuild-search-panel"><form onSubmit={submitSearch}><label htmlFor="site-search">Search Sapient</label><div><input id="site-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the website" /><button type="submit">Search</button><button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}>X</button></div></form></div>}</header>;
}

function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubscribed(true); };
  return <footer className="rebuild-footer"><div className="rebuild-shell rebuild-footer-grid"><section className="rebuild-footer-brand"><a href="/" aria-label="Sapient Capital Holdings home"><Logo inverse /></a><p>Disciplined capital for resilient businesses and enduring African value.</p><div className="rebuild-socials" aria-label="Sapient social media"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Sapient on Instagram">IG</a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="Sapient on LinkedIn">in</a><a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="Sapient on X">X</a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Sapient on Facebook">f</a></div></section><section className="rebuild-footer-sitemap"><div><h2>Home</h2><div className="rebuild-footer-links"><a href="/investors">Investors</a><a href="/projects">Projects</a><a href="/careers">Careers</a><a href="/media">Media</a></div></div><div><h2>About Us</h2><div className="rebuild-footer-links"><a href="/about">Who We Are</a><a href="/our-businesses">Our Businesses</a><a href="/leadership-governance">Leadership</a><a href="/leadership-governance#governance">Governance</a></div></div></section><section className="rebuild-newsletter"><h2>Stay informed</h2><p>Receive occasional news and perspectives from the Sapient Group.</p><form onSubmit={submit}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" name="email" type="email" placeholder="Your email address" required /><button type="submit">Subscribe</button></form>{subscribed && <small>Thank you. Your interest has been noted.</small>}</section></div><div className="rebuild-shell rebuild-footer-bottom"><span>Copyright {new Date().getFullYear()} Sapient Capital Holdings.</span><span><a href="/privacy">Privacy</a><a href="/terms">Terms</a></span></div></footer>;
}

function HeroRotator() {
  const cards = [
    { category: "Our Businesses", title: "Sapient Agro-Industrial", text: "Resilient food and agricultural value chains designed for long-term impact.", href: "/agro-industrial", image: "/hero-agro-v2.png" },
    { category: "Our Businesses", title: "Sapient Shipping & Transportation", text: "Connected movement and logistics opportunities for a changing economy.", href: "/shipping-transportation", image: "/hero-shipping-v2.png" },
    { category: "Projects Executed", title: "Disciplined Asset Delivery", text: "Thoughtful construction and development work guided by commercial discipline and delivery focus.", href: "/projects", image: "/hero-projects-v2.png" },
    { category: "Our Businesses", title: "Sapient Technologies & Investment", text: "Technology-enabled growth platforms supported by clear investment insight.", href: "/technologies-investment", image: "/hero-technology-v2.png" },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive((value) => (value + 1) % cards.length), 5000); return () => window.clearInterval(timer); }, [cards.length]);
  const card = cards[active];
  return <div className="rebuild-rotator" aria-live="polite"><img key={card.image} className="rebuild-rotator-image rebuild-slide-right-to-left" src={card.image} alt="" /><div className="rebuild-rotator-shade" aria-hidden="true" /><div className="rebuild-rotator-copy"><Eyebrow>{card.category}</Eyebrow><h2>{card.title}</h2><p>{card.text}</p><a href={card.href} className="rebuild-text-link">Explore <Arrow /></a></div><div className="rebuild-rotator-dots" aria-label="Hero slides">{cards.map((item, index) => <button type="button" key={item.title} className={index === active ? "is-active" : ""} aria-label={`Show ${item.title}`} aria-current={index === active ? "true" : undefined} onClick={() => setActive(index)} />)}</div></div>;
}

function Home() {
  return <><section className="rebuild-home-hero"><HeroRotator /></section><section className="rebuild-section rebuild-values-section"><div className="rebuild-shell"><div className="rebuild-section-heading"><div><Eyebrow>Our approach</Eyebrow><h2>One gateway. Shared progress.</h2></div><p>Sapient brings together capital discipline, hands-on perspective and strong oversight to pursue opportunities with durable potential.</p></div><div className="rebuild-card-grid rebuild-value-grid"><article><span>01</span><h3>Long-term thinking</h3><p>We look beyond short cycles to pursue businesses and assets that can remain useful, relevant and accountable.</p></article><article><span>02</span><h3>Operating perspective</h3><p>We pair investment consideration with a practical focus on execution, people and business performance.</p></article><article><span>03</span><h3>Responsible governance</h3><p>Clear oversight and sound decision-making guide how the group allocates attention, capital and resources.</p></article></div></div></section><BusinessPreview /><section className="rebuild-section rebuild-copper-section"><div className="rebuild-shell rebuild-callout"><div><Eyebrow>Engage Sapient</Eyebrow><h2>Let's build the next chapter of value.</h2><p>For strategic conversations, group enquiries and investor discussions, reach the Sapient team.</p></div><a className="rebuild-button rebuild-button-light" href="/contact">Contact Sapient <Arrow /></a></div></section></>;
}

function BusinessPreview() {
  return <section className="rebuild-section"><div className="rebuild-shell"><div className="rebuild-section-heading"><div><Eyebrow>Our businesses</Eyebrow><h2>Focused operating platforms.</h2></div><a className="rebuild-text-link" href="/our-businesses">View all businesses <Arrow /></a></div><div className="rebuild-card-grid rebuild-business-grid">{businesses.map((business, index) => <article className={`rebuild-business-card ${business.accent}`} key={business.slug}><span className="rebuild-card-index">0{index + 1}</span><div className="rebuild-business-logo"><img src={business.logo} alt={`${business.name} logo`} loading="lazy" decoding="async" /></div><h3>{business.name}</h3><p>{business.short}</p><a href={`/${business.slug}`} aria-label={`Explore ${business.name}`}>Explore <Arrow /></a></article>)}</div></div></section>;
}

function GovernanceSnippet() {
  return <section className="rebuild-section rebuild-copper-section rebuild-governance-summary"><div className="rebuild-shell rebuild-callout"><div><Eyebrow>Governance</Eyebrow><h2>Designed for sound decisions.</h2><p>Strong governance supports the way we set priorities, allocate resources, manage risk and build trust across the group.</p></div><a className="rebuild-button rebuild-button-light" href="/leadership-governance#governance">Our governance approach <Arrow /></a></div></section>;
}

function VisionMission() {
  return <section className="rebuild-section rebuild-vision-section"><div className="rebuild-shell"><div className="rebuild-section-heading"><div><Eyebrow>Vision and Mission</Eyebrow><h2>Built for disciplined, shared progress.</h2></div><p>Our direction is guided by a clear commitment to long-term value, transparent stewardship and generational wealth creation.</p></div><div className="rebuild-vision-grid"><article><Eyebrow>Our Vision</Eyebrow><p>To unite 20 committed partners in a legally registered investment group that leverages pooled capital to acquire, develop, and manage high-value assets across real estate, businesses, and innovative ventures.</p></article><article><Eyebrow>Our Mission</Eyebrow><p>To create a disciplined, transparent, and profitable investment system that delivers significant returns over the long term while building generational wealth.</p></article></div><div className="rebuild-core-values"><Eyebrow>Core Values</Eyebrow><p>Discipline, transparency, responsible stewardship, accountable execution and long-term partnership guide how Sapient evaluates opportunities and builds value.</p></div></div></section>;
}

function About() {
  return <><PageHero label="About Sapient" title="A group built for enduring value." text="Sapient Capital Holdings is a Pan-African holding company developing resilient businesses and assets through disciplined capital, strategic support and accountable governance." /><section className="rebuild-section"><div className="rebuild-shell rebuild-two-column"><div><Eyebrow>Who we are</Eyebrow><h2>Capital, capability and conviction.</h2></div><div><p className="rebuild-lead">We are organised as a group of focused operating platforms, supported by group-level leadership, financial discipline and investment oversight. Each business pursues its own commercial opportunity while benefiting from shared standards and a long-term outlook.</p><p>Our core areas of operation span agro-industrial enterprise, construction and development, shipping and transportation, and technologies and investment.</p></div></div></section><VisionMission /><section className="rebuild-section rebuild-soft-section"><div className="rebuild-shell"><Eyebrow>Group at a glance</Eyebrow><h2>Four complementary platforms.</h2><div className="rebuild-structure-grid">{businesses.map((business) => <a href={`/${business.slug}`} key={business.slug}><span>Operating platform</span><strong>{business.name}</strong><Arrow /></a>)}</div></div></section><section className="rebuild-section"><div className="rebuild-shell"><div className="rebuild-section-heading"><div><Eyebrow>Leadership and governance</Eyebrow><h2>Clear roles. Responsible oversight.</h2></div><p>Our governance approach keeps group direction, operating management and independent investment oversight distinct and accountable.</p></div><div className="rebuild-card-grid rebuild-three-grid"><a className="rebuild-route-card" href="/leadership/group-leadership"><span>01</span><h3>Group Leadership</h3><p>Senior leadership responsible for direction, stewardship and group performance.</p><Arrow /></a><a className="rebuild-route-card" href="/leadership/executive-management"><span>02</span><h3>Executive Management</h3><p>Operating leaders accountable for commercial focus and disciplined delivery.</p><Arrow /></a><a className="rebuild-route-card" href="/leadership/investment-committee"><span>03</span><h3>Investment Committee</h3><p>Independent review that brings measured challenge to capital allocation decisions.</p><Arrow /></a></div></div></section><GovernanceSnippet /></>;
}

function Businesses() {
  return <><PageHero label="Our businesses" title="Focused platforms for practical progress." text="Sapient's businesses are built around sectors where patient capital, operating capability and accountable leadership can create enduring value." /><BusinessPreview /></>;
}

function Subsidiary({ business }: { business: Business }) {
  return <><PageHero label="Our businesses" title={business.name} text={business.description}><a className="rebuild-button" href="/contact">Contact Sapient <Arrow /></a></PageHero><section className="rebuild-section"><div className="rebuild-shell rebuild-two-column"><div><Eyebrow>What this business is about</Eyebrow><h2>{business.short}</h2></div><div><p className="rebuild-lead">{business.description}</p><p>Every opportunity is considered through Sapient's group standards for commercial discipline, delivery readiness, governance and long-term value creation.</p></div></div></section><section className="rebuild-section rebuild-soft-section"><div className="rebuild-shell"><div className="rebuild-section-heading"><div><Eyebrow>Areas of focus</Eyebrow><h2>Built around practical capability.</h2></div><p>We focus on the capabilities, systems and operating relationships that can create real, durable value in this sector.</p></div><div className="rebuild-focus-list">{business.focus.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div></div></section><section className="rebuild-section rebuild-indigo-section"><div className="rebuild-shell"><Eyebrow>How Sapient supports the business</Eyebrow><h2>Capital discipline meets operating perspective.</h2><div className="rebuild-card-grid rebuild-governance-grid"><article><span>01</span><h3>Strategic direction</h3><p>Group support helps connect sector opportunities to clear objectives and responsible long-term priorities.</p></article><article><span>02</span><h3>Commercial focus</h3><p>We consider how an opportunity can operate, deliver and create durable value in real market conditions.</p></article><article><span>03</span><h3>Accountable delivery</h3><p>Governance and practical oversight provide a foundation for measured execution and continuous learning.</p></article></div></div></section></>;
}

function ProjectPortfolio() {
  const companies = ["All projects", ...businesses.map((business) => business.name)];
  const [selected, setSelected] = useState("All projects");
  const visible = selected === "All projects" ? portfolioProjects : portfolioProjects.filter((project) => project.company === selected);
  return <><div className="rebuild-project-filters" aria-label="Filter projects by company">{companies.map((company) => <button type="button" key={company} className={selected === company ? "is-active" : ""} onClick={() => setSelected(company)}>{company}</button>)}</div><div className="rebuild-card-grid rebuild-project-grid">{visible.map((project, index) => <article className="rebuild-project-card" key={`${project.company}-${project.title}`}><div className="rebuild-project-emblem-wrap"><img src="/sapient-project-emblem.png" alt="Sapient emblem" /></div><div><span className="rebuild-card-index">{project.company}</span><h3>{project.title}</h3><p>{project.description}</p><small>{project.focus}</small></div><a href="/contact">Discuss an opportunity <Arrow /></a></article>)}</div></>;
}

function Projects() {
  return <><PageHero label="Projects" title="Purposeful work. Lasting value." text="Explore Sapient's project focus across the group or choose an operating company to see the projects associated with that business." /><section className="rebuild-section"><div className="rebuild-shell"><div className="rebuild-section-heading"><div><Eyebrow>Project portfolio</Eyebrow><h2>View by company or all at once.</h2></div><p>Each project card is grouped by its relevant operating platform so the portfolio can be explored in the way that is most useful.</p></div><ProjectPortfolio /></div></section></>;
}

function InvestorEnquiryForm() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return <form className="rebuild-form rebuild-investor-form" onSubmit={submit}><label>Full name<input required name="name" placeholder="Your full name" /></label><label>Organisation<input required name="organisation" placeholder="Organisation name" /></label><label>Email<input required name="email" type="email" placeholder="you@example.com" /></label><label>Phone<input name="phone" type="tel" placeholder="+234 ..." /></label><label>Investment interest<select name="interest" defaultValue=""><option value="" disabled>Select an area</option>{businesses.map((business) => <option value={business.name} key={business.slug}>{business.name}</option>)}<option value="Group-level opportunity">Group-level opportunity</option></select></label><label>Indicative range<select name="range" defaultValue=""><option value="" disabled>Select an option</option><option>Under $1m</option><option>$1m - $5m</option><option>$5m - $20m</option><option>Over $20m</option><option>Prefer to discuss</option></select></label><label className="rebuild-form-message">Investment thesis or opportunity<textarea required name="message" rows={6} placeholder="Please share your investment focus, the opportunity, time horizon and any information you would like the team to consider." /></label><button className="rebuild-button" type="submit">Send investor enquiry <Arrow /></button>{sent && <p className="rebuild-form-success">Thank you. Your investor enquiry has been received.</p>}</form>;
}

function Investors() {
  return <><PageHero label="Investors" title="A disciplined home for long-term value." text="Sapient welcomes conversations with investors who share our commitment to sound governance, practical enterprise building and patient value creation." /><section className="rebuild-section"><div className="rebuild-shell"><div className="rebuild-section-heading"><div><Eyebrow>Investor perspective</Eyebrow><h2>How we think about value.</h2></div><p>We approach opportunities through a balance of strategic fit, execution readiness, measured risk and potential for enduring returns.</p></div><div className="rebuild-card-grid rebuild-three-grid"><article className="rebuild-route-card"><span>01</span><h3>Disciplined allocation</h3><p>Capital is considered against clear strategic priorities, governance requirements and an informed view of risk.</p></article><article className="rebuild-route-card"><span>02</span><h3>Operating relevance</h3><p>We value opportunities that can be supported by practical business insight, accountable teams and execution focus.</p></article><article className="rebuild-route-card"><span>03</span><h3>Long-term alignment</h3><p>We seek aligned relationships built around responsible growth, transparent communication and shared progress.</p></article></div></div></section><section className="rebuild-section rebuild-soft-section"><div className="rebuild-shell rebuild-investor-enquiry-wrap"><div><Eyebrow>Investor enquiry</Eyebrow><h2>Begin with the context that matters.</h2><p>Share the area of interest, investment range, time horizon and any relevant background. This helps the group direct your enquiry to the right conversation.</p><ul><li>Sector or project interest</li><li>Investment objective and time horizon</li><li>Indicative capital range</li><li>Organisation and preferred contact details</li></ul></div><InvestorEnquiryForm /></div></section></>;
}

function Media() {
  return <><PageHero label="Media" title="News, perspectives and resources." text="Follow the latest from Sapient Capital Holdings through group updates, published perspectives and an expanding library of approved media materials." /><section className="rebuild-section"><div className="rebuild-shell rebuild-media-stack">{mediaItems.map((item, index) => <article className="rebuild-media-card" id={item.id} key={item.id}><div className="rebuild-media-visual"><span>{String(index + 1).padStart(2, "0")}</span></div><div><Eyebrow>{item.label}</Eyebrow><h2>{item.title}</h2><p>{item.text}</p><small>{item.meta}</small></div><a href="/contact" className="rebuild-text-link">Media enquiry <Arrow /></a></article>)}</div></section></>;
}

function Careers() {
  return <><PageHero label="Careers" title="Build work that moves with purpose." text="Sapient is building a thoughtful, accountable team around the work of developing resilient businesses and assets across Africa." /><section className="rebuild-section"><div className="rebuild-shell rebuild-careers-grid"><article id="opportunities"><Eyebrow>Career opportunities</Eyebrow><h2>Current opportunities</h2><p>Open roles will be shared here as they become available. You may also register your interest for future opportunities aligned to our businesses.</p><a className="rebuild-text-link" href="mailto:info@sapientcapitals.com?subject=Career%20interest">Register your interest <Arrow /></a></article><article id="working-at-sapient"><Eyebrow>Working at Sapient</Eyebrow><h2>People, progress and responsibility.</h2><p>We value commercial curiosity, care in execution, respect for colleagues and a shared commitment to creating useful, lasting outcomes.</p><a className="rebuild-text-link" href="/contact">Contact Sapient <Arrow /></a></article><article><Eyebrow>Career development</Eyebrow><h2>Grow with the work.</h2><p>We aim to create an environment where people can build capability through meaningful responsibility, collaboration and learning.</p></article></div></section></>;
}

function EnquiryForm() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return <form className="rebuild-form" onSubmit={submit}><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" type="email" required placeholder="you@example.com" /></label><label>Enquiry type<select name="type" defaultValue=""><option value="" disabled>Select an option</option><option>Partnership enquiry</option><option>Investor enquiry</option><option>General enquiry</option></select></label><label className="rebuild-form-message">Message<textarea name="message" required rows={4} placeholder="How can we help?" /></label><button className="rebuild-button" type="submit">Send enquiry <Arrow /></button>{sent && <p className="rebuild-form-success">Thank you. Your enquiry has been received.</p>}</form>;
}

function Contact() {
  return <><PageHero label="Contact" title="Reach the Sapient Group." text="We welcome group enquiries, strategic conversations and relevant investor or partnership discussions." /><section className="rebuild-section"><div className="rebuild-shell rebuild-contact-grid"><article id="reach-the-group" className="rebuild-contact-card"><Eyebrow>Reach the group</Eyebrow><h2>Contact information</h2><div className="rebuild-contact-details"><a href="mailto:info@sapientcapitals.com">info@sapientcapitals.com</a><a href="tel:+2348054696948">+234 805 469 6948</a><p>21, Awofeso Street, Off Shipeolu,<br />Palmgrove, Lagos</p><p>Monday-Friday, 8am-5pm</p></div><a className="rebuild-text-link" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=21%20Awofeso%20Street%20Off%20Shipeolu%20Palmgrove%20Lagos">Open in Maps <Arrow /></a></article><article id="partnership-enquiries" className="rebuild-contact-card rebuild-contact-form-card"><Eyebrow>Partnership enquiries</Eyebrow><h2>Start a conversation.</h2><p>Share a little about your opportunity or enquiry and the appropriate Sapient team member will respond.</p><EnquiryForm /></article></div></section></>;
}

function ProfileCard({ person, committeeMember = false }: { person: Person; committeeMember?: boolean }) {
  return <article className="rebuild-profile-card"><div className="rebuild-profile-image" aria-label={`Professional photograph for ${person.name} pending approval`}><span>{person.initials}</span><small>Photo pending approval</small></div><div><Eyebrow>{person.role}</Eyebrow><h3>{person.name}</h3><p>{person.bio}</p>{committeeMember && person.responsibility && <p className="rebuild-responsibility"><strong>Committee responsibility:</strong> {person.responsibility}</p>}</div></article>;
}

function OperatingTeamSections() {
  return <div className="rebuild-operating-teams">{operatingTeams.map((team) => <section className="rebuild-operating-team" key={team.company}><div className="rebuild-team-heading"><Eyebrow>Executive Management</Eyebrow><h2>{team.company}</h2><p>{team.introduction}</p></div>{team.members.length > 0 ? <div className="rebuild-profile-grid">{team.members.map((person) => <ProfileCard person={person} key={person.name} />)}</div> : <div className="rebuild-team-pending"><span>Appointments in progress</span><p>The executive-management profile cards for this operating company will be added following confirmation.</p></div>}</section>)}</div>;
}

function LeadershipOverview() {
  return <><PageHero label="Leadership and Governance" title="Experienced leadership. Accountable governance." text="Sapient operates through distinct group leadership, executive management and independent investment oversight, each with a clear role in building lasting value." /><section className="rebuild-section"><div className="rebuild-shell"><div className="rebuild-section-heading"><div><Eyebrow>Leadership areas</Eyebrow><h2>Explore the teams and oversight bodies.</h2></div><p>Each branch opens as its own focused page, with its team profiles and relevant responsibilities.</p></div><div className="rebuild-card-grid rebuild-three-grid"><a className="rebuild-route-card" href="/leadership/group-leadership"><span>01</span><h3>Group Leadership</h3><p>Senior leadership responsible for the direction, stewardship and performance of the Sapient Group.</p><Arrow /></a><a className="rebuild-route-card" href="/leadership/executive-management"><span>02</span><h3>Executive Management</h3><p>Operating teams organised by the company they support and the work they lead.</p><Arrow /></a><a className="rebuild-route-card" href="/leadership/investment-committee"><span>03</span><h3>Investment Committee</h3><p>Independent investment oversight, structured review and measured challenge.</p><Arrow /></a></div></div></section><section className="rebuild-section rebuild-indigo-section" id="governance"><div className="rebuild-shell"><Eyebrow>Governance</Eyebrow><h2>A framework for responsible progress.</h2><div className="rebuild-card-grid rebuild-governance-grid"><article><span>01</span><h3>Clear accountability</h3><p>Defined responsibilities support informed decisions and appropriate oversight across the group.</p></article><article><span>02</span><h3>Financial discipline</h3><p>Capital planning, reporting and resource allocation are considered with care and long-term objectives in view.</p></article><article><span>03</span><h3>Independent challenge</h3><p>Investment Committee review helps ensure material opportunities receive structured evaluation and risk consideration.</p></article></div></div></section></>;
}

function LeadershipDetail({ branch }: { branch: "group" | "executive" | "committee" }) {
  if (branch === "group") return <><PageHero label="Leadership" title="Group Leadership" text="The Group Leadership Team is responsible for the direction, stewardship and long-term performance of Sapient Capital Holdings and its operating businesses." /><section className="rebuild-section"><div className="rebuild-shell"><div className="rebuild-section-heading"><div><Eyebrow>Group Leadership</Eyebrow><h2>Leading the Sapient Group.</h2></div><p>Group leadership sets priorities, maintains financial discipline and supports performance across Sapient's operating platforms.</p></div><div className="rebuild-profile-grid">{groupLeadership.map((person) => <ProfileCard person={person} key={person.name} />)}</div></div></section></>;
  if (branch === "executive") return <><PageHero label="Leadership" title="Executive Management" text="Executive Management translates group strategy into focused operating-company leadership, commercially sound growth and disciplined delivery." /><section className="rebuild-section"><div className="rebuild-shell"><div className="rebuild-section-heading"><div><Eyebrow>Operating companies</Eyebrow><h2>Focused teams for focused businesses.</h2></div><p>Each operating company has its own dedicated section, so its executive leadership and current team information can be viewed independently.</p></div><OperatingTeamSections /></div></section></>;
  return <><PageHero label="Leadership" title="Investment Committee" text="The Investment Committee is separate from operational management and provides independent review and measured challenge for material capital-allocation decisions." /><section className="rebuild-section"><div className="rebuild-shell"><div className="rebuild-section-heading"><div><Eyebrow>Independent Committee</Eyebrow><h2>Investment oversight.</h2></div><p>The committee evaluates strategic fit, commercial rationale, delivery readiness and relevant risk before investment decisions are progressed.</p></div><div className="rebuild-profile-grid">{committee.map((person) => <ProfileCard person={person} committeeMember key={person.name} />)}</div></div></section></>;
}

function Legal({ title }: { title: string }) {
  return <><PageHero label="Sapient Capital Holdings" title={title} text="This page is being prepared for publication. For information, please contact the Sapient Group." /><section className="rebuild-section"><div className="rebuild-shell"><a className="rebuild-button" href="/contact">Contact Sapient <Arrow /></a></div></section></>;
}

function SearchPage() {
  const query = useSearchParams().get("q")?.trim().toLowerCase() ?? "";
  const entries = [
    { title: "About Sapient", text: "Who we are, our vision, mission, core values and governance approach.", href: "/about" },
    ...businesses.map((business) => ({ title: business.name, text: `${business.short} ${business.description}`, href: `/${business.slug}` })),
    { title: "Projects", text: "Explore projects across each Sapient operating company.", href: "/projects" },
    { title: "Investors", text: "Investor perspective, investment approach and investor enquiry.", href: "/investors" },
    { title: "Leadership and Governance", text: "Group Leadership, Executive Management and Investment Committee.", href: "/leadership-governance" },
    { title: "Media", text: "News, insights, photo and video library, publications and press releases.", href: "/media" },
    { title: "Careers", text: "Career opportunities, working at Sapient and career development.", href: "/careers" },
    { title: "Contact Sapient", text: "Reach the group or send a partnership enquiry.", href: "/contact" },
  ];
  const results = query ? entries.filter((entry) => `${entry.title} ${entry.text}`.toLowerCase().includes(query)) : entries;
  return <><PageHero label="Search" title={query ? `Results for "${query}"` : "Search Sapient"} text={query ? `Browse the pages that match your search for "${query}".` : "Use the search field in the header to find businesses, projects, leadership information and more."} /><section className="rebuild-section"><div className="rebuild-shell"><div className="rebuild-search-results">{results.length > 0 ? results.map((entry) => <a href={entry.href} key={entry.href}><h2>{entry.title}</h2><p>{entry.text}</p><Arrow /></a>) : <p className="rebuild-search-empty">No pages matched that search. Try another keyword or explore the main navigation.</p>}</div></div></section></>;
}

function Content() {
  const pathname = usePathname();
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const business = businesses.find((item) => `/${item.slug}` === path);
  if (business) return <Subsidiary business={business} />;
  if (path === "/") return <Home />;
  if (path === "/about") return <About />;
  if (path === "/our-businesses") return <Businesses />;
  if (path === "/projects") return <Projects />;
  if (path === "/investors" || path === "/partnerships") return <Investors />;
  if (path === "/media") return <Media />;
  if (path === "/careers" || path === "/insights") return <Careers />;
  if (path === "/contact") return <Contact />;
  if (path === "/search") return <SearchPage />;
  if (path === "/leadership-governance") return <LeadershipOverview />;
  if (path === "/leadership/group-leadership") return <LeadershipDetail branch="group" />;
  if (path === "/leadership/executive-management") return <LeadershipDetail branch="executive" />;
  if (path === "/leadership/investment-committee") return <LeadershipDetail branch="committee" />;
  if (path === "/privacy") return <Legal title="Privacy" />;
  if (path === "/terms") return <Legal title="Terms" />;
  return <Legal title="Page not found" />;
}

export default function SapientRebuild() {
  return <div className="rebuild-site"><SiteHeader /><main><Content /></main><Footer /></div>;
}
