<template>
  <div class="profile">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <div class="card-header">
            <h4>User Profile</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateProfile">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="firstName" class="form-label">First Name</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="firstName"
                    v-model="firstName"
                    required
                  >
                </div>
                <div class="col-md-6 mb-3">
                  <label for="lastName" class="form-label">Last Name</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="lastName"
                    v-model="lastName"
                    required
                  >
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
                >
              </div>
              
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="username"
                  v-model="username"
                  readonly
                >
              </div>
              
              <button type="submit" class="btn btn-primary">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../store/auth'

export default {
  name: 'ProfileView',
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      username: ''
    }
  },
  mounted() {
    if (this.authStore.user) {
      this.firstName = this.authStore.user.firstName
      this.lastName = this.authStore.user.lastName
      this.email = this.authStore.user.email
      this.username = this.authStore.user.username
    }
  },
  methods: {
    updateProfile() {
      // Update user profile logic
      alert('Profile updated successfully!')
    }
  }
}
</script>