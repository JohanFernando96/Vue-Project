<!-- src/views/News.vue -->
<template>
  <div class="news">
    <h1 class="mb-4">Latest News</h1>
    
    <!-- Search and Filter Controls -->
    <div class="row mb-4">
      <div class="col-md-8 mb-3">
        <div class="input-group">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Search news..." 
            v-model="searchQuery"
          >
        </div>
      </div>
      <div class="col-md-4">
        <select class="form-select" v-model="categoryFilter">
          <option value="">All Categories</option>
          <option 
            v-for="category in categories" 
            :key="category" 
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
    </div>
    
    <div class="row mb-3">
      <div class="col-md-4 mb-3">
        <div class="input-group">
          <span class="input-group-text">From</span>
          <input type="date" class="form-control" v-model="dateFrom">
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="input-group">
          <span class="input-group-text">To</span>
          <input type="date" class="form-control" v-model="dateTo">
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <button class="btn btn-primary w-100" @click="resetFilters">Reset Filters</button>
      </div>
    </div>
    
    <!-- News List -->
    <div class="row">
      <div v-if="paginatedNews.length === 0" class="col-12">
        <div class="alert alert-info">
          No news items found matching your criteria.
        </div>
      </div>
      
      <div v-for="newsItem in paginatedNews" :key="newsItem.id" class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span class="badge bg-primary">{{ newsItem.category }}</span>
            <small>{{ formatDate(newsItem.date) }}</small>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ newsItem.title }}</h5>
            <p class="card-text">{{ newsItem.content }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Pagination -->
    <div class="row mt-4">
      <div class="col-12">
        <nav aria-label="News pagination">
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
            <li class="page-item" :class="{ disabled: currentPage === totalPages || totalPages === 0 }">
              <a class="page-link" href="#" @click.prevent="currentPage++">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import newsData from '../data/news.json';

export default {
  name: 'NewsView',
  data() {
    return {
      newsItems: [],
      searchQuery: '',
      categoryFilter: '',
      dateFrom: '',
      dateTo: '',
      currentPage: 1,
      itemsPerPage: 6
    };
  },
  computed: {
    // Get unique categories from news items
    categories() {
      const categories = this.newsItems.map(item => item.category);
      return [...new Set(categories)];
    },
    
    // Filter news items based on search and filter criteria
    filteredNews() {
      return this.newsItems.filter(item => {
        // Text search
        const searchMatch = !this.searchQuery || 
          item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(this.searchQuery.toLowerCase());
        
        // Category filter
        const categoryMatch = !this.categoryFilter || item.category === this.categoryFilter;
        
        // Date filter
        let dateMatch = true;
        if (this.dateFrom) {
          dateMatch = dateMatch && item.date >= this.dateFrom;
        }
        if (this.dateTo) {
          dateMatch = dateMatch && item.date <= this.dateTo;
        }
        
        return searchMatch && categoryMatch && dateMatch;
      });
    },
    
    // Get paginated news items
    paginatedNews() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredNews.slice(start, end);
    },
    
    // Calculate total pages
    totalPages() {
      return Math.ceil(this.filteredNews.length / this.itemsPerPage) || 1;
    }
  },
  methods: {
    // Format date for display
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    
    // Reset all filters
    resetFilters() {
      this.searchQuery = '';
      this.categoryFilter = '';
      this.dateFrom = '';
      this.dateTo = '';
      this.currentPage = 1;
    }
  },
  mounted() {
    // Load news data
    this.newsItems = newsData;
  },
  watch: {
    // Reset to first page when filters change
    filteredNews() {
      this.currentPage = 1;
    }
  }
}
</script>

<style scoped>
.card {
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

@media (max-width: 767.98px) {
  h1 {
    font-size: 1.8rem;
  }
}
</style>