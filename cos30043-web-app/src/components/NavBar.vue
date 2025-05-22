<!-- src/components/NavBar.vue -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <i class="bi bi-book"></i> Web Dev Academy
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/courses">Courses</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/news">News</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
        </ul>
        
        <!-- Not Authenticated -->
        <div class="d-flex" v-if="!isAuthenticated">
          <router-link to="/login" class="btn btn-outline-light me-2">Login</router-link>
          <router-link to="/register" class="btn btn-primary">Register</router-link>
        </div>
        
        <!-- Authenticated User -->
        <div class="dropdown" v-else>
          <button class="btn btn-outline-light dropdown-toggle" type="button" id="userDropdown" 
                 data-bs-toggle="dropdown" aria-expanded="false">
            {{ fullName }}
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li>
              <router-link class="dropdown-item" to="/dashboard">
                <i class="bi bi-speedometer2"></i> Dashboard
              </router-link>
            </li>
            <li>
              <router-link class="dropdown-item" to="/profile">
                <i class="bi bi-person"></i> Profile
              </router-link>
            </li>
            <li v-if="isAdmin">
              <router-link class="dropdown-item" to="/admin">
                <i class="bi bi-gear"></i> Admin Panel
              </router-link>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li>
              <button class="dropdown-item" @click="logout">
                <i class="bi bi-box-arrow-right"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '../store/auth';
import { storeToRefs } from 'pinia';

export default {
  name: 'NavBar',
  setup() {
    const authStore = useAuthStore();
    const { isAuthenticated, isAdmin, fullName } = storeToRefs(authStore);
    
    const logout = () => {
      authStore.logout();
      // Redirect to home page
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    };
    
    return {
      isAuthenticated,
      isAdmin,
      fullName,
      logout
    };
  }
}
</script>

<style scoped>
.navbar-brand i {
  margin-right: 8px;
}

.dropdown-item i {
  margin-right: 8px;
  width: 16px;
}
</style>