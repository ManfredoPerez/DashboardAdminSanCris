

import { useState, useMemo } from 'react'
import UpdateStatusModal from './UpdateStatusModal'

export default function PostsTable({ posts, users, onUpdatePost }) {
  const [selectedPost, setSelectedPost] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const postsPerPage = 10
  
  const handleOpenModal = (post) => {
    setSelectedPost(post)
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  // Filtrar los posts por el término de búsqueda
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const user = users.find(u => u.id === post.userId)
      const userName = user?.name || 'Desconocido'
      return (
        userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.problema.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.direccion.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }, [searchTerm, posts, users])

  // Paginar los posts
  const paginatedPosts = useMemo(() => {
    const startIndex = currentPage * postsPerPage
    return filteredPosts.slice(startIndex, startIndex + postsPerPage)
  }, [currentPage, filteredPosts])

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Search Bar */}
      <div className="p-4">
        <input 
          type="text" 
          placeholder="Buscar usuario, problema, dirección..." 
          className="px-3 py-2 border rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Usuario
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Descripción
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Problema
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Dirección
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Ubicación
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Fecha
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedPosts.map((post) => {
            const user = users.find(u => u.id === post.userId)
            return (
              <tr key={post.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">{user?.name || 'Desconocido'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{post.body}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{post.problema}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{post.direccion}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className={`relative inline-block px-3 py-1 font-semibold ${post.estado === 'pendiente' ? 'text-orange-900' : post.estado === 'en progreso' ? 'text-blue-900' : 'text-green-900'} leading-tight`}>
                    <span aria-hidden className={`absolute inset-0 ${post.estado === 'pendiente' ? 'bg-orange-200' : post.estado === 'en progreso' ? 'bg-blue-200' : 'bg-green-200'} opacity-50 rounded-full`}></span>
                    <span className="relative">{post.estado}</span>
                  </span>
                  <button 
                    onClick={() => handleOpenModal(post)}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    Cambiar
                  </button>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {post.ubicacion ? (
                    <a 
                      href={`https://www.google.com/maps?q=${post.ubicacion}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Ver en Google Maps
                    </a>
                  ) : (
                    <p className="text-gray-900 whitespace-no-wrap">Sin ubicación</p>
                  )}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="p-4">
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev))}
            disabled={currentPage + 1 === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>

      {selectedPost && (
        <UpdateStatusModal
          post={selectedPost}
          onClose={handleCloseModal}
          onUpdatePost={onUpdatePost}
        />
      )}
    </div>
  )
}
