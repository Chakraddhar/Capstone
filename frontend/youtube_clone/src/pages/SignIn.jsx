import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isRegister ? "http://localhost:5000/api/auth/register" : "http://localhost:5000/api/auth/login";
      const body = isRegister ? { username, email, password } : { email, password };
      const res = await axios.post(url, body);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.replace("/");

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>{isRegister ? "Register" : "Sign In"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />}
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">{isRegister ? "Register" : "Sign In"}</button>
      </form>
      <p style={{cursor:"pointer", color:"blue"}} onClick={()=>setIsRegister(!isRegister)}>
        {isRegister ? "Already have an account? Sign In" : "Don't have an account? Register"}
      </p>
    </div>
  );
};

export default SignIn;
