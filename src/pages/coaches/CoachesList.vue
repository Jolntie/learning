<script>
import CoachItem from '../../components/coaches/CoachItem.vue'
import CoachFilter from '../../components/coaches/CoachFilter.vue'

export default {
    components: {
        CoachItem,
        CoachFilter
    },
    data() {
        return {
            isLoading: false,
            error: null,
            activeFilters: {
                frontend: true,
                backend: true,
                career: true,
                other: true
            }
        };
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isAuthenticated;
        },
        filteredCoaches() {
            const coaches = this.$store.getters['coaches/coaches'];
            return coaches.filter(coach => {
                if (this.activeFilters.frontend && coach.areas.includes('frontend'))
                    return true;
                if (this.activeFilters.backend && coach.areas.includes('backend'))
                    return true;
                if (this.activeFilters.career && coach.areas.includes('career'))
                    return true;
                if (this.activeFilters.other
                    && !coach.areas.includes('frontend')
                    && !coach.areas.includes('backend')
                    && !coach.areas.includes('career'))
                    return true;

                if (this.activeFilters.inputFilter 
                && (coach.firstName + ' ' + coach.lastName).toLowerCase().includes(this.activeFilters.inputFilter.toLowerCase()))
                    return true;

                return false;
            });
        },
        hasCoaches() {
            return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
        },
        isCoach() {
            return this.$store.getters.isCoach;
        }
    },
    created() {
        this.loadCoaches();
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },
        async loadCoaches(refresh = false) {
            this.isLoading = true;
            try {
                await this.$store.dispatch('coaches/loadCoaches', { forceRefresh: refresh });
            } catch (error) {
                this.error = error.message || 'Something went wrong!';
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
        }
    }
};
</script>
<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <coach-filter @change-filter="setFilters"></coach-filter>
        </section>
        <section>
            <base-card :style="{ width: filteredCoaches.length >= 6 ? '79rem' : '' }">
                <div class="controls">
                    <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
                    <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to register as
                        coach</base-button>
                    <base-button v-else-if="!isCoach && !isLoading" link to="/register">Register as Coach</base-button>
                </div>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasCoaches">
                    <coach-item style="width: 38rem;" v-for="coach in filteredCoaches" :key="coach.id" :id="coach.id"
                        :first-name="coach.firstName" :last-name="coach.lastName" :note="coach.note"
                        :rate="coach.hourlyRate" :areas="coach.areas">
                    </coach-item>
                </ul>
                <h3 v-else>No coaches found.</h3>
            </base-card>
        </section>
    </div>
</template>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>
