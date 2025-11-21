import React, { useEffect, useState } from 'react'
import { Image as ImageIcon, Upload, Heart } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Gallery(){
  const [items, setItems] = useState([])
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')

  async function load(){
    const res = await fetch(`${API}/gallery`)
    const data = await res.json()
    setItems(data)
  }
  useEffect(()=>{ load() }, [])

  function fileToBase64(file){
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  async function upload(e){
    e.preventDefault()
    if(!file) return
    const image_base64 = await fileToBase64(file)
    await fetch(`${API}/gallery`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({user_id: 'anon', caption, image_base64}) })
    setFile(null); setCaption('')
    load()
  }

  async function like(id){
    await fetch(`${API}/gallery/${id}/like`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({user_id: 'anon'}) })
    load()
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-white mb-4">Gallery</h2>
      <form onSubmit={upload} className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
        <div className="grid md:grid-cols-3 gap-2">
          <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0])} className="px-3 py-2 rounded bg-black/40 text-white border border-white/10"/>
          <input value={caption} onChange={e=>setCaption(e.target.value)} placeholder="Caption" className="px-3 py-2 rounded bg-black/40 text-white border border-white/10"/>
          <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded inline-flex items-center gap-2"><Upload size={16}/> Upload</button>
        </div>
      </form>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(img => (
          <div key={img.id} className="rounded-xl overflow-hidden bg-white/5 border border-white/10">
            <img src={img.image_base64} alt={img.caption} className="w-full h-56 object-cover"/>
            <div className="p-3 flex items-center justify-between">
              <p className="text-white/80">{img.caption}</p>
              <button onClick={() => like(img.id)} className="inline-flex items-center gap-1 px-3 py-1 rounded bg-white/10 text-white hover:bg-white/20"><Heart size={16}/> {img.likes||0}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
