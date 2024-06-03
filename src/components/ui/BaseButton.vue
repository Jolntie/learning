<script>
export default {
    props: {
        mode: {
            type: String,
            required: false,
            default: null
        },
        link: {
            type: Boolean,
            required: false,
            default: false
        },
        to: {
            type: String,
            required: false,
            default: '/'
        }

    }
};
</script>
<template>
    <button v-if="!link" :class="mode">
        <slot></slot>
    </button>
    <router-link v-else :to="to" :class="mode">
        <slot></slot>
    </router-link>
</template>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #55008df4;
  border: 1px solid #55008df4;
  color: white;
  cursor: pointer;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #3b0062f4;
  border-color: #3b0062f4;
}

.flat {
  background-color: transparent;
  color: #55008df4;
  border: none;
}

.flat:hover {
  background-color: #3b0062f4;
}

.outline {
  background-color: transparent;
  border-color: #3b0062f4;
  color: #3b0062f4;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>
