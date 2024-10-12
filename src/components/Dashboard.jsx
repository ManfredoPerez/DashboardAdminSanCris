import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { fetchPosts, createOrUpdatePost  } from '../services/postService'
import { fetchUsers } from '../services/userService'
import StatCard from './StatCard'
import PostsTable from './PostsTable'
// import PostsChart from './PostsChart'
import ReportGenerator from './ReportGenerator'
// import { useNavigate } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Charts from './Charts'

export default function Dashboard({ session }) {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  // const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    const postsData = await fetchPosts()
    const usersData = await fetchUsers()
    if (postsData.success) setPosts(postsData.data)
    if (usersData.success) setUsers(usersData.data)
    setLoading(false)
  }

  const handleUpdatePost = async (updatedPost) => {
    const result = await createOrUpdatePost(updatedPost)
    if (result.success) {
      setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post))
    }
  }

  const totalPosts = posts.length
  const totalUsers = users.length
  const pendingPosts = posts.filter(post => post.estado === 'pendiente').length

  const dataGrafico = [
    { name: 'Usuarios', value: users.length },
    { name: 'Publicaciones', value: posts.length },
    // { name: 'Tablet', value: 5 },
  ]

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Cerrar Sesión
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard title="Total Usuarios" value={totalUsers} />
            <StatCard title="Total Publicaciones" value={totalPosts} />
            <StatCard title="Otros" value={pendingPosts} />
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Sesiones de dispositivos</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dataGrafico} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">

            <h2 className="text-xl font-bold mb-4" >Estados de Publicaciones</h2>
              <Charts />
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Publicaciones</h2>
            <PostsTable posts={posts} users={users} onUpdatePost={handleUpdatePost} />
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Generar Reporte</h2>
            <ReportGenerator posts={posts} users={users} />
          </div>
        </>
      )}
    </div>
  )
}

