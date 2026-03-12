import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag, Share2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Navbar, Footer } from '../App';

const BlogPostDetails = () => {
  const { t } = useLanguage();
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = t.blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-chocolat">
        <div className="text-center">
          <h2 className="text-4xl font-serif mb-4">{t.journal.notFound}</h2>
          <Link to="/journal" className="text-chocolat underline hover:text-chocolat/80">{t.journal.backJournal}</Link>
        </div>
      </div>
    );
  }

  const nextPostIndex = (t.blogPosts.findIndex(p => p.slug === slug) + 1) % t.blogPosts.length;
  const nextPost = t.blogPosts[nextPostIndex];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white dark:bg-chocolat min-h-screen transition-colors duration-500"
    >
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <article className="pt-48 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <header className="mb-16 text-center">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-chocolat/40 dark:text-ivoire/40 mb-8"
            >
              <span className="text-terracotta dark:text-gold">{post.category}</span>
              <span className="w-1.5 h-1.5 bg-chocolat/10 dark:bg-white/10 rounded-full" />
              <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
              <span className="w-1.5 h-1.5 bg-chocolat/10 dark:bg-white/10 rounded-full" />
              <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-chocolat dark:text-ivoire mb-10 leading-[0.9] tracking-tighter"
            >
              {post.title}
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-chocolat/60 dark:text-ivoire/60 font-light italic max-w-2xl mx-auto leading-relaxed"
            >
              {post.excerpt}
            </motion.p>
          </header>

          {/* Featured Image */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="rounded-[3rem] overflow-hidden mb-20 aspect-video shadow-2xl relative"
          >
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-chocolat/5 pointer-events-none" />
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="prose prose-lg md:prose-xl prose-stone mx-auto font-serif text-chocolat/80 dark:text-ivoire/80"
          >
            <div className="drop-cap">
              {post.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-8 leading-relaxed font-light text-lg md:text-xl">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="my-16 p-10 md:p-16 bg-white dark:bg-white/5 rounded-[2.5rem] border border-chocolat/5 dark:border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 benin-pattern opacity-10 pointer-events-none" />
              <h3 className="text-2xl md:text-3xl font-serif mb-6 text-chocolat dark:text-ivoire">Une approche centrée sur l'humain</h3>
              <p className="text-chocolat/70 dark:text-ivoire/70 leading-relaxed font-light">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            <blockquote className="border-l-4 border-terracotta dark:border-gold pl-10 italic text-2xl md:text-4xl my-16 text-chocolat dark:text-ivoire font-serif leading-tight">
              "Le design n'est pas seulement ce à quoi il ressemble et ce qu'il ressent. Le design est comment ça marche."
            </blockquote>

            <p className="mb-8 leading-relaxed font-light text-lg md:text-xl">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </motion.div>

          {/* Share */}
          <div className="mt-24 pt-10 border-t border-chocolat/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-chocolat/40 dark:text-ivoire/40">{t.journal.share}</span>
              <div className="flex gap-3">
                {['Twitter', 'LinkedIn', 'Facebook'].map(platform => (
                  <button key={platform} className="text-xs font-bold uppercase tracking-widest text-chocolat dark:text-gold hover:text-terracotta dark:hover:text-gold/80 transition-colors">
                    {platform}
                  </button>
                ))}
              </div>
            </div>
            <button className="flex items-center gap-3 px-8 py-4 bg-chocolat dark:bg-gold text-white dark:text-chocolat rounded-full text-xs font-bold uppercase tracking-widest hover:bg-terracotta dark:hover:bg-gold/90 transition-all shadow-xl shadow-chocolat/20 dark:shadow-gold/20">
              <Share2 size={16} /> Partager l'article
            </button>
          </div>
        </div>
      </article>

      {/* Next Article */}
      <section className="bg-white dark:bg-black py-32 border-t border-chocolat/5 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-chocolat/40 dark:text-ivoire/40 mb-8 block">{t.journal.nextArticle}</span>
          <Link to={`/journal/${nextPost.slug}`} className="group block">
            <h2 className="text-4xl md:text-7xl font-serif text-chocolat dark:text-ivoire group-hover:italic transition-all duration-500 mb-10 leading-tight">
              {nextPost.title}
            </h2>
            <div className="inline-flex items-center gap-4 text-chocolat/60 dark:text-ivoire/60 group-hover:text-chocolat dark:group-hover:text-gold transition-all text-sm uppercase tracking-widest font-bold">
              {t.journal.readMore} 
              <div className="w-12 h-12 rounded-full border border-chocolat/10 dark:border-white/10 flex items-center justify-center group-hover:bg-chocolat dark:group-hover:bg-gold group-hover:text-white dark:group-hover:text-chocolat transition-all">
                <ArrowRight size={20} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      </main>
      <Footer />
    </motion.div>
  );
};

export default BlogPostDetails;
