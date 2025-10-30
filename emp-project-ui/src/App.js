import React , {useEffect,useState} from "react";
import axios from "axios";

const API_URL="http://localhost:9098/api/employees"//backend URL


export default function EmployeeManager(){
  const[employees,setEmployees]=useState([]);
  const[newEmp,setNewEmp]=useState({name:"",email:"",phoneno:""})
  const[loading,setLoading]=useState(false);
  //fetching all employees
  const fetchEmployees = async () =>{
    setLoading(true);
    try{
      const res=await axios.get(API_URL);
      setEmployees(res.data)
    }catch(err){
      console.error("Error fetching employees:")
    }finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEmployees();
  },[]);
  //Add new employee
  const createEmployee= async (e) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.email || !newEmp.phoneno){
      alert("All fields are required!");
        return;
      }
      try{
        await axios.post(API_URL,newEmp);
        setNewEmp({name:"",email:"",phoneno:""});
        fetchEmployees();
      }catch(err){
        console.error ("Error creating employee:",err);
      }
    };
    
    
    
    const deleteEmployee= async (id) => {
      if (!window.confirm("Are you sure you want to delete this employee?")) return;
      try{
        await axios.delete(`${API_URL}/${id}`);
        fetchEmployees();
      }catch (err){
        console.error("Error deleting employee:",err)
      }
    }

    const updateEmployee = async (id) =>{
      const emp = employees.find(e=>e.id ===id);
      if (!emp) return;

      const name=prompt("Enter new name :",emp.name);
      const email=prompt("Enter new email :",emp.email);
      const phoneno =prompt ("Enter new phone number",emp.phoneno);

      if(!name || !email || !phoneno) {
        alert("all fields are required!!");
        return;
      }
      try{
        await axios.put (`${API_URL}/${id}`,{name,email,phoneno});
        fetchEmployees();
      }catch(err){
        console.error("error updating employee:",err)
      }
    }
    
  return(
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        Employee Management
      </h1>
      <form onSubmit={createEmployee}
            className="flex flex-col md:flex-row gap-3 mb-8 bg-gray-100 p-4 rounded-lg shadow"
            >
              <input type="text" placeholder="Name" value={newEmp.name}onChange={(e)=>setNewEmp({...newEmp,name:e.target.value})} className="p-2  border rounded flex-1"/>
              <input type="email" placeholder="Email" value={newEmp.email} onChange={(e)=> setNewEmp({...newEmp,email:e.target.value})} className="p-2 border rounded flex-1"/>
              <input type="text" placeholder="Phone Number" value={newEmp.phoneno} onChange={(e)=>setNewEmp({...newEmp,phoneno:e.target.value})} className="p-2 border rounded flex-1"/>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" >ADD</button>
            </form>

            {/*Employee List*/}
            {loading ?(
              <p className="text-center text-gray-500">loading...</p>
            ): employees.length === 0 ? (
             <p className="text-center text-gray-500">No employees found</p>
            ) : (
              <table className="w-full border-collapse border">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2"> Email</th>
                    <th className="border p-2">Phone No</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>


                <tbody>
                  {employees.map((emp) =>(
                    <tr key={emp.id} className="text-center hover:bg-gray-100">
                      <td className="border p-2">{emp.id}</td>
                      <td className="border p-2">{emp.name}</td>
                      <td className="border p-2">{emp.email}</td>
                      <td className="border p-2">{emp.phoneno}</td>
                     <td className="border p-2">
                       <div className="flex justify-center gap-3">
                        <button onClick={()=> deleteEmployee(emp.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                          DELETE
                        </button>

                        <button onClick={()=> updateEmployee(emp.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                          EDIT
                        </button>
                       </div>
                      
                     </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          }
    </div>
  );
}