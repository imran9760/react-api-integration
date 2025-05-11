import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserRequest } from "./UserRequest";
import { createUser } from "./ApiEndpoints";

const AddUser=()=>{
  let token:string|null = ''; // Replace with your actual token
 
  token=localStorage.getItem("token")
 
  const navigate=useNavigate()

   const[userData,setUserData] =useState<UserRequest>({
    username: "",
    password: "",
    enabled: true,
    role: ""
   });

   const handleSubmit=async (e:React.ChangeEvent<HTMLInputElement>)=>{

      try{
         e.preventDefault()
         const res = await createUser(userData);
         setUserData(res.data);
         console.log(res)
         navigate("/userDetails")

      }
      catch(error)
      {
         console.log(error)
      }

   }
 

   const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      
      setUserData({ ...userData, [e.target.name]: e.target.value });

   }

   return (
      <>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Username :
              <input type="text" name="username" value={userData.username} onChange={handleChange}/>
            </label>
          </div>
          <div>
            <label>
              Password :
              <input type="text" name="password" value={userData.password} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Role :
              <input type="role" name="role" value={userData.role} onChange={handleChange} />
            </label>
          </div>
        
          <div>
            <button className="btn btn-primary btn-lg btnplacement" type="submit">Add User</button>
          </div>
        </form>
      </>
    )
   }

 

export default AddUser