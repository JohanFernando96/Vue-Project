<template>
  <div class="custom-dropdown" ref="dropdown">
    <button 
      class="btn btn-outline-light dropdown-toggle btn-modern user-menu-btn" 
      type="button" 
      @click="toggleDropdown"
      :class="{ 'show': isOpen }"
    >
      <div class="user-avatar">
        <i class="bi bi-person-circle"></i>
      </div>
      <span class="user-name">{{ fullName }}</span>
    </button>
    <ul 
      class="dropdown-menu dropdown-menu-end modern-dropdown" 
      :class="{ 'show': isOpen }"
      @click="handleMenuClick"
    >
      <li>
        <router-link class="dropdown-item modern-dropdown-item" to="/dashboard" @click="closeDropdown">
          <i class="bi bi-speedometer2 me-2"></i>Dashboard
        </router-link>
      </li>
      <li>
        <router-link class="dropdown-item modern-dropdown-item" to="/profile" @click="closeDropdown">
          <i class="bi bi-person me-2"></i>Profile
        </router-link>
      </li>
      <li v-if="isAdmin">
        <router-link class="dropdown-item modern-dropdown-item" to="/admin" @click="closeDropdown">
          <i class="bi bi-gear me-2"></i>Admin Panel
        </router-link>
      </li>
      <li><hr class="dropdown-divider"></li>
      <li>
        <button class="dropdown-item modern-dropdown-item logout-btn" @click="handleLogout">
          <i class="bi bi-box-arrow-right me-2"></i>Logout
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CustomDropdown',
  props: {
    fullName: String,
    isAdmin: Boolean
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    closeDropdown() {
      this.isOpen = false
    },
    handleMenuClick(event) {
      // Prevent dropdown from closing when clicking inside
      event.stopPropagation()
    },
    handleLogout() {
      this.$emit('logout')
      this.closeDropdown()
    },
    handleClickOutside(event) {
      if (!this.$refs.dropdown.contains(event.target)) {
        this.closeDropdown()
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>

<style scoped>
.custom-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
  display: none;
  min-width: 200px;
}

.dropdown-menu.show {
  display: block;
}

/* Include all your existing dropdown styles here */
.user-menu-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  min-width: 120px;
}

.user-avatar {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
}

.user-name {
  font-weight: 500;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.modern-dropdown {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--md-radius-md);
  box-shadow: var(--md-elevation-4);
  padding: 8px 0;
  margin-top: 12px;
  min-width: 200px;
}

.modern-dropdown-item {
  color: var(--md-on-surface);
  padding: 12px 20px;
  transition: all var(--md-motion-quick);
  display: flex;
  align-items: center;
  font-weight: 500;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  text-decoration: none;
}

.modern-dropdown-item:hover {
  background: linear-gradient(135deg, var(--md-primary-container), rgba(103, 80, 164, 0.1));
  color: var(--md-on-primary-container);
  transform: translateX(4px);
  border-radius: 0 var(--md-radius-md) var(--md-radius-md) 0;
}

.logout-btn:hover {
  background: linear-gradient(135deg, var(--md-error-container), rgba(186, 26, 26, 0.1));
  color: var(--md-on-error-container);
}

.dropdown-divider {
  border-color: var(--md-outline-variant);
  margin: 8px 0;
}
</style>