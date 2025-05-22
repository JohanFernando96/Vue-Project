<template>
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-4">
      <div class="card shadow">
        <div class="card-header bg-primary text-white text-center">
          <h4 class="mb-0">Login</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="handleLogin">
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
            
            <div v-if="loginError" class="alert alert-danger">
              {{ loginError }}
            </div>
            
            <button type="submit" class="btn btn-primary w-100">Login</button>
          </form>
          
          <div class="text-center mt-3">
            <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
          </div>
          
          <div class="mt-3">
            <small class="text-muted">
              <strong>Test Accounts:</strong><br>
              Admin: admin/admin123<br>
              User: john/john123
            </small>
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
  name: 'LoginView',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    
    return { authStore, router }
  },
  data() {
    return {
      username: '',
      password: '',
      errors: {},
      loginError: ''
    }
  },
  methods: {
    validateForm() {
      this.errors = {}
      
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
      
      return Object.keys(this.errors).length === 0
    },
    
    handleLogin() {
      this.loginError = ''
      
      if (!this.validateForm()) {
        return
      }
      
      if (this.authStore.login(this.username, this.password)) {
        this.router.push('/dashboard')
      } else {
        this.loginError = 'Invalid username or password'
      }
    }
  }
}
</script>