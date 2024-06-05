export default {
    async contactCoach(context, payload) {
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        };
        
        const response = await fetch(`https://goals-7455a-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
        }

        newRequest.id = responseData.name;
        newRequest.coachId = payload.coachId;

        context.commit('addRequest', newRequest)
    },
    async fetchRequests(context) {
        const coachName = context.rootGetters.fullname.replace(' ', '-');
        const token = context.rootGetters.token;
        const response = await fetch(`https://goals-7455a-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachName}.json?auth=${token}`);
        const responseData = await response.json()

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch requests.');
            throw error;
        }

        const requests = [];
        console.log(responseData)
        for (const key in responseData) {
            const request = {
                id: key,
                coachId: coachName,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            };
            requests.push(request);
        }

        context.commit('setRequests', requests);
    }
};