<!-- src/views/About.vue -->
<template>
  <div class="about">
    <div class="row">
      <div class="col-lg-8 mb-4">
        <h1 class="mb-4">About Our Application</h1>
        
        <p class="lead">
          Welcome to our web application! This platform is designed to provide the latest information,
          resources, and news about web development technologies, with a focus on Vue.js and modern
          frontend development practices.
        </p>
        
        <p>
          Our goal is to create a centralized hub where developers can stay updated on industry trends,
          learn new techniques, and connect with other web development enthusiasts. Whether you're a beginner
          just starting your journey in web development or an experienced professional looking to stay
          current, we have resources that cater to all skill levels.
        </p>
      </div>
      
      <div class="col-lg-4 mb-4">
        <div class="card">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0">Introduce Yourself</h5>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="firstName" class="form-label">First Name</label>
              <input type="text" class="form-control" id="firstName" v-model="firstName" placeholder="Enter your first name">
            </div>
            <div class="mb-3">
              <label for="lastName" class="form-label">Last Name</label>
              <input type="text" class="form-control" id="lastName" v-model="lastName" placeholder="Enter your last name">
            </div>
            <div v-if="showWelcome" class="alert alert-success mt-3">
              Welcome, {{ fullName }}! We're glad you're here.
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row mb-4">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Choose Your Preference</h5>
          </div>
          <div class="card-body">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="imagePreference" id="mountain" value="mountain" v-model="imagePreference">
              <label class="form-check-label" for="mountain">Mountain</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="imagePreference" id="ocean" value="ocean" v-model="imagePreference">
              <label class="form-check-label" for="ocean">Ocean</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row" v-if="imagePreference">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <img 
            :src="preferenceImage" 
            class="card-img-top" 
            :alt="imagePreference === 'mountain' ? 'Mountain landscape' : 'Ocean view'"
          >
          <div class="card-body text-center">
            <h5 class="card-title">{{ imagePreference === 'mountain' ? 'Mountain Landscape' : 'Ocean View' }}</h5>
            <p class="card-text">
              {{ imagePreference === 'mountain' ? 
                'Majestic mountains reaching towards the sky, symbolizing ambition and perseverance.' : 
                'Peaceful ocean waves, representing tranquility and the vastness of possibilities.' }}
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Features section - visible on larger screens -->
    <div class="row mt-5 d-none d-md-flex">
      <div class="col-12">
        <h2 class="mb-4">Key Features</h2>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Latest News</h5>
            <p class="card-text">Stay updated with the latest trends and developments in web technologies.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Resources</h5>
            <p class="card-text">Access a wide range of resources to enhance your development skills.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Community</h5>
            <p class="card-text">Connect with other developers and share knowledge and experiences.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  data() {
    return {
      firstName: '',
      lastName: '',
      imagePreference: ''
    };
  },
  computed: {
    fullName() {
      if (this.firstName && this.lastName) {
        return `${this.firstName} ${this.lastName}`;
      } else if (this.firstName) {
        return this.firstName;
      } else if (this.lastName) {
        return this.lastName;
      } else {
        return '';
      }
    },
    showWelcome() {
      return this.firstName.trim() !== '' || this.lastName.trim() !== '';
    },
    preferenceImage() {
      if (this.imagePreference === 'mountain') {
        return 'https://images.pexels.com/photos/2416419/pexels-photo-2416419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
      } else if (this.imagePreference === 'ocean') {
        return 'https://images.pexels.com/photos/2397651/pexels-photo-2397651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
      }
      return '';
    }
  }
}
</script>

<style scoped>
.about {
  min-height: 70vh;
}

@media (max-width: 767.98px) {
  h1 {
    font-size: 1.8rem;
  }
  
  .lead {
    font-size: 1rem;
  }
}
</style>