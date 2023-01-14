import { useState } from "react";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    // id, pw 입력값
    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount){
                // create Account
                data = await fetch(`http://localhost:8000/signup/${email}/${password}`);
            } else {
                // log in
                data = await fetch(`http://localhost:8000/login/${email}/${password}`);
                sessionStorage.setItem("Id", email);
                sessionStorage.setItem("Password", password);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input 
                    name="email"
                    type="email" 
                    placehoder="Email" 
                    required 
                    value={email}
                    onChange={onChange}
                    className="authInput"
                />
                <input 
                    name="password"
                    type="password" 
                    placehoder="password" 
                    required
                    value={password}
                    onChange={onChange}
                    className="authInput"
                />
                <input type="submit" 
                    value={"newAccount" ? "Create Account" : "Log In"} 
                    className="authInput authSubmit"
                />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "Sign in" : "Create Account"}
            </span>
        </>
    );
};

export default AuthForm;