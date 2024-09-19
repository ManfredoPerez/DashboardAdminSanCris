// export default function PostsTable({ posts, users }) {
//     return (
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="min-w-full leading-normal">
//           <thead>
//             <tr>
//               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Usuario
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Descripcion
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Problema
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Direccion
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Estado
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Fecha
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {posts.map((post) => {
//               const user = users.find(u => u.id === post.userId)
//               return (
//                 <tr key={post.id}>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <div className="flex items-center">
//                       <div className="ml-3">
//                         <p className="text-gray-900 whitespace-no-wrap">{user?.name || 'Unknown'}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <p className="text-gray-900 whitespace-no-wrap">{post.body}</p>
//                   </td>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <p className="text-gray-900 whitespace-no-wrap">{post.problema}</p>
//                   </td>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <p className="text-gray-900 whitespace-no-wrap">{post.direccion}</p>
//                   </td>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <span className={`relative inline-block px-3 py-1 font-semibold ${
//                       post.estado === 'pendiente' ? 'text-orange-900' :
//                       post.estado === 'en progreso' ? 'text-blue-900' :
//                       'text-green-900'
//                     } leading-tight`}>
//                       <span aria-hidden className={`absolute inset-0 ${
//                         post.estado === 'pendiente' ? 'bg-orange-200' :
//                         post.estado === 'en progreso' ? 'bg-blue-200' :
//                         'bg-green-200'
//                       } opacity-50 rounded-full`}></span>
//                       <span className="relative">{post.estado}</span>
//                     </span>
//                   </td>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <p className="text-gray-900 whitespace-no-wrap">
//                       {new Date(post.created_at).toLocaleDateString()}
//                     </p>
//                   </td>
//                 </tr>
//               )
//             })}
//           </tbody>
//         </table>
//       </div>
//     )
//   }


import { useState } from 'react'
// import UpdateStatusModal from './UpdateStatusModal'
import UpdateStatusModal from './UpdateStatusModal'

export default function PostsTable({ posts, users, onUpdatePost }) {
  const [selectedPost, setSelectedPost] = useState(null)
  
  const handleOpenModal = (post) => {
    setSelectedPost(post)
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
              Fecha
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
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
                  <span className={`relative inline-block px-3 py-1 font-semibold ${
                    post.estado === 'pendiente' ? 'text-orange-900' :
                    post.estado === 'en progreso' ? 'text-blue-900' :
                    'text-green-900'
                  } leading-tight`}>
                    <span aria-hidden className={`absolute inset-0 ${
                      post.estado === 'pendiente' ? 'bg-orange-200' :
                      post.estado === 'en progreso' ? 'bg-blue-200' :
                      'bg-green-200'
                    } opacity-50 rounded-full`}></span>
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
                  <p className="text-gray-900 whitespace-no-wrap">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

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
