<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
      <div class="card shadow">
        <div class="card-header bg-success text-white text-center">
          <h4 class="mb-0">Register</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="handleRegister">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName" class="form-label">First Name</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="firstName"
                  v-model="firstName"
                  required
                  :class="{ 'is-invalid': errors.firstName }"
                >
                <div v-if="errors.firstName" class="invalid-feedback">
                  {{ errors.firstName }}
                </div>
              </div>
              
              <div class="col-md-6 mb-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="lastName"
                  v-model="lastName"
                  required
                  :class="{ 'is-invalid': errors.lastName }"
                >
                <div v-if="errors.lastName" class="invalid-feedback">
                  {{ errors.lastName }}
                </div>
              </div>
            </div>
            
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input 
                type="email" 
                class="form-control" 
                id="email"
                v-model="email"
                required
                :class="{ 'is-invalid': errors.email }"
              >
              <div v-if="errors.email" class="invalid-feedback">
                {{ errors.email }}
              </div>
            </div>
            
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input 
                type="text" 
                class="form-control" 
                id="username"
                v-model="username"
                required
                :class="{ 'is-invalid': errors.username }"
              >
              <div v-if="errors.username" class="invalid-feedback">
                {{ errors.username }}
              </div>
            </div>
            
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input 
                type="password" 
                class="form-control" 
                id="password"
                v-model="password"
                required
                :class="{ 'is-invalid': errors.password }"
              >
              <div v-if="errors.password" class="invalid-feedback">
                {{ errors.password }}
              </div>
            </div>
            
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <input 
                type="password" 
                class="form-control" 
                id="confirmPassword"
                v-model="confirmPassword"
                required
                :class="{ 'is-invalid': errors.confirmPassword }"
              >
              <div v-if="errors.confirmPassword" class="invalid-feedback">
                {{ errors.confirmPassword }}
              </div>
            </div>
            
            <button type="submit" class="btn btn-success w-100">Register</button>
          </form>
          
          <div class="text-center mt-3">
            <p>Already have an account? <router-link to="/login">Login here</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'RegisterView',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    
    return { authStore, router }
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      errors: {}
    }
  },
  methods: {
    validateForm() {
      this.errors = {}
      
      if (!this.firstName.trim()) {
        this.errors.firstName = 'First name is required'
      }
      
      if (!this.lastName.trim()) {
        this.errors.lastName = 'Last name is required'
      }
      
      if (!this.email.trim()) {
        this.errors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.errors.email = 'Email format is invalid'
      }
      
      if (!this.username.trim()) {
        this.errors.username = 'Username is required'
      } else if (this.username.length < 3) {
        this.errors.username = 'Username must be at least 3 characters'
      }
      
      if (!this.password.trim()) {
        this.errors.password = 'Password is required'
      } else if (this.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters'
      }
      
      if (this.password !== this.confirmPassword) {
        this.errors.confirmPassword = 'Passwords do not match'
      }
      
      return Object.keys(this.errors).length === 0
    },
    
    handleRegister() {
      if (!this.validateForm()) {
        return
      }
      
      const userData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        username: this.username,
        password: this.password
      }
      
      this.authStore.register(userData)
      this.router.push('/dashboard')
    }
  }
}
</script>