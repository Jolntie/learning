<script>
export default {
    data() {
        return {
            fullname: '',
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null
        };
    },
    computed: {
        submitButtonCaption() {
            if (this.mode === 'login') {
                return 'Login';
            } else {
                return 'Signup';
            }
        },
        switchModeButtonCaption() {
            if (this.mode === 'login') {
                return 'Signup instead';
            } else {
                return 'Login instead'
            }
        }
    },
    methods: {
        async submitForm() {
            this.formIsValid = true;
            if (this.email === '' || !this.email.includes('@') || this.password.lenght < 6) {
                this.formIsValid = false;
                return;
            }
            
            if (this.mode === 'signup' && this.fullname.split(' ').length <= 1) {
                this.formIsValid = false;
                return;
            }

            this.isLoading = true;
            try {
                await this.$store.dispatch(this.mode, {
                    email: this.email,
                    password: this.password
                });
                if (this.mode === 'signup')
                    await this.$store.dispatch('setUser', {
                        fullname: this.fullname,
                        email: this.email
                    });

                const redirectUrl = `/${(this.$route.query.redirect || 'coaches')}`;
                this.$router.replace(redirectUrl);
            } catch (error) {
                this.error = error || 'Failed to authenticate.';
            }

            this.isLoading = false;
        },
        switchAutMode() {
            if (this.mode === 'login') {
                this.mode = 'signup';
            } else {
                this.mode = 'login';
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
        <base-card>
            <form @submit.prevent="submitForm">
                <div class="form-control" v-if="mode === 'signup'">
                    <label for="fullname">Fullname</label>
                    <input type="fullname" id="fullname" v-model.trim="fullname" placeholder="John Doe">
                </div>
                <div class="form-control">
                    <label for="email">E-Mail</label>
                    <input type="email" id="email" v-model.trim="email" placeholder="johndoe@gmail.com">
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model.trim="password" placeholder="Welkom123!">
                </div>
                <p v-if="!formIsValid">Please enter a valid email and password.</p>
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
