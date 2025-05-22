<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <i class="bi bi-graduation-cap me-2"></i>
        <span class="brand-text">EduPlatform</span>
      </router-link>
      
      <button 
        class="navbar-toggler" 
        type="button" 
        @click="toggleMobileMenu"
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" :class="{ 'show': showMobileMenu }" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link nav-link-modern" to="/" @click="closeMobileMenu">
              <i class="bi bi-house-door me-1"></i>Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-modern" to="/courses" @click="closeMobileMenu">
              <i class="bi bi-book me-1"></i>Courses
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-modern" to="/news" @click="closeMobileMenu">
              <i class="bi bi-newspaper me-1"></i>News
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-modern" to="/about" @click="closeMobileMenu">
              <i class="bi bi-info-circle me-1"></i>About
            </router-link>
          </li>
        </ul>
        
        <!-- Not Authenticated -->
        <div class="d-flex align-items-center gap-2" v-if="!isAuthenticated">
          <router-link to="/login" class="btn btn-outline-light btn-modern" @click="closeMobileMenu">
            <i class="bi bi-box-arrow-in-right me-1"></i>Login
          </router-link>
          <router-link to="/register" class="btn btn-light btn-modern" @click="closeMobileMenu">
            <i class="bi bi-person-plus me-1"></i>Register
          </router-link>
        </div>
        
        <!-- Authenticated User -->
        <CustomDropdown 
          v-else
          :full-name="fullName"
          :is-admin="isAdmin"
          @logout="logout"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '../store/auth';
import { storeToRefs } from 'pinia';
import CustomDropdown from './CustomDropdown.vue';

export default {
  name: 'NavBar',
  components: {
    CustomDropdown
  },
  data() {
    return {
      showMobileMenu: false
    }
  },
  setup() {
    const authStore = useAuthStore();
    const { isAuthenticated, isAdmin, fullName } = storeToRefs(authStore);
    
    const logout = () => {
      authStore.logout();
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
  },
  methods: {
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    closeMobileMenu() {
      this.showMobileMenu = false;
    }
  }
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, var(--md-primary) 0%, #8b5cf6 50%, var(--md-secondary) 100%);
  box-shadow: var(--md-elevation-3);
  padding: 12px 0;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar-brand {
  display: flex;
  align-items: center;
  font-family: var(--md-font-display);
  font-weight: 700;
  font-size: 1.75rem;
  color: var(--md-on-primary) !important;
  text-decoration: none;
  transition: all var(--md-motion-medium);
  position: relative;
}

.navbar-brand:hover {
  transform: scale(1.05) translateY(-1px);
  text-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
}

.navbar-brand i {
  font-size: 2rem;
  margin-right: 12px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.brand-text {
  background: linear-gradient(45deg, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-link-modern {
  position: relative;
  color: var(--md-on-primary) !important;
  font-weight: 500;
  padding: 10px 18px !important;
  border-radius: var(--md-radius-xl);
  transition: all var(--md-motion-medium);
  overflow: hidden;
  margin: 0 4px;
}

.nav-link-modern::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2));
  opacity: 0;
  transition: all var(--md-motion-medium);
  border-radius: inherit;
}

.nav-link-modern:hover::before {
  opacity: 1;
}

.nav-link-modern:hover {
  transform: translateY(-2px);
  text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-link-modern.router-link-active {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  backdrop-filter: blur(10px);
  font-weight: 600;
  box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.3);
}

.btn-modern {
  position: relative;
  border-radius: var(--md-radius-xl);
  font-weight: 500;
  padding: 8px 20px;
  transition: all var(--md-motion-medium);
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-modern::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left var(--md-motion-slow);
}

.btn-modern:hover::before {
  left: 100%;
}

.btn-modern:hover {
  transform: translateY(-2px);
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
}

.btn-light.btn-modern {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8));
  color: var(--md-primary) !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-weight: 600;
}

.btn-light.btn-modern:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.95));
  color: var(--md-primary) !important;
}

.user-menu-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  min-width: 120px;
}

.user-avatar {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
}

.user-name {
  font-weight: 500;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.modern-dropdown {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--md-radius-md);
  box-shadow: var(--md-elevation-4);
  padding: 8px 0;
  margin-top: 12px;
  min-width: 200px;
}

.modern-dropdown-item {
  color: var(--md-on-surface);
  padding: 12px 20px;
  transition: all var(--md-motion-quick);
  display: flex;
  align-items: center;
  font-weight: 500;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
}

.modern-dropdown-item:hover {
  background: linear-gradient(135deg, var(--md-primary-container), rgba(103, 80, 164, 0.1));
  color: var(--md-on-primary-container);
  transform: translateX(4px);
  border-radius: 0 var(--md-radius-md) var(--md-radius-md) 0;
}

.logout-btn:hover {
  background: linear-gradient(135deg, var(--md-error-container), rgba(186, 26, 26, 0.1));
  color: var(--md-on-error-container);
}

.navbar-toggler {
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--md-radius-sm);
  padding: 8px 12px;
  transition: all var(--md-motion-medium);
}

.navbar-toggler:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.dropdown-divider {
  border-color: var(--md-outline-variant);
  margin: 8px 0;
}

/* Responsive improvements */
@media (max-width: 991px) {
  .navbar-brand {
    font-size: 1.5rem;
  }
  
  .brand-text {
    display: none;
  }
  
  .nav-link-modern {
    margin: 4px 0;
  }

  .btn-modern {
   width: 100%;
   margin: 4px 0;
   justify-content: center;
 }
 
 .user-menu-btn {
   width: 100%;
   justify-content: center;
   margin-top: 8px;
 }
}

@media (max-width: 575px) {
 .navbar-brand i {
   font-size: 1.5rem;
   margin-right: 8px;
 }
 
 .user-name {
   max-width: 100px;
 }
}

/* Animation for navbar collapse */
.navbar-collapse {
 transition: all var(--md-motion-medium);
}

/* Enhanced focus states */
.nav-link-modern:focus-visible,
.btn-modern:focus-visible {
 outline: 2px solid rgba(255, 255, 255, 0.8);
 outline-offset: 2px;
}
</style>