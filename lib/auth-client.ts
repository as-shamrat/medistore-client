import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    // baseURL: "https://medi-store-phi.vercel.app",
    baseURL: typeof window !== "undefined" ? window.location.origin : "",
    fetchOptions: {
        credentials: "include", // THIS IS THE KEY
    },
})