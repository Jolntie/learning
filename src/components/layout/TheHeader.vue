<script>
export default {
  computed: {
    isAdmin() {
      return this.$store.getters['coaches/isAdmin']
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    partialEmail() {
      const email = this.$store.getters.userEmail;
      if (email) {
        const emailParts = email.split('@');
        return emailParts[0];
      } else {
        return '';
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.replace('/coaches');
    }
  }
};
</script>
<template>
  <header>
    <nav>
      <h1><router-link to="/">Find a Coach</router-link></h1>
      <h1>{{ partialEmail }}</h1>
      <ul>
        <li v-if="isAdmin"><router-link to="/secret">Secret</router-link></li>
        <li><router-link to="/coaches">All Coaches</router-link></li>
        <li v-if="isCoach"><router-link to="/requests">Requests</router-link></li>
        <li v-if="!isLoggedIn"><router-link to="/auth">Login</router-link></li>
        <li v-else><base-button @click="logout">Logout</base-button></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008df4;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
  color: gray;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
