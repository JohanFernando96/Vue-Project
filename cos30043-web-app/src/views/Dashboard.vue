<template>
  <div class="dashboard">
    <div class="row mb-4">
      <div class="col-12">
        <h1>Welcome back, {{ authStore.fullName }}!</h1>
        <p class="lead">Track your learning progress and continue your courses</p>
      </div>
    </div>
    
    <!-- Stats Cards -->
    <div class="row mb-4">
      <div class="col-md-3 mb-3">
        <div class="card bg-primary text-white">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div>
                <h5>Enrolled Courses</h5>
                <h3>{{ enrolledCourses.length }}</h3>
              </div>
              <i class="bi bi-book-half display-4"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-3 mb-3">
        <div class="card bg-success text-white">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div>
                <h5>Completed</h5>
                <h3>{{ completedCourses }}</h3>
              </div>
              <i class="bi bi-check-circle display-4"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-3 mb-3">
        <div class="card bg-info text-white">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div>
                <h5>In Progress</h5>
                <h3>{{ inProgressCourses }}</h3>
              </div>
              <i class="bi bi-play-circle display-4"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-3 mb-3">
        <div class="card bg-warning text-white">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div>
                <h5>Certificates</h5>
                <h3>{{ completedCourses }}</h3>
              </div>
              <i class="bi bi-award display-4"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Enrolled Courses -->
    <div class="row">
      <div class="col-12">
        <h3 class="mb-4">My Courses</h3>
        
        <div v-if="enrolledCourses.length === 0" class="alert alert-info">
          <h5>No courses enrolled yet!</h5>
          <p>Start your learning journey by browsing our course catalog.</p>
          <router-link to="/courses" class="btn btn-primary">Browse Courses</router-link>
        </div>
        
        <div v-else class="row">
          <div v-for="enrollment in enrolledCourses" :key="enrollment.courseId" class="col-md-6 col-lg-4 mb-4">
            <div class="card">
              <img :src="getCourse(enrollment.courseId).image" class="card-img-top" :alt="getCourse(enrollment.courseId).title">
              <div class="card-body">
                <h5 class="card-title">{{ getCourse(enrollment.courseId).title }}</h5>
                <p class="card-text">{{ getCourse(enrollment.courseId).instructor }}</p>
                
                <div class="mb-3">
                  <div class="d-flex justify-content-between mb-1">
                    <span>Progress</span>
                    <span>{{ getProgress(enrollment.courseId) }}%</span>
                  </div>
                  <div class="progress">
                    <div 
                      class="progress-bar" 
                      :style="{ width: getProgress(enrollment.courseId) + '%' }"
                      role="progressbar"
                    ></div>
                  </div>
                </div>
                
                <div class="d-flex gap-2">
                  <router-link 
                    :to="`/courses/${enrollment.courseId}`" 
                    class="btn btn-primary btn-sm flex-fill"
                  >
                    Continue
                  </router-link>
                  <button 
                    class="btn btn-outline-success btn-sm"
                    @click="updateCourseProgress(enrollment.courseId)"
                  >
                    Mark Progress
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../store/auth'
import { useCoursesStore } from '../store/courses'

export default {
  name: 'DashboardView',
  setup() {
    const authStore = useAuthStore()
    const coursesStore = useCoursesStore()
    
    return { authStore, coursesStore }
  },
  computed: {
    enrolledCourses() {
      return this.coursesStore.enrolledCourses.filter(
        enrollment => enrollment.userId === this.authStore.user?.id
      )
    },
    
    completedCourses() {
      return this.enrolledCourses.filter(enrollment => 
        this.getProgress(enrollment.courseId) === 100
      ).length
    },
    
    inProgressCourses() {
      return this.enrolledCourses.filter(enrollment => {
        const progress = this.getProgress(enrollment.courseId)
        return progress > 0 && progress < 100
      }).length
    }
  },
  methods: {
    getCourse(courseId) {
      return this.coursesStore.getCourseById(courseId)
    },
    
    getProgress(courseId) {
      const key = `${this.authStore.user?.id}-${courseId}`
      return this.coursesStore.userProgress[key] || 0
    },
    
    updateCourseProgress(courseId) {
      const currentProgress = this.getProgress(courseId)
      const newProgress = Math.min(100, currentProgress + 20)
      this.coursesStore.updateProgress(courseId, this.authStore.user.id, newProgress)
    }
  }
}
</script>