<template>
  <component 
    :is="tag"
    :to="to"
    :href="href"
    :type="type"
    :disabled="disabled"
    :class="[buttonClasses, customClass]"
    @click="handleClick"
    v-bind="$attrs"
  >
    <span class="btn-content">
      <i v-if="icon" :class="iconClasses"></i>
      <span v-if="$slots.default" class="btn-text">
        <slot></slot>
      </span>
      <i v-if="loading" class="bi bi-arrow-repeat spin ms-2"></i>
    </span>
    <span class="btn-ripple" ref="ripple"></span>
  </component>
</template>

<script>
export default {
  name: 'ModernButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outline', 'text', 'fab'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    icon: String,
    loading: Boolean,
    disabled: Boolean,
    to: [String, Object],
    href: String,
    type: {
      type: String,
      default: 'button'
    },
    ripple: {
      type: Boolean,
      default: true
    },
    customClass: String,
  },
  computed: {
    tag() {
      if (this.to) return 'router-link'
      if (this.href) return 'a'
      return 'button'
    },
    buttonClasses() {
      return [
        'btn-modern-component',
        `btn-${this.variant}`,
        `btn-${this.size}`,
        {
          'btn-loading': this.loading,
          'btn-disabled': this.disabled,
          'btn-icon-only': this.icon && !this.$slots.default,
          'btn-with-ripple': this.ripple
        }
      ]
    },
    iconClasses() {
      return [
        this.icon,
        {
          'me-2': this.$slots.default,
          'spin': this.loading && this.icon
        }
      ]
    }
  },
  methods: {
    handleClick(event) {
      if (this.disabled || this.loading) {
        event.preventDefault()
        return
      }
      
      if (this.ripple) {
        this.createRipple(event)
      }
      
      this.$emit('click', event)
    },
    createRipple(event) {
      const button = event.currentTarget
      const ripple = this.$refs.ripple
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2
      
      ripple.style.width = ripple.style.height = size + 'px'
      ripple.style.left = x + 'px'
      ripple.style.top = y + 'px'
      ripple.classList.add('ripple-animation')
      
      setTimeout(() => {
        ripple.classList.remove('ripple-animation')
      }, 600)
    }
  }
}
</script>

<style scoped>
.btn-modern-component {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--md-radius-xl);
  font-family: var(--md-font-display);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--md-motion-medium);
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  vertical-align: middle;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.btn-text {
  transition: transform var(--md-motion-quick);
}

.btn-ripple {
  position: absolute;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.3;
  pointer-events: none;
  transform: scale(0);
}

.ripple-animation {
  animation: ripple-effect 0.6s ease-out;
}

@keyframes ripple-effect {
  0% {
    transform: scale(0);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

/* Size variants */
.btn-small {
  padding: 8px 16px;
  font-size: 12px;
  min-height: 36px;
}

.btn-medium {
  padding: 12px 24px;
  font-size: 14px;
  min-height: 48px;
}

.btn-large {
  padding: 16px 32px;
  font-size: 16px;
  min-height: 56px;
}

/* Variant styles */
.btn-primary {
  background: linear-gradient(135deg, var(--md-primary) 0%, #8b5cf6 100%);
  color: var(--md-on-primary);
  box-shadow: var(--md-elevation-2);
}

.btn-primary:hover {
  box-shadow: var(--md-elevation-3);
  transform: translateY(-2px);
  background: linear-gradient(135deg, #7c3aed 0%, var(--md-primary) 100%);
}

.btn-secondary {
  background: linear-gradient(135deg, var(--md-secondary) 0%, #64748b 100%);
  color: var(--md-on-secondary);
  box-shadow: var(--md-elevation-1);
}

.btn-secondary:hover {
  box-shadow: var(--md-elevation-2);
  transform: translateY(-1px);
}

.btn-outline {
  background: transparent;
  color: var(--md-primary);
  border: 2px solid var(--md-primary);
  box-shadow: none;
}

.btn-outline:hover {
  background: var(--md-primary);
  color: var(--md-on-primary);
  transform: translateY(-1px);
  box-shadow: var(--md-elevation-2);
}

.btn-text {
  background: transparent;
  color: var(--md-primary);
  box-shadow: none;
  padding: 8px 16px;
}

.btn-text:hover {
  background: var(--md-primary-container);
  color: var(--md-on-primary-container);
}

.btn-fab {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--md-primary) 0%, #8b5cf6 100%);
  color: var(--md-on-primary);
  box-shadow: var(--md-elevation-3);
  padding: 0;
  min-height: auto;
}

.btn-fab:hover {
  box-shadow: var(--md-elevation-4);
  transform: translateY(-3px) scale(1.05);
}

/* Icon only button */
.btn-icon-only {
  aspect-ratio: 1;
  padding: 12px;
}

/* Loading state */
.btn-loading {
  pointer-events: none;
  opacity: 0.7;
}

.btn-loading .btn-text {
  transform: translateX(-8px);
}

/* Disabled state */
.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Spin animation for loading icons */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spin {
  animation: spin 1s linear infinite;
}

/* Focus states */
.btn-modern-component:focus-visible {
  outline: 2px solid var(--md-primary);
  outline-offset: 2px;
}

/* Active state */
.btn-modern-component:active {
  transform: translateY(0) scale(0.98);
}

.btn-hero {
  color: #ffffff !important; /* Normal state */
  background: linear-gradient(135deg, var(--md-primary) 0%, #8b5cf6 0%);
  box-shadow: var(--md-elevation-2);
  
}

.btn-hero:hover {
  box-shadow: var(--md-elevation-3);
  transform: translateY(-2px);
  background: linear-gradient(135deg, #7c3aed 0%, var(--md-primary) 100%);
  color: #f1f5f9 !important; /* Hover state */
}
</style>