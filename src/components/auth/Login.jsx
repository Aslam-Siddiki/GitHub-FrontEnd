import { useEffect, useState } from 'react';
import axios from "axios";
import { useAuth } from "../../authContext";

import { Link, useNavigate } from "react-router-dom";
import './auth.css';

import logo from "../../assets/github-mark-white.svg";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { setCurrentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e)=> {
        e.preventDefault();

        try{
            setLoading(true);
            const res = await axios
            .post("http://localhost:3002/login", {
                email:email,
                password:password
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);

            setCurrentUser(res.data.userId);
            setLoading(false);

            navigate("/", { replace: true });
        }catch(err){
            console.log("Error : ", err);
            alert("Login Failed!");
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-logo-container">
                <img className="logo-login" src={ logo } alt="Logo" />
            </div>

            <div className="login-box-wrapper">
                <div className="login-heading">
                    <h1>Sign In</h1>
                </div>
            </div>

            <div className="login-box">
                <div>
                    <label className="label">Email address</label>
                    <input 
                        autoComplete="off"
                        name="Email"
                        id="Email"
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div className="div">
                    <label className="label">Password</label>
                    <input 
                        autoComplete="off"
                        name="Password"
                        id="Password"
                        className="input"
                        type="password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>

                <button
                    variant="primary"
                    className="login-btn"
                    disabled={loading}
                    onClick={handleLogin}
                >
                    { loading ? "Loading..." : "Login"}
                </button>
            </div>

            <div className="pass-box">
                <p>
                    New to GitHub? &nbsp;
                    <Link to="/signup">Create an account</Link>
                </p>
            </div>

        </div>
    );
};

export default Login;