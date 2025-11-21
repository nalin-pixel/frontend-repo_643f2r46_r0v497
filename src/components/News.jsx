import React, { useEffect, useState } from 'react'
import { Heart, MessageCircle } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function News() {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  async function load() {
    const res = await fetch(`${API}/news`)
    const data = await res.json()
    setItems(data)
  }
  useEffect(() => { load() }, [])

  async function create(e){
    e.preventDefault()
    await fetch(`${API}/news`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({title, content}) })
    setTitle(''); setContent('');
    load()
  }

  async function like(id){
    await fetch(`${API}/news/${id}/like`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({user_id: 'anon'}) })
    load()
  }

  async function comment(id){
    const c = prompt('Your comment')
    if(!c) return
    await fetch(`${API}/news/${id}/comment`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({user_id: 'anon', content: c}) })
    alert('Comment added')
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-white mb-4">News</h2>
      <form onSubmit={create} className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
        <div className="grid md:grid-cols-2 gap-2">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="px-3 py-2 rounded bg-black/40 text-white border border-white/10"/>
          <input value={content} onChange={e=>setContent(e.target.value)} placeholder="Content" className="px-3 py-2 rounded bg-black/40 text-white border border-white/10"/>
        </div>
        <button className="mt-3 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded">Post</button>
      </form>
      <div className="grid gap-4">
        {items.map(n => (
          <article key={n.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-white font-semibold">{n.title}</h3>
            <p className="text-white/80 mt-1">{n.content}</p>
            <div className="mt-3 flex items-center gap-2">
              <button onClick={()=>like(n.id)} className="inline-flex items-center gap-1 px-3 py-1 rounded bg-white/10 text-white hover:bg-white/20"><Heart size={16}/> {n.likes||0}</button>
              <button onClick={()=>comment(n.id)} className="inline-flex items-center gap-1 px-3 py-1 rounded bg-white/10 text-white hover:bg-white/20"><MessageCircle size={16}/> Comment</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
