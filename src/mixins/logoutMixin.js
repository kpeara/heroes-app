export const logoutMixin = {
    methods: {
        logout() {
            sessionStorage.clear(); // remove token from storage
            const disableToken = { accessToken: null };
            this.$store.commit("setJWT", disableToken); // so navigation allows redirect
            this.$router.push({ name: "Login" });
        },
    }
}