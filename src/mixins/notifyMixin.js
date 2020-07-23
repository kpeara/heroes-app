export const notifyMixin = {
    data: () => ({
        error: false,
        success: false,
        errorMessage: "",
        successMessage: ""
    }),
    methods: {
        errorNotify(err) {
            this.errorMessage = err.message;
            this.error = true;
            setTimeout(() => (this.error = false), 5000);
        },
        successNotify(msg) {
            this.successMessage = msg;
            this.success = true;
            setTimeout(() => (this.success = false), 3000);
        },
    }
}