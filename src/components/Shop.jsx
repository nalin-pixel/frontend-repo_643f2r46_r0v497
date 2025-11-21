import React, { useEffect, useState } from 'react'
import { ShoppingCart, Plus, Check } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Shop(){
  const [products, setProducts] = useState([])
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')

  async function load(){
    const res = await fetch(`${API}/products`)
    const data = await res.json()
    setProducts(data)
  }
  useEffect(()=>{ load() }, [])

  async function create(e){
    e.preventDefault()
    if(!title || !price) return
    await fetch(`${API}/products`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({title, description:'', price: parseFloat(price), image, stock: 99}) })
    setTitle(''); setPrice(''); setImage('')
    load()
  }

  async function buy(product){
    const order = { user_id: 'anon', items: [{ product_id: product.id, quantity: 1 }], total: 0, status: 'pending' }
    const res = await fetch(`${API}/orders`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(order) })
    const data = await res.json()
    alert(`Order placed! Total: $${data.total?.toFixed(2)}`)
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Shop</h2>
        <div className="text-white/70 flex items-center gap-2"><ShoppingCart size={18}/> Secure Checkout</div>
      </div>

      <form onSubmit={create} className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6 grid md:grid-cols-4 gap-2">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Product title" className="px-3 py-2 rounded bg-black/40 text-white border border-white/10"/>
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price" type="number" step="0.01" className="px-3 py-2 rounded bg-black/40 text-white border border-white/10"/>
        <input value={image} onChange={e=>setImage(e.target.value)} placeholder="Image URL (optional)" className="px-3 py-2 rounded bg-black/40 text-white border border-white/10"/>
        <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded inline-flex items-center gap-2"><Plus size={16}/> Add</button>
      </form>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p.id} className="rounded-xl overflow-hidden bg-white/5 border border-white/10">
            <div className="aspect-video bg-black/30 flex items-center justify-center">
              {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover"/> : <div className="text-white/40">No image</div>}
            </div>
            <div className="p-3">
              <h3 className="text-white font-semibold">{p.title}</h3>
              <p className="text-white/70">${p.price?.toFixed(2)}</p>
              <button onClick={()=>buy(p)} className="mt-3 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded inline-flex items-center gap-2"><Check size={16}/> Buy</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
