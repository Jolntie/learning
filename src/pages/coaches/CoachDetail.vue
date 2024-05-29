<script>
export default {
    props: ['id'],
    data() {
        return {
            selectedCoach: null,
        };
    },
    computed: {
        fullName() {
            return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
        },
        note() {
            return this.selectedCoach.note;
        },
        rate() {
            return this.selectedCoach.hourlyRate;
        },
        areas() {
            return this.selectedCoach.areas;
        },
        description() {
            return this.selectedCoach.description;
        },
        contactLink() {
            if (!this.$route.path.includes('/contact'))
                return this.$route.path + '/contact';
            return this.$route.path;
        }
    },
    created() {
        this.selectedCoach = this.$store.getters['coaches/coaches'].find(coach => coach.id === this.id);
        this.isContactClicked = true;
    }
};
</script>
<template>
    <div>
        <section>
            <base-card>
                <h2>{{ fullName }} {{ note }}</h2>
                <div class="rate-and-badges">
                    <h3>€{{ rate }}/hour</h3>
                    <div>
                        <base-badge v-for="area in selectedCoach.areas" :key="area" :type="area"></base-badge>
                    </div>
                </div>
            </base-card>
        </section>
        <section>
            <base-card>
                <h2>Description</h2>
                <p>{{ description }}</p>
            </base-card>
        </section>
        <section>
            <base-card>
                <header>
                    <h2>interested? Reach out now!</h2>
                    <base-button link :to="contactLink">Contact</base-button>
                </header>
                <router-view></router-view>
            </base-card>
        </section>
    </div>
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.rate-and-badges {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
