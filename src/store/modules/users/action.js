export default {
    async setUser(context, data) {
        const newRequest = {
            fullname: data.fullname,
            isAdmin: false
        };
        const userReconstructedEmail = data.email.replace(/[.]/g, '&');

        const response = await fetch(`https://goals-7455a-default-rtdb.europe-west1.firebasedatabase.app/users/${userReconstructedEmail}.json`, {
            method: 'PATCH',
            body: JSON.stringify(newRequest)
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
        }

        console.log(responseData)
        context.commit('addUserData', responseData)
    }
}