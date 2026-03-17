import { useEffect, useState } from "react";
import api from "../api/axios";
import TaskForm from "../components/TaskForm";

function Dashboard() {

 const [tasks,setTasks] = useState([]);
 const [search,setSearch] = useState("");
 const [status,setStatus] = useState("");
 const [page,setPage] = useState(1);

 const fetchTasks = async ()=>{

  const res = await api.get(
   `/tasks?page=${page}&search=${search}&status=${status}`
  );

  setTasks(res.data);
 };

 useEffect(()=>{
  fetchTasks();
 },[page,search,status]);

 const deleteTask = async(id)=>{
  await api.delete(`/tasks/${id}`);
  fetchTasks();
 };

 const toggleStatus = async(task)=>{
  await api.put(`/tasks/${task.id}`,{
   title:task.title,
   description:task.description,
   status:!task.status
  });

  fetchTasks();
 };

 const logout = ()=>{
  document.cookie="token=; Max-Age=0";
  window.location="/";
 };

 return(

  <div className="p-10 bg-gray-100 min-h-screen">

   <div className="flex justify-between items-center mb-6">

 <h1 className="text-2xl font-bold">
  Task Manager
 </h1>

 <button
  onClick={logout}
  className="bg-black text-white px-4 py-2 rounded"
 >
  Logout
 </button>

</div>

   {/* search + filter */}

   <div className="flex mb-6">

    <input
     placeholder="Search task"
     className="border p-2 mr-2"
     onChange={(e)=>setSearch(e.target.value)}
    />

    <select
     className="border p-2"
     onChange={(e)=>setStatus(e.target.value)}
    >

     <option value="">All</option>
     <option value="true">Completed</option>
     <option value="false">Pending</option>

    </select>

   </div>

   <TaskForm refresh={fetchTasks} />

   {/* task list */}

   <div className="grid gap-4">

    {tasks.map((task)=>(

     <div
      key={task.id}
      className="bg-white p-4 shadow rounded"
     >

      <h2 className="font-bold text-lg">
       {task.title}
      </h2>

      <p className="text-gray-600">
       {task.description}
      </p>

      <p className="text-sm mt-2">
       {task.status ? "Completed" : "Pending"}
      </p>

      <div className="mt-3">

       <button
        onClick={()=>toggleStatus(task)}
        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
       >
        Toggle Status
       </button>

       <button
        onClick={()=>deleteTask(task.id)}
        className="bg-red-500 text-white px-3 py-1 rounded"
       >
        Delete
       </button>

      </div>

     </div>

    ))}

   </div>

   {/* pagination */}

   <div className="mt-8">

    <button
     onClick={()=>setPage(page>1?page-1:1)}
     className="bg-gray-300 px-3 py-1 mr-2 rounded"
    >
     Prev
    </button>

    <button
     onClick={()=>setPage(page+1)}
     className="bg-gray-300 px-3 py-1 rounded"
    >
     Next
    </button>

   </div>

  </div>

 );
}

export default Dashboard;