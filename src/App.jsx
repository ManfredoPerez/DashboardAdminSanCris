import { useState, useEffect } from 'react'
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import Dashboard from './components/Dashboard'
import Login from './components/Login'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    // <Router>
    //   <div className="min-h-screen bg-gray-100">
    //     <Routes>
    //       <Route path="/login" element={!session ? <Login /> : <Navigate to="/" replace />} />
    //       <Route path="/" element={session ? <Dashboard session={session} /> : <Navigate to="/login" replace />} />
    //     </Routes>
    //   </div>
    // </Router>
    <div className="min-h-screen bg-gray-100">
      {!session ? <Login /> : <Dashboard session={session} />}
    </div>
  )
}

export default App