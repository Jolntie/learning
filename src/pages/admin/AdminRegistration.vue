<script>
export default {
    data() {
        return {
            email: '',
            formIsValid: true,
            mode: 'setAdmin',
            isLoading: false,
            error: null
        };
    },
    computed: {
        submitButtonCaption() {
            if (this.mode === 'setAdmin') {
                return 'Set admin';
            } else {
                return 'Remove admin';
            }
        },
        switchModeButtonCaption() {
            if (this.mode === 'setAdmin') {
                return 'Remove admin instead';
            } else {
                return 'Set admin instead';
            }
        }
    },
    methods: {
        async submitForm() {
            this.formIsValid = true;
            if (this.email === '' || !this.email.includes('@')) {
                this.formIsValid = false;
                return;
            }

            this.isLoading = true;
            const isAdmin = this.mode === 'setAdmin'
            try {
                await this.$store.dispatch('updateAdmin', {
                    email: this.email,
                    isAdmin: isAdmin
                });
                this.email = '';
            } catch (error) {
                this.error = error || 'Failed to authenticate.';
            }

            this.isLoading = false;
        },
        switchAutMode() {
            if (this.mode === 'setAdmin') {
                this.mode = 'removeAdmin';
            } else {
                this.mode = 'setAdmin';
            }
        },
        handleError() {
            this.error = null;
        }
    }
};
</script>
<template>
    <div>
        <div>
            <base-dialog :show="!!error" title="An error occurred" @close="handleError">
                <p>{{ error }}</p>
            </base-dialog>
            <base-dialog :show="isLoading" title="Authenticating..." fixed>
                <base-spinner></base-spinner>
            </base-dialog>
        </div>
        <base-card class="base-card">
        <h2>Set or remove an admin.</h2>
            <form @submit.prevent="submitForm">
                <div class="form-control">
                    <label for="email">E-Mail</label>
                    <input type="text" id="email" v-model.trim="email" placeholder="johndoe@gmail.com">
                </div>
                <p style="color: red;" v-if="!formIsValid">Please enter a valid email.</p>
                <base-button>{{ submitButtonCaption }}</base-button>
                <base-button type="button" mode="flat" @click="switchAutMode">{{ switchModeButtonCaption
                    }}</base-button>
            </form>
        </base-card>
    </div>
</template>

<style scoped>
form {
    margin: 1rem;
    padding: 1rem;
}

.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
}

input,
textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
}

input:focus,
textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
}
</style>

