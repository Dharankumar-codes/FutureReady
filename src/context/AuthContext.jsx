import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('futureready_user')
    return saved ? JSON.parse(saved) : null
  })

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('futureready_users') || '[]')
    const exists = users.find(u => u.email === email)
    if (exists) return { success: false, message: 'Email already registered!' }

    const newUser = { name, email, password }
    users.push(newUser)
    localStorage.setItem('futureready_users', JSON.stringify(users))
    localStorage.setItem('futureready_user', JSON.stringify({ name, email }))
    setUser({ name, email })
    return { success: true }
  }

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('futureready_users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { success: false, message: 'Invalid email or password!' }

    localStorage.setItem('futureready_user', JSON.stringify({ name: found.name, email }))
    setUser({ name: found.name, email })
    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem('futureready_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)