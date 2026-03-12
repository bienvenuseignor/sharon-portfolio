import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar, ArrowUpRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Navbar, Footer } from '../App';

const Journal = () => {
  const { t } = useLanguage();
  const featuredPost = t.blogPosts[0];
  const otherPosts = t.blogPosts.slice(1);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white dark:bg-chocolat min-h-screen transition-colors duration-500"
    >
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* Header Section */}
      <section className="pt-48 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-3xl">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-bold uppercase tracking-[0.4em] text-chocolat/40 dark:text-gold/40 mb-6 block"
              >
                {t.journal.label}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl lg:text-9xl font-serif text-chocolat dark:text-ivoire leading-[0.85] tracking-tighter"
              >
                {t.journal.title} <br />
                <span className="italic-vibrant dark:text-gold">{t.journal.titleHighlight}</span>.
              </motion.h1>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-chocolat/60 dark:text-ivoire/60 max-w-sm font-light leading-relaxed text-right hidden md:block"
            >
              {t.journal.description}
            </motion.p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[3rem] overflow-hidden bg-white dark:bg-white/5 shadow-2xl border border-chocolat/5 dark:border-white/10"
            >
              <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div className="lg:col-span-5 p-10 md:p-16 flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 w-40 h-40 benin-pattern opacity-5 dark:opacity-10 pointer-events-none" />
                
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-chocolat/40 dark:text-ivoire/40 mb-8">
                  <span className="px-3 py-1 bg-chocolat/5 dark:bg-white/5 rounded-full text-chocolat dark:text-gold">{featuredPost.category}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {featuredPost.date}</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-serif text-chocolat dark:text-ivoire mb-6 leading-tight group-hover:italic transition-all duration-500">
                  {featuredPost.title}
                </h2>
                
                <p className="text-chocolat/60 dark:text-ivoire/60 text-base md:text-lg leading-relaxed mb-10 font-light">
                  {featuredPost.excerpt}
                </p>

                <Link 
                  to={`/journal/${featuredPost.slug}`}
                  className="inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-chocolat dark:text-gold group/link"
                >
                  <span className="border-b-2 border-chocolat dark:border-gold pb-1 group-hover:border-terracotta dark:group-hover:border-gold transition-colors">
                    {t.journal.readArticle}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-chocolat/10 dark:border-white/10 flex items-center justify-center group-hover:bg-chocolat dark:group-hover:bg-gold group-hover:text-white dark:group-hover:text-chocolat transition-all">
                    <ArrowUpRight size={18} />
                  </div>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Other Posts Grid */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {otherPosts.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/journal/${post.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] mb-8 shadow-lg">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 transform scale-0 group-hover:scale-100 transition-transform duration-500">
                        <ArrowUpRight size={24} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-chocolat/40 dark:text-ivoire/40 mb-4">
                    <span className="text-terracotta dark:text-gold">{post.category}</span>
                    <span className="w-1 h-1 bg-chocolat/20 dark:bg-white/20 rounded-full" />
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-chocolat/20 dark:bg-white/20 rounded-full" />
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-serif text-chocolat dark:text-ivoire mb-4 group-hover:text-terracotta dark:group-hover:text-gold transition-colors leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-chocolat/60 dark:text-ivoire/60 text-sm leading-relaxed mb-8 line-clamp-2 font-light">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-chocolat/40 dark:text-ivoire/40 group-hover:text-chocolat dark:group-hover:text-gold transition-colors">
                    {t.journal.readMore} <ChevronRight size={14} />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-chocolat dark:bg-black rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden transition-colors duration-500">
            <div className="absolute inset-0 benin-pattern opacity-10 pointer-events-none animate-float" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-gold mb-8 block">Newsletter</span>
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
                Restez <span className="italic-vibrant text-gold">Inspiré</span>.
              </h2>
              <p className="text-white/60 mb-12 text-lg font-light">
                Recevez nos dernières explorations sur le design et la culture visuelle directement dans votre boîte mail.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="votre@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-4 text-white focus:outline-none focus:border-gold transition-colors"
                />
                <button className="bg-gold text-chocolat font-bold uppercase tracking-widest text-xs px-10 py-4 rounded-full hover:bg-white transition-all">
                  S'abonner
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </motion.div>
  );
};

export default Journal;
