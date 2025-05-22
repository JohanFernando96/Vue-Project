<template>
  <div class="container-fluid p-0">
    <NavBar />
    
    <main class="container py-4">
      <router-view />
    </main>
    
    <footer class="bg-dark text-light py-3 mt-5">
      <div class="container text-center">
        <p class="mb-0">COS30043 - Interface Design and Development - E-Learning Platform</p>
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
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  min-height: calc(100vh - 200px);
}
</style>