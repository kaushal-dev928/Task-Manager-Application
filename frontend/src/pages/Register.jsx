import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Register() {

 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");
 const navigate = useNavigate();

 const handleSubmit = async (e)=>{
  e.preventDefault();

  try{

   await api.post("/auth/register",{ email,password });

   alert("Registration successful");

   navigate("/");

  }catch(err){
   alert("Registration failed");
  }

 };

 return(

  <div className="flex justify-center items-center h-screen bg-gray-100">

   <form
    onSubmit={handleSubmit}
    className="bg-white p-6 rounded shadow-md w-96"
   >

    <h2 className="text-xl font-bold mb-4 text-center">
     Register
    </h2>

    <input
     type="email"
     placeholder="Email"
     className="border p-2 w-full mb-3"
     onChange={(e)=>setEmail(e.target.value)}
    />

    <input
     type="password"
     placeholder="Password"
     className="border p-2 w-full mb-4"
     onChange={(e)=>setPassword(e.target.value)}
    />

    <button className="bg-blue-500 text-white w-full py-2 rounded">
     Register
    </button>

    <p className="text-center mt-4 text-sm">
     Already have an account?{" "}
     <Link to="/" className="text-blue-500">
      Login
     </Link>
    </p>

   </form>

  </div>

 );
}

export default Register;