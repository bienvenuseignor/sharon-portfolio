import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Menu, X, ArrowRight, Instagram, Linkedin, Mail, Facebook,
  Target, Palette, Package, Compass, ChevronRight,
  Quote, ExternalLink, ArrowUpRight, Lock, Eye, EyeOff, Plus, Calendar,
  Moon, Sun, Crown, BookOpen, MessageCircle
} from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import ProjectDetails from './components/ProjectDetails';
import Journal from './components/Journal';
import BlogPostDetails from './components/BlogPostDetails';
import SalesPage from './components/SalesPage';
import Preloader from './components/Preloader';
import Magnetic from './components/Magnetic';
import TextReveal from './components/TextReveal';
import RevealImage from './components/RevealImage';
import Marquee from './components/Marquee';
import { db, auth, googleProvider } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const SEO = ({ title, description }) => {
  const { t, language } = useLanguage();
  const siteTitle = t.seo.title;
  const metaDescription = description || t.seo.description;
  const currentUrl = window.location.href;
  const ogImage = "/sharonimage.jpg";

  return (
    <Helmet>
      <html lang={language} />
      <title>{title ? `${title} | Miss Brown` : siteTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={t.seo.keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title ? `${title} | Miss Brown` : siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title ? `${title} | Miss Brown` : siteTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={ogImage} />
      
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
    </Helmet>
  );
};

export const Navbar = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const navLinks = [
    { name: t.nav.about, href: '/#about' },
    { name: t.nav.portfolio, href: '/#portfolio' },
    { name: t.nav.services, href: '/#services' },
    { name: t.trainings.title, href: '/#trainings' },
    { name: t.nav.contact, href: '/#contact' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 30 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-white/80 dark:bg-chocolat/80 backdrop-blur-md shadow-sm' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-50">
        <Link to="/" className="text-2xl font-serif font-bold tracking-tighter text-chocolat dark:text-ivoire">
          MISS BROWN<span className="text-xs align-top ml-1">®</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Magnetic key={link.name}>
              <a 
                href={link.href} 
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    const id = link.href.replace('/#', '');
                    const element = document.getElementById(id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className="text-sm font-medium uppercase tracking-widest text-chocolat/80 hover:text-chocolat transition-colors block px-2 py-1 dark:text-ivoire/80 dark:hover:text-gold"
              >
                {link.name}
              </a>
            </Magnetic>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="relative w-14 h-8 flex items-center bg-chocolat/10 dark:bg-white/10 rounded-full p-1 transition-colors duration-300"
            aria-label={theme === 'light' ? "Passer au mode sombre" : "Passer au mode clair"}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${theme === 'light' ? 'translate-x-0 bg-white shadow-sm text-chocolat' : 'translate-x-6 bg-chocolat shadow-sm text-gold'}`}>
              {theme === 'light' ? <Sun size={14} /> : <Moon size={14} />}
            </div>
          </button>

          <Magnetic>
            <a 
              href="/#contact" 
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="px-6 py-2 bg-chocolat text-white text-sm font-medium uppercase tracking-widest rounded-full hover:bg-chocolat/90 dark:bg-gold dark:text-chocolat transition-all block"
            >
              {t.nav.letsTalk}
            </a>
          </Magnetic>
        </div>

        {/* Mobile Toggle & Theme */}
        <div className="md:hidden flex items-center gap-4 z-50 relative">
          <button 
            onClick={toggleTheme}
            className="relative w-12 h-6 flex items-center bg-chocolat/10 dark:bg-white/10 rounded-full p-1 transition-colors duration-300"
            aria-label={theme === 'light' ? "Passer au mode sombre" : "Passer au mode clair"}
          >
            <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-transform duration-300 ${theme === 'light' ? 'translate-x-0 bg-white shadow-sm text-chocolat' : 'translate-x-6 bg-chocolat shadow-sm text-gold'}`}>
              {theme === 'light' ? <Sun size={10} /> : <Moon size={10} />}
            </div>
          </button>
          <button 
            className="flex items-center gap-3 text-chocolat dark:text-ivoire focus:outline-none group" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
          >
            <span className="text-xs font-bold tracking-widest uppercase hidden sm:block transition-opacity duration-300">
              {isOpen ? 'Fermer' : 'Menu'}
            </span>
            <div className="relative w-8 h-6 overflow-hidden">
              <span className={`absolute left-0 w-full h-0.5 bg-chocolat dark:bg-ivoire transition-all duration-300 ease-out origin-center ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
              <span className={`absolute right-0 h-0.5 bg-chocolat dark:bg-ivoire transition-all duration-300 ease-out ${isOpen ? 'top-1/2 -translate-y-1/2 opacity-0 translate-x-full' : 'top-1/2 -translate-y-1/2 w-3/4 group-hover:w-full'}`} />
              <span className={`absolute right-0 h-0.5 bg-chocolat dark:bg-ivoire transition-all duration-300 ease-out origin-center ${isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0 w-1/2 group-hover:w-full'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-white dark:bg-chocolat border-t border-chocolat/10 dark:border-white/10 shadow-xl overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  onClick={(e) => {
                    setIsOpen(false);
                    if (window.location.pathname === '/') {
                      e.preventDefault();
                      const id = link.href.replace('/#', '');
                      setTimeout(() => {
                        const element = document.getElementById(id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 300);
                    }
                  }}
                  className="text-lg font-serif italic text-chocolat dark:text-ivoire hover:text-terracotta dark:hover:text-gold transition-colors py-2 border-b border-chocolat/5 dark:border-white/5 last:border-0"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="pt-4">
                <a 
                  href="/#contact" 
                  onClick={(e) => {
                    setIsOpen(false);
                    if (window.location.pathname === '/') {
                      e.preventDefault();
                      setTimeout(() => {
                        const element = document.getElementById('contact');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 300);
                    }
                  }}
                  className="block w-full text-center py-3 bg-chocolat dark:bg-gold text-white dark:text-chocolat text-sm font-medium uppercase tracking-widest rounded-lg hover:bg-chocolat/90 dark:hover:bg-gold/90 transition-all"
                >
                  Contactez-moi
                </a>
              </div>

              <div className="flex justify-center gap-6 pt-2 text-chocolat/60 dark:text-ivoire/60">
                <a href="https://www.instagram.com/o.sharonmichael" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-chocolat dark:hover:text-gold transition-colors"><Instagram size={20} /></a>
                <a href="https://web.facebook.com/sharon.michael.914612" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-chocolat dark:hover:text-gold transition-colors"><Facebook size={20} /></a>
                <a href="mailto:okwarasharon123@gmail.com" aria-label="Email" className="hover:text-chocolat dark:hover:text-gold transition-colors"><Mail size={20} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white dark:bg-chocolat transition-colors duration-500">
      {/* Benin Pattern Overlay */}
      <div className="absolute inset-0 benin-pattern pointer-events-none animate-float" />
      
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-0 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-chocolat/60 dark:text-gold/60 mb-6">
            {t.hero.subtitle}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[0.9] mb-8 text-balance dark:text-ivoire">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t.hero.title}
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="italic-vibrant inline-block"
            >
              {t.hero.titleHighlight}
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {t.hero.titleEnd}
            </motion.span>
          </h1>
          <p className="text-base md:text-lg text-chocolat/80 dark:text-ivoire/80 max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed">
            {t.hero.description}
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6">
            <Magnetic>
              <a 
                href="#portfolio" 
                className="group flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-chocolat text-white dark:bg-gold dark:text-chocolat rounded-full font-medium transition-all hover:pr-10"
                aria-label={t.hero.cta}
              >
                {t.hero.cta}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
            <Magnetic>
              <a 
                href="#services" 
                className="px-6 md:px-8 py-3 md:py-4 border border-chocolat/20 dark:border-white/20 dark:text-ivoire rounded-full font-medium hover:bg-chocolat/5 dark:hover:bg-white/5 transition-all block"
                aria-label={t.nav.services}
              >
                {t.nav.services}
              </a>
            </Magnetic>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ y }}
          className="relative max-w-md mx-auto lg:max-w-md lg:ml-auto"
        >
          <div className="relative z-10 aspect-[4/5] bg-chocolat/10 dark:bg-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <RevealImage 
              src="/sharonimage.jpg"
              alt="Miss Brown"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 border border-chocolat/10 dark:border-white/10 rounded-full animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-chocolat/5 dark:bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-4 translate-y-[-50%] p-6 bg-white/90 dark:bg-chocolat/90 backdrop-blur shadow-xl rounded-2xl hidden md:block border border-chocolat/5 dark:border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-chocolat dark:bg-gold rounded-full flex items-center justify-center text-white dark:text-chocolat">
                <Quote size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-chocolat/40 dark:text-ivoire/40">Expertise</p>
                <p className="font-serif italic dark:text-ivoire">Design de Luxe</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-px h-16 bg-gradient-to-b from-chocolat dark:from-gold to-transparent"
        />
      </div>
    </section>
  );
};

const About = () => {
  const { t } = useLanguage();
  return (
    <section id="about" className="scroll-mt-24 py-32 bg-white dark:bg-chocolat transition-colors duration-500 overflow-hidden">
      <div className="mb-24">
        <Marquee 
          items={["Direction Artistique", "Branding", "Identité Visuelle", "Stratégie de Marque", "Web Design"]} 
          speed={40}
        />
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 max-w-xl mx-auto lg:max-w-none">
            <div className="relative">
              <img 
                src="/sharonaboutimage.jpg" 
                alt="Espace de création artistique de Miss Brown"
                className="rounded-3xl shadow-xl grayscale dark:opacity-80 object-cover aspect-square"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-40 h-40 md:w-48 md:h-48 terracotta-gradient rounded-3xl flex items-center justify-center p-6 md:p-8 text-white shadow-2xl">
                <p className="text-center font-serif italic-vibrant text-base md:text-lg text-white">"Le design est l'ambassadeur silencieux de votre marque."</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-chocolat/60 dark:text-gold/60 mb-6 block">{t.about.label}</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 dark:text-ivoire">{t.about.title} <span className="italic-vibrant dark:text-gold">{t.about.titleHighlight}</span>.</h2>
            <div className="space-y-6 text-chocolat/80 dark:text-ivoire/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <p dangerouslySetInnerHTML={{ __html: t.about.p1 }} />
              <p dangerouslySetInnerHTML={{ __html: t.about.p2 }} />
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 max-w-sm mx-auto lg:mx-0">
              <div>
                <p className="text-3xl md:text-4xl font-serif text-chocolat dark:text-gold mb-2">40+</p>
                <p className="text-xs font-bold uppercase tracking-widest text-chocolat/60 dark:text-ivoire/40">{t.about.stats.projects}</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-serif text-chocolat dark:text-gold mb-2">100+</p>
                <p className="text-xs font-bold uppercase tracking-widest text-chocolat/60 dark:text-ivoire/40">{t.about.stats.students}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Portfolio = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...new Set(t.projects.map(p => p.category))];
  
  const filteredProjects = filter === 'All' 
    ? t.projects 
    : t.projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="scroll-mt-24 py-32 bg-white dark:bg-chocolat relative overflow-hidden transition-colors duration-500">
      <div className="absolute bottom-0 left-0 w-80 h-80 benin-pattern opacity-5 dark:opacity-10 rotate-45 -translate-x-1/2 translate-y-1/2 pointer-events-none animate-float" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-chocolat/60 dark:text-gold/60 mb-6 block">{t.portfolio.label}</span>
            <h2 className="text-4xl md:text-6xl font-serif dark:text-ivoire">{t.portfolio.title} <span className="italic-vibrant dark:text-gold">{t.portfolio.titleHighlight}</span>.</h2>
          </div>
          <p className="max-w-md text-chocolat/60 dark:text-ivoire/60 text-right">
            {t.portfolio.description}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                filter === cat 
                  ? 'bg-chocolat text-white dark:bg-gold dark:text-chocolat' 
                  : 'bg-white/50 dark:bg-white/5 text-chocolat/60 dark:text-ivoire/40 hover:bg-chocolat/5 dark:hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
              >
                <Link 
                  to={`/project/${project.slug}`}
                  className="group cursor-pointer block"
                >
                  <div className="group relative">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                      <img 
                        src={project.image} 
                        alt={`Projet de design: ${project.title}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white shadow-xl transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                          <ArrowUpRight size={24} />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-chocolat/40 dark:text-gold/40 mb-2">{project.category}</p>
                        <h3 className="text-2xl font-serif group-hover:italic transition-all dark:text-ivoire">{project.title}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-20 text-center">
          <a href="https://www.instagram.com/o.sharonmichael" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-chocolat dark:border-gold pb-2 text-chocolat dark:text-gold hover:text-chocolat/60 dark:hover:text-gold/60 hover:border-chocolat/60 dark:hover:border-gold/60 transition-all">
            {t.portfolio.viewAll} <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const { t } = useLanguage();
  const iconMap = {
    Target, Palette, Package, Compass
  };

  return (
    <section id="services" className="scroll-mt-24 py-32 bg-white dark:bg-chocolat transition-colors duration-500 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 benin-pattern opacity-5 dark:opacity-10 -rotate-12 translate-x-1/2 -translate-y-1/2 pointer-events-none animate-float" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-chocolat/40 dark:text-gold/40 mb-6 block">{t.services.label}</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8 dark:text-ivoire">{t.services.title} <span className="italic-vibrant dark:text-gold">{t.services.titleHighlight}</span>.</h2>
          <p className="max-w-2xl mx-auto text-chocolat/60 dark:text-ivoire/60 text-lg">
            {t.services.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.servicesList.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-10 rounded-3xl border border-chocolat/5 dark:border-white/5 hover:border-chocolat/20 dark:hover:border-gold/20 hover:bg-white dark:hover:bg-white/5 hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-chocolat/5 to-transparent dark:from-white/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150" />
                
                <div className="w-16 h-16 mb-8 relative">
                  <div className="absolute inset-0 bg-chocolat dark:bg-gold rounded-2xl transform rotate-6 opacity-20 group-hover:rotate-12 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-white dark:bg-chocolat border border-chocolat/10 dark:border-white/10 rounded-2xl shadow-lg flex items-center justify-center text-chocolat dark:text-gold group-hover:-translate-y-2 transition-transform duration-500 z-10">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="text-xl font-serif mb-4 relative z-10 dark:text-ivoire">{service.title}</h3>
                <p className="text-chocolat/60 dark:text-ivoire/60 text-sm leading-relaxed mb-8 relative z-10">
                  {service.description}
                </p>
                <a href="#contact" className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all relative z-10 dark:text-gold">
                  {t.services.learnMore} <ArrowRight size={14} />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Trainings = () => {
  const { t } = useLanguage();
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus(t.contact.form.sending);
    try {
      await addDoc(collection(db, 'registrations'), {
        trainingId: selectedTraining.id,
        trainingTitle: selectedTraining.title,
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus(t.contact.form.success);
      setTimeout(() => {
        setSelectedTraining(null);
        setStatus('');
        setFormData({ name: '', email: '' });
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatus(t.contact.form.error);
    }
  };

  return (
    <section id="trainings" className="scroll-mt-24 py-32 bg-chocolat dark:bg-black text-white overflow-hidden relative transition-colors duration-500">
      <div className="absolute inset-0 benin-pattern opacity-10 pointer-events-none animate-float" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-24">
          <div className="text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-6 block">{t.trainings.label}</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8">{t.trainings.title} <span className="italic-vibrant text-gold">{t.trainings.titleHighlight}</span>.</h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
              {t.trainings.description}
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 max-w-md mx-auto lg:mx-0">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img 
                    key={i} 
                    src={`https://i.pravatar.cc/100?u=${i}`} 
                    className="w-10 h-10 rounded-full border-2 border-chocolat dark:border-black" 
                    alt="Étudiant formé par Miss Brown" 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <p className="text-sm font-medium">+100 {t.trainings.satisfiedStudents}</p>
            </div>
          </div>
          
          <div className="space-y-6 md:space-y-8 max-w-2xl mx-auto lg:max-w-none w-full">
            {t.trainingsList.map((training) => (
              <motion.div 
                key={training.id}
                whileHover={{ x: 10 }}
                className="group p-6 md:p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => setSelectedTraining(training)}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <h3 className="text-xl md:text-2xl font-serif">{training.title}</h3>
                  <span className="px-4 py-1 bg-white dark:bg-gold text-chocolat text-xs font-bold rounded-full uppercase tracking-widest">{training.price}</span>
                </div>
                <p className="text-white/60 text-sm mb-6">{training.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-widest text-white/40">{training.duration}</span>
                  <Link to="/sales" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                    {t.trainings.register} <ExternalLink size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Modal Removed - Redirecting to Sales Page instead */}
    </section>
  );
};

const Heritage = () => {
  const { t } = useLanguage();
  const icons = [Crown, Palette, BookOpen];

  return (
    <section className="py-24 bg-chocolat dark:bg-black text-white overflow-hidden relative transition-colors duration-500">
      <div className="absolute inset-0 benin-pattern opacity-10 pointer-events-none animate-float" />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold mb-4 block">{t.heritage.label}</span>
          <h2 className="text-3xl md:text-5xl font-serif">{t.heritage.title} <span className="italic-vibrant text-gold">{t.heritage.titleHighlight}</span>.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.heritage.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Icon className="text-gold" size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-serif mb-4 text-gold group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

const Testimonials = () => {
  const { t } = useLanguage();
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...t.testimonials, ...t.testimonials, ...t.testimonials];

  return (
    <section className="py-32 bg-white dark:bg-chocolat overflow-hidden relative transition-colors duration-500">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white dark:from-chocolat to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-chocolat to-transparent z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-0">
        <div className="text-center mb-20">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-chocolat/60 dark:text-gold/60 mb-6 block">{t.testimonialsSection.label}</span>
          <h2 className="text-4xl md:text-5xl font-serif dark:text-ivoire">{t.testimonialsSection.title} <span className="italic-vibrant dark:text-gold">{t.testimonialsSection.titleHighlight}</span>.</h2>
        </div>

        <div className="relative h-[800px] overflow-hidden flex gap-8 justify-center mask-gradient-y">
          {/* Column 1 - Moving Up */}
          <motion.div 
            animate={{ y: [0, -1000] }}
            transition={{ 
              repeat: Infinity, 
              duration: 40, 
              ease: "linear" 
            }}
            className="flex flex-col gap-8 w-full md:w-1/2 lg:w-1/3"
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div 
                key={`col1-${testimonial.id}-${index}`}
                className="p-10 bg-white dark:bg-white/5 rounded-[2rem] shadow-sm border border-chocolat/5 dark:border-white/5 flex flex-col justify-between hover:shadow-xl hover:border-chocolat/20 dark:hover:border-gold/20 transition-all duration-500 group"
              >
                <div>
                  <Quote className="text-chocolat/10 dark:text-white/10 mb-6 group-hover:text-chocolat/20 dark:group-hover:text-gold/20 transition-colors" size={40} />
                  <p className="text-chocolat/80 dark:text-ivoire/80 italic leading-relaxed mb-8 text-lg font-light">
                    "{testimonial.content}"
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-chocolat dark:bg-gold rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 scale-110" />
                    <img 
                      src={testimonial.avatar} 
                      alt={`Portrait de ${testimonial.name}`} 
                      className="w-14 h-14 rounded-full grayscale group-hover:grayscale-0 transition-all duration-500 object-cover" 
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-chocolat dark:text-ivoire">{testimonial.name}</p>
                    <p className="text-[10px] text-chocolat/50 dark:text-gold/50 uppercase tracking-widest font-bold">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Column 2 - Moving Down (Hidden on mobile) */}
          <motion.div 
            animate={{ y: [-1000, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 45, 
              ease: "linear" 
            }}
            className="hidden md:flex flex-col gap-8 w-1/2 lg:w-1/3"
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div 
                key={`col2-${testimonial.id}-${index}`}
                className="p-10 bg-white dark:bg-white/5 rounded-[2rem] shadow-sm border border-chocolat/5 dark:border-white/5 flex flex-col justify-between hover:shadow-xl hover:border-chocolat/20 dark:hover:border-gold/20 transition-all duration-500 group"
              >
                <div>
                  <Quote className="text-chocolat/10 dark:text-white/10 mb-6 group-hover:text-chocolat/20 dark:group-hover:text-gold/20 transition-colors" size={40} />
                  <p className="text-chocolat/80 dark:text-ivoire/80 italic leading-relaxed mb-8 text-lg font-light">
                    "{testimonial.content}"
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-chocolat dark:bg-gold rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 scale-110" />
                    <img 
                      src={testimonial.avatar} 
                      alt={`Portrait de ${testimonial.name}`} 
                      className="w-14 h-14 rounded-full grayscale group-hover:grayscale-0 transition-all duration-500 object-cover" 
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-chocolat dark:text-ivoire">{testimonial.name}</p>
                    <p className="text-[10px] text-chocolat/50 dark:text-gold/50 uppercase tracking-widest font-bold">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="faq" className="scroll-mt-24 py-32 bg-white dark:bg-chocolat transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-chocolat/40 dark:text-gold/40 mb-6 block">{t.faqSection.label}</span>
          <h2 className="text-4xl md:text-5xl font-serif dark:text-ivoire">{t.faqSection.title} <span className="italic-vibrant dark:text-gold">{t.faqSection.titleHighlight}</span>.</h2>
        </div>
        <div className="space-y-4">
          {t.faq.map((item, index) => (
            <div key={index} className="border-b border-chocolat/10 dark:border-white/10">
              <button
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="text-lg md:text-xl font-serif text-chocolat dark:text-ivoire group-hover:text-chocolat/80 dark:group-hover:text-gold transition-colors">
                  {item.question}
                </span>
                <span className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                  <Plus size={24} className="text-chocolat/40 dark:text-gold/40 group-hover:text-chocolat dark:group-hover:text-gold transition-colors" />
                </span>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-chocolat/60 dark:text-ivoire/60 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Branding Complet', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(t.contact.form.sending);
    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus(t.contact.form.success);
      setFormData({ name: '', email: '', subject: 'Branding Complet', message: '' });
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error(error);
      setStatus(t.contact.form.error);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-32 bg-white dark:bg-chocolat transition-colors duration-500">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          <div className="text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-chocolat/40 dark:text-gold/40 mb-6 block">{t.contact.label}</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-10 leading-tight dark:text-ivoire">{t.contact.title} <span className="italic-vibrant dark:text-gold">{t.contact.titleHighlight}</span>.</h2>
            <p className="text-chocolat/60 dark:text-ivoire/60 text-lg mb-12 max-w-md mx-auto lg:mx-0">
              {t.contact.description}
            </p>
            
            <div className="space-y-8 flex flex-col items-center lg:items-start">
              <a href="mailto:okwarasharon123@gmail.com" className="flex items-center gap-6 group">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-chocolat/5 dark:bg-white/5 rounded-full flex items-center justify-center text-chocolat dark:text-gold group-hover:bg-chocolat dark:group-hover:bg-gold group-hover:text-white dark:group-hover:text-chocolat transition-all">
                  <Mail size={24} />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold uppercase tracking-widest text-chocolat/40 dark:text-ivoire/40">Email</p>
                  <p className="text-lg md:text-xl font-serif dark:text-ivoire">okwarasharon123@gmail.com</p>
                </div>
              </a>
              <a href="https://wa.me/2290147985773" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-chocolat/5 dark:bg-white/5 rounded-full flex items-center justify-center text-chocolat dark:text-gold group-hover:bg-chocolat dark:group-hover:bg-gold group-hover:text-white dark:group-hover:text-chocolat transition-all">
                  <MessageCircle size={24} />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold uppercase tracking-widest text-chocolat/40 dark:text-ivoire/40">WhatsApp</p>
                  <p className="text-lg md:text-xl font-serif dark:text-ivoire">+229 01 47 98 57 73</p>
                </div>
              </a>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/o.sharonmichael" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 border border-chocolat/10 dark:border-white/10 rounded-full flex items-center justify-center text-chocolat dark:text-gold hover:bg-chocolat dark:hover:bg-gold hover:text-white dark:hover:text-chocolat transition-all" aria-label="Suivre Miss Brown sur Instagram">
                  <Instagram size={24} />
                </a>
                <a href="https://web.facebook.com/sharon.michael.914612" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 border border-chocolat/10 dark:border-white/10 rounded-full flex items-center justify-center text-chocolat dark:text-gold hover:bg-chocolat dark:hover:bg-gold hover:text-white dark:hover:text-chocolat transition-all" aria-label="Suivre Miss Brown sur Facebook">
                  <Facebook size={24} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 border border-chocolat/10 dark:border-white/10 rounded-full flex items-center justify-center text-chocolat dark:text-gold hover:bg-chocolat dark:hover:bg-gold hover:text-white dark:hover:text-chocolat transition-all" aria-label="Suivre Miss Brown sur LinkedIn">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-white/5 p-8 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[3rem] border border-chocolat/5 dark:border-white/5">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-chocolat/40 dark:text-ivoire/40">{t.contact.form.name}</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-transparent border-b border-chocolat/20 dark:border-white/20 py-3 focus:outline-none focus:border-chocolat dark:focus:border-gold transition-colors dark:text-ivoire" 
                    placeholder="Jean Dupont"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-chocolat/40 dark:text-ivoire/40">{t.contact.form.email}</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-transparent border-b border-chocolat/20 dark:border-white/20 py-3 focus:outline-none focus:border-chocolat dark:focus:border-gold transition-colors dark:text-ivoire" 
                    placeholder="jean@exemple.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-chocolat/40 dark:text-ivoire/40">{t.contact.form.subject}</label>
                <select 
                  className="w-full bg-transparent border-b border-chocolat/20 dark:border-white/20 py-3 focus:outline-none focus:border-chocolat dark:focus:border-gold transition-colors appearance-none dark:text-ivoire"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                >
                  <option value="Branding Complet" className="dark:bg-chocolat">{t.contact.subjects.branding}</option>
                  <option value="Packaging & Design Produit" className="dark:bg-chocolat">{t.contact.subjects.packaging}</option>
                  <option value="Affiche Publicitaire / Campagne" className="dark:bg-chocolat">{t.contact.subjects.advertising}</option>
                  <option value="Événementiel & Scénographie" className="dark:bg-chocolat">{t.contact.subjects.event}</option>
                  <option value="Digital & Social Media" className="dark:bg-chocolat">{t.contact.subjects.digital}</option>
                  <option value="Direction Artistique" className="dark:bg-chocolat">{t.contact.subjects.direction}</option>
                  <option value="Formation / Masterclass" className="dark:bg-chocolat">{t.contact.subjects.training}</option>
                  <option value="Autre Domaine" className="dark:bg-chocolat">{t.contact.subjects.other}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-chocolat/40 dark:text-ivoire/40">{t.contact.form.message}</label>
                <textarea 
                  required
                  rows={4} 
                  className="w-full bg-transparent border-b border-chocolat/20 dark:border-white/20 py-3 focus:outline-none focus:border-chocolat dark:focus:border-gold transition-colors resize-none dark:text-ivoire" 
                  placeholder={t.contact.form.placeholder}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button className="w-full py-5 bg-chocolat dark:bg-gold text-white dark:text-chocolat rounded-2xl font-bold uppercase tracking-widest hover:bg-chocolat/90 dark:hover:bg-gold/90 transition-all shadow-xl shadow-chocolat/20 dark:shadow-gold/20">
                {status || t.contact.form.submit}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export const Footer = () => {
  const { t, language, setLanguage } = useLanguage();
  return (
    <footer className="py-20 bg-white dark:bg-black border-t border-chocolat/5 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-6">
            <a href="#main-content" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="text-3xl font-serif font-bold tracking-tighter text-chocolat dark:text-gold block" aria-label="Miss Brown - Retour en haut">
              MISS BROWN<span className="text-xs align-top ml-1">®</span>
            </a>
            <p className="text-chocolat/60 dark:text-ivoire/60 text-sm leading-relaxed max-w-sm">
              {t.footer.bio}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:pl-12">
            <h4 className="text-xs font-bold uppercase tracking-widest text-chocolat/60 dark:text-gold/60 mb-6">{t.footer.navigation}</h4>
            <nav className="flex flex-col gap-4 text-sm font-medium text-chocolat/80 dark:text-ivoire/80">
              <a 
                href="/#about" 
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="hover:text-chocolat dark:hover:text-gold hover:translate-x-1 transition-all"
              >
                {t.nav.about}
              </a>
              <a 
                href="/#portfolio" 
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="hover:text-chocolat dark:hover:text-gold hover:translate-x-1 transition-all"
              >
                {t.nav.portfolio}
              </a>
              <a 
                href="/#services" 
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="hover:text-chocolat dark:hover:text-gold hover:translate-x-1 transition-all"
              >
                {t.nav.services}
              </a>
              <a 
                href="/#journal" 
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('journal')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="hover:text-chocolat dark:hover:text-gold hover:translate-x-1 transition-all"
              >
                {t.nav.journal}
              </a>
              <a 
                href="/#contact" 
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="hover:text-chocolat dark:hover:text-gold hover:translate-x-1 transition-all"
              >
                {t.nav.contact}
              </a>
            </nav>
          </div>

          {/* Column 3: Social & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-chocolat/60 dark:text-gold/60 mb-6">{t.footer.follow}</h4>
            <div className="flex gap-4 mb-8">
              <a 
                href="https://www.instagram.com/o.sharonmichael" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-chocolat/10 dark:border-white/10 flex items-center justify-center text-chocolat dark:text-gold hover:bg-chocolat dark:hover:bg-gold hover:text-white dark:hover:text-chocolat transition-all group"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://web.facebook.com/sharon.michael.914612" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-chocolat/10 dark:border-white/10 flex items-center justify-center text-chocolat dark:text-gold hover:bg-chocolat dark:hover:bg-gold hover:text-white dark:hover:text-chocolat transition-all group"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="mailto:okwarasharon123@gmail.com" 
                className="w-10 h-10 rounded-full border border-chocolat/10 dark:border-white/10 flex items-center justify-center text-chocolat dark:text-gold hover:bg-chocolat dark:hover:bg-gold hover:text-white dark:hover:text-chocolat transition-all group"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
            <div className="flex flex-col gap-3 text-sm text-chocolat/60 dark:text-ivoire/60">
              <a href="mailto:okwarasharon123@gmail.com" className="flex items-center gap-2 hover:text-chocolat dark:hover:text-gold transition-colors">
                <Mail size={16} /> okwarasharon123@gmail.com
              </a>
              <a href="https://wa.me/2290147985773" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-chocolat dark:hover:text-gold transition-colors">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-chocolat/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-chocolat/40 dark:text-ivoire/40 text-xs uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Miss Brown. {t.footer.rights}
          </div>
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
              <button 
                onClick={() => setLanguage('fr')}
                className={`${language === 'fr' ? 'text-chocolat dark:text-gold' : 'text-chocolat/40 dark:text-ivoire/40'} hover:text-chocolat dark:hover:text-gold transition-colors`}
              >
                FR
              </button>
              <span className="text-chocolat/20 dark:text-white/10">|</span>
              <button 
                onClick={() => setLanguage('en')}
                className={`${language === 'en' ? 'text-chocolat dark:text-gold' : 'text-chocolat/40 dark:text-ivoire/40'} hover:text-chocolat dark:hover:text-gold transition-colors`}
              >
                EN
              </button>
            </div>
            <a href="#main-content" onClick={(e) => e.preventDefault()} className="text-[10px] uppercase tracking-widest text-chocolat/20 dark:text-white/20 hover:text-chocolat/60 dark:hover:text-gold/60 transition-colors">
              {t.footer.legal}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const BrandMarquee = () => {
  const { t } = useLanguage();
  const keywords = t.brandMarquee || ["Branding", "Dahomey", "Identity", "Cotonou", "Art Direction", "Ouidah", "Design", "Excellence", "Bénin"];
  return (
    <div className="py-4 bg-chocolat/5 dark:bg-white/5 overflow-hidden border-y border-chocolat/10 dark:border-white/10 relative transition-colors duration-500">
      <div className="absolute inset-0 benin-pattern opacity-5 pointer-events-none" />
      <div className="flex whitespace-nowrap animate-marquee relative z-10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-16 px-8 items-center">
            {keywords.map((word) => (
              <div key={word} className="flex items-center gap-16">
                <span className="text-sm md:text-base font-serif italic text-chocolat/60 dark:text-ivoire/60 uppercase tracking-[0.2em] hover:text-chocolat dark:hover:text-gold transition-colors cursor-default">
                  {word}
                </span>
                <span className="w-2 h-2 rounded-full bg-chocolat/20 dark:bg-gold/40" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-10 right-10 z-50 w-14 h-14 bg-chocolat dark:bg-gold text-white dark:text-chocolat rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        >
          <ArrowUpRight className="-rotate-45" size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const AdvertisingPackages = () => {
  const { t } = useLanguage();
  const packages = t.packages.items;

  return (
    <section id="packages" className="scroll-mt-24 py-32 bg-white dark:bg-chocolat transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-chocolat/40 dark:text-gold/40 mb-6 block">{t.packages.label}</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8 dark:text-ivoire">{t.packages.title} <span className="italic-vibrant dark:text-gold">{t.packages.titleHighlight}</span>{t.packages.titleEnd}</h2>
          <p className="max-w-2xl mx-auto text-chocolat/60 dark:text-ivoire/60 text-lg">
            {t.packages.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[2.5rem] border border-chocolat/5 dark:border-white/5 bg-white dark:bg-white/5 hover:bg-ivoire dark:hover:bg-white/10 hover:shadow-2xl transition-all duration-500"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-chocolat/40 dark:text-ivoire/40 mb-4 block">{pkg.domain}</span>
              <h3 className="text-2xl font-serif mb-2 dark:text-ivoire">{pkg.title}</h3>
              <p className="text-3xl font-serif text-chocolat dark:text-gold mb-8">{pkg.price}</p>
              <ul className="space-y-4 mb-10">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-chocolat/60 dark:text-ivoire/60">
                    <div className="w-1.5 h-1.5 bg-chocolat dark:bg-gold rounded-full" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link to="/sales" className="w-full inline-block text-center py-4 bg-chocolat dark:bg-gold text-white dark:text-chocolat rounded-2xl font-bold uppercase tracking-widest hover:bg-chocolat/90 dark:hover:bg-gold/90 transition-all">
                {t.packages.order}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email === 'okwarasharon123@gmail.com') {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.email !== 'okwarasharon123@gmail.com') {
        await signOut(auth);
        setError('Accès non autorisé. Cet email n\'est pas administrateur.');
      }
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la connexion.');
    }
  };

  const fetchData = async () => {
    try {
      const msgQuery = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      const regQuery = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'));
      
      const [msgSnapshot, regSnapshot] = await Promise.all([
        getDocs(msgQuery),
        getDocs(regQuery)
      ]);
      
      setMessages(msgSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setRegistrations(regSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
      setError('Erreur lors du chargement des données.');
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  if (loading) {
    return <div className="min-h-screen bg-white dark:bg-chocolat flex items-center justify-center"><div className="w-8 h-8 border-2 border-chocolat dark:border-gold border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-chocolat flex items-center justify-center p-6 transition-colors duration-500">
        <SEO title="Admin Login" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white dark:bg-white/5 p-10 rounded-[2.5rem] shadow-2xl border border-chocolat/5 dark:border-white/10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-chocolat/10 dark:bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-chocolat dark:text-gold">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-serif dark:text-ivoire">Accès Restreint</h2>
            <p className="text-chocolat/40 dark:text-ivoire/40 text-sm mt-2">Veuillez vous connecter avec votre compte administrateur.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center">{error}</p>}
            <button type="submit" className="w-full py-4 bg-chocolat dark:bg-gold text-white dark:text-chocolat rounded-xl font-bold uppercase tracking-widest hover:bg-chocolat/90 dark:hover:bg-gold/90 transition-all shadow-lg shadow-chocolat/20 dark:shadow-gold/20 flex items-center justify-center gap-3">
              Connexion avec Google
            </button>
            <Link to="/" className="block text-center text-xs font-bold uppercase tracking-widest text-chocolat/40 dark:text-ivoire/40 hover:text-chocolat dark:hover:text-gold transition-colors">
              Retour au site
            </Link>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-chocolat p-6 md:p-12 transition-colors duration-500">
      <SEO title="Admin Dashboard" />
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-serif dark:text-ivoire">Tableau de Bord Miss Brown</h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={async () => {
                await signOut(auth);
                setIsAuthenticated(false);
              }}
              className="text-xs font-bold uppercase tracking-widest text-chocolat/40 dark:text-ivoire/40 hover:text-chocolat dark:hover:text-gold transition-colors"
            >
              Déconnexion
            </button>
            <Link to="/" className="p-2 hover:bg-chocolat/5 dark:hover:bg-white/5 rounded-full text-chocolat/40 dark:text-ivoire/40 hover:text-chocolat dark:hover:text-gold transition-colors">
              <X size={24} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-ivoire">
              <Mail size={20} /> Messages Reçus
            </h3>
            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-chocolat/5 dark:border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold dark:text-ivoire">{m.name}</p>
                    <span className="text-[10px] text-chocolat/40 dark:text-ivoire/40">{new Date(m.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-chocolat/60 dark:text-ivoire/60 mb-2">{m.email} • {m.subject}</p>
                  <p className="text-sm text-chocolat/80 dark:text-ivoire/80">{m.message}</p>
                </div>
              ))}
              {messages.length === 0 && <p className="text-chocolat/40 dark:text-ivoire/40 italic">Aucun message pour le moment.</p>}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-ivoire">
              <Target size={20} /> Inscriptions Formations
            </h3>
            <div className="space-y-4">
              {registrations.map((r) => (
                <div key={r.id} className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-chocolat/5 dark:border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold dark:text-ivoire">{r.name}</p>
                    <span className="text-[10px] text-chocolat/40 dark:text-ivoire/40">{new Date(r.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-chocolat/60 dark:text-ivoire/60 mb-2">{r.email}</p>
                  <p className="text-sm font-serif italic text-chocolat dark:text-gold">{r.training_title}</p>
                </div>
              ))}
              {registrations.length === 0 && <p className="text-chocolat/40 dark:text-ivoire/40 italic">Aucune inscription pour le moment.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JournalSection = () => {
  const { t } = useLanguage();
  return (
    <section id="journal" className="scroll-mt-24 py-32 bg-white dark:bg-chocolat transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-chocolat/60 dark:text-gold/60 mb-6 block">{t.journal.label}</span>
          <h2 className="text-4xl md:text-6xl font-serif dark:text-ivoire">{t.journal.title} <span className="italic-vibrant dark:text-gold">{t.journal.titleHighlight}</span>.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {t.blogPosts.slice(0, 3).map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-chocolat/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-chocolat dark:text-gold border border-chocolat/5 dark:border-white/10">
                  {post.category}
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-chocolat/60 dark:text-ivoire/60 mb-3 uppercase tracking-widest font-bold">
                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
              </div>
              
              <h3 className="text-xl font-serif text-chocolat dark:text-ivoire mb-3 group-hover:text-chocolat/80 dark:group-hover:text-gold transition-colors leading-tight">
                {post.title}
              </h3>
              
              <Link to={`/journal/${post.slug}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-chocolat dark:text-gold group-hover:gap-4 transition-all">
                {t.journal.readArticle} <ArrowRight size={14} />
              </Link>
            </motion.article>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <Link to="/journal" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-chocolat dark:border-gold pb-2 text-chocolat dark:text-gold hover:text-chocolat/60 dark:hover:text-gold/60 hover:border-chocolat/60 dark:hover:border-gold/60 transition-all">
            {t.journal.viewAll} <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

const Home = () => (
  <>
    <SEO />
    <Navbar />
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Hero />
      <BrandMarquee />
      <About />
      <Heritage />
      <Portfolio />
      <Services />
      <AdvertisingPackages />
      <JournalSection />
      <Trainings />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
    <Footer />
    <ScrollToTop />
  </>
);

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className="selection:bg-chocolat selection:text-white bg-white text-chocolat dark:bg-chocolat dark:text-ivoire min-h-screen transition-colors duration-500">
      <Preloader />
      <div className="grain-overlay" />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-chocolat focus:text-white focus:rounded-md">
        Aller au contenu principal
      </a>
      <AnimatePresence mode="wait">
        <motion.div 
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/project/:slug" element={<ProjectDetails />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<BlogPostDetails />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
