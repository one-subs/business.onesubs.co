import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useHttp from "../hooks/http.hook";
import Alert from "./components/Alert.js";

function CreateAccount() {

  const { request, error, clearError } = useHttp();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  const create = async (e) => {
    e.preventDefault();
    try {
      const response = await request("/partner/registration", "POST", { email, name, website, description });
      if (response) navigate("/Verification");
    } catch (err) {}
  }

  const mobile = { margin: "0px", width: "100%", minHeight: "100vh", borderRadius: "0px", boxShadow: "none", paddingTop: "70px" }

  return (
    <div className="back">
      {error ? <Alert message={error} type={"error"} clearError={clearError}/> : ""}
      <div className="form" style={(window.innerWidth > 900) ? { marginTop: '80px', marginBottom: '80px' } : mobile}>
        <h1>Create Business account</h1>
        <div className="input-container">
          <input type="text" name="email" onChange={(e) => {setEmail(e.target.value)}} required/>
          <label htmlFor="input">Email*</label>
        </div>
        <div className="input-container">
          <input type="text" name="name" onChange={(e) => {setName(e.target.value)}} required/>
          <label htmlFor="input">Service name*</label>
        </div>
        <div className="input-container">
          <input type="text" name="website" onChange={(e) => {setWebsite(e.target.value)}} required/>
          <label htmlFor="input">Service website*</label>
        </div>
        <div className="textarea-container">
            <textarea id="textarea" value={description} onChange={(e) => setDescription(e.target.value)} required/>
            <label htmlFor="textarea">Describe your service*</label>
        </div>
        <button onClick={(e) => create(e)}>Create</button>
        <div className="header" style={{ textAlign: "center", marginBottom: "5px" }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#1e293b' }}><span style={{ marginLeft: "15px" }}>I have a Business Account</span></Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;