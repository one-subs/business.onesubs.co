import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/http.hook.js";
import Alert from "./components/Alert.js";

function Verification() {

  const { request, error, clearError } = useHttp();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [verification, setVerification] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const timeoutRef = useRef(null);

  const verify = async (e) => {
    e.preventDefault();
    try {
      const response = await request("/partner/verification", "POST", { email, verification, password });
      if (response) navigate("/Login");
    } catch (err) {}
  }

  const mobile = { margin: "0px", width: "100%", minHeight: "100vh", borderRadius: "0px", boxShadow: "none", paddingTop: "70px" }

  return (
    <div className="back">
      {error ? <Alert message={error} type={"error"} clearError={clearError}/> : ""}
      <div className="form" style={(window.innerWidth > 900) ? {} : mobile}>
        <h1>Verification</h1>
        <div className="input-container">
          <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} required/>
          <label htmlFor="input">Email</label>
        </div>
        <div className="input-container">
          <input type="number" name="code" onChange={(e) => setVerification(e.target.value)} required/>
          <label htmlFor="input">Verification code</label>
        </div>
        <div className="input-container">
          <input type={showPassword ? "text" : "password"} name="password" onChange={(e) => {
              setPassword(e.target.value);
              setShowPassword(true);
              clearTimeout(timeoutRef.current);
              timeoutRef.current = setTimeout(() => setShowPassword(false), 1500);
            }} required/>
          <label htmlFor="input">Create password</label>
        </div>
        <button onClick={(e) => verify(e)}>Create</button>
      </div>
    </div>
  );
}

export default Verification;