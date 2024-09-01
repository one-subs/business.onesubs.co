import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import Alert from "./components/Alert.js";

function Login() {

  const auth = useContext(AuthContext);
  const { request, error, clearError } = useHttp();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await request("/partner/login", "POST", { email, password });
      if (response) {
        auth.login(response.token, response.userId);
        navigate("/");
      }
    } catch (err) {}
  }

  const mobile = { margin: "0px", width: "100%", minHeight: "100vh", borderRadius: "0px", boxShadow: "none", paddingTop: "70px" }

  return (
    <div className="back">
      {error ? <Alert message={error} type={"error"} clearError={clearError}/> : ""}
      <div className="form" style={(window.innerWidth > 900) ? {} : mobile}>
        <h1>Log in</h1>
        <div className="input-container">
          <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} required/>
          <label htmlFor="input">Email</label>
        </div>
        <div className="input-container">
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required/>
          <label htmlFor="input">Password</label>
        </div>
        <div className="header">
          <Link to="/reset-password" style={{ textDecoration: 'none', color: '#1e293b' }}><span>Forgot password?</span></Link>
        </div>
        <button onClick={(e) => login(e)}>Sign in</button>
        <div className="header" style={{ textAlign: "center", marginBottom: "5px" }}>
          <Link to="/create-account" style={{ textDecoration: 'none', color: '#1e293b' }}><span style={{ marginLeft: "15px" }}>Create Business Account</span></Link>
        </div>
      </div>
    </div>
  );
}

export default Login;