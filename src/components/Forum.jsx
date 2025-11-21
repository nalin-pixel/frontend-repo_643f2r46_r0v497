import React, { useEffect, useState } from 'react'
import { Heart, MessageSquarePlus } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Forum(){
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  async function load(){
    const res = await fetch(`${API}/forum`)
    const data = await res.json()
    setPosts(data)
  }
  useEffect(()=>{ load() }, [])

  async function create(e){
    e.preventDefault()
    await fetch(`${API}/forum`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({user_id: 'anon', title, content, tags: []}) })
    setTitle(''); setContent('');
    load()
  }

  async function like(id){
    await fetch(`${API}/forum/${id}/like`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({user_id: 'anon'}) })
    load()
  }

  async function comment(id){
    const c = prompt('Your reply')
    if(!c) return
    await fetch(`${API}/forum/${id}/comment`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({user_id: 'anon', content: c}) })
    alert('Replied')
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-white mb-4">Forum</h2>
      <form onSubmit={create} className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
        <div className="grid md:grid-cols-2 gap-2">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="px-3 py-2 rounded bg-black/40 text-white border border-white/10"/>
          <input value={content} onChange={e=>setContent(e.target.value)} placeholder="Content" className="px-3 py-2 rounded bg-black/40 text-white border border-white/10"/>
        </div>
        <button className="mt-3 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded">Post</button>
      </form>
      <div className="grid gap-4">
        {posts.map(p => (
          <article key={p.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-white font-semibold">{p.title}</h3>
            <p className="text-white/80 mt-1">{p.content}</p>
            <div className="mt-3 flex items-center gap-2">
              <button onClick={()=>like(p.id)} className="inline-flex items-center gap-1 px-3 py-1 rounded bg-white/10 text-white hover:bg-white/20"><Heart size={16}/> {p.likes||0}</button>
              <button onClick={()=>comment(p.id)} className="inline-flex items-center gap-1 px-3 py-1 rounded bg-white/10 text-white hover:bg-white/20"><MessageSquarePlus size={16}/> Reply</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
