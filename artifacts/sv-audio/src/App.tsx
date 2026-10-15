import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUp, AudioLines, Check, Disc3, Headphones, MapPin, Menu, MessageCircle, Mic2, MoveUpRight, Phone, Radio, Send, ShieldCheck, SlidersHorizontal, Sparkles, Volume2, X, Zap } from "lucide-react";
import { branches, brands, categories, contactPhones, offer, phone, products, social, whatsappDisplay } from "./data/siteData";

const logo = "/images/sv-audio-logo.jpg";
const wa = (message = "Hello SV Audio!") => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
const links = [["Home", "#home"], ["About", "#about"], ["Products", "#products"], ["Branches", "#branches"], ["Contact", "#contact"]];

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return <div className="section-head reveal"><span className="eyebrow"><i />{eyebrow}</span><h2>{title}</h2>{sub && <p>{sub}</p>}</div>;
}

function CountUp({ value, suffix = "", minDigits = 0 }: { value: number; suffix?: string; minDigits?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const reducedMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString("en-US").padStart(minDigits, "0"),
  );

  useEffect(() => {
    if (!isInView) return;
    if (reducedMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return () => controls.stop();
  }, [count, isInView, reducedMotion, value]);

  return <motion.strong><motion.span className="counter-value" ref={ref}>{rounded}</motion.span>{suffix && <span className="counter-suffix">{suffix}</span>}</motion.strong>;
}

function App() {
  const [intro, setIntro] = useState(true);
  const [filter, setFilter] = useState("All");
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [sent, setSent] = useState(false);
  const [branch, setBranch] = useState(0);
  const [pointer, setPointer] = useState({ x: 50, y: 44 });
  const shownProducts = useMemo(() => filter === "All" ? products : products.filter((p) => p.category === filter), [filter]);

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIntro(false), 760);
    const onScroll = () => { setScrolled(window.scrollY > 24); setShowTop(window.scrollY > 600); };
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => { window.clearTimeout(introTimer); window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, [filter]);

  const closeMenu = () => setMenu(false);
  const order = (p: (typeof products)[number]) => window.open(wa(`Hello SV Audio! I'm interested in ${p.name} (${p.brand}). Please send me the price and details.`), "_blank", "noopener,noreferrer");
  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Hello SV Audio! My name is ${data.get("name")}. Phone: ${data.get("phone")}. Message: ${data.get("message")}`;
    setSent(true);
    window.open(wa(message), "_blank", "noopener,noreferrer");
    event.currentTarget.reset();
  };

  return <main>
    {intro && <div className="intro-screen" aria-hidden="true"><img src={logo} alt=""/><div className="intro-wave">{Array.from({length:19},(_,i)=><i key={i} style={{"--i":i} as CSSProperties}/>)}</div></div>}
    {offer.enabled && <div className="offer-bar"><span className="offer-spark"><Sparkles size={14}/></span><strong>{offer.text}</strong><span>{offer.detail}</span><a href="#contact">Talk to us <ArrowRight size={13}/></a></div>}
    <header className={`navbar ${scrolled ? "nav-scrolled" : ""}`}>
      <a className="brandmark" href="#home" aria-label="SV Audio home"><img src={logo} alt="SV Audio Pvt Ltd — Feel the Sound"/></a>
      <nav className="desktop-links">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <a className="nav-whatsapp" href={wa()} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp Us <MoveUpRight size={14}/></a>
      <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label={menu ? "Close menu" : "Open menu"}>{menu ? <X/> : <Menu/>}</button>
    </header>
    <div className={`mobile-menu ${menu ? "menu-open" : ""}`} aria-hidden={!menu}>
      <div className="mobile-menu-inner"><span className="eyebrow">MOVE WITH THE SOUND</span>{links.map(([label, href], i) => <a key={href} href={href} onClick={closeMenu}><small>0{i + 1}</small>{label}<ArrowDownRight/></a>)}<a className="mobile-wa" href={wa()} target="_blank" rel="noreferrer"><MessageCircle/> Chat on WhatsApp</a></div>
    </div>

    <section className="hero" id="home" onMouseMove={(e) => setPointer({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 })}>
      <div className="hero-glow" style={{ left: `${pointer.x}%`, top: `${pointer.y}%` }}/>
      <div className="hero-grid"/>
      <div className="hero-content">
        <div className="hero-kicker"><span className="live-dot"/> AUDIO / LIGHTING / SRI LANKA <span className="kicker-line"/></div>
        <h1><span>FEEL</span><br/><em>THE</em> SOUND<span className="hero-period">.</span></h1>
        <p className="hero-copy">Professional Audio Equipment <b>·</b> Sound Solutions <b>·</b> Lighting Solutions</p>
        <div className="hero-actions"><a className="button button-orange" href="#products">Explore the range <ArrowRight size={17}/></a><a className="button button-outline" href={wa()} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Chat on WhatsApp</a></div>
        <div className="hero-bottomline"><span>TRUSTED SOUND. BUILT TO LAST.</span><span>JAFFNA · NELLIADY · CHAVAKACHCHERY</span></div>
      </div>
       <div className="hero-art" aria-hidden="true" style={{ transform: window.innerWidth >= 1024 ? `translate3d(${(pointer.x - 50) * -0.08}px, ${(pointer.y - 44) * -0.08}px, 0)` : undefined }}>
        <div className="hero-rings"><span/><span/><span/><span/></div>
        <div className="hero-logo"><img src={logo} alt=""/></div>
        <div className="hero-eq">{Array.from({ length: 43 }, (_, i) => <i key={i} style={{ "--i": i } as CSSProperties}/>)}</div>
        <div className="hero-stamp"><span>SV</span><b>PRO AUDIO<br/>SRI LANKA</b><AudioLines/></div>
      </div>
      <a className="scroll-cue" href="#about"><span>SCROLL TO FEEL IT</span><ArrowDown size={15}/></a>
      <div className="hero-index">01 <i/> 05</div>
    </section>

    <div className="ticker" aria-label="Brands"><div className="ticker-track">{[...brands, ...brands].map((name, i) => <span key={`${name}-${i}`}>{name}<i>✳</i></span>)}</div></div>

    <section className="about section-pad" id="about">
      <div className="about-top">
        <SectionHead eyebrow="WHY SV AUDIO" title={<>Sound for every<br/><span>kind of gathering.</span></>} sub="From the first note to the final encore, we help Sri Lanka sound its best."/>
        <div className="about-copy reveal"><span className="vertical-rule"/><div><p>SV Audio supplies professional sound systems, microphones, amplifiers, mixers and lighting for the places that bring people together.</p><p>Events, churches, temples, mosques, schools, hotels and offices — backed by honest advice and service you can count on.</p><a href="#branches" className="text-link">Meet your local team <ArrowRight size={15}/></a></div></div>
      </div>
      <div className="stats-row reveal">
        <div className="stat"><CountUp value={3} minDigits={2}/><span>BRANCHES ACROSS<br/>THE NORTH</span></div><div className="stat"><CountUp value={8} minDigits={2} suffix="+"/><span>TRUSTED AUDIO<br/>BRANDS</span></div><div className="stat"><CountUp value={1000} suffix="+"/><span>HAPPY CUSTOMERS<br/>AND COUNTING</span></div><div className="stat stat-promise"><AudioLines/><strong>FEEL</strong><span>THE SOUND</span></div>
      </div>
      <div className="feature-grid">
        {[{icon: ShieldCheck, title: "Genuine brands", text: "Equipment sourced from names trusted around the world."}, {icon: SlidersHorizontal, title: "Fits your budget", text: "Thoughtful options for every room, event and price point."}, {icon: Headphones, title: "Expert advice", text: "Talk to people who understand the gear and your needs."}, {icon: Zap, title: "Here after the sale", text: "Support that keeps your system sounding right."}].map(({icon: Icon, title, text}, i) => <article className="feature-card reveal" key={title}><span className="feature-no">0{i + 1}</span><Icon size={22}/><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>

    <section className="products-section section-pad" id="products">
      <div className="products-top"><SectionHead eyebrow="THE EQUIPMENT" title={<>Built for the<br/><span>big moment.</span></>} sub="Reliable sound starts with the right gear. Find your next piece below."/><div className="product-count reveal"><span>01—10</span><small>SELECTED EQUIPMENT</small><AudioLines/></div></div>
      <div className="filter-wrap">
        <div className="filter-tabs" role="tablist" aria-label="Filter products">{categories.map((cat) => <button key={cat} role="tab" aria-selected={filter === cat} className={filter === cat ? "filter-active" : ""} onClick={() => setFilter(cat)}>{cat}</button>)}</div>
        {filter === "Conference / Gooseneck Mics" && <p className="category-note"><Mic2 size={15}/> Conference mics starting from Rs. 3,500</p>}
      </div>
      <div className="product-grid">
        {shownProducts.map((p, i) => <article className="product-card reveal" key={p.id} style={{ "--delay": `${(i % 4) * 65}ms` } as CSSProperties}>
          <div className={`product-visual product-visual-${i % 4}`}>
            <span className="product-badge">{p.brand}</span><span className="visual-id">SV / {String(i + 1).padStart(2, "0")}</span>
            {p.image ? <img className="product-image" src={p.image} alt={`${p.brand} ${p.name}`} loading="lazy"/> : <div className="product-object">{p.category.includes("Microphone") || p.category.includes("Mics") ? <Mic2/> : p.category.includes("Distributor") ? <SlidersHorizontal/> : <Volume2/>}<span/><i/></div>}
            <div className="visual-caption">PRO SERIES <b>·</b> SRI LANKA</div>
          </div>
          <div className="product-info"><div className="product-category">{p.category}</div><h3>{p.brand} <span>{p.name}</span></h3><p>{p.description}</p>
            <div className="product-foot"><span className="price">{p.price ?? "Price on request"}</span><button className="order-button" onClick={() => order(p)} aria-label={`Order ${p.brand} ${p.name} on WhatsApp`}>Order <MessageCircle size={15}/></button></div>
          </div>
        </article>)}
      </div>
      {shownProducts.length === 0 && <div className="empty-products"><AudioLines/><h3>More sound, coming soon.</h3><p>Ask our team about availability in this category.</p><a className="button button-orange" href={wa("Hello SV Audio! Can you tell me what is available in your range?")} target="_blank" rel="noreferrer">Ask on WhatsApp <ArrowRight/></a></div>}
      <div className="cant-find reveal"><div className="cant-icon"><Radio/></div><div><span className="eyebrow">NOT SURE WHERE TO START?</span><h3>Can't find what you need?</h3><p>Tell us your budget, we'll suggest the best setup.</p></div><a className="button button-orange" href={wa("Hello SV Audio! I'm looking for a setup. My budget is [your budget]. Please suggest the best option.")} target="_blank" rel="noreferrer">Tell us what you need <ArrowRight size={16}/></a></div>
    </section>

    <section className="sound-break">
      <div className="sound-break-lines"/>
      <div className="sound-break-content reveal"><span className="eyebrow">THE RIGHT SOUND CHANGES EVERYTHING</span><h2>Make it <span>louder.</span><br/>Make it <span>matter.</span></h2><a href="#contact" className="button button-light">Let's talk sound <ArrowRight size={16}/></a></div>
      <div className="break-graphic" aria-hidden="true"><div className="big-disc"><i/><i/><i/><b>SV<br/>AUDIO</b></div><div className="disc-note">SOUND / LIGHT / SOLUTION</div></div>
      <div className="sound-wave">{Array.from({length: 63},(_,i)=><i key={i}/>)}</div>
    </section>

    <section className="branches section-pad" id="branches">
      <div className="branch-top"><SectionHead eyebrow="CLOSE TO YOU" title={<>Good sound.<br/><span>Right around here.</span></>} sub="Three places to get the gear and guidance you need."/><div className="branch-map-label"><MapPin size={18}/><span>NORTHERN PROVINCE<br/><b>SRI LANKA</b></span></div></div>
      <div className="branch-tabs" role="tablist" aria-label="Choose branch">{branches.map((b, i)=><button key={b.name} className={branch===i?"branch-tab-active":""} onClick={()=>setBranch(i)} role="tab" aria-selected={branch===i}><span>0{i+1}</span>{b.name}<ArrowDownRight size={16}/></button>)}</div>
      <div className="branch-detail reveal">
        <div className="branch-visual"><div className="map-grid"/><div className="map-pin"><MapPin/></div><div className="map-orbit"/><span className="map-coord">09°40' N / 80°00' E</span><span className="map-label">SV AUDIO · {branches[branch].name.toUpperCase()}</span></div>
        <div className="branch-info"><span className="eyebrow"><i/> OUR {String(branch+1).padStart(2,"0")} BRANCH</span><h3>{branches[branch].name}<span>.</span></h3><div className="branch-detail-line"><MapPin size={17}/><p>{branches[branch].address}</p></div><div className="branch-detail-line"><Phone size={17}/><p>{branches[branch].phones.map((num,i)=><a key={num} href={`tel:+94${num.replace(/\D/g,"").replace(/^0/,"")}`}>{num}{i < branches[branch].phones.length-1 ? " / " : ""}</a>)}</p></div><div className="branch-detail-line"><Disc3 size={17}/><p>{branches[branch].hours}</p></div><div className="branch-actions"><a className="button button-orange" href={branches[branch].map} target="_blank" rel="noreferrer">Get directions <MoveUpRight size={15}/></a><a className="button button-outline" href={wa(`Hello SV Audio! I'd like to contact the ${branches[branch].name} branch.`)} target="_blank" rel="noreferrer"><MessageCircle size={15}/> WhatsApp branch</a></div></div>
      </div>
    </section>

    <section className="contact-section section-pad" id="contact">
      <div className="contact-top"><SectionHead eyebrow="LET'S MAKE SOME NOISE" title={<>Your next great<br/><span>sound starts here.</span></>} sub="Questions, quotes or just figuring out where to begin? We're here."/><div className="contact-mark"><img src={logo} alt="SV Audio logo"/><span>FEEL THE SOUND / SINCE DAY ONE</span></div></div>
      <div className="contact-grid">
        <div className="contact-details">
          <a className="contact-main-link" href={wa()} target="_blank" rel="noreferrer"><span className="contact-icon"><MessageCircle/></span><span><small>FASTEST WAY TO REACH US</small><strong>WhatsApp us</strong><em>{whatsappDisplay}</em></span><MoveUpRight/></a>
          <div className="contact-phone"><span className="contact-icon"><Phone/></span><div><small>CALL OUR TEAM</small><strong>Let's talk it through.</strong>{contactPhones.map((contact)=><a key={contact.tel} href={`tel:${contact.tel}`}>{contact.display}<MoveUpRight size={13}/></a>)}</div></div>
          <div className="social-links"><small>FOLLOW THE SOUND</small><div>{social.map((s,i)=><a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name}><span>0{i+1}</span>{s.name}<MoveUpRight size={13}/></a>)}</div></div>
        </div>
        <form className="contact-form" onSubmit={submitContact}>
          <div className="form-heading"><div><span className="eyebrow">DROP US A LINE</span><h3>What's on your mind?</h3></div><Send/></div>
          {sent && <div className="form-success"><Check size={16}/> Message prepared — WhatsApp is opening.</div>}
          <label>Your name<input name="name" autoComplete="name" placeholder="How should we call you?" required/></label>
          <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="077 123 4567" required/></label>
          <label>Your message<textarea name="message" rows={3} placeholder="Tell us what you're looking for..." required/></label>
          <button className="button button-orange form-submit" type="submit">Send via WhatsApp <ArrowRight size={16}/></button>
          <p className="form-note"><ShieldCheck size={14}/> No forms disappearing into the void. We reply on WhatsApp.</p>
        </form>
      </div>
    </section>

    <footer className="footer">
      <div className="footer-eq">{Array.from({length: 92},(_,i)=><i key={i} style={{"--i":i} as CSSProperties}/>)}</div>
      <div className="footer-main">
        <div className="footer-brand"><img src={logo} alt="SV Audio Pvt Ltd"/><p>Feel The Sound.</p><span>Professional audio & lighting<br/>for the moments that matter.</span><div className="footer-social">{social.map(s=><a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name}>{s.name.slice(0,1)}</a>)}</div></div>
        <div className="footer-col"><span className="footer-heading">EXPLORE</span>{links.map(([l,h])=><a key={h} href={h}>{l}<ArrowDownRight size={12}/></a>)}</div>
        <div className="footer-col"><span className="footer-heading">FIND US</span>{branches.map(b=><a key={b.name} href="#branches">{b.name}<ArrowDownRight size={12}/></a>)}</div>
        <div className="footer-col"><span className="footer-heading">CALL US</span>{contactPhones.map((contact)=><a key={contact.tel} href={`tel:${contact.tel}`}>{contact.display}<MoveUpRight size={12}/></a>)}<a href={wa()} target="_blank" rel="noreferrer" className="footer-wa"><MessageCircle size={14}/> WhatsApp</a></div>
      </div>
      <div className="footer-bottom"><span>© SV Audio Pvt (Ltd). All rights reserved.</span><span>DESIGNED FOR SOUND <AudioLines size={15}/></span><a href="#home">BACK TO THE TOP <ArrowUp size={13}/></a></div>
    </footer>

    <a className="floating-wa" href={wa()} target="_blank" rel="noreferrer" aria-label="Chat with SV Audio on WhatsApp"><MessageCircle/><span>LET'S TALK</span></a>
    {showTop && <button className="back-top" onClick={() => window.scrollTo({top:0,behavior:"smooth"})} aria-label="Back to top"><ArrowUp/></button>}
  </main>;
}

export default App;
