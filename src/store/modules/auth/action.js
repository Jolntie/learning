let timer;

export default {
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        })
    },
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        })
    },
    async auth(context, payload) {
        const mode = payload.mode;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASBeVI6JiAW8zocoxBTrKVp1g7tLAs7fg';
        if (mode === 'signup') 
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASBeVI6JiAW8zocoxBTrKVp1g7tLAs7fg';
        
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.error.message || 'Failed to authenticate.');
            throw error;
        }

        const expiresIn = +responseData.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('userEmail', responseData.email);
        localStorage.setItem('tokenExpiration', expirationDate);

        timer = setTimeout(function() {
            context.dispatch('autoLogout');
        }, expiresIn)

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            userEmail: responseData.email
        });
    },
    tryAutoLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const userEmail = localStorage.getItem('userEmail');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if (expiresIn < 0) {
            return;
        }

        setTimeout(function() {
            context.dispatch('autoLogout');
        }, expiresIn)

        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
                userEmail: userEmail
            });
        }
    },
    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout');
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);

        context.rootGetters.resetAdminValue;
        context.commit('setUser', {
            token: null,
            userId: null,
            userEmail: null
        })
    }
}