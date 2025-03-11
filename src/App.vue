<template>
  <div class="app-container">
    <header-component />
    <main class="main-content">
      <router-view />
    </main>
    <footer-component />
  </div>
</template>

<script>
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
import FooterComponent from "@/components/layout/FooterComponent.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

#app {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

// Reset some browser defaults
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
