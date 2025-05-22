import { defineStore } from 'pinia'

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [
      {
        id: 1,
        title: 'Vue.js Fundamentals',
        description: 'Learn the basics of Vue.js framework',
        instructor: 'Sarah Wilson',
        duration: '8 weeks',
        level: 'Beginner',
        price: 99,
        image: 'https://via.placeholder.com/400x300?text=Vue.js+Course',
        rating: 4.8,
        students: 245,
        likes: 156,
        category: 'Frontend',
        content: [
          'Introduction to Vue.js',
          'Template Syntax',
          'Components',
          'Data Binding',
          'Event Handling'
        ]
      },
      {
        id: 2,
        title: 'Advanced JavaScript',
        description: 'Master advanced JavaScript concepts',
        instructor: 'Mike Johnson',
        duration: '10 weeks',
        level: 'Advanced',
        price: 149,
        image: 'https://via.placeholder.com/400x300?text=JavaScript+Course',
        rating: 4.9,
        students: 189,
        likes: 98,
        category: 'Programming',
        content: [
          'ES6+ Features',
          'Async Programming',
          'Module Systems',
          'Performance Optimization',
          'Testing'
        ]
      },
      {
        id: 3,
        title: 'Responsive Web Design',
        description: 'Create websites that work on all devices',
        instructor: 'Emma Davis',
        duration: '6 weeks',
        level: 'Intermediate',
        price: 79,
        image: 'https://via.placeholder.com/400x300?text=Responsive+Design',
        rating: 4.7,
        students: 312,
        likes: 201,
        category: 'Design',
        content: [
          'CSS Grid & Flexbox',
          'Media Queries',
          'Mobile-First Design',
          'Bootstrap Framework',
          'Performance Optimization'
        ]
      },
      {
        id: 4,
        title: 'Node.js Backend Development',
        description: 'Build scalable backend applications',
        instructor: 'David Chen',
        duration: '12 weeks',
        level: 'Intermediate',
        price: 199,
        image: 'https://via.placeholder.com/400x300?text=Node.js+Course',
        rating: 4.6,
        students: 167,
        likes: 89,
        category: 'Backend',
        content: [
          'Express.js Framework',
          'Database Integration',
          'API Development',
          'Authentication',
          'Deployment'
        ]
      }
    ],
    enrolledCourses: [],
    userProgress: {}
  }),
  
  getters: {
    getCourseById: (state) => (id) => {
      return state.courses.find(course => course.id === id)
    },
    
    getCoursesByCategory: (state) => (category) => {
      return state.courses.filter(course => course.category === category)
    },
    
    isEnrolled: (state) => (courseId, userId) => {
      return state.enrolledCourses.some(enrollment => 
        enrollment.courseId === courseId && enrollment.userId === userId
      )
    }
  },
  
  actions: {
    enrollInCourse(courseId, userId) {
      const enrollment = {
        courseId,
        userId,
        enrolledAt: new Date().toISOString(),
        progress: 0
      }
      this.enrolledCourses.push(enrollment)
      this.userProgress[`${userId}-${courseId}`] = 0
    },
    
    likeCourse(courseId) {
      const course = this.getCourseById(courseId)
      if (course) {
        course.likes++
      }
    },
    
    updateProgress(courseId, userId, progress) {
      this.userProgress[`${userId}-${courseId}`] = progress
    }
  }
})