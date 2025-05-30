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
          @logout="handleLogout"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import CustomDropdown from './CustomDropdown.vue';

export default {
  name: 'NavBar',
  components: {
    CustomDropdown
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const { isAuthenticated, isAdmin, fullName } = storeToRefs(authStore);
    
    return {
      authStore,
      router,
      isAuthenticated,
      isAdmin,
      fullName
    };
  },
  data() {
    return {
      showMobileMenu: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    closeMobileMenu() {
      this.showMobileMenu = false;
    },
    async handleLogout() {
      try {
        // Call the store logout
        this.authStore.logout();
        // Close mobile menu if open
        this.closeMobileMenu();
        // Navigate to home page
        await this.router.push('/');
        // Force page reload to ensure clean state
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } catch (error) {
        console.error('Logout error:', error);
        // Fallback: force redirect to home
        window.location.href = '/';
      }
    }
  }
}
</script>

<style scoped>
/* Keep all your existing styles */
.navbar {
  background: linear-gradient(135deg, var(--md-primary) 0%, #8b5cf6 50%, var(--md-secondary) 100%);
  box-shadow: var(--md-elevation-3);
  padding: 12px 0;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1000; /* Ensure navbar has proper z-index */
}

/* Add this to ensure dropdowns appear above other content */
.navbar .custom-dropdown {
  z-index: 9999;
}

/* Rest of your existing styles... */
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
}

@media (max-width: 575px) {
  .navbar-brand i {
    font-size: 1.5rem;
    margin-right: 8px;
  }
}

/* Enhanced focus states */
.nav-link-modern:focus-visible,
.btn-modern:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
}
</style>