export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.fullname.replace(' ', '-');
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            note: data.note,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };

        await context.dispatch('setUserToCoach');

        const token = context.rootGetters.token;
        const response = await fetch(`https://goals-7455a-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`, {
            method: 'PUT',
            body: JSON.stringify(coachData)
        });
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context, payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdate)
            return;

        const response = await fetch(`https://goals-7455a-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`);
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        const coaches = []
        for (const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                note: responseData[key].note,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            };
            coaches.push(coach);
        }

        context.commit('setCoaches', coaches);
        context.commit('setFetchTimestamp');
    },
    async setUserToCoach(context) {
        const userEmail = context.rootGetters.userEmail
        const userReconstructedEmail = userEmail.replace('.', '&');
        const response = await fetch(`https://goals-7455a-default-rtdb.europe-west1.firebasedatabase.app/users/${userReconstructedEmail}.json`, {
            method: 'PATCH',
            body: JSON.stringify({ isCoach: true })
        });
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }
    }
};
