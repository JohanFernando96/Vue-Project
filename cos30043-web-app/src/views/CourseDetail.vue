<template>
  <div v-if="course" class="course-detail">
    <div class="row">
      <div class="col-lg-8">
        <img :src="course.image" class="img-fluid rounded mb-4" :alt="course.title">
        
        <h1>{{ course.title }}</h1>
        <p class="lead">{{ course.description }}</p>
        
        <div class="mb-4">
          <span class="badge bg-primary me-2">{{ course.category }}</span>
          <span class="badge bg-secondary me-2">{{ course.level }}</span>
          <span class="badge bg-info">{{ course.duration }}</span>
        </div>
        
        <div class="row mb-4">
          <div class="col-md-6">
            <h5>Instructor</h5>
            <p>{{ course.instructor }}</p>
          </div>
          <div class="col-md-6">
            <h5>Rating</h5>
            <p>
              <i class="bi bi-star-fill text-warning"></i>
              {{ course.rating }} ({{ course.students }} students)
            </p>
          </div>
        </div>
        
        <h5>Course Content</h5>
        <ul class="list-group mb-4">
          <li 
            v-for="(item, index) in course.content" 
            :key="index"
            class="list-group-item"
          >
            <i class="bi bi-check-circle text-success me-2"></i>
            {{ item }}
          </li>
        </ul>
      </div>
      
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <h3 class="text-center mb-3">${{ course.price }}</h3>
            
            <div v-if="!isAuthenticated" class="text-center">
              <p>Please login to enroll in this course</p>
              <router-link to="/login" class="btn btn-primary w-100">Login</router-link>
            </div>
            
            <div v-else-if="!isEnrolled" class="text-center">
              <button 
                class="btn btn-success w-100 mb-3" 
                @click="enrollInCourse"
              >
                Enroll Now
              </button>
            </div>
            
            <div v-else class="text-center">
              <div class="alert alert-success">
                <i class="bi bi-check-circle"></i> You are enrolled!
              </div>
              <router-link to="/dashboard" class="btn btn-primary w-100">
                Go to Dashboard
              </router-link>
            </div>
            
            <div class="mt-3">
              <button 
                class="btn btn-outline-danger w-100" 
                @click="likeCourse"
              >
                <i class="bi bi-heart"></i> Like ({{ course.likes }})
              </button>
            </div>
          </div>
        </div>
        
        <div class="card mt-3">
          <div class="card-body">
            <h6>Course Features</h6>
            <ul class="list-unstyled">
              <li><i class="bi bi-clock me-2"></i>{{ course.duration }}</li>
              <li><i class="bi bi-people me-2"></i>{{ course.students }} students</li>
              <li><i class="bi bi-award me-2"></i>Certificate included</li>
              <li><i class="bi bi-phone me-2"></i>Mobile friendly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="text-center">
    <h3>Course not found</h3>
    <router-link to="/courses" class="btn btn-primary">Back to Courses</router-link>
  </div>
</template>

<script>
import { useCoursesStore } from '../store/courses'
import { useAuthStore } from '../store/auth'
import { useRoute } from 'vue-router'

export default {
  name: 'CourseDetailView',
  setup() {
    const coursesStore = useCoursesStore()
    const authStore = useAuthStore()
    const route = useRoute()
    
    return { coursesStore, authStore, route }
  },
  computed: {
    course() {
      const courseId = parseInt(this.route.params.id)
      return this.coursesStore.getCourseById(courseId)
    },
    
    isAuthenticated() {
      return this.authStore.isAuthenticated
    },
    
    isEnrolled() {
      if (!this.isAuthenticated || !this.course) return false
      return this.coursesStore.isEnrolled(this.course.id, this.authStore.user.id)
    }
  },
  methods: {
    enrollInCourse() {
      if (this.course && this.isAuthenticated) {
        this.coursesStore.enrollInCourse(this.course.id, this.authStore.user.id)
      }
    },
    
    likeCourse() {
      if (this.course) {
        this.coursesStore.likeCourse(this.course.id)
      }
    }
  }
}
</script>