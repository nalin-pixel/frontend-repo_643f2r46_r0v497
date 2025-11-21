import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Profile(){
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState('')

  async function register(e){
    e.preventDefault()
    const res = await fetch(`${API}/auth/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({username, email, password}) })
    const data = await res.json()
    if(data.id){
      setUser({ id: data.id, username, email })
      localStorage.setItem('user_id', data.id)
      alert('Registered!')
    } else {
      alert(data.detail || 'Registration failed')
    }
  }

  async function login(e){
    e.preventDefault()
    const res = await fetch(`${API}/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email, password}) })
    const data = await res.json()
    if(data.id){
      setUser(data)
      localStorage.setItem('user_id', data.id)
      alert('Logged in!')
    } else {
      alert(data.detail || 'Login failed')
    }
  }

  useEffect(()=>{
    const id = localStorage.getItem('user_id')
    if(!id) return
    fetch(`${API}/users/${id}`).then(r=>r.json()).then(setUser).catch(()=>{})
  }, [])

  async function saveProfile(e){
    e.preventDefault()
    const id = localStorage.getItem('user_id')
    if(!id){ alert('Please login'); return }
    await fetch(`${API}/users/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ username, bio, avatar }) })
    const updated = await fetch(`${API}/users/${id}`).then(r=>r.json())
    setUser(updated)
    alert('Profile saved')
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Account</h2>
        <form onSubmit={login} className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
          <h3 className="text-white font-semibold mb-2">Login</h3>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full mb-2 px-3 py-2 rounded bg-black/40 text-white border border-white/10"/>
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full mb-2 px-3 py-2 rounded bg-black/40 text-white border border-white/10"/>
          <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded">Login</button>
        </form>
        <form onSubmit={register} className="bg-white/5 border border-white/10 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-2">Register</h3>
          <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" className="w-full mb-2 px-3 py-2 rounded bg-black/40 text-white border border-white/10"/>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full mb-2 px-3 py-2 rounded bg-black/40 text-white border border-white/10"/>
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full mb-2 px-3 py-2 rounded bg-black/40 text-white border border-white/10"/>
          <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded">Create Account</button>
        </form>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Profile</h2>
        <form onSubmit={saveProfile} className="bg-white/5 border border-white/10 rounded-lg p-4">
          <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Display name" className="w-full mb-2 px-3 py-2 rounded bg-black/40 text-white border border-white/10"/>
          <input value={avatar} onChange={e=>setAvatar(e.target.value)} placeholder="Avatar URL" className="w-full mb-2 px-3 py-2 rounded bg-black/40 text-white border border-white/10"/>
          <textarea value={bio} onChange={e=>setBio(e.target.value)} placeholder="Bio" className="w-full mb-2 px-3 py-2 rounded bg-black/40 text-white border border-white/10"/>
          <button className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded">Save Profile</button>
        </form>
        {user && (
          <div className="mt-4 bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <img src={user.avatar || 'https://api.dicebear.com/7.x/bottts/svg'} className="w-16 h-16 rounded-full border border-white/10"/>
              <div>
                <div className="text-white font-semibold">{user.username}</div>
                <div className="text-white/70 text-sm">{user.bio}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
