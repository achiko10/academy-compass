'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Brain, Globe, Telescope, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 pt-32 pb-20 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
            </span>
            ახალი პლატფორმა 2026
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="cosmic-heading">აღმოაჩინე შენი</span> <br className="hidden md:block"/>
            <span className="cosmic-heading">აკადემიური გზა</span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            ინტერაქტიული სამეცნიერო ნავიგატორი, რომელიც დაგეხმარება შენი ინტერესების აღმოჩენასა და პროფესიულ განვითარებაში.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/map" 
              className="px-8 py-4 bg-primary-blue hover:bg-blue-500 text-white rounded-full font-medium transition-all shadow-[0_0_25px_rgba(79,143,255,0.4)] hover:shadow-[0_0_35px_rgba(79,143,255,0.6)] flex items-center gap-2"
            >
              <Globe size={20} />
              რუკის გახსნა
            </Link>
            <Link 
              href="/quiz" 
              className="px-8 py-4 bg-surface-light/80 hover:bg-surface-light border border-foreground/20 rounded-full font-medium transition-all flex items-center gap-2"
            >
              <Brain size={20} />
              კარიერის ტესტი
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Modules Highlights */}
      <section className="w-full max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-surface/60 border border-foreground/10 hover:border-primary-blue/50 transition-colors group cursor-default"
          >
            <div className="w-14 h-14 bg-primary-blue/20 rounded-2xl flex items-center justify-center mb-6 text-primary-blue group-hover:scale-110 transition-transform">
              <Telescope size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-accent-cyan">რა არის მეცნიერება?</h3>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              გაეცანი მეცნიერების ისტორიას, დიდ აღმოჩენებს და დაინახე თუ როგორ ცვლის ის სამყაროს.
            </p>
            <Link href="/science" className="text-primary-blue font-medium flex items-center gap-1 hover:gap-2 transition-all">
              გაიგე მეტი <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-3xl bg-surface/60 border border-foreground/10 hover:border-primary-purple/50 transition-colors group cursor-default"
          >
            <div className="w-14 h-14 bg-primary-purple/20 rounded-2xl flex items-center justify-center mb-6 text-primary-purple group-hover:scale-110 transition-transform">
              <Globe size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-primary-purple">ინტერაქტიული რუკა</h3>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              NASA-ს დონის ვიზუალური ნავიგაცია სკოლიდან დოქტორანტურამდე უნივერსიტეტისა და კარიერის გზაზე.
            </p>
            <Link href="/map" className="text-primary-purple font-medium flex items-center gap-1 hover:gap-2 transition-all">
              ნახე რუკა <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-3xl bg-surface/60 border border-foreground/10 hover:border-accent-cyan/50 transition-colors group cursor-default"
          >
            <div className="w-14 h-14 bg-accent-cyan/20 rounded-2xl flex items-center justify-center mb-6 text-accent-cyan group-hover:scale-110 transition-transform">
              <BookOpen size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-accent-cyan">კვლევა და უნარები</h3>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              ისწავლე კრიტიკული აზროვნება, აკადემიური წერა და აღმოაჩინე საჭირო სამეცნიერო რესურსები.
            </p>
            <Link href="/research" className="text-accent-cyan font-medium flex items-center gap-1 hover:gap-2 transition-all">
              დაიწყე სწავლა <ArrowRight size={16} />
            </Link>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
