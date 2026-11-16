import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Linkedin, Menu, X } from 'lucide-react';
import { CLUB_ASSETS } from './config/images';
import AssetImage from './components/AssetImage';
import MemberPortrait from './components/MemberPortrait';
import AboutSubTeams from './components/AboutSubTeams';
import { memberPortrait } from './config/memberPortraits';
import './styles.css';
import { partners } from './partners';
import './partners.css';
import './contact.css';
import './footer.css';
import './images.css';
import './events.css';

// Edit the public contact details and recruitment destination here.
const CLUB = {
  name: 'Chem-E-Car',
  email: 'unswcec@gmail.com',
  instagram: 'https://www.instagram.com/chemecarunsw/',
  linkedin: 'https://www.linkedin.com/company/unsw-chem-e-car',
  // Recruitment form linked from UNSW's official Chem-E-Car project page:
  // https://www.unsw.edu.au/challeng/student-projects/explore-student-projects/Chem-E-car
  recruitment: 'https://forms.office.com/pages/responsepage.aspx?id=pM_2PxXn20i44Qhnufn7owNqU1sGf-ZLkFTaD1QN9SlUOEwwRFNTTkVEMFlHQjc3NlZFVjBKRDY4Ny4u&route=shorturl',
};
const navigation = [['Home','/'], ['About Us','/about'], ['Team','/team'], ['Partners','/partners'], ['Contact','/contact']];
const ease = [0.22, 1, 0.36, 1];
const motionProps = (reduce, delay=0) => reduce ? {} : ({initial:{opacity:0,y:16,filter:'blur(4px)'}, animate:{opacity:1,y:0,filter:'blur(0px)'}, transition:{duration:.52,delay,ease}});

function Photo({src,alt='',className='',loading='lazy'}) { return <AssetImage src={src} alt={alt} className={'photo '+className} loading={loading}/>; }
function Label({children}) {return <span className="eyebrow">{children}</span>}
function Headline({label,title,body}) {return <div className="section-heading"><Label>{label}</Label><h2>{title}</h2>{body&&<p>{body}</p>}</div>}
function FadeIn({children,delay=0,className=''}) {const reduce=useReducedMotion();return <motion.div className={className} {...motionProps(reduce,delay)}>{children}</motion.div>}

function Navbar() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const { pathname } = useLocation();
  const joinTeamHref = '/contact#recruitment';

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = event => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="Chem-E-Car UNSW home" onClick={() => setOpen(false)}>
          <AssetImage
            src={CLUB_ASSETS.logos.club_transparent}
            alt=""
            kind="logo"
            className="brand-logo"
          />
          <span>
            CHEM-E-CAR <small>UNSW</small>
          </span>
        </Link>

        <nav
          id="main-navigation"
          className={`nav-links ${open ? 'nav-links-open' : ''}`}
          aria-label="Main navigation"
        >
          {navigation.map(([name, href]) => (
            <Link
              to={href}
              key={href}
              aria-current={pathname === href ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {name}
            </Link>
          ))}
          <Link to={joinTeamHref} className="nav-join-mobile" onClick={() => setOpen(false)}>
            Join the Team <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </nav>

        <Link to={joinTeamHref} className="nav-join">
          JOIN THE TEAM <ArrowUpRight size={14} />
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          className="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(value => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

const heroContent = {
  '/': {image:CLUB_ASSETS.heroes.home,kicker:'CHEM-E-CAR UNSW',title:<>	Built by Students.<br/>Powered by Chemistry.</>,tag:'Student engineering. Real-world constraints.',action:'Discover what we build',href:'#build'},
  '/about': {image:CLUB_ASSETS.heroes.about,kicker:'ABOUT THE TEAM',title:<>Who We Are.<br/></>,tag:'Discover Chem-E-Car UNSW, our purpose, and how we bring engineering beyond the classroom.',action:'Our approach',href:'#mission'},
  '/team': {image:CLUB_ASSETS.heroes.team,kicker:'THE PEOPLE',title:<>Our Team.<br/></>,tag:'Different disciplines. One moving project.',action:'Meet the team',href:'#people'},
  '/partners': {image:CLUB_ASSETS.heroes.partners,kicker:'PARTNERSHIPS',title:<>Our Partners.<br/></>,tag:'	Meet the organisations supporting our team and helping bring our projects to life.',action:'Explore partnerships',href:'#support'},
  '/contact': {image:CLUB_ASSETS.heroes.contact,kicker:'GET IN TOUCH',title:<>Get in Touch<br/></>,tag:'Have a question, partnership opportunity, or interest in joining? We\'d love to hear from you.',action:'Contact the team',href:'#contact-details'}
};
function Hero({path}) {
  const item = heroContent[path] || heroContent['/'];
  const reduce = useReducedMotion();
  const [failedImage, setFailedImage] = useState(null);
  const hasImage = Boolean(item.image) && failedImage !== item.image;
  const pageName = path === '/' ? 'Home' : path.slice(1);
  return (
    <section className={`hero ${path === '/' ? 'hero-home' : 'hero-secondary'}${hasImage ? '' : ' hero-wireframe'}`} aria-label={`${pageName} introduction`}>
      <AssetImage
        src={item.image}
        alt=""
        placeholderLabel={`${pageName} banner`}
        className="hero-media"
        loading="eager"
        onError={() => setFailedImage(item.image)}
      />
      <div className="hero-shade" />
      <div className="hero-center">
        <motion.div {...motionProps(reduce, 0)}><div className="hero-kicker">{item.kicker}</div></motion.div>
        <motion.h1 {...motionProps(reduce, .04)}>{item.title}</motion.h1>
        <motion.div {...motionProps(reduce, .12)}>
          <p>{item.tag}</p>
          <a className="hero-action" href={item.href}>{item.action} <ArrowUpRight size={16}/></a>
        </motion.div>
      </div>
      <a href={item.href} className="hero-discover">DISCOVER MORE <ArrowDown size={16}/></a>
    </section>
  );
}
function GlassFeature({image,label,title,description}) {
  return (
    <article className="glass glass-feature">
      <div className="feature-image-wrap"><Photo src={image} alt={title}/></div>
      <div className="feature-copy">
        <Label>{label}</Label>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}
function Home() {return <><Hero path="/"/><div className="content-wrap" id="build">
  <section className="section-space">
    <FadeIn>
      <Headline
        label="WHAT WE BUILD"
        title="Our Chem-E-Car Project."
        body="Our team designs, builds, and tests a small car powered by chemical reactions. The project combines chemistry, electronics, mechanical design, and practical engineering."
      />
    </FadeIn>
    <div className="features-two">
      <FadeIn delay={.12}>
        <GlassFeature
          image={CLUB_ASSETS.showcase.vehicle}
          label="THE VEHICLE"
          title="Our Chemical-Powered Car."
          description="Our vehicle combines a chemical power source, electrical circuits, mechanical components, and a stopping mechanism. Each system is designed to work together to move the car and stop it at a target distance."
        />
      </FadeIn>
      <FadeIn delay={.18}>
        <GlassFeature
          image={CLUB_ASSETS.showcase.chemistry}
          label="DESIGN & TESTING"
          title="Our Engineering Process."
          description="Our team develops and tests each part of the vehicle through regular laboratory sessions. We collect data, evaluate performance, and refine our designs to improve reliability and consistency."
        />
      </FadeIn>
    </div>
  </section>
  <section className="section-space outreach-section" id="events"><div className="section-heading-row"><Headline label="BEYOND THE WORKSHOP" title="Engineering, out in the open." body="We want more people to experience what engineering looks like when you can actually see it move."/><span className="quiet-caption">EVENT GALLERY</span></div><div className="events-grid"><FadeIn className="event-event" delay={.08}><EventCard image={CLUB_ASSETS.outreach.stemWorkshop} title="High School STEM Outreach" text="Through school visits and hands-on demonstrations, we introduce students to Chem-E-Car and create opportunities for anyone interested in exploring engineering, regardless of their experience." category="STEM OUTREACH"/></FadeIn><FadeIn className="event-event" delay={.14}><EventCard image={CLUB_ASSETS.outreach.campusExhibition} title="Campus Events" text="Beyond building our car, we bring students together through campus events, exhibitions, and social activities, creating opportunities to connect, make friends, and grow our team." category="CAMPUS"/></FadeIn><FadeIn className="event-event" delay={.2}><EventCard image={CLUB_ASSETS.outreach.competitionDay} title="Competition" text="We compete in AIChE Chem-E-Car competitions, representing UNSW against university teams from around the world. Through these international competitions, we aim to build a competitive chemical-powered car, improve our engineering skills, and challenge ourselves to achieve the best possible results." category="COMPETITION"/></FadeIn></div></section>
  <section className="section-space"><div className="statement glass"><Label>STUDENT-LED ENGINEERING</Label><h2>There is no better way to learn engineering than to build something that has to work.</h2><Link to="/about" className="text-link">More about our team <ArrowUpRight size={16}/></Link></div></section></div></>}
function EventCard({image,title,text,category}) {return <article className="glass event-card"><div className="event-image"><Photo src={image} alt={title}/></div><div className="event-copy"><Label>{category}</Label><h3>{title}</h3><p>{text}</p></div></article>}
function About() {return <><Hero path="/about"/><div className="content-wrap"><section className="section-space about-editorial" id="mission"><div className="about-copy"><Headline label="OUR MISSION" title="Putting Engineering into Practice."/><p>Chem-E-Car UNSW is a student-led engineering team that designs and builds a small vehicle powered by chemical reactions. The challenge brings chemistry, electronics, mechanical design and practical testing into one shared project.</p><p>Our work is shaped by the engineering process: make a hypothesis, build a prototype, measure what happens, and improve it. We bring together students who want to put classroom ideas to the test.</p><Link to="/team" className="text-link">The people behind the project <ArrowUpRight size={16}/></Link></div><div className="masonry"><div className="masonry-col"><Photo src={CLUB_ASSETS.about.labHands} alt="Chem-E-Car team working on the car at competition"/><Photo src={CLUB_ASSETS.about.collaboration} alt="Chem-E-Car executive team together at UNSW"/></div><div className="masonry-col offset"><Photo src={CLUB_ASSETS.about.labCulture} alt="Chemistry laboratory"/><Photo src={CLUB_ASSETS.about.workshop} alt="Workshop and fabrication"/></div></div></section><section className="section-space"><FadeIn><Headline label="HOW WE WORK" title="Engineering is a team sport." body="Our technical and operational groups bring different skills to the same challenge."/></FadeIn><AboutSubTeams/></section><section className="section-space"><FadeIn><div className="glass outreach-wide"><div className="outreach-wide-copy"><Label>OUR COMMUNITY</Label><h2>Sharing Engineering with Our Community.</h2><p>Through student engagement, school outreach and public demonstrations, we aim to make technical work approachable and give future engineers something tangible to explore.</p><Link to="/contact#contact-details" className="text-link">Get in touch about outreach <ArrowUpRight size={16}/></Link></div><div className="outreach-wide-images"><Photo src={CLUB_ASSETS.outreach.stemWorkshop} alt="Chem-E-Car students demonstrating a car at a STEM workshop"/><Photo src={CLUB_ASSETS.outreach.campusExhibition} alt="Campus exhibition"/></div></div></FadeIn></section></div></>}
const members = [
 {name :'Nathanael Winston Widjaya', role:'President',group:'Executive'},
 {name :'Paarth Singh Tomar', role:'Vice President',group:'Executive'},
 {name : 'Raven Soetantyo', role:'Treasurer', group:'Executive'},
 {name : 'Ethan J. Juwono',role:'Secretary',group:'Executive'},
 {name : 'Luka Van Den Tweel',role:'Safety Officer',group:'Executive'},
 {name : 'Rafaela Refnil',role:'Welfare Officer',group:'Executive'},
 {name : 'Trixie Tjandra',role:'Events',group:'Executive'},
 {name : 'Wei Pin Gan',role:'Arc-Delegate',group:'Executive'},
 {name : 'Mark Hidajat',role:'IT',group:'Executive'},
 {name : 'Chloe Elizabeth T.',role:'Media',group:'Executive'},
 {name : 'Jonas Cheng',role:'Sponsorship',group:'Executive'},
 {name :'Nathanael Winston Widjaya', role:'Battery Lead',group:'Technical'},
 {name :'Paarth Singh Tomar', role:'Stopping Mech Lead',group:'Technical'},
 {name: 'Samuel Jose Rubianto', role:'Mechanical Lead',group:'Technical'},
 {name: 'Samuel Jose Rubianto', role:'Electrical Lead',group:'Technical'}
].map((member, i) => ({
  ...member,
  id: i,
  name: member.name ?? 'Member name',
  image: memberPortrait(member),
  linkedin: '',
}));
const filters = ['All','Executive','Technical','Outreach & Operations'];
function Team() {const [filter,setFilter]=useState('All');const filtered=members.filter(x=>filter==='All'||x.group===filter);return <><Hero path="/team"/><div className="content-wrap"><section className="section-space" id="people"><div className="team-intro"><Headline label="MEET THE TEAM" title="The people behind every run." body="Chemistry, mechanical design, software, operations and everything between. Get to know the roles that keep the project moving."/><span className="quiet-caption">TEAM ROSTER</span></div><div className="filter-scroll"><div className="filter-tabs" role="group" aria-label="Filter team by department">{filters.map(f=><button key={f} type="button" aria-pressed={filter===f} className={filter===f?'selected':''} onClick={()=>setFilter(f)}>{f}</button>)}</div></div><motion.div layout className="team-grid"> <AnimatePresence mode="popLayout">{filtered.map(m=><motion.article key={m.id} layout initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}} transition={{duration:.24,ease}} className="glass member group"><div className="member-photo aspect-[4/5] rounded-[12px] overflow-hidden"><MemberPortrait member={m}/></div><div className="member-footer"><h3>{m.name}</h3><p>{m.role}</p><span>{m.group}</span>{m.linkedin&&<a className="member-social" href={m.linkedin} aria-label={`LinkedIn for ${m.name}`}><Linkedin size={17}/></a>}</div></motion.article>)}</AnimatePresence></motion.div></section><section className="section-space"><div className="glass team-invite"><div><Label>JOIN THE PROJECT</Label><h2>Find your place on the team.</h2><p>There is room for curiosity, commitment and different kinds of technical thinking.</p></div><Link to="/contact#recruitment" className="dark-button">Join the team <ArrowUpRight size={16}/></Link></div></section></div></>}
function Partners() {
  return (
    <>
      <Hero path="/partners" />
      <div className="content-wrap">
        <section id="support" className="section-space" aria-label="Our partners">
          <Headline
            label="OUR PARTNERS"
            title="Behind every build is a community."
            body="Thank you to the organisations supporting hands-on student engineering at UNSW."
          />
          <div className="partner-tier" role="group" aria-labelledby="gold-partners-heading">
            <h3 id="gold-partners-heading" className="partner-tier-heading">Gold Partners</h3>
            <div className="partners-grid">
              {partners.map(partner => (
                <a
                  key={partner.href}
                  className="partner-card"
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${partner.name} (opens in a new tab)`}
                >
                  <span className="partner-logo">
                    <AssetImage src={partner.logo} alt="" placeholderLabel={partner.name} kind="logo" width="200" height="112" />
                  </span>
                  <span className="partner-caption" aria-hidden="true">
                    <span className="partner-name">{partner.name}</span>
                    <span className="partner-arrow">↗</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
function Contact() {
  const { hash } = useLocation();
  const reduce = useReducedMotion();
  // Run after this page mounts, including after the route's exit animation.
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth' });
    }
  }, [hash, reduce]);

  return (
    <>
      <Hero path="/contact" />
      <div className="contact-editorial" id="contact-details">
        <section aria-label="Contact the team">
          <div className="editorial-contact-row">
            <h2>Email</h2>
            <div>
              <p className="contact-role">Student, outreach &amp; partner enquiries</p>
              <a className="editorial-contact-link" href={`mailto:${CLUB.email}`}>
                {CLUB.email}<span className="contact-link-arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="editorial-contact-row">
            <h2>Follow the team</h2>
            <div className="contact-social-links">
              <a className="editorial-contact-link" href={CLUB.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)">
                Instagram<span className="contact-link-arrow" aria-hidden="true">↗</span>
              </a>
              <a className="editorial-contact-link" href={CLUB.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">
                LinkedIn<span className="contact-link-arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
        <section className="contact-recruitment" id="recruitment" aria-labelledby="recruitment-heading">
          <span className="recruitment-eyebrow">// RECRUITMENT &amp; MEMBERSHIP</span>
          <h2 id="recruitment-heading">Join the Team</h2>
          <p>Engineering, science, business and outreach students are welcome to join our project. Bring your curiosity, learn with the team and help build a chemically powered car.</p>
          <a className="recruitment-button" href={CLUB.recruitment} target="_blank" rel="noopener noreferrer" aria-label="Apply to Join (opens in a new tab)">
            Apply to Join<span aria-hidden="true">↗</span>
          </a>
        </section>
      </div>
    </>
  );
}
function Footer() {
  const columns = [navigation.slice(0, 2), navigation.slice(2, 4), navigation.slice(4)];
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-branding">
            <AssetImage
              kind="logo"
              className="footer-club-logo"
              src={CLUB_ASSETS.logos.club_transparent}
              alt="UNSW Chem-E-Car Logo"
              width="3300"
              height="2550"
              loading="lazy"
            />
            <span className="footer-logo-divider" aria-hidden="true" />
            <AssetImage
              kind="logo"
              className="footer-university-logo"
              src={CLUB_ASSETS.logos.unsw}
              alt="UNSW Sydney"
              width="330"
              height="140"
              loading="lazy"
            />
          </div>
          <nav className="footer-explore" aria-labelledby="footer-explore-heading">
            <h2 id="footer-explore-heading">Explore</h2>
            <div className="footer-nav-grid">
              {columns.map((links, index) => (
                <div className="footer-nav-column" key={index}>
                  {links.map(([name, href]) => <Link key={href} to={href}>{name}</Link>)}
                </div>
              ))}
            </div>
          </nav>
        </div>
        <div className="footer-credit-strip">
          <p>© {new Date().getFullYear()} UNSW Chem-E-Car. All rights reserved.</p>
          <p>Built by Students at UNSW Sydney</p>
        </div>
      </div>
    </footer>
  );
}
function ScrollAndRoutes(){const location=useLocation();const reduce=useReducedMotion();useEffect(()=>{const hash=location.hash; if(hash){requestAnimationFrame(()=>document.getElementById(hash.slice(1))?.scrollIntoView({behavior:'smooth'}))}else{window.scrollTo({top:0,behavior:'instant'})}},[location.pathname,location.hash]);const path=location.pathname in heroContent ? location.pathname : '/';const pages={'/':<Home/>, '/about':<About/>, '/team':<Team/>, '/partners':<Partners/>, '/contact':<Contact/>};return <><Navbar/><main><AnimatePresence mode="wait" initial={false}><motion.div key={path} initial={reduce?false:{opacity:0,y:10,filter:'blur(4px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} exit={reduce?{opacity:1}:{opacity:0,filter:'blur(2px)'}} transition={reduce?{duration:0}:{duration:.42,ease}}>{pages[path]}</motion.div></AnimatePresence></main><Footer/></>}
function App(){return <BrowserRouter><ScrollAndRoutes/></BrowserRouter>}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);

