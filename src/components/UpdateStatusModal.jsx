import { useState } from 'react'

export default function UpdateStatusModal({ post, onClose, onUpdatePost }) {
  const [estado, setEstado] = useState(post.estado)

  const handleSave = () => {
    const updatedPost = { ...post, estado }
    onUpdatePost(updatedPost)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-4 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Cambiar Estado</h2>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        >
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
          <option value="finalizado">Finalizado</option>
        </select>
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}
