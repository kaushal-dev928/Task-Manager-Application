import { useState } from "react";
import api from "../api/axios";

function TaskForm({refresh}){

 const [title,setTitle] = useState("");
 const [description,setDescription] = useState("");

 const handleSubmit = async(e)=>{
  e.preventDefault();

  if(!title || !description){
   alert("Please fill all fields");
   return;
  }

  await api.post("/tasks",{title,description});

  setTitle("");
  setDescription("");

  refresh();
 };

 return(

  <form
   onSubmit={handleSubmit}
   className="bg-white p-4 shadow rounded mb-6 flex gap-2"
  >

   <input
    value={title}
    placeholder="Task title"
    className="border p-2 flex-1"
    onChange={(e)=>setTitle(e.target.value)}
   />

   <input
    value={description}
    placeholder="Task description"
    className="border p-2 flex-1"
    onChange={(e)=>setDescription(e.target.value)}
   />

   <button
    className="bg-blue-500 text-white px-4 py-2 rounded"
   >
    Add Task
   </button>

  </form>

 );
}

export default TaskForm;