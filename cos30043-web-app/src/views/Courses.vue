<template>
  <div class="courses">
    <div class="row mb-4">
      <div class="col-12">
        <h1>Our Courses</h1>
        <p class="lead">Discover our comprehensive collection of web development courses</p>
      </div>
    </div>
    
    <!-- Search and Filter -->
    <div class="row mb-4">
      <div class="col-md-6 mb-3">
        <div class="input-group">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Search courses..." 
            v-model="searchQuery"
          >
          <span class="input-group-text"><i class="bi bi-search"></i></span>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <select class="form-select" v-model="categoryFilter">
          <option value="">All Categories</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Programming">Programming</option>
          <option value="Design">Design</option>
        </select>
      </div>
      <div class="col-md-3 mb-3">
        <select class="form-select" v-model="levelFilter">
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
    </div>
    
    <!-- Course Grid -->
    <div class="row">
      <div v-for="course in paginatedCourses" :key="course.id" class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100 course-card">
          <img :src="course.image" class="card-img-top" :alt="course.title">
          <div class="card-body d-flex flex-column">
            <div class="mb-2">
              <span class="badge bg-primary">{{ course.category }}</span>
              <span class="badge bg-secondary ms-1">{{ course.level }}</span>
            </div>
            <h5 class="card-title">{{ course.title }}</h5>
            <p class="card-text">{{ course.description }}</p>
            <div class="mt-auto">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="text-muted">{{ course.instructor }}</span>
                <span class="fw-bold">${{ course.price }}</span>
              </div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <i class="bi bi-star-fill text-warning"></i>
                  <span>{{ course.rating }}</span>
                  <small class="text-muted">({{ course.students }} students)</small>
                </div>
                <div>
                  <button 
                    class="btn btn-sm btn-outline-danger" 
                    @click="likeCourse(course.id)"
                  >
                    <i class="bi bi-heart"></i> {{ course.likes }}
                  </button>
                </div>
              </div>
              <router-link 
                :to="`/courses/${course.id}`" 
                class="btn btn-primary w-100"
              >
                View Details
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Pagination -->
    <div class="row mt-4">
      <div class="col-12">
        <nav aria-label="Courses pagination">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="currentPage--">Previous</a>
            </li>
            <li 
              v-for="page in totalPages" 
              :key="page" 
              class="page-item"
              :class="{ active: currentPage === page }"
            >
              <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" @click.prevent="currentPage++">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { useCoursesStore } from '../store/courses'

export default {
  name: 'CoursesView',
  setup() {
    const coursesStore = useCoursesStore()
    return { coursesStore }
  },
  data() {
    return {
      searchQuery: '',
      categoryFilter: '',
      levelFilter: '',
      currentPage: 1,
      itemsPerPage: 6
    }
  },
  computed: {
    filteredCourses() {
      return this.coursesStore.courses.filter(course => {
        const searchMatch = !this.searchQuery || 
          course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(this.searchQuery.toLowerCase())
        
        const categoryMatch = !this.categoryFilter || course.category === this.categoryFilter
        const levelMatch = !this.levelFilter || course.level === this.levelFilter
        
        return searchMatch && categoryMatch && levelMatch
      })
    },
    
    paginatedCourses() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredCourses.slice(start, end)
    },
    
    totalPages() {
      return Math.ceil(this.filteredCourses.length / this.itemsPerPage)
    }
  },
  methods: {
    likeCourse(courseId) {
      this.coursesStore.likeCourse(courseId)
    }
  },
  watch: {
    filteredCourses() {
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>
.course-card {
  transition: transform 0.3s ease;
}

.course-card:hover {
  transform: translateY(-5px);
}
</style>