import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Mail, Phone, Calendar, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Navbar, Footer } from '../App';

const SalesPage = () => {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-chocolat overflow-hidden transition-colors duration-500">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className="max-w-5xl mx-auto px-6 relative z-10 pt-48 pb-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-chocolat/60 dark:text-ivoire/60 hover:text-chocolat dark:hover:text-gold mb-12 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> {t.salesPage.backHome}
        </Link>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-20"
        >
          <motion.span variants={itemVariants} className="text-xs font-bold uppercase tracking-[0.3em] text-chocolat/40 dark:text-gold/40 mb-6 block">
            {t.salesPage.investInYourself}
          </motion.span>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-serif mb-8 leading-tight text-chocolat dark:text-ivoire">
            {t.salesPage.levelUp} <span className="italic-vibrant relative inline-block dark:text-gold">
              {t.salesPage.levelUpHighlight}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-gold/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>.
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-chocolat/80 dark:text-ivoire/80 max-w-2xl mx-auto leading-relaxed font-light">
            {t.salesPage.description}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Section Services */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-white/5 p-10 md:p-12 rounded-[2.5rem] shadow-2xl border border-chocolat/5 dark:border-white/10 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-chocolat/5 dark:from-white/5 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-chocolat/5 dark:bg-white/5 rounded-2xl flex items-center justify-center text-chocolat dark:text-gold mb-8 group-hover:bg-chocolat dark:group-hover:bg-gold group-hover:text-white dark:group-hover:text-chocolat transition-colors duration-500">
                <Star size={32} strokeWidth={1.5} />
              </div>
              
              <h2 className="text-3xl font-serif mb-4 text-chocolat dark:text-ivoire">{t.salesPage.services.title}</h2>
              <p className="text-chocolat/60 dark:text-ivoire/60 mb-8 text-lg font-light">{t.salesPage.services.subtitle}</p>
              
              <ul className="space-y-6 mb-12">
                {t.salesPage.services.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-chocolat/80 dark:text-ivoire/80 group/item">
                    <div className="mt-1 p-1 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400 group-hover/item:bg-green-500 group-hover/item:text-white transition-colors">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-chocolat/40 dark:text-ivoire/40 mb-4">{t.salesPage.services.toOrder}</p>
                <a href="mailto:hello@missbrown.design?subject=Commande%20Package" className="flex items-center justify-between p-5 bg-white dark:bg-white/5 rounded-xl hover:bg-chocolat dark:hover:bg-gold hover:text-white dark:hover:text-chocolat transition-all group/btn border border-chocolat/5 dark:border-white/10" aria-label="Envoyer un email pour commander un package">
                  <div className="flex items-center gap-4">
                    <Mail size={20} />
                    <span className="font-bold uppercase tracking-wider text-sm">{t.salesPage.services.sendEmail}</span>
                  </div>
                  <ArrowLeft size={16} className="rotate-180 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </a>
                <a href="tel:+22900000000" className="flex items-center justify-between p-5 bg-white dark:bg-white/5 rounded-xl hover:bg-chocolat dark:hover:bg-gold hover:text-white dark:hover:text-chocolat transition-all group/btn border border-chocolat/5 dark:border-white/10" aria-label="Appeler directement pour commander un package">
                  <div className="flex items-center gap-4">
                    <Phone size={20} />
                    <span className="font-bold uppercase tracking-wider text-sm">{t.salesPage.services.callDirectly}</span>
                  </div>
                  <ArrowLeft size={16} className="rotate-180 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Section Formations */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-chocolat dark:bg-black text-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="absolute inset-0 benin-pattern opacity-10 pointer-events-none animate-float" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gold/20 rounded-full blur-3xl group-hover:bg-gold/30 transition-colors duration-700" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-gold mb-8 group-hover:bg-white group-hover:text-chocolat transition-colors duration-500 backdrop-blur-sm border border-white/10">
                <Calendar size={32} strokeWidth={1.5} />
              </div>

              <h2 className="text-3xl font-serif mb-4">{t.salesPage.trainings.title}</h2>
              <p className="text-white/70 mb-8 text-lg font-light">{t.salesPage.trainings.subtitle}</p>
              
              <ul className="space-y-6 mb-12">
                {t.salesPage.trainings.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-white/90 group/item">
                    <div className="mt-1 p-1 bg-white/10 rounded-full text-gold group-hover/item:bg-gold group-hover/item:text-chocolat transition-colors">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">{t.salesPage.trainings.toRegister}</p>
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 bg-white/10 rounded-xl hover:bg-white hover:text-chocolat transition-all group/btn border border-white/10 backdrop-blur-sm" aria-label="Réserver un appel découverte sur Calendly">
                  <div className="flex items-center gap-4">
                    <Calendar size={20} />
                    <span className="font-bold uppercase tracking-wider text-sm">{t.salesPage.trainings.bookCall}</span>
                  </div>
                  <ArrowLeft size={16} className="rotate-180 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </a>
                <a href="mailto:academy@missbrown.design?subject=Inscription%20Formation" className="flex items-center justify-between p-5 bg-white/10 rounded-xl hover:bg-white hover:text-chocolat transition-all group/btn border border-white/10 backdrop-blur-sm" aria-label="Contacter l'académie par email">
                  <div className="flex items-center gap-4">
                    <Mail size={20} />
                    <span className="font-bold uppercase tracking-wider text-sm">{t.salesPage.trainings.contactAcademy}</span>
                  </div>
                  <ArrowLeft size={16} className="rotate-180 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <p className="text-chocolat/40 dark:text-ivoire/40 text-sm italic mb-8">
            "{t.salesPage.quote}"
          </p>
          <div className="inline-block px-6 py-2 bg-gold/10 rounded-full text-chocolat/60 dark:text-gold/60 text-xs font-bold uppercase tracking-widest border border-gold/20">
            {t.salesPage.badge}
          </div>
        </motion.div>
      </div>

      </main>
      <Footer />
    </div>
  );
};

export default SalesPage;
