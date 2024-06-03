<script>
export default {
    data() {
        return {
            data: ''
        };
    },
    methods: {
        registerAdmin() {
            const formData = {
                email: this.data
            }

            this.$store.dispatch('setAdmin', formData);
        }
    }
}
</script>
<template>
    <div>
        <base-card class="base-card">
            <h1>Welcome</h1>
            <form @submit.prevent="registerAdmin">
                <input type="email" v-model.trim="data">
                <base-button>PROBEER</base-button>
            </form>
        </base-card>
    </div>
</template>

<style scoped>
.base-card {
    background-color: rgb(67, 67, 67);
}

h1 {
    color: orange;
    display: flex;
    justify-content: center;
}
</style>
