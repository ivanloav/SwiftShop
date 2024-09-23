import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "./chechAuth";

export const useLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    const result = await checkAuth(username, password);
    if (result.success) {
       navigate("/user/dashboard");
    } else {
        setError(result.message);
    }
    };

    return {
        username,
        password,
        setUsername,
        setPassword,
        error,
        handleLogin,
    }
}

