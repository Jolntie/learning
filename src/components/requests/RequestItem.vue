<script>
export default {
  props: ['id', 'email', 'message'],
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    emailLink() {
      return 'mailto:' + this.email;
    }
  },
  methods: {
    async deleteRequest() {
      this.isLoading = true;

      const fullname = this.$store.getters.fullname;
      const reconstructedFullname = fullname.replace(' ', '-');

      await this.$store.dispatch('requests/deleteRequest', {
        coachId: reconstructedFullname,
        requestId: this.id
      });

      this.$emit('reload-requests');
    }
  }
}
</script>
<template>
  <li :class="{ 'is-loading' : isLoading }">
    <div>
      <a :href="emailLink">{{ email }}</a>
      <p>{{ message }}</p>
    </div>
    <base-button mode="flat" @click="deleteRequest" :disabled="isLoading">Delete</base-button>
  </li>
</template>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li .content {
  flex: 1;
  margin-right: 10px;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 0.5rem 0 0 0;
}

.is-loading {
  opacity: 0.5;
  pointer-events: none;
}

.is-loading a,
.is-loading p {
  pointer-events: none;
}

.base-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
