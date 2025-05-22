<!-- Update src/views/Home.vue -->
<template>
  <div class="home-modern">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">Welcome to</span><br>
          <span class="brand-name">EduPlatform</span>
        </h1>
        <p class="hero-subtitle">
          Discover the future of learning with our cutting-edge platform designed for modern education
        </p>
        <div class="hero-actions">
          <ModernButton 
            variant="primary" 
            size="large" 
            icon="bi bi-rocket-takeoff"
            to="/courses"
            custom-class="btn-hero"
          >
            Get Started
          </ModernButton>
          <ModernButton 
            variant="outline" 
            size="large" 
            icon="bi bi-play-circle"
          >
            Watch Demo
          </ModernButton>
        </div>
      </div>
      <div class="hero-visual">
        <div class="floating-card">
          <i class="bi bi-mortarboard"></i>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="row g-4">
        <div class="col-md-6 mb-4">
          <div class="feature-card">
            <div class="feature-image">
              <img src="https://www.etelligens.com/wp-content/uploads/2019/10/vue-js-development-company.webp" 
                   class="card-img-top" alt="Vue.js Development">
            </div>
            <div class="feature-content">
              <div class="feature-icon">
                <i class="bi bi-code-slash"></i>
              </div>
              <h3 class="feature-title">Modern Vue.js Development</h3>
              <p class="feature-description">
                Learn cutting-edge Vue.js techniques and best practices with our comprehensive curriculum
              </p>
              <ModernButton variant="text" icon="bi bi-arrow-right">
                Learn More
              </ModernButton>
            </div>
          </div>
        </div>
        
        <div class="col-md-6 mb-4">
          <div class="feature-card">
            <div class="feature-image">
              <img src="https://admin.12grids.com/uploads/blogs/original_cover_images/future-of-responsive-web-design-12grids.jpg" 
                   class="card-img-top" alt="Responsive Design">
            </div>
            <div class="feature-content">
              <div class="feature-icon">
                <i class="bi bi-phone"></i>
              </div>
              <h3 class="feature-title">Responsive Design Mastery</h3>
              <p class="feature-description">
                Master the art of creating beautiful, responsive interfaces that work seamlessly across all devices
              </p>
              <ModernButton variant="text" icon="bi bi-arrow-right">
                Explore
              </ModernButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="row text-center">
        <div class="col-md-3 col-6 mb-4">
          <div class="stat-item">
            <div class="stat-number">50K+</div>
            <div class="stat-label">Students</div>
          </div>
        </div>
        <div class="col-md-3 col-6 mb-4">
          <div class="stat-item">
            <div class="stat-number">200+</div>
            <div class="stat-label">Courses</div>
          </div>
        </div>
        <div class="col-md-3 col-6 mb-4">
          <div class="stat-item">
            <div class="stat-number">98%</div>
            <div class="stat-label">Success Rate</div>
          </div>
        </div>
        <div class="col-md-3 col-6 mb-4">
          <div class="stat-item">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Support</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ModernButton from '../components/ModernButton.vue'

export default {
  name: 'HomeView',
  components: {
    ModernButton
  }
}
</script>

<style scoped>
.home-modern {
  min-height: 100vh;
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  padding: 80px 0;
  min-height: 70vh;
}

.hero-content {
  z-index: 2;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
}

.gradient-text {
  background: linear-gradient(135deg, var(--md-primary) 0%, #8b5cf6 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-name {
  color: var(--md-on-surface);
  display: block;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--md-on-surface-variant);
  margin-bottom: 40px;
  line-height: 1.6;
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.floating-card {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, var(--md-primary) 0%, #8b5cf6 100%);
  border-radius: var(--md-radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
  box-shadow: var(--md-elevation-4);
  animation: float 3s ease-in-out infinite;
  position: relative;
}

.floating-card::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, var(--md-primary), #8b5cf6, #ec4899);
  border-radius: inherit;
  z-index: -1;
  opacity: 0.5;
  filter: blur(10px);
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

.features-section {
  padding: 80px 0;
}

.feature-card {
  background: var(--md-surface);
  border-radius: var(--md-radius-lg);
  overflow: hidden;
  box-shadow: var(--md-elevation-2);
  transition: all var(--md-motion-medium);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--md-elevation-4);
}

.feature-image {
  position: relative;
  overflow: hidden;
  height: 200px;
}

.feature-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--md-motion-slow);
}

.feature-card:hover .feature-image img {
  transform: scale(1.1);
}

.feature-content {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.feature-icon {
  width: 48px;
  height: 48px;
  background: var(--md-primary-container);
  color: var(--md-on-primary-container);
  border-radius: var(--md-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 1.5rem;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--md-on-surface);
}

.feature-description {
  color: var(--md-on-surface-variant);
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
}

.stats-section {
  padding: 60px 0;
  background: linear-gradient(135deg, var(--md-primary-container) 0%, var(--md-surface-variant) 100%);
  border-radius: var(--md-radius-lg);
  margin: 40px 0;
}

.stat-item {
  padding: 20px;
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: var(--md-primary);
  margin-bottom: 8px;
  font-family: var(--md-font-display);
}

.stat-label {
  font-size: 1rem;
  color: var(--md-on-surface-variant);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Responsive design */
@media (max-width: 992px) {
  .hero-section {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
    padding: 60px 0;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .floating-card {
    width: 150px;
    height: 150px;
    font-size: 3rem;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}
</style>