<script>
import TheFooter from './TheFooter.vue';

export default {
  components: {
    TheFooter
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    isAdminPage() {
      return this.$route.path.startsWith('/admin');
    },
    isCoach() {
      return this.$store.getters.isCoach;
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    partialName() {
      const fullname = this.$store.getters.fullname;
      if (fullname) {
        const firstName = fullname.split(' ');
        return ` ${firstName[0]}`;
      } else {
        return '';
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/coaches');
    }
  }
};
</script>
<template>
  <div class="header-footer">
    <div class="header">
      <header>
        <nav>
          <div>
            <h1><router-link to="/">Find a Coach</router-link></h1>
          </div>
          <div style="justify-content: center;">
            <h1>Welcome{{ partialName }}</h1>
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
      <transition name="route" mode="out-in">
        <header class="admin" v-if="isAdmin && isAdminPage">
          <nav>
            <div></div>
            <ul>
              <li><router-link to="/admin/all">All Admins</router-link></li>
            </ul>
          </nav>
        </header>
      </transition>
    </div>
    <slot></slot>
    
    <the-footer></the-footer>
  </div>
</template>

<style scoped>
.header-footer {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header div {
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

.admin {
  height: 3rem;
  position: sticky;
  top: 5rem;
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
  justify-content: center;
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

.route-leave-to,
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-leave-from,
.route-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
