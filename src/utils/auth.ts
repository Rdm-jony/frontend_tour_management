
/* eslint-disable @typescript-eslint/no-explicit-any */
const checkAuthStatus = async () => {
    try {
        const res = await fetch(`http://localhost:5000/api/v1/user/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const data = await res.json();

        if(!res.ok){
            throw new Error("Failed to fetch authentication status.");
        }
        
        return {
            isAuthenticated: true,
            user: data.data,
        }

    } catch (err: any) {
        console.log(err)
        return{
            isAuthenticated: false,
            user: null,
        }
    }

}

export default checkAuthStatus;