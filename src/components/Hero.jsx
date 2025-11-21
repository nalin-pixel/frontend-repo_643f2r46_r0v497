import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM3MTU4MTN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center mix-blend-overlay"></div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          Welcome to Manga.de
        </motion.h1>
        <motion.p initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.1, duration:0.6}} className="mt-4 max-w-2xl text-white/80">
          A vibrant community for manga lovers. Discuss your favorite series, share fan art, shop exclusive merch, and keep up with the latest news.
        </motion.p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/news" className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white transition">Explore News</a>
          <a href="/forum" className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition">Join the Forum</a>
        </div>
      </div>
    </section>
  )
}
