import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    users: [
      {
        id: 1,
        username: 'admin',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        role: 'admin'
      },
      {
        id: 2,
        username: 'john',
        password: 'john123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'user'
      }
    ]
  }),
  
  getters: {
    fullName: (state) => {
      return state.user ? `${state.user.firstName} ${state.user.lastName}` : ''
    },
    isAdmin: (state) => {
      return state.user?.role === 'admin'
    }
  },
  
  actions: {
    login(username, password) {
      const user = this.users.find(u => u.username === username && u.password === password)
      if (user) {
        this.user = { ...user }
        this.isAuthenticated = true
        localStorage.setItem('user', JSON.stringify(user))
        return true
      }
      return false
    },
    
    register(userData) {
      const newUser = {
        id: this.users.length + 1,
        ...userData,
        role: 'user'
      }
      this.users.push(newUser)
      this.user = newUser
      this.isAuthenticated = true
      localStorage.setItem('user', JSON.stringify(newUser))
      return true
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('user')
    },
    
    initializeAuth() {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        this.user = JSON.parse(savedUser)
        this.isAuthenticated = true
      }
    }
  }
})