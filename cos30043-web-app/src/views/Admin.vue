<template>
  <div class="admin">
    <h1>Admin Panel</h1>
    
    <div class="row mb-4">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5>User Management</h5>
          </div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in authStore.users" :key="user.id">
                  <td>{{ user.firstName }} {{ user.lastName }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.role }}</td>
                  <td>
                    <button class="btn btn-sm btn-outline-danger">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5>Course Management</h5>
          </div>
          <div class="card-body">
            <button class="btn btn-primary mb-3" @click="showAddCourseForm = !showAddCourseForm">
              Add New Course
            </button>
            
            <div v-if="showAddCourseForm" class="mb-3">
              <form @submit.prevent="addCourse">
                <div class="mb-2">
                  <input type="text" class="form-control" v-model="newCourse.title" placeholder="Course Title" required>
                </div>
                <div class="mb-2">
                  <textarea class="form-control" v-model="newCourse.description" placeholder="Description" required></textarea>
                </div>
                <div class="mb-2">
                  <input type="text" class="form-control" v-model="newCourse.instructor" placeholder="Instructor" required>
                </div>
                <div class="mb-2">
                  <input type="number" class="form-control" v-model="newCourse.price" placeholder="Price" required>
                </div>
                <button type="submit" class="btn btn-success">Add Course</button>
              </form>
            </div>
            
            <div class="list-group">
              <div v-for="course in coursesStore.courses" :key="course.id" class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h6>{{ course.title }}</h6>
                  <small>{{ course.instructor }}</small>
                </div>
                <div>
                  <button class="btn btn-sm btn-outline-primary me-2" @click="editCourse(course)">Edit</button>
                  <button class="btn btn-sm btn-outline-danger" @click="deleteCourse(course.id)">Delete</button>
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
  name: 'AdminView',
  setup() {
    const authStore = useAuthStore()
    const coursesStore = useCoursesStore()
    
    return { authStore, coursesStore }
  },
  data() {
    return {
      showAddCourseForm: false,
      newCourse: {
        title: '',
        description: '',
        instructor: '',
        price: 0,
        category: 'Programming',
        level: 'Beginner',
        duration: '8 weeks',
        image: 'https://via.placeholder.com/400x300?text=New+Course',
        rating: 4.5,
        students: 0,
        likes: 0,
        content: []
      }
    }
  },
  methods: {
    addCourse() {
      const course = {
        ...this.newCourse,
        id: this.coursesStore.courses.length + 1
      }
      this.coursesStore.courses.push(course)
      this.showAddCourseForm = false
      this.resetForm()
    },
    
    editCourse(course) {
      // Edit course logic
      alert(`Edit course: ${course.title}`)
    },
    
    deleteCourse(courseId) {
      if (confirm('Are you sure you want to delete this course?')) {
        const index = this.coursesStore.courses.findIndex(c => c.id === courseId)
        if (index > -1) {
          this.coursesStore.courses.splice(index, 1)
        }
      }
    },
    
    resetForm() {
      this.newCourse = {
        title: '',
        description: '',
        instructor: '',
        price: 0,
        category: 'Programming',
        level: 'Beginner',
        duration: '8 weeks',
        image: 'https://via.placeholder.com/400x300?text=New+Course',
        rating: 4.5,
        students: 0,
        likes: 0,
        content: []
      }
    }
  }
}
</script>