import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useHttp from "../hooks/http.hook";
import Alert from "./components/Alert.js";

function ResetPassword() {

  const { request, error, clearError } = useHttp();

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const reset = async (e) => {
    e.preventDefault();
    try {
      const response = await request("/partner/reset-password", "POST", { email });
      if (response) navigate("/Verification");
    } catch (err) {}
  }

  const mobile = { margin: "0px", width: "100%", minHeight: "100vh", borderRadius: "0px", boxShadow: "none", paddingTop: "70px" }

  return (
    <div className="back">
      {error ? <Alert message={error} type={"error"} clearError={clearError}/> : ""}
      <div className="form" style={(window.innerWidth > 900) ? {} : mobile}>
        <h1>Reset password</h1>
        <div className="input-container">
          <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} required/>
          <label htmlFor="input">Email</label>
        </div>
        <p style={{color: "#64748b"}}>No worries! We've got you covered. If you've forgotten your password, simply enter your email address, and we'll send you verification code to create new password.</p>
        <button style={{marginTop: "5px", marginBottom: "20px"}} onClick={(e) => reset(e)}>Reset</button>
        <div className="header" style={{ textAlign: "center", marginBottom: "5px" }}>
          <Link to="/Login" style={{ textDecoration: 'none', color: '#1e293b' }}><span style={{ marginLeft: "15px" }}>Back to Log in page</span></Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;