<!-- src/App.vue -->
<template>
  <div class="container-fluid p-0">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand" to="/">Vue Web App</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/news">News</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
    <main class="container py-4">
      <router-view />
    </main>
    
    <footer class="bg-dark text-light py-3">
      <div class="container text-center">
        <p>COS30043 - Interface Design and Development - Custom Web Application</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // Import Bootstrap JavaScript
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }
}
</script>

<style>
/* Global styles */
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>