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
        return  `, ${emailParts[0]}`;
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
      <div>
        <h1><router-link to="/">Find a Coach</router-link></h1>
      </div>
      <div style="justify-content: center;">
        <h1>Welcome{{ partialEmail }}</h1>
      </div>
      <div style="justify-content: right;">
        <ul>
          <li v-if="isAdmin"><router-link to="/admin">Admin</router-link></li>
          <li style="min-width: 8.4rem;"><router-link to="/coaches">All Coaches</router-link></li>
          <li v-if="isCoach"><router-link to="/requests">Requests</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/auth">Login</router-link></li>
          <li v-else><base-button @click="logout">Logout</base-button></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped>
div {
  width: 34%;
  display: flex;
  align-content: center;
}

header {
  width: 100%;
  height: 5rem;
  background: linear-gradient(to right, #3801aff4, #55008df4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}

header a {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid white;
  border-radius: 0.5rem;
}

h1 {
  margin: 0;
  color: rgb(171, 171, 171);
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

nav {
  width: 90%;
  margin: auto;
  display: flex;
  align-items: center;
}

ul {
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
