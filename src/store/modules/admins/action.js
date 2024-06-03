export default {
    async updateAdmin(context, data) {
        const newRequest = {
            isAdmin: data.isAdmin,
        };
        const token = context.rootGetters.token;
        const userReconstructedEmail = data.email.replace(/[@.]/g, '-');

        const response = await fetch(`https://goals-7455a-default-rtdb.europe-west1.firebasedatabase.app/admins/${userReconstructedEmail}.json?auth=${token}`, {
            method: 'PUT',
            body: JSON.stringify(newRequest)
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
        }
    },
    async isAdmin(context, data) {
        const userReconstructedEmail = data.email.replace(/[@.]/g, '-');
        const response = await fetch(`https://goals-7455a-default-rtdb.europe-west1.firebasedatabase.app/admins/${userReconstructedEmail}.json`);
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }
        if (responseData !== null)
            context.commit('isAdmin', responseData.isAdmin)
    }
}