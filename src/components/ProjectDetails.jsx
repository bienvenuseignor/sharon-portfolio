import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Navbar, Footer } from '../App';

const ProjectDetails = () => {
  const { t } = useLanguage();
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = t.projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-chocolat">
        <div className="text-center">
          <h2 className="text-4xl font-serif mb-4">{t.portfolio.notFound}</h2>
          <Link to="/" className="text-chocolat underline hover:text-chocolat/80">{t.portfolio.backHome}</Link>
        </div>
      </div>
    );
  }

  const nextProjectIndex = (t.projects.findIndex(p => p.slug === slug) + 1) % t.projects.length;
  const nextProject = t.projects[nextProjectIndex];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white dark:bg-chocolat min-h-screen transition-colors duration-500"
    >
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* Hero Image Section */}
      <div className="h-screen w-full relative overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/60 text-xs font-bold uppercase tracking-[0.5em] mb-8 block"
          >
            {project.category}
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-none tracking-tighter"
          >
            {project.title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-32 md:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 md:gap-32">
          
          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-12">
            <div className="sticky top-32">
              <div className="border-t border-chocolat/10 dark:border-white/10 pt-8 mb-12">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-chocolat/30 dark:text-ivoire/30 mb-4 flex items-center gap-2">
                  <User size={12} /> {t.portfolio.client}
                </h3>
                <p className="text-2xl font-serif text-chocolat dark:text-ivoire">{project.client || 'Confidentiel'}</p>
              </div>
              <div className="border-t border-chocolat/10 dark:border-white/10 pt-8 mb-12">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-chocolat/30 dark:text-ivoire/30 mb-4 flex items-center gap-2">
                  <Calendar size={12} /> {t.portfolio.year}
                </h3>
                <p className="text-2xl font-serif text-chocolat dark:text-ivoire">{project.year || '2023'}</p>
              </div>
              <div className="border-t border-chocolat/10 dark:border-white/10 pt-8">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-chocolat/30 dark:text-ivoire/30 mb-4 flex items-center gap-2">
                  <Tag size={12} /> {t.portfolio.services}
                </h3>
                <p className="text-2xl font-serif text-chocolat dark:text-ivoire">{project.category}</p>
              </div>
            </div>
          </div>

          {/* Main Text Content */}
          <div className="lg:col-span-8 space-y-20">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-terracotta dark:text-gold mb-8">{t.portfolio.label}</h2>
              <p className="text-2xl md:text-3xl text-chocolat/80 dark:text-ivoire/80 leading-relaxed font-serif font-light italic">
                {project.longDescription || project.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div className="p-10 bg-white dark:bg-white/5 rounded-[2rem] shadow-xl border border-chocolat/5 dark:border-white/10">
                <h3 className="text-xl font-serif mb-6 text-chocolat dark:text-ivoire">{t.portfolio.challenge}</h3>
                <p className="text-chocolat/60 dark:text-ivoire/60 leading-relaxed text-base font-light">
                  {project.challenge || "Définir une identité unique dans un marché saturé tout en respectant les valeurs fondamentales de la marque."}
                </p>
              </div>
              <div className="p-10 bg-chocolat dark:bg-black text-white rounded-[2rem] shadow-xl relative overflow-hidden transition-colors duration-500">
                <div className="absolute top-0 right-0 w-24 h-24 benin-pattern opacity-10 pointer-events-none" />
                <h3 className="text-xl font-serif mb-6 text-gold">{t.portfolio.solution}</h3>
                <p className="text-white/70 leading-relaxed text-base font-light">
                  {project.solution || "Une approche minimaliste et intemporelle qui met en avant la qualité et l'authenticité du produit."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-48 space-y-12">
            <div className="text-center mb-20">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-chocolat/30 dark:text-ivoire/30 mb-4 block">Visuals</span>
              <h2 className="text-4xl md:text-6xl font-serif text-chocolat dark:text-ivoire">{t.portfolio.gallery}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {project.gallery.map((img, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.8 }}
                  className={`rounded-[2.5rem] overflow-hidden shadow-2xl ${idx === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/5]'}`}
                >
                  <img 
                    src={img} 
                    alt={`Gallery ${idx + 1}`} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Next Project Navigation */}
        <div className="mt-64 border-t border-chocolat/10 dark:border-white/10 pt-32">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-chocolat/30 dark:text-ivoire/30 mb-12 block">{t.portfolio.nextProject}</span>
            <Link to={`/project/${nextProject.slug}`} className="group inline-block">
              <h2 className="text-5xl md:text-9xl font-serif text-chocolat dark:text-ivoire group-hover:italic group-hover:text-terracotta dark:group-hover:text-gold transition-all duration-500 leading-none tracking-tighter mb-12">
                {nextProject.title}
              </h2>
              <div className="inline-flex items-center gap-6 text-chocolat/40 dark:text-ivoire/40 group-hover:text-chocolat dark:group-hover:text-gold transition-all">
                <span className="uppercase tracking-[0.3em] text-xs font-bold">{t.portfolio.viewCase}</span>
                <div className="w-16 h-16 rounded-full border border-chocolat/10 dark:border-white/10 flex items-center justify-center group-hover:bg-chocolat dark:group-hover:bg-gold group-hover:text-white dark:group-hover:text-chocolat transition-all">
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      </main>
      <Footer />
    </motion.div>
  );
};

export default ProjectDetails;
