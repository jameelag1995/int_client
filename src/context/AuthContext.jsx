import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext({
    login: () => {},
    register: () => {},
    logout: () => {},
    logoutAll: () => {},
    accessToken: "",
    setAccessToken: () => {},
});
const baseURL = "http://localhost:3000/api/users/";
export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState("");
    const location = useLocation();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setAccessToken(JSON.parse(localStorage.getItem("token")));
        }
    }, [location.pathname]);
    const login = async (email, password) => {
        try {
            const result = await axios.post(baseURL + "/login", {
                email,
                password,
            });

            setAccessToken(result.data.accessToken);
            localStorage.setItem(
                "token",
                JSON.stringify(result.data.accessToken)
            );
            return result;
        } catch (error) {
            return error;
        }
    };
    const register = async (userInfo) => {
        try {
            console.log(userInfo);
            const result = await axios.post(
                "http://localhost:3000/api/users/register",
                userInfo
            );

            console.log(result);
            setAccessToken(result.data.accessToken);
            localStorage.setItem(
                "token",
                JSON.stringify(result.data.accessToken)
            );
            return result;
        } catch (error) {
            return error;
        }
    };
    const logout = async () => {
        try {
            if (accessToken) {
                await axiosUsersInstance.put(
                    baseURL + "/logout",
                    {},
                    {
                        headers: {
                            Authorization: "Bearer " + accessToken,
                        },
                    }
                );
            }
            localStorage.clear();
            setAccessToken("");
            navigate("/");
        } catch (error) {
            return error;
        }
    };

    const AuthValues = {
        login,
        register,
        logout,
        setAccessToken,
        accessToken,
    };
    return (
        <AuthContext.Provider value={AuthValues}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
