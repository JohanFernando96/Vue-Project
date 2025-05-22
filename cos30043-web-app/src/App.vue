<template>
  <div class="app-container">
    <NavBar />
    
    <main class="main-content">
      <div class="container content-wrapper">
        <transition name="router-view" mode="out-in">
          <router-view />
        </transition>
      </div>
    </main>
    
    <footer class="modern-footer">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="footer-brand">
              <i class="bi bi-graduation-cap me-2"></i>
              <span>EduPlatform</span>
            </div>
            <p class="footer-text">Empowering learning through modern technology</p>
          </div>
          <div class="col-md-6 text-md-end">
            <div class="footer-links">
              <a href="#" class="footer-link">Privacy</a>
              <a href="#" class="footer-link">Terms</a>
              <a href="#" class="footer-link">Support</a>
            </div>
            <p class="footer-copy">© 2025 COS30043 - Interface Design and Development</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import { useAuthStore } from './store/auth'

export default {
  name: 'App',
  components: {
    NavBar
  },
  setup() {
    const authStore = useAuthStore()
    authStore.initializeAuth()
  },
  mounted() {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
  }
}
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, var(--md-surface) 0%, #f8fafc 100%);
}

.main-content {
  flex: 1;
  padding: 40px 0;
  min-height: calc(100vh - 200px);
}

.content-wrapper {
  position: relative;
}

.modern-footer {
  background: linear-gradient(135deg, var(--md-surface-variant) 0%, var(--md-outline-variant) 100%);
  color: var(--md-on-surface-variant);
  padding: 40px 0 20px;
  margin-top: auto;
  border-top: 1px solid var(--md-outline-variant);
}

.footer-brand {
  display: flex;
  align-items: center;
  font-family: var(--md-font-display);
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--md-on-surface);
  margin-bottom: 8px;
}

.footer-brand i {
  font-size: 1.75rem;
  color: var(--md-primary);
}

.footer-text {
  color: var(--md-on-surface-variant);
  margin-bottom: 0;
  font-size: 14px;
}

.footer-links {
  display: flex;
  gap: 24px;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.footer-link {
  color: var(--md-on-surface-variant);
  text-decoration: none;
  font-weight: 500;
  transition: all var(--md-motion-quick);
  padding: 4px 8px;
  border-radius: var(--md-radius-xs);
}

.footer-link:hover {
  color: var(--md-primary);
  background-color: rgba(103, 80, 164, 0.1);
  transform: translateY(-1px);
}

.footer-copy {
  font-size: 12px;
  color: var(--md-on-surface-variant);
  margin-bottom: 0;
  opacity: 0.8;
}

/* Router transition animations */
.router-view-enter-active {
  transition: all var(--md-motion-medium);
}

.router-view-leave-active {
  transition: all var(--md-motion-quick);
}

.router-view-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.98);
}

.router-view-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(1.02);
}

@media (max-width: 768px) {
  .main-content {
    padding: 20px 0;
  }
  
  .modern-footer {
    padding: 30px 0 15px;
  }
  
  .footer-links {
    justify-content: center;
    margin-bottom: 16px;
  }
  
  .col-md-6:last-child {
    text-align: center !important;
  }
}
</style>