import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import News from './components/News'
import Forum from './components/Forum'
import Gallery from './components/Gallery'
import Shop from './components/Shop'
import Profile from './components/Profile'
import { ThemeProvider } from './components/ThemeContext'

function Layout({ children }){
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,rgba(236,72,153,0.15),transparent_40%),radial-gradient(circle_at_0%_120%,rgba(99,102,241,0.15),transparent_40%)]" />
      <div className="relative">
        <Navbar />
        {children}
      </div>
      <footer className="mt-10 py-10 text-center text-white/60">© {new Date().getFullYear()} Manga.de · Built with ❤️</footer>
    </div>
  )
}

function Home(){
  return (
    <>
      <Hero />
      <News />
    </>
  )
}

export default function App(){
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}
