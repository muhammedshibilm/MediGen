export const checkAuth = async () => {
    try {
        const res = await fetch("/api/auth/login", {
            method: "GET",
        });

        return res.ok? true: false;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return false;
    }
}