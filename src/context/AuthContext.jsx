import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  // All registered users stored in localStorage
  const [users, setUsers] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fr_users')) || [] } catch { return [] }
  })

  // Currently logged-in user
  const [currentUser, setCurrentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fr_current_user')) || null } catch { return null }
  })

  // Persist users list whenever it changes
  useEffect(() => {
    localStorage.setItem('fr_users', JSON.stringify(users))
  }, [users])

  // Persist current user whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('fr_current_user', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('fr_current_user')
    }
  }, [currentUser])

  // Register a new user
  const register = ({ name, email, password }) => {
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (existing) return { success: false, error: 'Email already registered.' }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // plain text – fine for a demo/college project
      title: 'Aspiring Professional',
      location: '',
      bio: '',
      github: '',
      linkedin: '',
      avatar: null,
      joinDate: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      lastActive: 'just now',
      courses: 0,
      streak: 0,
      skills: [],
      createdAt: Date.now(),
    }

    setUsers((prev) => [...prev, newUser])
    setCurrentUser(newUser)
    return { success: true }
  }

  // Login an existing user
  const login = ({ email, password }) => {
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!user) return { success: false, error: 'Invalid email or password.' }
    // Refresh lastActive
    const updated = { ...user, lastActive: 'just now' }
    setCurrentUser(updated)
    return { success: true }
  }

  // Update profile fields for current user
  const updateProfile = (fields) => {
    const updated = { ...currentUser, ...fields }
    setCurrentUser(updated)
    // Also update in users array
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
  }

  const logout = () => setCurrentUser(null)

  return (
    <AuthContext.Provider value={{ currentUser, users, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
