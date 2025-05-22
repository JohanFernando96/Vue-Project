<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <div class="row mb-4">
      <div class="col-12">
        <h1 class="display-4">Welcome to our Web Application</h1>
        <p class="lead">
          This is a custom web application built with Vue.js and Bootstrap for the COS30043 Interface Design and Development course.
          Our platform provides the latest news, resources, and information about web development technologies.
        </p> 
      </div>
    </div>
    
    <div class="row">
      <!-- First Image and Description -->
      <div class="col-md-6 mb-4">
        <div class="card h-100">
          <img src="https://via.placeholder.com/600x400?text=Vue.js+Development" class="card-img-top" alt="Vue.js Development">
          <div class="card-body">
            <h5 class="card-title">Modern Vue.js Development</h5>
            <p class="card-text">
              Learn about modern Vue.js development techniques and best practices. Our platform provides resources
              for developers of all experience levels.
            </p>
          </div>
        </div>
      </div>
      
      <!-- Second Image and Description -->
      <div class="col-md-6 mb-4">
        <div class="card h-100">
          <img src="https://via.placeholder.com/600x400?text=Responsive+Design" class="card-img-top" alt="Responsive Design">
          <div class="card-body">
            <h5 class="card-title">Responsive Design Principles</h5>
            <p class="card-text">
              Explore responsive design principles and techniques for creating websites that work seamlessly
              across all device sizes, from mobile phones to desktop computers.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Content Section - Will be visible on larger screens -->
    <div class="row d-none d-lg-flex mt-4">
      <div class="col-12">
        <h2>Featured Content</h2>
        <div class="row">
          <div class="col-md-4 mb-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Getting Started</h5>
                <p class="card-text">Quick guides for beginners to get started with web development.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Advanced Techniques</h5>
                <p class="card-text">Advanced techniques for experienced developers.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Latest Trends</h5>
                <p class="card-text">Stay updated with the latest trends in web development.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
@media (max-width: 767.98px) {
  .display-4 {
    font-size: 2rem;
  }
  
  .lead {
    font-size: 1rem;
  }
}
</style>