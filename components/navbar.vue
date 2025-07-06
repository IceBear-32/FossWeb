<template>
  <header class="navbar">
    <nav class="navbar-menu">
      <button class="menu-toggle" @click="toggleMenu">
        <i class="bi bi-list"></i>
      </button>
      <ul :class="{ open: menuOpen }">
        <li><a href="/">Home</a></li>
        <li><a href="/events">Events</a></li>
        <li><a href="/projects">Projects</a></li>
        <li><a href="/join">Join FOSS</a></li>
      </ul>
    </nav>
  </header>
</template>
<script setup>
import { ref } from 'vue'
const menuOpen = ref(false)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>
<style scoped>
* {
  margin: 0;
  color: var(--color-text-secondary-dark);
}

.navbar {
  border-bottom: 1px solid var(--color-divider);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: .5px;
  padding: 2rem 200px; /* generous vertical, wide horizontal */
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--color-text-secondary-dark);
}

.navbar-menu ul {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.navbar-menu a {
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  transition: background-color 0.3s, color 0.3s;
}

.navbar-menu a:hover {
  color: var(--color-text-primary);
  background-color: var(--color-counter-secondary);
}

@media (max-width: 900px) {
  .navbar {
    padding: 1rem 24px;
    justify-content: flex-end;
    z-index: 2;
    width: 100%;
    box-sizing: border-box;
  }

  .menu-toggle {
    display: block;
  }

  .navbar-menu ul {
    flex-direction: column;
    position: absolute;
    top: 100%;
    right: 24px;
    background: var(--color-primary);
    border: 1px solid var(--color-border-primary);
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    margin-top: 0.5rem;
    opacity: 0;
    gap: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    min-width: 160px;
    padding: 1rem;
    justify-content: center;
  }

  .navbar-menu ul.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .navbar-menu a {
    display: block;
    padding: 12px 16px;
    text-align: center;
  }

  .navbar-menu ul, .navbar-menu li {
    flex: none;
  }

  .navbar-menu a:hover {
    background-color: var(--color-counter-secondary);
    color: var(--color-text-primary);
  }
  .navbar-menu ul li + li {
    border-top: 1px solid var(--color-divider);
    }
    .navbar-menu ul li {
        justify-self: center;
        width: 100%;
    }
}
</style>