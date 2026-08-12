<script setup>
</script>

<template>
  <header class="topbar">
    <div class="brand">
      <div class="logo">🎓</div>

      <div>
        <h1>Student Portal</h1>
        <p>Learn • Track • Achieve</p>
      </div>
    </div>

    <nav>
      <RouterLink to="/">🏠 Home</RouterLink>
      <RouterLink to="/courses">📚 Courses</RouterLink>
      <RouterLink to="/profile">👤 Profile</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <p>© 2026 Student Portal • Built with Vue.js</p>
  </footer>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: linear-gradient(135deg, #eef2ff, #f5f3ff, #eff6ff);
  color: #1e293b;
}

.topbar {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  padding: 20px 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 5px 20px rgba(79, 70, 229, 0.25);
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
}

.brand h1 {
  margin: 0;
  font-size: 24px;
}

.brand p {
  margin: 4px 0 0;
  opacity: 0.85;
  font-size: 13px;
}

nav {
  display: flex;
  gap: 10px;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 10px;
}

nav a:hover,
nav a.router-link-active {
  background: rgba(255, 255, 255, 0.2);
}

footer {
  text-align: center;
  padding: 20px;
  color: #64748b;
  font-size: 13px;
}

@media (max-width: 700px) {
  .topbar {
    flex-direction: column;
    gap: 20px;
  }

  nav {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>