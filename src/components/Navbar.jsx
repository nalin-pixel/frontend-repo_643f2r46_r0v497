import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Moon, Sun, ShoppingBag, Image as ImageIcon, Newspaper, MessageSquarePlus, User } from 'lucide-react'
import { useTheme } from './ThemeContext'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const toggle = () => setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark')

  const navLink = ({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`

  const themeIcon = theme === 'dark' ? <Moon size={18} /> : theme === 'light' ? <Sun size={18} /> : <Sun size={18} />

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/flame-icon.svg" className="w-8 h-8" />
          <span className="text-white font-bold tracking-tight">Manga.de</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/news" className={navLink}><span className="inline-flex items-center gap-1"><Newspaper size={16}/>News</span></NavLink>
          <NavLink to="/forum" className={navLink}><span className="inline-flex items-center gap-1"><MessageSquarePlus size={16}/>Forum</span></NavLink>
          <NavLink to="/gallery" className={navLink}><span className="inline-flex items-center gap-1"><ImageIcon size={16}/>Gallery</span></NavLink>
          <NavLink to="/shop" className={navLink}><span className="inline-flex items-center gap-1"><ShoppingBag size={16}/>Shop</span></NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggle} className="px-2 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white">
            {themeIcon}
          </button>
          <NavLink to="/profile" className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white inline-flex items-center gap-1">
            <User size={16}/> Profile
          </NavLink>
        </div>
      </div>
    </header>
  )
}
