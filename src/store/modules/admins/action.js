export default {
    async setAdmin(context, data) {
        const newRequest = {
            isAdmin: true,
        };
        const token = context.rootGetters.token;
        const dbBranchName = data.email.replace(/[@.]/g, '-');

        const response = await fetch(`https://goals-7455a-default-rtdb.europe-west1.firebasedatabase.app/admins/${dbBranchName}.json?auth=${token}`, {
            method: 'PUT',
            body: JSON.stringify(newRequest)
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
        }

        context.commit('addAdmin', newRequest)
    },
    async isAdmin(context, data) {
        const dbBranchName = data.email.replace(/[@.]/g, '-');
        const response = await fetch(`https://goals-7455a-default-rtdb.europe-west1.firebasedatabase.app/admins/${dbBranchName}.json`);
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }
        if (responseData !== null)
            context.commit('isAdmin', responseData.isAdmin)
    }
}