import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext = createContext();

export function AuthProvider({
    children
}) {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (data) => {

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(data)
        );

        setUser(data);
    };

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setUser(null);
    };

    const isAuthenticated = !!user;

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated
            }}
        >

            {children}

        </AuthContext.Provider>
    );
}

export function useAuth() {

    return useContext(AuthContext);
}